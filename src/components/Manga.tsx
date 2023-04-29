import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'
import { BoxOverlay } from './BoxOverlay'
import { Result } from '@/types'

interface MangaProps {
  preview: string
  results: Result[]
  index: number
}

export function Manga ({ preview, results, index }: MangaProps) {
  const [fontSize, setFontSize] = useState(12)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleDownload = async (name: string) => {
    if (imageRef.current === null) return
    const canvas = await html2canvas(imageRef.current)

    canvas.toBlob(blob => {
      if (blob === null) return
      saveAs(blob, `${name}.jpg`)
    })
  }

  const handleFontSize = (n: number) => {
    const number = fontSize + n

    if (number < 1) return

    setFontSize(number)
  }

  return (
    <>
      <div className='flex justify-center gap-4 w-fit mx-auto items-center mt-14 mb-8 bg-gray-200 rounded-md px-4 py-3'>
        <p className='text-gray-800 font-bold w-44'>Change font size: {fontSize}px</p>
        <button className='bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-md w-10 aspect-square flex justify-center items-center' onClick={() => handleFontSize(-1)}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-[18px] h-[18px]'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
          </svg>

        </button>
        <button className='bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-md w-10 aspect-square flex justify-center items-center' onClick={() => handleFontSize(1)}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-[18px] h-[18px]'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>

        </button>
      </div>
      <div className='relative w-fit mx-auto' key={preview} ref={imageRef}>
        <picture className='block'>
          <img src={preview} alt='Imagen manga' className='max-w-full h-auto block mx-auto' />
        </picture>

        {results.map(({ text, coordinates }, index) => {
          return (
            <BoxOverlay key={index} coordinates={coordinates} text={text} fontSize={fontSize} />
          )
        })}
      </div>
      <button onClick={async () => handleDownload(`manga-${index + 1}`)} className='bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded px-8 py-2 self-end transition-colors w-fit block mx-auto mt-4'>Download</button>
    </>
  )
};
