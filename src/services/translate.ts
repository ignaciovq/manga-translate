interface TranslateParams {
  text: string
  fromLanguage: string
  toLanguage: string
}

interface TranslateResponse {
  result: string
}

export async function translate ({ text, fromLanguage, toLanguage }: TranslateParams) {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text, fromLanguage, toLanguage })
  })
  const data = await response.json() as TranslateResponse

  return data
}
