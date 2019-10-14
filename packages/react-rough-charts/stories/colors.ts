const shuffle = (xs = []) => {
  let { length } = xs
  while (length > 0) {
    const randomIndex = Math.floor(Math.random() * length)
    length -= 1
    const temp = xs[randomIndex]
    xs[randomIndex] = xs[length] // eslint-disable-line
    xs[length] = temp // eslint-disable-line
  }
  return xs
}

export const colors = shuffle([
  '#fe4a49', '#2ab7ca ', '#fed766',
  '#fe9c8f', '#feb2a8 ', '#fec8c1',
  '#fad9c1', '#f9caa7', '#ee4035',
  '#f37736', '#fdf498 ', '#7bc043',
  '#0392cf', '#f6abb6', '#03396c',
])
