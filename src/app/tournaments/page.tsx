"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { createTournament } from "@/app/actions/tournament";

export default function Tournaments() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = useCallback(async () => {
    setIsLoading(true);
    const { id } = await createTournament();
    router.push(`/tournaments/${id}`);
  }, [router]);
  return (
    <button onClick={handleClick}>
      {isLoading ? "Creating..." : "New Tournament"}
    </button>
  );
}
