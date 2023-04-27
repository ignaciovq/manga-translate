
export async function createPreview (file: File) {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (reader.result === null || reader.result === undefined) return reject(new Error('Couldn\'t read the file'))
      const { result } = reader
      resolve(result as string)
    }
    reader.readAsDataURL(file)
  })
}
