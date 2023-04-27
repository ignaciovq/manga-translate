import ImagePreviewInput from '../../components/imagePreviewInput'

export default function Manga () {
  return (
    <section className='h-screen w-screen flex flex-col gap-y-4 items-center p-4 sm:p-0'>
      <header>
        <h1 className='text-3xl'>Translate your Manga</h1>
      </header>
      <ImagePreviewInput />
    </section>
  )
}
