import { PlaneAnimation } from './PlaneAnimation'

export function Loader () {
  return (
    <div className='absolute inset-0 bg-black/80 text-white text-lg flex justify-center items-center'>
      <PlaneAnimation />
    </div>
  )
};
