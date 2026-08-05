import { MediaGrid } from "@/components/admin/media/MediaGrid";
import { MediaToolbar } from "@/components/admin/media/MediaToolbar";
import { MediaUploader } from "@/components/admin/media/MediaUploader";

export default function MediaLibraryPage() {
    return (
        <div className="space-y-6">

            <MediaToolbar />

            <MediaUploader />

            <MediaGrid />

        </div>
    );
}