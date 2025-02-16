'use client';

import { useActionState } from 'react';

import { uploadTournamentFile } from '@/app/actions/tournament';
import { Alert } from '@/app/components/Alert';

export function FileUpload({ tournamentId }: { tournamentId: string }) {
  const uploadFileAction = async (prevState: unknown, formData: FormData) => {
    const result = await uploadTournamentFile(formData, tournamentId);

    // fixme: this is a workaround to fix returning stale pairings on first request
    if (result.success) {
      try {
        await fetch('/tournaments/' + tournamentId + '/pairings');
        console.log('Fetched new tournament pairings after tdf upload');
      } catch (error) {
        console.error(
          'Failed to fetch new tournament pairings after tdf upload',
          error
        );
      }
    }

    return result;
  };

  const [state, formAction, isPending] = useActionState(
    uploadFileAction,
    undefined
  );

  return (
    <>
      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700">
            Choose a file
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="mt-1 block size-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-gray-50 file:text-gray-700
                      hover:file:bg-gray-200"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300">
          {isPending ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {state?.error && <Alert message={state.error} type="error" />}
    </>
  );
}
