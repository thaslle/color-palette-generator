import Groq from 'groq-sdk'
import { randomHexColor } from '~/utils/color'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Remove this later
})

export async function getGroqChatCompletion(
  query: string,
  monochrome: boolean,
  test: boolean,
) {
  // Fake api
  if (test) {
    const palette = monochrome
      ? [
          { name: 'Curry Light', code: '#E6D8B9' },
          { name: 'Curry Soft', code: '#C9B08A' },
          { name: 'Curry Medium', code: '#A58C5B' },
          { name: 'Curry Dark', code: '#6E4E2D' },
          { name: 'Curry Deep', code: '#3F2C14' },
        ]
      : [
          { name: 'Electric Blue', code: randomHexColor() },
          { name: 'Deep Plum', code: randomHexColor() },
          { name: 'Bright Coral', code: randomHexColor() },
          { name: 'Light Cream', code: randomHexColor() },
          { name: 'Vibrant Orange', code: randomHexColor() },
        ]

    await delayExecution(1)

    return {
      choices: [
        {
          message: {
            content: JSON.stringify(palette),
          },
        },
      ],
    }
  }

  const prompt = monochrome
    ? `Generate a monochromatic color palette with 5 shades based on "${query}", optimized for UI design.
    The palette must include both light and dark shades for contrast, with at least one dark shade and one light shade.
    Ensure the colors are harmonious and usable in a UI context.
    The response MUST BE ONLY a JSON array in the following format: [{ "name": "Color Name", "code": "#HexCode" }, ...]' }`
    : `Generate a color palette with 5 colors based on "${query}", optimized for UI design.
    The palette must include both light and dark shades for contrast, with at least one vibrant color, one dark shade and one light shade.
    Ensure the colors are harmonious and usable in a UI context.
    The response MUST BE ONLY a JSON array in the following format: [{ "name": "Color Name", "code": "#HexCode" }, ...]`

  console.log(groq.chat)
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'llama-3.3-70b-versatile',
  })
}

const delayExecution = (seconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, seconds * 500) // Convert seconds to milliseconds
  })
}

