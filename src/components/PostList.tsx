import { PAGE_SIZE } from "@/constants/pagination";
import { getPaginatedPosts } from "@/services/postsService";
import type { PostType } from "@/types";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Error from "@/components/Error";
import Pagination from "./Pagination";
import PostItem from "./PostItem";

function PostList() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        setLoading(true);

        const data = await getPaginatedPosts(
          page,
          PAGE_SIZE,
          controller.signal,
        );

        setPosts(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, [page]);

  if (loading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <>
      <Pagination page={page} setPage={setPage} />

      <div className="container mx-auto p-4">
        <ul className="grid md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      </div>

      <Pagination page={page} setPage={setPage} />
    </>
  );
}

export default PostList;
