/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'setimmediate'

// SSG + Pre-fetch
// コンポーネントに対するテスト
import Post from '../components/Post'
import { POST } from '../types/Types'

describe('Post component with given props', () => {
  let dummyProps: POST
  // 擬似的なpropsを定義
  beforeEach(() => {
    dummyProps = {
      userId: 1,
      id: 1,
      title: 'dummy title 1',
      body: 'dummy body 1',
    }
  })
  it('Should render correctly with given props value', () => {
    render(<Post {...dummyProps} />)
    expect(screen.getByText(dummyProps.id)).toBeInTheDocument()
    expect(screen.getByText(dummyProps.title)).toBeInTheDocument()
    //screen.debug()
  })
})
