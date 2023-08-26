interface PaginationProps {
  count: number
  nextPage: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ count, nextPage }) => {
  const totalPages = 10
  const pages = Array.from(Array(totalPages).keys())
  return (
    <div className='flex justify-center mt-10'>
      <div className='flex gap-2 justify-between w-[50%] items-center'>
        <div className="cursor-pointer" onClick={() => nextPage(count - 1)}>Prev page</div>
        {pages.map(item => {
          const mode = item + 1 > count ? count + 1 : count - 1
          return (
            <div
              className={`cursor-pointer rounded ${
                count === item + 1 ? 'bg-[red] p-2 ' : 'hover:bg-sky-700 p-2'
              }`}
              key={item}
              onClick={() => nextPage(mode)}
            >
              {item + 1}
            </div>
          )
        })}
        <div className="cursor-pointer" onClick={() => nextPage(count + 1)}>Next page</div>
      </div>
    </div>
  )
}

export default Pagination
