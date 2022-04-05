import * as types from '@/redux/types'

export function tableResize(data) {
  return {
    type: types.TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: types.CHANGE_TEXT,
    data
  }
}

export function changeStyles(data) {
  return {
    type: types.CHANGE_STYLES,
    data
  }
}

export function setStyles(data) {
  return {
    type: types.SET_STYLES,
    data
  }
}

export function changeTitle(data) {
  return {
    type: types.CHANGE_TITLE,
    data
  }
}
