import type { NextApiRequest, NextApiResponse } from 'next'

interface RequestBody {
  text: string
  fromLanguage: string
  toLanguage: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { text, fromLanguage, toLanguage } = req.body as RequestBody

  if ([text.trim(), fromLanguage.trim(), toLanguage.trim()].includes('')) return res.status(400).end()

  try {
    const url = new URL('https://api.pawan.krd/mtranslate')
    url.searchParams.append('from', fromLanguage)
    url.searchParams.append('to', toLanguage)
    url.searchParams.append('text', text)
    const response = await fetch(url)
    const { translated } = await response.json()
    return res.status(200).json({ result: translated })
  } catch (error) {
    console.error('Error en el SERVER', error)
    return res.status(500).end()
  }
}
