/* eslint-disable sort-keys */
const range = (len) => {
  const arr: Array<number> = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (index: number) => {
  const statusChance = Math.random()
  return {
    component: `component ${index}`,
    story: `story ${index}`,
    status: statusChance > 0.66 ? 'success' : 'fail',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((_, index) => {
      return {
        ...newPerson(index),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
