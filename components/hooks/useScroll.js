import { useRef, useEffect } from "react";

function useScroll() {

  let scrollY = 0
  let ticking = false

  function onScroll() {
    scrollY = window.scrollY || window.pageYOffset
    requestTick()
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true
  }

  function update() {
    ticking = false
    var currentScrollY = scrollY

    requestAnimationFrame(update)
    document.documentElement.style.setProperty('--scrollY', `${currentScrollY}px`);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll, false);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });


  return {
    scrollY
  };
}

export default useScroll