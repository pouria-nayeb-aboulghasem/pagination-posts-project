import type { PostType } from "@/types";

type PostItemProps = {
  post: PostType;
};

function PostItem({ post }: PostItemProps) {
  const { title, body } = post;
  return (
    <li className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
      <h6 className="font-bold text-2xl">{title}</h6>
      <p>{body}</p>
    </li>
  );
}

export default PostItem;
