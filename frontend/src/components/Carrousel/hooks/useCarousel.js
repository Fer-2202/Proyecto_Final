// useCarousel.js
import { useKeenSlider } from "keen-slider/react"
import { useCallback, useEffect, useRef, useState } from "react"

const SLIDE_DURATION = 5000

export function useCarousel(images) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(Array(images.length).fill(0))
  const [isPaused, setIsPaused] = useState(false)
  const [sliderLoaded, setSliderLoaded] = useState(false)
  const rafRef = useRef()
  const startTimeRef = useRef(null)

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created(slider) {
      setCurrentSlide(slider.track.details.rel)
      setSliderLoaded(true)
    },
  })

  const animate = useCallback(
    (time) => {
      if (isPaused) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }
      if (!startTimeRef.current) startTimeRef.current = time
      const elapsed = time - startTimeRef.current
      const percentage = Math.min(elapsed / SLIDE_DURATION, 1)

      setProgress((prev) => {
        const updated = [...prev]
        for (let i = 0; i < images.length; i++) {
          updated[i] = i < currentSlide ? 1 : i === currentSlide ? percentage : 0
        }
        return updated
      })

      if (percentage < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        const nextSlide = (currentSlide + 1) % images.length
        instanceRef.current?.moveToIdx(nextSlide)
        startTimeRef.current = null
      }
    },
    [currentSlide, isPaused, images.length]
  )

  useEffect(() => {
    if (!sliderLoaded) return
    cancelAnimationFrame(rafRef.current)
    startTimeRef.current = null
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate, sliderLoaded, currentSlide])

  const handlePause = () => setIsPaused(true)
  const handleResume = () => setIsPaused(false)

  return {
    sliderRef,
    instanceRef,
    currentSlide,
    progress,
    handlePause,
    handleResume,
  }
}