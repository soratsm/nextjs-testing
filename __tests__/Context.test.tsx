/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StateProvider } from '../context/StateProvider'
import ContextA from '../components/ContextA'
import ContextB from '../components/ContextB'
import 'setimmediate'

// グローバルのステート管理時のテスト
describe('Global state management (useContext)', () => {
  it('Should change the toggle state globally', () => {
    // テストしたいコンポーネントをプロバイダでラップする
    render(
      <StateProvider>
        <ContextA />
        <ContextB />
      </StateProvider>
    )
    // 初期値の確認
    expect(screen.getByTestId('toggle-a').textContent).toBe('false')
    expect(screen.getByTestId('toggle-b').textContent).toBe('false')
    // ボタンクリック
    userEvent.click(screen.getByRole('button'))
    // 押下後の確認
    expect(screen.getByTestId('toggle-a').textContent).toBe('true')
    expect(screen.getByTestId('toggle-b').textContent).toBe('true')
  })
})
