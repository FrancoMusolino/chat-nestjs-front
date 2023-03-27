type TextRangeSelectionArgs = {
  element: HTMLElement
  start: number
  end: number
}

export const textRangeSelection = ({
  element,
  start,
  end,
}: TextRangeSelectionArgs) => {
  const selection = window.getSelection()
  const range = document.createRange()

  range.setStart(element.childNodes[0], start)
  range.setEnd(element.childNodes[0], end)

  selection!.removeAllRanges()
  selection!.addRange(range)
}
