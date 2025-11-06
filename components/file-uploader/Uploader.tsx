"use client";

import {useCallback, useEffect, useState} from "react";
import {FileRejection, useDropzone} from "react-dropzone";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {
    RenderEmptyState,
    RenderErrorState,
    RenderUploadedState,
    RenderUploadingState
} from "@/components/file-uploader/RenderState";
import {toast} from "sonner";
import {v4 as uuidv4} from "uuid";
import {useConstructUrl} from "@/hooks/use-construct-url";

// ----------------------------------------------------------------------

export type UploaderState = {
    id: string | null;
    file: File | null;
    isUploading: boolean;
    isDeleting: boolean;
    error: boolean;
    progress: number;
    key?: string;
    objectUrl?: string;
    fileType: "image" | "video";
};

// ----------------------------------------------------------------------

interface iAppProps {
    value?: string;
    onChange?: (value: string) => void;
    fileTypeAccepted: "image" | "video";
}

// ----------------------------------------------------------------------

export function Uploader({value, onChange, fileTypeAccepted}: iAppProps) {
    const fileUrl = useConstructUrl(value || '');

    const [fileState, setFileState] = useState<UploaderState>({
        id: null,
        file: null,
        isUploading: false,
        isDeleting: false,
        error: false,
        progress: 0,
        fileType: fileTypeAccepted,
        key: value,
        objectUrl: value ? fileUrl : undefined,
    });


    const uploadFile = useCallback(async (file: File) => {
        setFileState((prev) => ({
            ...prev,
            isUploading: true,
            progress: 0,
        }));

        try {
            // Get presigned URL
            const presignedResponse = await fetch("/api/s3/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                    isImage: fileTypeAccepted === "image",
                }),
            });

            if (!presignedResponse.ok) {
                if (presignedResponse.status === 429) {
                    toast.error("Too many requests. Please wait a moment before trying again.");
                } else {
                    toast.error("Failed to upload. Please try again.");
                }

                setFileState((prev) => ({
                    ...prev,
                    isUploading: false,
                    progress: 0,
                    error: true,
                }));
                return;
            }

            const {presignedUrl, key} = await presignedResponse.json();

            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const progress = Math.round((event.loaded / event.total) * 100);
                        setFileState((prev) => ({
                            ...prev,
                            progress: progress,
                        }));
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 204) {
                        setFileState((prev) => ({
                            ...prev,
                            isUploading: false,
                            progress: 100,
                            key: key,
                        }));
                        onChange?.(key);
                        toast.success("File uploaded successfully");
                        resolve();
                    } else {
                        reject(new Error("Upload failed"));
                    }
                };

                xhr.onerror = () => {
                    reject(new Error("Upload failed"));
                }

                xhr.open("PUT", presignedUrl);
                xhr.setRequestHeader("Content-Type", file.type);
                xhr.send(file);
            });
        } catch {
            toast.error("Something went wrong while uploading the file");
            setFileState((prev) => ({
                ...prev,
                progress: 0,
                error: true,
                isUploading: false,
            }));
        }
    }, [fileTypeAccepted, onChange]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];

            if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
                URL.revokeObjectURL(fileState.objectUrl);
            }

            setFileState({
                file: file,
                isUploading: false,
                progress: 0,
                objectUrl: URL.createObjectURL(file),
                error: false,
                id: uuidv4(),
                isDeleting: false,
                fileType: fileTypeAccepted,
            });

            await uploadFile(file);
        }
    }, [fileState.objectUrl, fileTypeAccepted, uploadFile]);

    async function handleRemoveFile() {
        if (fileState.isDeleting || !fileState.objectUrl) return;

        setFileState((prev) => ({
            ...prev,
            isDeleting: true,
        }));

        const deletePromise = (async () => {
            const response = await fetch("/api/s3/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    key: fileState.key,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete file");
            }

            if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
                URL.revokeObjectURL(fileState.objectUrl);
            }

            onChange?.("");

            setFileState(() => ({
                file: null,
                isUploading: false,
                progress: 0,
                objectUrl: undefined,
                error: false,
                fileType: fileTypeAccepted,
                id: null,
                isDeleting: false,
            }));
        })();

        toast.promise(deletePromise, {
            loading: "Deleting file...",
            success: "File deleted successfully",
            error: "Failed to delete file",
        });

        try {
            await deletePromise;
        } catch {
            setFileState((prev) => ({
                ...prev,
                isDeleting: false,
                error: true,
            }));
        }
    }

    function rejectedFiles(fileRejection: FileRejection[]) {
        if (fileRejection.length) {
            const tooManyFiles = fileRejection.find((rejection) => rejection.errors[0].code === "too-many-files");
            const fileSizeTooBig = fileRejection.find((rejection) => rejection.errors[0].code === "file-too-large");
            const fileTypeInvalid = fileRejection.find((rejection) => rejection.errors[0].code === "file-invalid-type");

            if (tooManyFiles) {
                toast.error("Too many files, max 1 file allowed");
            }

            if (fileSizeTooBig) {
                toast.error("File size too big, max 5MB allowed");
            }

            if (fileTypeInvalid) {
                toast.error("File type not supported");
            }
        }
    }

    function renderContent() {
        if (fileState.isUploading) {
            return <RenderUploadingState progress={fileState.progress} file={fileState.file as File}/>
        }

        if (fileState.error) {
            return <RenderErrorState/>;
        }

        if (fileState.objectUrl) {
            return <RenderUploadedState
                previewUrl={fileState.objectUrl}
                handleRemoveFile={handleRemoveFile}
                isDeleting={fileState.isDeleting}
                fileType={fileState.fileType}
            />
        }

        return <RenderEmptyState isDragActive={isDragActive}/>;
    }

    useEffect(() => {
        return () => {
            if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
                URL.revokeObjectURL(fileState.objectUrl);
            }
        }
    }, [fileState.objectUrl]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: fileTypeAccepted === 'video' ? {'video/*': []} : {'image/*': []},
        maxFiles: 1,
        multiple: false,
        maxSize: fileTypeAccepted === 'image' ? 5 * 1024 * 1024 : 2000 * 1024 * 1024, // 5MB or 2000MB
        onDropRejected: rejectedFiles,
        disabled: fileState.isUploading || !!fileState.objectUrl,
    });

    return (
        <Card {...getRootProps()} className={cn(
            "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
            isDragActive
                ? "border-primary bg-primary/10 border-solid"
                : "border-border hover:border-primary",
        )}>
            <CardContent className="flex items-center justify-center h-full p-4">
                <input {...getInputProps()} />
                {renderContent()}
            </CardContent>
        </Card>
    );
}
