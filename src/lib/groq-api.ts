// import Groq from 'groq-sdk'

// const groq = new Groq({
//   apiKey: import.meta.env.VITE_GROQ_API_KEY,
//   dangerouslyAllowBrowser: true, // Remove this later
// })

// export async function getGroqChatCompletion(
//   query: string,
//   monochrome: boolean,
// ) {
//   const prompt = monochrome
//     ? `Generate a monochromatic color palette with 5 shades based on "${query}", optimized for UI design.
//     The palette must include both light and dark shades for contrast, with at least one dark shade and one light shade.
//     Ensure the colors are harmonious and usable in a UI context.
//     The response MUST BE ONLY a JSON array in the following format: [{ "name": "Color Name", "code": "#HexCode" }, ...]' }`
//     : `Generate a color palette with 5 colors based on "${query}", optimized for UI design.
//     The palette must include both light and dark shades for contrast, with at least one vibrant color, one dark shade and one light shade.
//     Ensure the colors are harmonious and usable in a UI context.
//     The response MUST BE ONLY a JSON array in the following format: [{ "name": "Color Name", "code": "#HexCode" }, ...]`

//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: 'user',
//         content: prompt,
//       },
//     ],
//     model: 'llama-3.3-70b-versatile',
//   })
// }

// Fake api
export async function getGroqChatCompletion(
  query: string,
  monochrome: boolean,
) {
  if (!query) return

  const fullPalette = monochrome
    ? [
        { name: 'Curry Light', code: '#E6D8B9' },
        { name: 'Curry Soft', code: '#C9B08A' },
        { name: 'Curry Medium', code: '#A58C5B' },
        { name: 'Curry Dark', code: '#6E4E2D' },
        { name: 'Curry Deep', code: '#3F2C14' },
      ]
    : [
        { name: 'Electric Blue', code: '#dbd834' },
        { name: 'Deep Plum', code: '#e7ff97' },
        { name: 'Bright Coral', code: '#e84855' },
        { name: 'Light Cream', code: '#ff5700' },
        { name: 'Vibrant Orange', code: '#2b3a67' },
      ]

  await delayExecution(1)

  return fullPalette
}

const delayExecution = (seconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, seconds * 1000) // Convert seconds to milliseconds
  })
}

