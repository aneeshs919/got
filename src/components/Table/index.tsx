import { GOT_TITLE } from '../../constants'
import type {AgeData, dataType} from '../../interface'

interface TableProps {
    data: dataType[]; // Replace 'any' with the actual type for 'data'
    age: AgeData;
  }

const Table: React.FC<TableProps> = ({ data, age }) => {
  return (
    <>
      <div className='grid grid-cols-6'>
        {GOT_TITLE.map(item => (
          <div key={item}>
            <div className='capitalize text-2xl border-b border-[#111] bg-[#1e1e1e] p-4'>
              {item}
            </div>
          </div>
        ))}
      </div>
      {data?.map((item, index) => (
        <div className='grid grid-cols-6 text-[#999]' key={index}>
          <div className='p-4  bg-[#1e1e1e] text-ellipsis overflow-hidden ...'>
            {age[item.name] ?? '-'}
          </div>{' '}
          {Object.values(item).map((got, innerIndex) => (
            <div
              className='p-4  bg-[#1e1e1e] text-ellipsis overflow-hidden ...'
              key={innerIndex}
            >
              {got ? got : '-'}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default Table
