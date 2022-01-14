import Link from "next/link";
import { memo, VFC } from "react";
import { POST } from '../types/Types'

type Props = POST

const Post: VFC<Props> = (props) => {
  const { id,title } = props;
  return (
    <div>
      <span>{id}</span>
      {' : '}
      <Link href={`/posts/${id}`}>
        <a className="cursor-pointer border-b border-gray-500 hover:bg-gray-300">
          {title}
        </a>
      </Link>
    </div>
  )
};

export default memo(Post);
