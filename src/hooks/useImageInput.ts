import { useRef, useState } from 'react'
import { createPreview } from '@/utils/createImagePreview'
import { getOcrMangaData } from '@/services/ocr'
import { translate } from '@/services/translate'
import { Manga } from '@/types'
import { useMangaStore } from '@/store/manga.store'
import { useRouter } from 'next/router'

export interface MangaFile {
  name: string
  file: File
}

export function useImageInput () {
  const [mangaPages, setMangaPages] = useState<MangaFile[]>([])
  const [uploadPreview, setUploadPreview] = useState<Manga[]>([])
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [setMangas, setIsLoading] = useMangaStore(state => [state.setMangas, state.setIsLoading])
  const router = useRouter()

  const saveAndPreview = (files: File[]) => {
    const newMangas = files.map((file) => ({ name: file.name, file }))
    setMangaPages(prev => [...prev, ...newMangas])

    for (const file of files) {
      createPreview(file)
        .then((preview) => {
          setUploadPreview(prev => [...prev, { preview, results: [], name: file.name }])
        })
        .catch((err) => {
          setError(err.message)
        })
    }
  }

  const removeFormBorder = () => {
    const { current } = formRef
    if (current === null) return
    current.classList.remove('border-gray-400')
    current.classList.add('border-transparent')
  }

  const onDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { current } = formRef
    if (current === null) return
    current.classList.remove('border-transparent')
    current.classList.add('border-gray-400')
  }

  const onDragLeave = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    removeFormBorder()
  }
  const onDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files === null) return
    const files = Array.from(e.dataTransfer.files)
    saveAndPreview(files)
    removeFormBorder()
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files === null) return
    const files = Array.from(e.target.files)
    saveAndPreview(files)
  }

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { current } = inputRef
    if (current === null) return
    current.click()
  }

  const removeFile = (index: number) => {
    setMangaPages(prev => prev.filter((manga, i) => i !== index))
    setUploadPreview(prev => prev.filter((manga, i) => i !== index))
    if (inputRef.current === null) return
    inputRef.current.value = ''
  }

  const clearFiles = () => {
    setMangaPages([])
    setUploadPreview([])
    setError(null)
    if (inputRef.current === null) return
    inputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const imagesOcrPromises = mangaPages.map(async (manga) => {
        const data = await getOcrMangaData(manga.file)
        return data
      })

      const imagesOcr = await Promise.all(imagesOcrPromises)

      const imagesOcrWithTraduction = imagesOcr.map(async ({ filename, language, result }) => {
        const traductionPromises = result.map(async ({ text, coordinates }) => {
          const { result } = await translate({ text, fromLanguage: 'ja', toLanguage: 'es' })
          return { text: result, coordinates }
        })
        const traductions = await Promise.all(traductionPromises)
        return { filename, language, result: traductions }
      })

      const results = await Promise.all(imagesOcrWithTraduction)

      const mangas = uploadPreview.map(manga => {
        const mangaOcr = results.find(result => result.filename === manga.name)
        if (mangaOcr === undefined) return manga
        return { ...manga, results: mangaOcr.result }
      })

      setMangas(mangas)
      void router.push('/result')
    } catch (error) {
      console.log('error enviando', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    mangaPages,
    uploadPreview,
    error,
    formRef,
    inputRef,
    onDragOver,
    onDragLeave,
    onDrop,
    onChange,
    onClick,
    removeFile,
    clearFiles,
    handleSubmit
  }
}
