import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Monochromatic } from './monochromatic'
import { SearchBar } from './search-bar'
import { Submit } from './submit'

import { useStore } from '~/hooks/use-store'
import { getGroqChatCompletion } from '~/lib/groq-api'
import { isColorPropsArray } from '~/utils/color'
import { settings } from '~/config/settings'

import s from './search.module.scss'

export const Search = () => {
  const showControls = useStore((state) => state.showControls)
  const setResponse = useStore((state) => state.setResponse)
  const setSplashScreen = useStore((state) => state.setSplashScreen)
  const setLoading = useStore((state) => state.setLoading)
  const setCaret = useStore((state) => state.setCaret)

  const [searchQuery, setSearchQuery] = useState('')
  const [isMonochromatic, setIsMonochromatic] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Using fake API for tests
    try {
      // Get Groq completion using form values
      const chatCompletion = await getGroqChatCompletion(
        searchQuery,
        isMonochromatic,
        settings.test, // Test true
      )

      const content = chatCompletion.choices[0]?.message?.content

      // Ensure content is a string, return early if it's not
      if (typeof content !== 'string') {
        console.log('Content is already an object or not a string:', content)
        return
      }

      // Try parsing the content
      let parsedContent
      try {
        parsedContent = JSON.parse(content)
      } catch (error) {
        console.error('Error parsing JSON:', error)
        return
      }

      // Check if the parsed content is a valid array
      if (!isColorPropsArray(parsedContent)) {
        console.error('Wrong array type')
        return
      }

      // Create the response object and update the state
      const response = {
        name: searchQuery,
        date: Date.now(),
        colors: parsedContent,
      }

      setResponse(response)
      setSplashScreen(false)
      setSearchQuery('')
      setCaret({ show: false, x: 0 })
    } catch (error) {
      console.error('Error fetching chat completion:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={s.wrapper}>
      <AnimatePresence>
        {showControls && (
          <motion.div
            className={s.search}
            initial="hidden"
            animate="show"
            exit="hide"
            variants={{
              hidden: {
                opacity: 0,
                y: '5%',
                scale: 0.98,
                filter: 'blur(0.25rem)',
              },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0)',
              },
              hide: {
                opacity: 0,
                y: '5%',
                scale: 0.98,
                filter: 'blur(0.25rem)',
              },
            }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
          >
            <form className={s.form} onSubmit={handleSubmit}>
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <Monochromatic
                isMonochromatic={isMonochromatic}
                setIsMonochromatic={setIsMonochromatic}
              />
              <Submit />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

