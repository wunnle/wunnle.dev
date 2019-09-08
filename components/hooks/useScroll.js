/**
 * useScroll React custom hook
 * Usage:
 *    const { scrollX, scrollY, scrollDirection } = useScroll();
 */

import { useState, useEffect } from "react";

function useScroll() {

  const [scrollY, setScrollY] = useState(0)

  function listener(e) {

    requestAnimationFrame(() => {
      const newScrollY = window.scrollY || window.pageYOffset
      setScrollY(Math.floor(newScrollY))
    })

  }

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });


  return {
    scrollY
  };
}

function debounce(func, wait = 0, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}


export default useScroll