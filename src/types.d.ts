interface Result {
  text: string
  coordinates: number[]
}

export interface Manga {
  preview: string
  results: Result[]
  name: string
}
