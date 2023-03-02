export const generateArrayWithRandomKeys = (length: number): number[] =>
  Array.from({ length }, (_, i) => Math.floor((i + 1) * Math.random() * 100000))
