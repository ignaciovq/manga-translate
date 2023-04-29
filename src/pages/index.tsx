import { ImagePreviewInput } from '@/components/imagePreviewInput'
import Head from 'next/head'
import Link from 'next/link'

export default function Manga () {
  return (
    <>
      <Head>
        <title>Home | Manga Translate</title>
      </Head>
      <main className='h-full min-h-screen w-screen overflow-x-hidden flex flex-col gap-y-4 items-center p-4'>
        <header>
          <h1 className='text-3xl'>Translate your Manga</h1>
        </header>
        <ImagePreviewInput />

        <Link href='/result' className='flex items-center gap-2 text-center font-bold mt-4 hover:border-white/100 b border-b border-white/0 transition-colors'>Got any preview results? Go check them out!
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
          </svg>

        </Link>
      </main>
    </>
  )
}
