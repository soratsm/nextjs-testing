// ②SSG + Client side fetching
// 常に最新の値が欲しいSEO対策が不要なダッシューボード等に向いている
// 動的に値を取得してくる（javascript無効で表示されなくなる）
import { VFC } from 'react'
import Layout from '../components/Layout'
import useSWR from 'swr'
import axios from 'axios'
import Comment from '../components/Comment'
import { COMMENT } from '../types/Types'

const axiosFetcher = async () => {
  const result = await axios.get<COMMENT[]>(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10'
  )
  return result.data
}

const CommentPage: VFC = () => {
  // 第1引数：キーのため好きな名前
  // 第2引数：フェッチングの処理
  // const1：名前定義（自由）
  // const2：エラーの場合trueが返却
  const { data: comments, error } = useSWR('commentsFetch', axiosFetcher)

  if (error) return <span>Error!</span>

  return (
    <Layout title="Comment">
      <p className="text-4xl m-10">comment page</p>
      <ul>
        {comments &&
          comments.map((comment) => <Comment key={comment.id} {...comment} />)}
      </ul>
    </Layout>
  )
}
export default CommentPage
