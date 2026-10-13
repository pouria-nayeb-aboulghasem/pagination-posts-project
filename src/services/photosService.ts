import { API_BASE_URL, API_ENDPOINTS } from "@/constants";
import type { PhotoType } from "@/types";

const getPhotos = async (signal?: AbortSignal): Promise<PhotoType[]> => {
  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.photos}?_limit=100`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch photos.");
  }

  return response.json() as Promise<PhotoType[]>;
};

export { getPhotos };
