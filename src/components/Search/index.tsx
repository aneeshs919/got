import { GOT_TITLE } from '../../constants'
import type { SearchProps } from '../../interface'
const Search: React.FC<SearchProps> = ({ onSearch, selectChange, placeholder }) => {
  const titles = GOT_TITLE.slice(1, 5)
  return (
    <div className='flex gap-4'>
      <select onChange={selectChange} className='text-black capitalize px-4 rounded-md'>
        {titles.map(item => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <input
        className='text-black p-2 capitalize  rounded-md w-[250px]'
        color='black'
        type='text'
        onChange={onSearch}
        placeholder={`Search by ${placeholder}`}
      />
    </div>
  )
}

export default Search
