import { useEffect } from 'react'

export const useBodyOverlay = (isOverlay: boolean) => {
  useEffect(() => {
    if (isOverlay) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOverlay])
}
