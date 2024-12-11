/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { XMLParser } from "fast-xml-parser";
import { mkdir, readdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import { STORAGE_BASE_PATH } from "./common";
import { Tournament } from "./types";

export async function uploadTournamentFile(
  formData: FormData,
  projectId: string
) {
  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file selected" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const xmlString = buffer.toString("utf-8");
    const json = toJson(xmlString);

    // Ensure the upload directory exists
    const uploadDir = path.join(`${STORAGE_BASE_PATH}/${projectId}`);
    await ensureDir(uploadDir);

    const fileCount = (await readdir(uploadDir)).length;

    // Generate a unique filename
    const uniqueFilename = `${fileCount + 1}-${file.name}.json`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Write the file
    await writeFile(filePath, json);

    const fileUrl = `/uploads/${uniqueFilename}`;

    revalidatePath("/");
    return { url: fileUrl };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { error: "Failed to upload file" };
  }
}

// Helper function to ensure a directory exists
async function ensureDir(dirPath: string) {
  try {
    await mkdir(dirPath, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }
}

function toJson(xmlString: string): string {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });
  const jsonData = parser.parse(xmlString);

  const tournament: Tournament = {
    type: Number(jsonData.tournament["@_type"]),
    stage: Number(jsonData.tournament["@_stage"]),
    version: jsonData.tournament["@_version"],
    gametype: jsonData.tournament["@_gametype"],
    mode: jsonData.tournament["@_mode"],
    data: {
      name: jsonData.tournament.data.name,
      id: jsonData.tournament.data.id,
      city: jsonData.tournament.data.city,
      state: jsonData.tournament.data.state || null,
      country: jsonData.tournament.data.country,
      roundtime: Number(jsonData.tournament.data.roundtime),
      finalsroundtime: Number(jsonData.tournament.data.finalsroundtime),
      startdate: jsonData.tournament.data.startdate,
      lessswiss: jsonData.tournament.data.lessswiss === "true",
      autotablenumber: jsonData.tournament.data.autotablenumber === "true",
      overflowtablestart: Number(jsonData.tournament.data.overflowtablestart),
    },
    timeelapsed: Number(jsonData.tournament.timeelapsed),
    players: Array.isArray(jsonData.tournament.players.player)
      ? jsonData.tournament.players.player.map((p: any) => ({
          userid: p["@_userid"],
          firstname: p.firstname,
          lastname: p.lastname,
          birthdate: p.birthdate,
          starter: p.starter === "true",
          order: Number(p.order),
          seed: Number(p.seed),
          creationdate: p.creationdate,
          lastmodifieddate: p.lastmodifieddate,
        }))
      : [],
    pods: Array.isArray(jsonData.tournament.pods.pod)
      ? jsonData.tournament.pods.pod.map((p: any) => ({
          category: p["@_category"],
          stage: p["@_stage"],
          subgroups: parseSubgroups(p.subgroups),
          rounds: Array.isArray(p.rounds.round)
            ? p.rounds.round.map((r: any) => ({
                number: r["@_number"],
                type: r["@_type"],
                stage: r["@_stage"],
                matches: Array.isArray(r.matches.match)
                  ? r.matches.match.map((m: any) => {
                      return {
                        outcome: m["@_outcome"],
                        player1: m.player1
                          ? m.player1["@_userid"]
                          : m.player["@_userid"],
                        // in case of BYE player2 is not present
                        player2: m.player1 ? m.player2["@_userid"] : undefined,
                        tablenumber: Number(m.tablenumber),
                      };
                    })
                  : [],
              }))
            : [],
        }))
      : [],
  };

  return JSON.stringify(tournament);
}

const parseSubgroups = (subgroups: any) => {
  if (!subgroups || !subgroups.subgroup) {
    return [];
  }
  if (Array.isArray(subgroups.subgroup)) {
    return subgroups.subgroup.map((sg: any) => ({
      number: sg["@_number"],
      players: sg.players.player.map((p: any) => p["@_userid"]),
    }));
  }
  return [
    {
      number: subgroups.subgroup["@_number"],
      players: subgroups.subgroup.players.player.map((p: any) => p["@_userid"]),
    },
  ];
};
