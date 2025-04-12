export interface Character {
  id: string
  name: string
  image: string
  status: string
  species: string
}

export interface CharacterPageInfo {
  count: number
  pages: number
  next: number | null
  prev: number | null
}
