import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state = {}, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCELL(row, state) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })

    return `<div 
        class="cell"
        contentEditable 
        data-col="${col}"
        data-type="cell"
        data-value="${data || ''}"
        data-id="${id}"
        style="${styles}; width: ${width}"
        >${parse(data) || ''}</div>`
  }
}

function toCOL({col, index, width}) {
  return `
    <div 
      class="column" 
      data-type="resizeable" 
      data-col="${index}" 
      style="width: ${width}"
    >
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toROW(cols, index, state) {
  const height = getHeight(state, index - 1)
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const row = index ? `data-row="${index - 1}"` : ''

  return `
    <div class="row" data-type="resizeable" ${row} style="height: ${height}">
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

function widthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(countRows = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toCODE) // Тоже самое, что и (col, index) => toCODE(index)
      .map(widthFrom(state))
      .map(toCOL) // Тоже самое, что и code => col(code)
      .join('')

  rows.push(toROW(cols, null, {}))

  for (let i = 0; i < countRows; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCELL(i, state))
        .join('')
    rows.push(toROW(cells, i + 1, state.rowState))
  }

  return rows.join('')
}
