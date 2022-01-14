// ①SSG + Pre-fetch
// 変化しないページに向いており高速
// 事前に静的なページを作成した場合のテストを確認

import { VFC } from 'react'
import Layout from '../components/Layout'
import { getAllPostsData } from '../lib/fetch'
import Post from '../components/Post'
import { GetStaticProps } from 'next'
import { POST } from '../types/Types'

type Props = {
  posts: POST[]
}
const BlogPage: VFC<Props> = (props) => {
  const { posts } = props
  return (
    <Layout title="Blog">
      <p className="text-4xl mb-10">blog page</p>
      <ul>{posts && posts.map((post) => <Post key={post.id} {...post} />)}</ul>
    </Layout>
  )
}
export default BlogPage

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostsData()
  return {
    props: { posts },
  }
}
