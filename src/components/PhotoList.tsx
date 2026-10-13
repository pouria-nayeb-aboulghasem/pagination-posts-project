import { useEffect, useState } from "react";
import { getPhotos } from "@/services/photosService";
import type { PhotoType } from "@/types";
import ErrorMessage from "./Error";
import Loading from "./Loading";
import PhotoTable from "./PhotoTable";

function PhotoList() {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadPhotos = async () => {
      try {
        const photoData = await getPhotos(controller.signal);
        setPhotos(photoData);
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadPhotos();

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <section aria-label="Photos">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          {photos.length} {photos.length === 1 ? "photo" : "photos"}
        </p>
        <p className="text-xs text-slate-400">
          Select the title to change the sort order
        </p>
      </div>
      {photos.length > 0 ? (
        <PhotoTable photos={photos} />
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center text-sm text-slate-500">
          No photos found.
        </div>
      )}
    </section>
  );
}

export default PhotoList;
