import { useState } from 'react'
import { GOT_TITLE } from '../../constants'
const Sort = ({ handleOption }) => {
  //   const [sortValue, setSortValue] = useState('')
  //   const handleOption = (event) => {
  //     setSortValue(event.target.value)
  //     console.log('value', value)
  //   }
  const options = ['Select category', ...GOT_TITLE]
  return (
    <select
      onChange={event => handleOption(event.target.value)}
      className='text-black capitalize px-4 rounded-md'
    >
      {options.map((item, index) => {
        return <option key={item}>{item}</option>
      })}
    </select>
  )
}

export default Sort
