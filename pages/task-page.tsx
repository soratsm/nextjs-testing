// ④SSG + Pre-fetch + Client side fetching
// ビルド時に静的なページを作成し＆
// アクセス時に動的に値を取得してくる（useSWRを使用）
// このタイプは2段階のテストが必要
// 1.getStatic
// 2.useSWR:staticTasksにダミーのデータを
import { VFC } from 'react'
import Layout from '../components/Layout'
import {  getAllTasksData } from '../lib/fetch'
import { GetStaticProps } from 'next'
import {  TASK } from '../types/Types'
import axios from 'axios'
import useSWR from 'swr'

type Props = {
  staticTasks: TASK[]
}

const axiosFetcher = async () => {
  const result = await axios.get<TASK[]>(
    'https://jsonplaceholder.typicode.com/todos/?_limit=10'
  )
  return result.data
}

const TaskPage: VFC<Props> = (props) => {
  const { staticTasks } = props
  const { data: tasks, error } = useSWR('todosFetch', axiosFetcher, {
    fallbackData: staticTasks,
    revalidateOnMount: true,
  })
  if (error) return <span>Error!</span>
  return (
    <Layout title="Todos">
      <p className="text-4xl mb-10">todos page</p>
      <ul>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id}>
              {task.id}
              {': '}
              <span>{task.title}</span>
            </li>
          ))}
      </ul>
    </Layout>
  )
}
export default TaskPage

export const getStaticProps: GetStaticProps = async () => {
  const staticTasks = await getAllTasksData()
  return {
    props: { staticTasks },
  }
}
