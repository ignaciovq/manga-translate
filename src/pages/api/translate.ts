import type { NextApiRequest, NextApiResponse } from 'next'
import { translate } from '@/services/translate'

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
    const translatedText = await translate({ text, fromLanguage, toLanguage })
    return res.status(200).json({ result: translatedText })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
