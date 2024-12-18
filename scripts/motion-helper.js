export function disableScrollSnap(element) {
  element.style.scrollSnapType = 'none';
  element.style.scrollBehavior = 'auto';
}

export function enableScrollSnap(element) {
  // Reverts it back to its original value (or stylesheet value).
  element.style.scrollSnapType = '';
  element.style.scrollBehavior = '';
}

export const smoothScrollHorizontal = (element, targetX, duration) => {
  const start = element.scrollLeft;
  const timeStart = new Date().getTime();
  const scrollingClass = 'is-animating'; // Class to be added/removed

  function cubicBezier(x) {
    const p0 = { x: 0, y: 0 };
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 0, y: 1 };
    const p3 = { x: 1, y: 1 };

    // Find the t value for the given x in Bezier curve
    let t = x;
    for (let i = 0; i < 5; i += 1) {
      const xT = (1 - t) ** 3 * p0.x + 3 * (1 - t) ** 2 * t * p1.x + 3 * (1 - t) * t ** 2 * p2.x + t ** 3 * p3.x;

      const difference = xT - x;
      t -= difference / 2;
    }

    // Return the y value for the computed t
    return (1 - t) ** 3 * p0.y + 3 * (1 - t) ** 2 * t * p1.y + 3 * (1 - t) * t ** 2 * p2.y + t ** 3 * p3.y;
  }

  const ease = (time, startValue, changeInValue, easeDuration) => {
    const progress = time / easeDuration;
    const easingFactor = cubicBezier(progress);
    return startValue + easingFactor * changeInValue;
  };

  function animation() {
    const timeCurrent = new Date().getTime();
    const timeElapsed = timeCurrent - timeStart;

    const nextX = ease(timeElapsed, start, targetX - start, duration);
    element.scrollLeft = nextX;

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      element.scrollLeft = targetX;
      enableScrollSnap(element); // Re-enable scroll snap after the animation completes
      element.classList.remove(scrollingClass);
    }
  }

  disableScrollSnap(element); // Disable scroll snap before starting the animation
  element.classList.add(scrollingClass);
  requestAnimationFrame(animation);
};
