import { parse } from '@core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const current = $current.id(true)
  const target = $target.id(true)
  const cols = parse(target.col, current.col)
  const rows = parse(target.row, current.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))

    return acc
  }, [])
}

export function nextSelector(key, { row, col }) {
  const MIN_VAL = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col === MIN_VAL ? MIN_VAL : col - 1
      break
    case 'ArrowUp':
      row = row === MIN_VAL ? MIN_VAL : row - 1
      break
  }

  return `[data-id="${row}:${col}"]`
}
