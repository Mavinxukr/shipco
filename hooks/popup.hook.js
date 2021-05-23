import { useState, useCallback } from 'react'

export const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setCont] = useState(null)

  const setContent = useCallback(
    (Component, props = {}) => {
      setCont(<Component {...props}></Component>)
    },
    [],
  ) 

  return { isOpen, setIsOpen, content, setContent }
}