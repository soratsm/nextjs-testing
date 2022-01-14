/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SWRConfig } from 'swr'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import CommentPage from '../pages/comment-page'
import 'setimmediate'

// SSG + Client side fetching
const server = setupServer(
  rest.get(
    'https://jsonplaceholder.typicode.com/comments/',
    (req, res, ctx) => {
      const query = req.url.searchParams
      const _limit = query.get('_limit')
      if (_limit === '10') {
        return res(
          ctx.status(200),
          ctx.json([
            {
              postId: 1,
              id: 1,
              name: 'A',
              email: 'dummya@gmail.com',
              body: 'test body a',
            },
            {
              postId: 2,
              id: 2,
              name: 'B',
              email: 'dummyb@gmail.com',
              body: 'test body b',
            },
          ])
        )
      }
    }
  )
)
beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

describe('Comment page with useSWR / Success+Error', () => {
  it('Should render the value fetched by useSWR ', async () => {
    render(
      // SWRConfig : https://swr.vercel.app/docs/options
      // よく使うのは
      // initialData：初期読み込み
      // revalidateOnMount：trueにしておくとマウント時に最新データ取得
      // refreshInterval：何ミリ秒単位でサーバにアクセスするか
      // dedupingInterval：何ミリ秒単位で連続アクセスを無効にするか（テスト時は0設定）
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage />
      </SWRConfig>
    )
    expect(await screen.findByText('1: test body a')).toBeInTheDocument()
    expect(screen.getByText('2: test body b')).toBeInTheDocument()
  })
  it('Should render Error text when fetch failed', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/comments/',
        (req, res, ctx) => {
          const query = req.url.searchParams
          const _limit = query.get('_limit')
          if (_limit === '10') {
            // 400番(エラー)で上書き
            return res(ctx.status(400))
          }
        }
      )
    )
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage />
      </SWRConfig>
    )
    expect(await screen.findByText('Error!')).toBeInTheDocument()
    //screen.debug()
  })
})
