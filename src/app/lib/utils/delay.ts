export default function (duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved')
    }, duration * 1000)
  })
}
