import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Monochromatic } from './monochromatic'
import { SearchBar } from './search-bar'
import { CustomInput } from './custom-input'
import { Response } from './response'
import { History } from './history'

import { useDisableInput } from '~/hooks/use-disable-input'
import { useStore } from '~/hooks/use-store'
import { getGroqChatCompletion } from '~/lib/groq-api'
import {
  delayExecution,
  isColorPropsArray,
  randomHexColor,
  updateStorage,
} from '~/utils/color'
import { settings } from '~/config/settings'

import s from './search.module.scss'

export const Search = () => {
  const { disabled } = useDisableInput()

  const showControls = useStore((state) => state.showControls)
  const setResponse = useStore((state) => state.setResponse)
  const setSplashScreen = useStore((state) => state.setSplashScreen)
  const setLoading = useStore((state) => state.setLoading)

  const placeholder = 'What’s your mood today?'

  const [searchQuery, setSearchQuery] = useState('')
  const [lastSubmit, setLastSubmit] = useState('')
  const [canSubmit, setCanSubmit] = useState(false)
  const [showLoader, setShowLoader] = useState<number | null>(null)
  const [error, setError] = useState(false)
  const [isMonochromatic, setIsMonochromatic] = useState(false)

  const surpriseMe = async () => {
    const sentences = [
      'Life Thrives On Random Moments',
      'Surprises Lead To New Adventures',
      'Chaos Often Sparks New Ideas',
      'Embrace Randomness For True Joy',
      'Randomness Can Be Really Fun',
    ]

    const randomSentence =
      sentences[Math.floor(Math.random() * sentences.length)]
    const words = randomSentence.split(' ')

    const response = {
      name: searchQuery,
      date: Date.now(),
      colors: [
        { name: words[0], code: randomHexColor() },
        { name: words[1], code: randomHexColor() },
        { name: words[2], code: randomHexColor() },
        { name: words[3], code: randomHexColor() },
        { name: words[4], code: randomHexColor() },
      ],
    }
    // Waits a little to strike the animation
    await delayExecution(1000)

    setResponse(response)
    updateStorage(response)
    setSplashScreen(false)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    if (!canSubmit) return

    e.preventDefault()
    setLoading(true)
    setCanSubmit(false)
    setLastSubmit(searchQuery)
    setShowLoader(Date.now())

    const fSearchQuery = searchQuery.toLowerCase()

    // List of words to check against
    const surpriseWords = ['random', 'surprise', 'surprise me', 'surpriseme']

    // Check if fSearchQuery matches any word in the list
    if (surpriseWords.includes(fSearchQuery)) {
      surpriseMe()
      return
    }

    // Using fake API for tests
    try {
      // Get Groq completion using form values
      const chatCompletion = await getGroqChatCompletion(
        searchQuery,
        isMonochromatic,
        settings.test,
      )

      const content = chatCompletion.choices[0]?.message?.content

      // Ensure content is a string, return early if it's not
      if (typeof content !== 'string') {
        console.log('Content is already an object or not a string:', content)
        return
      }

      // Try parsing the content
      let parsedContent
      parsedContent = JSON.parse(content)

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
      updateStorage(response)
    } catch (error) {
      // Set an error and remove it before 2 seconds
      setError(true)

      surpriseMe()
    } finally {
      setSplashScreen(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    setCanSubmit(searchQuery.length > 2)
  }, [searchQuery])

  // Remove the error after some time
  useEffect(() => {
    if (!error) return
    const errorTimeout = setTimeout(() => setError(false), 2000)
    return () => {
      setError(false)
      clearTimeout(errorTimeout)
    }
  }, [error])

  // Wait a bit to remove the searchQuery
  useEffect(() => {
    if (!showLoader) return
    const clearQueryTimeout = setTimeout(() => setSearchQuery(''), 1000)
    return () => {
      setSearchQuery('')
      clearTimeout(clearQueryTimeout)
    }
  }, [showLoader])

  return (
    <div className={s.wrapper}>
      <AnimatePresence>
        {showControls && (
          <motion.div
            className={s.search}
            data-hide-cursor={true}
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
            <div className={s.stack}>
              <div className={s.response}>
                <Response
                  start={showLoader}
                  error={error}
                  searchQuery={lastSubmit}
                />
              </div>

              {settings.test && (
                <div className={s.history}>
                  <History searchQuery={searchQuery} />
                </div>
              )}

              <form className={s.form} onSubmit={handleSubmit}>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  placeholder={placeholder}
                />
                <CustomInput
                  disabled={disabled}
                  searchQuery={searchQuery}
                  placeholder={placeholder}
                  canSubmit={canSubmit}
                />
                <Monochromatic
                  isMonochromatic={isMonochromatic}
                  setIsMonochromatic={setIsMonochromatic}
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
