const CODES = {
  A: 65,
  Z: 90
}

function toCELL() {
  return `
        <div class="cell" contenteditable></div>
    `
}

function toCOL(code) {
  return `
    <div class="column">${code}</div>
  `
}

function toROW(cols, index) {
  return `
    <div class="row">
        <div class="row-info">${index || ''}</div>
        <div class="row-data">${cols}</div>
    </div>
  `
}

function toCODE(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(countRows = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toCODE) // Тоже самое, что и (col, index) => toCODE(index)
      .map(toCOL) // Тоже самое, что и code => col(code)
      .join('')

  const cells = new Array(colsCount)
      .fill('')
      .map(toCELL)
      .join('')

  rows.push(toROW(cols))

  for (let i = 0; i < countRows; i++) {
    rows.push(toROW(cells, i + 1))
  }

  return rows.join('')
}
