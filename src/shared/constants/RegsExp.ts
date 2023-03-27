export const PASSWORD_REGEXP: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/

export const LINES_BREAK_MORE_THAN_3_CONSECUTIVES: RegExp = /(\n{3,})/g
