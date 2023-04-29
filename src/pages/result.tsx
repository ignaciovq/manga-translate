import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useMangaStore } from '@/store/manga.store'
import { Manga } from '@/components/Manga'
import type { Manga as MangaType } from '@/types'

export default function ResultPage () {
  const [storeMangas] = useMangaStore(state => [state.mangas])
  const [mangas, setMangas] = useState<MangaType[]>([])

  useEffect(() => {
    setMangas(storeMangas)
  }, [storeMangas])

  if (mangas.length === 0) {
    return (
      <>
        <Head>
          <title>Result | Manga Translate</title>
        </Head>
        <main className='flex flex-col justify-center items-center gap-4 mt-8'>
          <h1 className='text-4xl font-bold'>No mangas to show</h1>
          <p className='text-xl'>Please, upload a manga to translate</p>
          <Link href='/' className='flex items-center gap-2 text-center font-bold mt-4 hover:border-white/100 b border-b border-white/0 transition-colors'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
            </svg>

            Go Home
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Result | Manga Translate</title>

      </Head>
      <main className='my-8'>
        <h1 className='text-4xl font-bold text-center'>Adjust and download manga as you like!</h1>
        {mangas.map(({ preview, results }, index) => {
          return (
            <Manga key={preview} index={index} preview={preview} results={results} />
          )
        })}

        <Link href='/' className='flex items-center gap-2 text-center font-bold mt-8 mx-auto w-fit hover:border-white/100 b border-b border-white/0 transition-colors'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
          </svg>
          Go home
        </Link>

      </main>
    </>
  )
}
