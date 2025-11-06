import {CloudUploadIcon, ImageOffIcon, Loader2, Upload, XIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Progress} from "@/components/ui/progress";

// ----------------------------------------------------------------------

export function RenderEmptyState({isDragActive}: { isDragActive: boolean }) {
    return (
        <div className="text-center">
            <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
                <CloudUploadIcon className={cn(
                    'size-6 text-muted-foreground',
                    isDragActive && 'text-primary'
                )}/>
            </div>
            <p className="text-base font-semibold text-foreground">
                Drop your files here or <span className="text-primary font-bold cursor-pointer">click to upload</span>
            </p>
            <Button type="button" className="mt-4">
                Select file
            </Button>
        </div>
    )
}

export function RenderErrorState() {
    return (
        <div className="text-center">
            <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
                <ImageOffIcon className={cn(
                    'size-6 text-destructive',
                )}/>
            </div>
            <p className="text-base font-semibold ">
                Upload failed
            </p>
            <p className="text-xs mt-1 text-muted-foreground">Something went wrong !</p>
            <Button type="button" className="mt-4 cursor-pointer">
                Retry file selection
            </Button>
        </div>
    )
}

export function RenderUploadedState(
    {
        previewUrl,
        isDeleting,
        handleRemoveFile,
        fileType,
    }:
    {
        previewUrl: string,
        isDeleting: boolean,
        handleRemoveFile: () => void,
        fileType: "image" | "video",
    }) {
    return (
        <div className="relative group w-full h-full flex items-center justify-center">
            {fileType === "video" ? (
                <video
                    controls
                    src={previewUrl}
                    className="w-full h-full rounded-md"
                />
            ) : (
                <Image src={previewUrl} alt="Uploaded file" fill className="object-contain p-2"/>
            )}
            <Button
                type="button"
                variant="destructive"
                size="icon"
                className={cn(
                    'absolute top-2 right-2 cursor-pointer',
                )}
                onClick={handleRemoveFile}
                disabled={isDeleting}
            >
                {isDeleting ? <Loader2 className="size-4 animate-spin"/> : <XIcon className="size-4"/>}
            </Button>
        </div>
    )
}

export function RenderUploadingState({progress, file}: { progress: number; file: File }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
            <Upload className="w-12 h-12 text-primary animate-pulse"/>
            <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground truncate max-w-[200px]">
                        {file.name}
                    </span>
                    <span className="font-medium text-primary">
                        {progress}%
                    </span>
                </div>
                <Progress value={progress} className="w-full"/>
            </div>
            <p className="text-sm text-muted-foreground">
                Uploading...
            </p>
        </div>
    );
}
