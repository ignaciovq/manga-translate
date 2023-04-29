interface BoxOverlayProps {
  coordinates: number[]
  text: string
  fontSize?: number
}

export function BoxOverlay ({ coordinates, text, fontSize = 12 }: BoxOverlayProps) {
  const top = coordinates[1]
  const left = coordinates[0]
  const width = coordinates[2] - left
  const height = coordinates[3] - top
  const style = {
    top: `${top - 5}px`,
    left: `${left - 10}px`,
    width: `${width + 25}px`,
    height: `${height + 5}px`,
    fontSize: `${fontSize}px`
  }
  return (
    <div className='absolute bg-white flex justify-center items-center font-bold text-black rounded-3xl z-10 leading-[1em]' style={style}>
      {text}
    </div>
  )
};
