export const setCall = async (url: string) => {
  const apiUrl = url ?? `https://api.agify.io/?name=${characterName}`
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

export const sortBy = (data, type) => {
  console.log('data, type', data, type)
  const sortedArray = data.slice().sort((a, b) => {
    // Compare character names (assuming names are strings)
    const nameA = a[type]?.toUpperCase()
    const nameB = b[type]?.toUpperCase()
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
let timer = null
export const debounce = (func, delay = 300) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    if (func) func()
  }, delay)
}
