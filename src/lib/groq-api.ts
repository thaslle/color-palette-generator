import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY })

export async function getGroqChatCompletion(
  query: string,
  monochrome: boolean,
) {
  const prompt = monochrome
    ? `Generate a monochromatic color palette with 5 shades based on "${query}", optimized for UI design. 
    The palette must include both light and dark shades for contrast, with at least one dark shade and one light shade. 
    Ensure the colors are harmonious and usable in a UI context. 
    Return ONLY a JSON array in the following format: [{ "name": "Color Name", "code": "#HexCode" }, ...]' }`
    : `Generate a color palette with 5 colors based on "${query}", optimized for UI design. 
    The palette must include both light and dark shades for contrast, with at least one vibrant color, one dark shade and one light shade. 
    Ensure the colors are harmonious and usable in a UI context. 
    Return ONLY a JSON array in the following format: [{ "name": "Color Name", "code": "#HexCode" }, ...]`

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
