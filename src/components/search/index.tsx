import { clsx } from 'clsx'
import { useState } from 'react'
import { Monochromatic } from './monochromatic'
import { SearchBar } from './search-bar'
import { Submit } from './submit'
import { useStore } from '~/hooks/use-store'
import { getGroqChatCompletion } from '~/lib/groq-api'

import s from './search.module.scss'

export const Search = () => {
  const showControls = useStore((state) => state.showControls)
  const setResponse = useStore((state) => state.setResponse)
  const setLoading = useStore((state) => state.setLoading)

  const [searchQuery, setSearchQuery] = useState('')
  const [isMonochromatic, setIsMonochromatic] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get Groq completion using form values
      const chatCompletion = await getGroqChatCompletion(
        searchQuery,
        isMonochromatic,
      )
      setResponse(chatCompletion.choices[0]?.message?.content || 'No response')
      setSearchQuery('')
    } catch (error) {
      console.error('Error fetching chat completion:', error)
      //setResponse('An error occurred while fetching the response.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={clsx(s.search, { [s.hidden]: !showControls })}>
      <form className={s.form} onSubmit={handleSubmit}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Monochromatic
          isMonochromatic={isMonochromatic}
          setIsMonochromatic={setIsMonochromatic}
        />
        <Submit />
      </form>
    </div>
  )
}
