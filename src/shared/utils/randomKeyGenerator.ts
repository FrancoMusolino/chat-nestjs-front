export const randomKeyGenerator = (): string =>
  (Math.random() + 1).toString(36).substring(2)
