// グローバルのステート管理時のテスト
import { memo, VFC } from 'react'
import { useStateContext } from '../context/StateProvider'

const ContextB: VFC = () => {
  const { toggle } = useStateContext()
  return (
    <>
      <p>Context B</p>
      <p className="text-indigo-600" data-testid="toggle-b">
        {toggle ? 'true' : 'false'}
      </p>
    </>
  )
}
export default memo(ContextB)
