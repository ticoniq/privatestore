"use client";

import React, { useState, useCallback } from 'react';
import { X, ImagePlus } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeInMB?: number;
  accept?: string[];
  className?: string;
}

export function ImageUploader({
  onChange, 
  maxFiles = 5, 
  maxSizeInMB = 2,
  accept = ['image/jpeg', 'image/png', 'image/gif'],
  className
}: ImageUploaderProps) {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files ?? []);
    
    // Validate file count
    const totalFiles = files.length + newFiles.length;
    if (totalFiles > maxFiles) {
      toast({
        title: "Upload Limit Exceeded",
        description: `You can upload a maximum of ${maxFiles} files`,
        variant: "destructive"
      });
      return;
    }

    // Validate file size and type
    const validFiles = newFiles.filter(file => {
      const isValidSize = file.size <= maxSizeInMB * 1024 * 1024;
      const isValidType = accept.includes(file.type);
      
      if (!isValidSize) {
        toast({
          title: "File Size Error",
          description: `${file.name} exceeds ${maxSizeInMB}MB limit`,
          variant: "destructive"
        });
      }
      
      if (!isValidType) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not an accepted image type`,
          variant: "destructive"
        });
      }
      
      return isValidSize && isValidType;
    });

    // Create previews
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    
    // Update state
    const combinedFiles = [...files, ...validFiles];
    const combinedPreviews = [...previews, ...newPreviews];

    setFiles(combinedFiles);
    setPreviews(combinedPreviews);
    
    // Call onChange prop
    onChange(combinedFiles);
  }, [files, maxFiles, previews, onChange, toast, maxSizeInMB, accept]);

  const handleRemoveFile = useCallback((indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    const updatedPreviews = previews.filter((_, index) => index !== indexToRemove);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    
    // Revoke previous object URL to prevent memory leaks
    const previewToRemove = previews[indexToRemove];
    if (previewToRemove) {
      URL.revokeObjectURL(previewToRemove);
    }
    
    // Update parent component
    onChange(updatedFiles);
  }, [files, previews, onChange]);

  return (
    <div className={cn("w-full", className)}>
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center",
          "transition-colors duration-200",
          "hover:border-blue-500 hover:bg-blue-50",
          files.length >= maxFiles ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
      >
        <input 
          type="file" 
          multiple
          accept={accept.join(',')}
          onChange={handleFileChange}
          className="hidden"
          id="image-upload-input"
          disabled={files.length >= maxFiles}
        />
        <label 
          htmlFor="image-upload-input" 
          className={cn(
            "flex flex-col items-center justify-center space-y-2",
            files.length >= maxFiles ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <ImagePlus className="h-10 w-10 text-gray-400" />
          <p className="text-sm text-gray-600">
            {files.length >= maxFiles 
              ? `Maximum of ${maxFiles} files reached` 
              : "Click to upload or drag and drop images"}
          </p>
          <p className="text-xs text-gray-500">
            {`(${maxFiles} files max, ${maxSizeInMB}MB each) - ${accept.map(type => type.split('/')[1]?.toUpperCase() ?? '').join(', ')}`}
          </p>
        </label>
      </div>

      {/* Preview Section */}
      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div 
              key={preview} 
              className="relative rounded-lg overflow-hidden shadow-md group"
            >
              <img 
                src={preview} 
                alt={`Preview ${index + 1}`} 
                className="w-full h-24 object-cover"
              />
              <Button
                type="button"
                onClick={() => handleRemoveFile(index)}
                variant="destructive"
                size="icon"
                className={cn(
                  "absolute top-1 right-1 rounded-full p-1",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                )}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}