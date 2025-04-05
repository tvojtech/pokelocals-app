'use client';

import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { uploadTournamentFile } from '@/app/actions/tournament';
import { Alert } from '@/components/Alert';

export function FileUpload({ tournamentId }: { tournamentId: string }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'tdf') {
      setError('Only .tdf files are allowed');
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileSelect = useCallback((file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, []);

  const uploadFileAction = async (prevState: unknown, formData: FormData) => {
    const result = await uploadTournamentFile(formData, tournamentId);

    if (result.success) {
      setSelectedFile(null);
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

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = e.clipboardData?.files;
      if (items && items.length > 0) {
        handleFileSelect(items[0]);
      }
    },
    [handleFileSelect]
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  return (
    <>
      <form action={formAction} className="space-y-4">
        <div
          ref={dropZoneRef}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}>
          <input
            type="file"
            id="file"
            name="file"
            ref={fileInputRef}
            accept=".tdf"
            className="hidden"
            onChange={e => {
              if (e.target.files?.length) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
          <div className="space-y-2">
            <div className="text-gray-600">
              <span className="font-medium">Click to upload</span> or drag and
              drop
            </div>
            <p className="text-sm text-gray-500">
              Only .tdf files are allowed. You can also paste files from
              clipboard
            </p>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending || !selectedFile}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300">
          {isPending ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {(error || state?.error) && (
        <Alert message={error || (state?.error ?? '')} type="error" />
      )}
    </>
  );
}
