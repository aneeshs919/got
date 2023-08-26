import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Pagination from './components/Pagination'
import Table from './components/Table'
import Sort from './components/Sort'
import type { Character, dataType, AgeData, storeAgeType } from './interface'
import { CHARACTER_URL, AGE_FETCH_URL } from './constants'
import { setCall, debounce, sortBy } from './helpers'
import './App.css'

const storeAge: storeAgeType = {} // Object to store age data

const App: React.FC = () => {
  // State variables
  const [count, setCount] = useState<number>(1)
  const [loader, setLoader] = useState<boolean>(false)
  const [gotData, setGotData] = useState<dataType[]>([])
  const [search, setSearch] = useState<string>('')
  const [category, setCategory] = useState<string>('aliases')
  const [age, setAge] = useState<AgeData>({})
  const totalPages: number = 10

  // Function to make API calls for character data
  const setCallFunc = (gotFetchURL: string) => {
    setCall(gotFetchURL)
      .then((jsonResp: Character[]) => {
        // Extract and process character data
        // Update state variables
        const agetoGet: string[] = []
        const data: dataType[] = jsonResp?.map((item: Character) => {
          if (item.name && !storeAge[item.name]) {
            agetoGet.push(item.name)
          }
          return {
            aliases: item?.aliases.length ? item?.aliases[0] : '',
            culture: item.culture,
            gender: item.gender,
            name: item.name,
            books: item?.books.length ? item?.books[0] : ''
          }
        })
        getAgesFor(agetoGet)
        setGotData(data)
        setLoader(false)
      })
      .catch(err => {
        // Handle errors
        console.error('Error:', err)
        setLoader(false)
      })
  }

  // Function to fetch ages for characters
  const getAgesFor = async (params: string[]) => {
    // Fetch age data
    // Update 'age' state
    if (!params.length) return
    const getParams = params.join('&name[]=')
    const ageUrl = `${AGE_FETCH_URL}name[]=${getParams}`
    const resp = await setCall(ageUrl)
    const colletedAge: AgeData = { ...age }
    resp?.forEach((item: AgeData) => {
      colletedAge[item.name] = item.age ?? '_'
    })
    setAge(colletedAge)
  }

  // Fetch character data and age data on initial render and when search parameters change
  useEffect(() => {
    // Update 'gotData' and 'age' state
    const gotFetchURL = search
      ? `${CHARACTER_URL}?${category}=${search}&page=${count}&pageSize=10`
      : `${CHARACTER_URL}?page=${count}&pageSize=10`
    setLoader(true)
    setCallFunc(gotFetchURL)
  }, [count, search])

  // Function to handle pagination
  const handleNext = (newPage: number) => {
    // Update 'count' state
    if (newPage >= 1 && newPage <= totalPages) {
      setCount(newPage)
    }
  }

  // Function to handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update 'search' state
    // Fetch new data based on search and category
    // Debounce the API call
    const params = `${category}=${e.target.value}`
    setSearch(e.target.value)
    if (search !== e.target.value) setCount(1)
    const gotFetchURL = `${CHARACTER_URL}?${params}&page=${count}&pageSize=10`
    debounce(() => {
      setCallFunc(gotFetchURL)
    }, 600)
  }

  // Function to sort characters by name and update state
  const sortCharactersByName = (type: string) => {
    // Sort the character data and update 'gotData' state
    const sortedArray = sortBy(gotData, type)
    setGotData(sortedArray)
  }

  const handleOption = (value: string) => sortCharactersByName(value)

  // Render the component
  return (
    <>
      {/* Filter/Search section */}
      <div className='flex justify-between items-center mb-8 pb-10 border-b border-[#1e1e1e]'>
        {/* Search component */}
        {/* Category dropdown */}
        <Search
          onSearch={handleSearch}
          selectChange={e => setCategory(e.target.value)}
          placeholder={category}
        />
        {/* Sort button */}
        {/* <div onClick={() => sortCharactersByName(gotData, 'aliases')}>Sort</div> */}
        <Sort handleOption={handleOption} />
      </div>
      {/* Display loading message if loading */}
      {loader ? 'loading...' : null}
      {/* Table component to display character data */}
      <div className='text-[10px] mb-5'>
        Note: The data showed here based fetch data response
      </div>
      <Table data={gotData} age={age} />

      {/* Pagination */}
      {/* Show pagination if there is enough data */}
      {gotData.length >= 10 && (
        <Pagination
          count={count}
          nextPage={pageCount => handleNext(pageCount)}
        />
      )}
      <div className="bg-[url('/download.jpeg')] fixed top-0 left-0 right-0 bottom-0 bg-cover z-[-1] opacity-[.1]" />
    </>
  )
}

export default App
