"use client";

import { useState } from "react";
import { Camera, CheckCircle2, XCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PhotoValidationProps {
  expectedImage?: string;
  expectedName: string;
  onPhotoTaken?: (file: File) => void;
  onVerified?: (verified: boolean) => void;
  className?: string;
}

export function PhotoValidation({
  expectedImage,
  expectedName,
  onPhotoTaken,
  onVerified,
  className,
}: PhotoValidationProps) {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const handleCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          setCapturedPhoto(result);
          onPhotoTaken?.(file);
          // Auto-verify if expected image matches (simplified for demo)
          const verified = true; // In real app, use image comparison
          setIsVerified(verified);
          onVerified?.(verified);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="size-5" />
          Photo Validation
        </CardTitle>
        <CardDescription>Verify item matches expected: {expectedName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {expectedImage && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Expected Item:</p>
            <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-lg border">
              <img src={expectedImage} alt={expectedName} className="h-full w-full object-cover" />
            </div>
          </div>
        )}

        {capturedPhoto ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Captured Photo:</p>
              <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-lg border">
                <img src={capturedPhoto} alt="Captured" className="h-full w-full object-cover" />
              </div>
            </div>

            {isVerified !== null && (
              <div
                className={cn(
                  "flex items-center gap-2 rounded-lg p-3",
                  isVerified
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                )}
              >
                {isVerified ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <XCircle className="size-5" />
                )}
                <span className="font-medium">
                  {isVerified ? "Item Verified ✓" : "Item Mismatch ✗"}
                </span>
              </div>
            )}
          </div>
        ) : (
          <Button onClick={handleCapture} className="w-full" size="lg">
            <Camera className="mr-2 size-4" />
            Capture Photo
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

