import { VFC } from "react"
import Layout from "../components/Layout"

const Home: VFC = () => {
  return (
    <Layout title="Home">
      <div className="text-4xl">
        Welcome to Nextjs
      </div>
    </Layout>
  )
}
export default Home
