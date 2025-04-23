// Animation utility functions

/**
 * Intersection Observer utility for triggering animations when elements enter viewport
 */
export function setupIntersectionObserver(
  selector: string,
  animationClass: string,
  threshold = 0.1,
  rootMargin = "0px",
): void {
  if (typeof window === "undefined" || !window.IntersectionObserver) {
    return
  }

  const elements = document.querySelectorAll(selector)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass)
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold,
      rootMargin,
    },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

/**
 * Typed text animation
 */
export function typeText(element: HTMLElement, text: string, speed = 50): Promise<void> {
  return new Promise((resolve) => {
    let i = 0
    element.textContent = ""

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
        setTimeout(type, speed)
      } else {
        resolve()
      }
    }

    type()
  })
}

/**
 * Scroll to element with smooth animation
 */
export function scrollToElement(elementId: string, offset = 0, duration = 500): void {
  const element = document.getElementById(elementId)

  if (!element) {
    return
  }

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime: number | null = null

  function animation(currentTime: number) {
    if (startTime === null) {
      startTime = currentTime
    }

    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const easeInOutQuad = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

    window.scrollTo(0, startPosition + distance * easeInOutQuad)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}
