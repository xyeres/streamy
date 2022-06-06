import React, { useEffect, useRef, useState } from 'react'

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const dropDownRef = useRef(null)

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsComponentVisible(false)
    }
  }

  const handleHideDropdown = (e) => {
    if (e.key === "Escape") {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    document.addEventListener('keydown', handleHideDropdown, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    document.removeEventListener('keydown', handleHideDropdown, true)
    }
  }, [])


  return { dropDownRef, isComponentVisible, setIsComponentVisible }

}

export default useComponentVisible