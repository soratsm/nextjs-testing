// ③グローバルのステート管理時のテスト
import { VFC } from 'react'
import ContextA from '../components/ContextA'
import ContextB from '../components/ContextB'
import Layout from '../components/Layout'
import { StateProvider } from '../context/StateProvider'

const ContextPage: VFC = () => {
  return (
    <Layout title="Context">
      <p className="text-4xl mb-10">context page</p>
      <StateProvider>
        <ContextA />
        <ContextB />
      </StateProvider>
    </Layout>
  )
}
export default ContextPage
