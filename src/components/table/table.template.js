const CODES = {
  A: 65,
  Z: 90
}

function toCELL(row) {
  return function(_, col) {
    return `<div 
        class="cell" 
        contentEditable 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        ></div>`
  }
}

function toCOL(code, index) {
  return `
    <div class="column" data-type="resizeable" data-index="${index}">
        ${code}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toROW(cols, index) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizeable">
        <div class="row-info">
            ${index || ''}
            ${resize}
        </div>
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

  rows.push(toROW(cols))

  for (let i = 0; i < countRows; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCELL(i))
        .join('')
    rows.push(toROW(cells, i + 1))
  }

  return rows.join('')
}
