import { useRef, useState } from 'react'
import { createPreview } from '../utils/createImagePreview'

export interface MangaFile {
  name: string
  file: File
}

export function useImageInput () {
  const [mangaPages, setMangaPages] = useState<MangaFile[]>([])
  const [uploadPreview, setUploadPreview] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef(null)
  const inputRef = useRef(null)

  const saveAndPreview = (files: File[]) => {
    const newMangas = files.map((file) => ({ name: file.name, file }))
    setMangaPages(prev => [...prev, ...newMangas])

    for (const file of files) {
      createPreview(file)
        .then((preview) => {
          console.log(preview)
          setUploadPreview(prev => [...prev, preview])
        })
        .catch((err) => {
          setError(err.message)
        })
    }
  }

  const removeFormBorder = () => {
    const { current } = formRef as unknown as { current: HTMLFormElement }
    if (current === null) return
    current.classList.remove('border-gray-400')
    current.classList.add('border-transparent')
  }

  const onDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { current } = formRef as unknown as { current: HTMLFormElement }
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
    const { current } = inputRef as unknown as { current: HTMLInputElement }
    if (current === null) return
    current.click()
  }

  const clearFiles = () => {
    setMangaPages([])
    setUploadPreview([])
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')
    /* TODO: implement POST files to server */
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
    clearFiles,
    onSubmit
  }
}
