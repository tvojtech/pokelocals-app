"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { uploadTournamentFile } from "@/app/actions/tournament";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {pending ? "Uploading..." : "Upload"}
    </button>
  );
}

export function FileUpload({ tournamentId }: { tournamentId: string }) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await uploadTournamentFile(formData, tournamentId);

    if (result.error) {
      setError(result.error);
    } else {
      setError(null);
    }
  }

  return (
    <>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Choose a file
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
          />
        </div>
        <SubmitButton />
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </>
  );
}
