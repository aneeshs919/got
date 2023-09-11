import type {  dataType } from './interface'

export const setCall = async (url: string) => {
  const apiUrl = url ?? `https://api.agify.io/`
  try {
    const response = await fetch(apiUrl)
    const jsonResp = await response.json()
    if (!response.ok) {
      throw new Error('API request failed')
    }
    return jsonResp
  } catch (error) {
    console.error('Error fetching age:', error)
    return null
  }
}

export const sortBy = (data: dataType[], type: string): dataType[] => {
  const sortedArray = data.slice().sort((a: any, b: any) => {
    // Compare character names (assuming names are strings)
    const nameA = a[type]?.toUpperCase() || ''
    const nameB = b[type]?.toUpperCase() || ''
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0

  })
  return sortedArray

}

// Custom debounce function
let timer: any = null;
export const debounce = (func: () => void, delay: number = 300): void => {

  clearTimeout(timer);
  timer = setTimeout(() => {
    if (func) func();
  }, delay);
};