'use client';

import { useActionState, useCallback, useEffect, useRef, useState } from 'react';

import { uploadTournamentFile } from '@/actions/tournament';
import { Alert } from '@/components/Alert';
import { cn } from '@/lib/utils';

import { LoadingButton } from './ui/buttons/loading-button';

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
    }

    return result;
  };

  const [state, formAction, isPending] = useActionState(uploadFileAction, undefined);

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
      <form action={formAction} className="w-full space-y-4">
        <div
          ref={dropZoneRef}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'relative min-h-60 cursor-pointer',
            'flex flex-col items-center justify-center',
            'rounded-lg border-2 border-dashed p-8 text-center transition-colors',
            isDragging ? 'border-gray-400 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
          )}>
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
            <div className="text-primary">
              <span className="font-medium">Click to upload</span> or drag and drop
            </div>
            <p className="text-sm text-gray-500">
              Only .tdf files are allowed. You can also paste files from clipboard
            </p>
            {selectedFile && <p className="mt-2 text-sm text-gray-600">Selected: {selectedFile.name}</p>}
          </div>
        </div>
        {(error || state?.error) && <Alert message={error || (state?.error ?? '')} type="error" />}
        <LoadingButton isLoading={isPending} type="submit" disabled={!selectedFile}>
          Upload
        </LoadingButton>
      </form>
    </>
  );
}
