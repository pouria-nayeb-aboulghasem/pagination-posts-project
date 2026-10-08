# Pagination posts project

Create a react project with tailwindcss and ViteJS.

## Installation

- ViteJS
- TailwindCss
- Flowbite
- RemixIcon

## Setup

vite.config.ts

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
```

tsconfig.json

```ts
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
```

tsconfig.app.json

```ts
  "extends": "./tsconfig.json",
```

## Folder structures

- components
  - PostList.tsx
  - PostItem.tsx
  - Error.tsx
  - Loading.tsx
- constants
  - apiEndpoints.ts
  - index.ts
- services
  - postsService.ts
- types
  - post.d.ts
  - index.ts

## .env file

```ts
  VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

## constants folder

apiEndpoints.ts

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_ENDPOINTS = {
  posts: "/posts",
} as const;

export { API_BASE_URL, API_ENDPOINTS };
```

pagination.ts

```ts
const PAGE_SIZE: number = 10;
const totalPosts: number = 100;

export { PAGE_SIZE, totalPosts };
```

index.ts

```ts
import { API_BASE_URL, API_ENDPOINTS } from "./apiEndpoints";

export { API_BASE_URL, API_ENDPOINTS };
```

## services folder

postsService.ts

```ts
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
```

## types folder

post.d.ts

```ts
type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type { PostType };
```

index.ts

```ts
import type { PostType } from "./post";

export type { PostType };
```

## components folder

PostItem.tsx

```ts
import type { PostType } from "@/types";

type PostItemProps = {
  post: PostType;
};

function PostItem({ post }: PostItemProps) {
  return (
    <li className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
      <h6 className="font-bold text-2xl">{post.title}</h6>
      <p>{post.body}</p>
    </li>
  );
}

export default PostItem;
```

PostList.tsx

```ts
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

```

Error.tsx

```ts
type ErrorProps = {
  error: string | null;
};

function Error({ error }: ErrorProps) {
  return <div>{error}</div>;
}

export default Error;

```

Loading.tsx

```ts
import { RiLoader4Line } from "@remixicon/react";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center my-4 text-2xl">
      <RiLoader4Line className="animate-spin" />
      <p>Processing…</p>
    </div>
  );
}

export default Loading;

```

## Copyright

MIT copyright
