export function throttle(fn: () => unknown, timeout: number) {
  let timer: NodeJS.Timeout | undefined

  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        //@ts-ignore
        fn.apply(this, arguments)

        clearTimeout(timer)
        timer = undefined
      }, timeout)
    }
  }
}
