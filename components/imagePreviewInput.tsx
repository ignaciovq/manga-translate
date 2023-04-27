'use client'
import { useImageInput } from '../hooks/useImageInput'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'
import '@splidejs/react-splide/css'

const ImagePreviewInput = () => {
  const {
    formRef,
    inputRef, mangaPages,
    uploadPreview,
    error,
    onDragOver,
    onDragLeave,
    onDrop,
    onChange,
    onClick,
    clearFiles
  } = useImageInput()

  return (
    <form onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave} ref={formRef} className=' flex flex-col grow justify-center items-center border-4 border-dashed rounded-xl border-transparent '>

      <div className='w-4/5 sm:w-[35rem] bg-gray-100 rounded-xl flex flex-col grow justify-center items-center gap-4 p-8'>
        {uploadPreview.length > 0
          ? (
            <Splide>
              {uploadPreview.map((preview, index) => {
                return (
                  <SplideSlide className='h-full' key={preview}>
                    <Image className='h-full object-contain' src={preview} alt={mangaPages[index].name} width={500} height={1000} />
                  </SplideSlide>
                )
              })}
            </Splide>
            )
          : <Image className='h-48 rounded-xl object-contain' src='/images/upload.svg' alt='Upload' width={500} height={1000} />}
      </div>

      <div className='flex flex-col gap-4 m-4 text-xl'>

        <label><button className='text-blue-400 hover:text-blue-200' onClick={onClick}>Select</button> or drop your files to upload them</label>
        <input className='hidden' ref={inputRef} type='file' placeholder='Manga' accept='image/*' multiple onChange={onChange} />

        <div className='flex justify-between items-center gap-2'>
          <button className='text-blue-400 border-2 rounded-xl border-blue-400 hover:text-blue-200 hover:border-blue-200 self-start py-2 p-4' onClick={clearFiles}>Clear</button>
          <button className='bg-blue-400 hover:bg-blue-200 text-white text-2xl rounded-xl px-8 py-2 self-end ' type='submit'>Translate</button>
        </div>

        {error !== null && <p className='text-red-500 self-center'>{error}</p>}

      </div>

    </form>
  )
}

export default ImagePreviewInput
