import Link from 'next/link'
import { memo, VFC } from 'react'
import { COMMENT } from '../types/Types'

type Props = COMMENT

const Comment: VFC<Props> = (props) => {
  const { id ,name,body} = props
  return (
    <li className="mx-10">
      <p className="">
        {id}
        {': '}
        {body}
      </p>
      <p className="text-center mt-3 mb-10">
        {'by '}
        {name}
      </p>
    </li>
  )
}

export default memo(Comment)
