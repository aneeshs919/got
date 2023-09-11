import { GOT_TITLE } from '../../constants'

interface SortProps {
  handleOption: (selectedValue: string) => void
}

const Sort: React.FC<SortProps> = ({ handleOption }) => {
  const options: string[] = ['Select category', ...GOT_TITLE]
  return (
    <select
      onChange={event => handleOption(event.target.value)}
      className='text-black capitalize px-4 rounded-md'
    >
      {options.map(item => {
        return <option key={item}>{item}</option>
      })}
    </select>
  )
}

export default Sort
