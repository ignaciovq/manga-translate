import { PYTHON_API_URL } from '@/config/constants'
import { Result } from '@/types'

interface OcrResponse {
  filename: string
  language: string
  result: Result[]
}
export async function getOcrMangaData (image: File) {
  const formData = new FormData()
  formData.append('file', image)

  try {
    const response = await fetch(PYTHON_API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    })

    const data = await response.json() as OcrResponse

    return data
  } catch (error: any) {
    throw new Error(`Error en api ocr ${error.message as string}`)
  }
}
