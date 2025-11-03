import {Card} from "@/components/ui/card";
import Image from "next/image";
import {AdminCourseType} from "@/app/data/admin/admin-get-courses";
import {useConstructUrl} from "@/hooks/use-construct-url";

// ----------------------------------------------------------------------

interface iAppProps {
    data: AdminCourseType
}

// ----------------------------------------------------------------------

export function AdminCourseCard({data}: iAppProps) {

    const thumbnailUrl = useConstructUrl(data.fileKey);

    return (
        <Card className="group relative">
            {/* Absolute dropdown */}
            <div></div>
            <Image
                src={thumbnailUrl}
                alt="Thumbnail"
                width={600}
                height={300}
            />
        </Card>
    )
}

