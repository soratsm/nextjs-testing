import {
  useContext,
  useState,
  createContext,
  VFC,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

const StateContexxt = createContext(
  {} as {
    toggle: boolean
    setToggle: Dispatch<SetStateAction<boolean>>
  }
)

type Props = {
  children: ReactNode
}

export const StateProvider: VFC<Props> = (props) => {
  const { children } = props
  const [toggle, setToggle] = useState(false)

  return (
    <StateContexxt.Provider value={{ toggle, setToggle }}>
      {children}
    </StateContexxt.Provider>
  )
}

export const useStateContext = () => useContext(StateContexxt)
