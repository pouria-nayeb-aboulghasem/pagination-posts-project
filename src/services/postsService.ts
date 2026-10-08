import { API_BASE_URL, API_ENDPOINTS } from "@/constants";
import type { PostType } from "@/types";

const getPaginatedPosts = async (
  page: number = 1,
  PAGE_SIZE: number = 32,
  signal?: AbortSignal,
): Promise<PostType[]> => {
  const response = await fetch(
    `${API_BASE_URL}/${API_ENDPOINTS.posts}?_page=${page}&_limit=${PAGE_SIZE}`,
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
};

export { getPaginatedPosts };
