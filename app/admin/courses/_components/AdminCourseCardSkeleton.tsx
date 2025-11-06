import {Card, CardContent} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

// ----------------------------------------------------------------------

export function AdminCourseCardSkeleton() {
    return (
        <Card className="group relative py-0 gap-0">
            {/* Skeleton pour le bouton dropdown */}
            <div className="absolute top-2 right-2 z-10">
                <Skeleton className="h-9 w-9 rounded-md"/>
            </div>

            {/* Skeleton pour l'image */}
            <Skeleton className="w-full rounded-t-lg aspect-video"/>

            <CardContent className="p-4">
                {/* Skeleton pour le titre */}
                <div className="space-y-2">
                    <Skeleton className="h-6 w-full"/>
                    <Skeleton className="h-6 w-3/4"/>
                </div>

                {/* Skeleton pour la description */}
                <div className="space-y-2 mt-2">
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-5/6"/>
                </div>

                {/* Skeleton pour les icônes (durée et niveau) */}
                <div className="mt-4 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-2">
                        <Skeleton className="h-6 w-6 rounded-md"/>
                        <Skeleton className="h-4 w-12"/>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <Skeleton className="h-6 w-6 rounded-md"/>
                        <Skeleton className="h-4 w-16"/>
                    </div>
                </div>

                {/* Skeleton pour le bouton */}
                <Skeleton className="h-10 w-full mt-4 rounded-md"/>
            </CardContent>
        </Card>
    );
}
