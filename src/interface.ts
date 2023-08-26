export interface Character {
  url: string
  name: string
  gender: string
  culture: string
  born: string
  died: string
  titles: string[]
  aliases: string[]
  father: string
  mother: string
  spouse: string
  allegiances: string[]
  books: string[]
  povBooks: string[]
  tvSeries: string[]
  playedBy: string[]
}

export interface SearchProps {
  placeholder: string
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export interface dataType {
  aliases: string
  culture: string
  gender: string
  name: string
  books: string
}

export interface AgeData {
  [name: string]: number | string
}

export interface storeAgeType {
  [key: string]: number | null
}
