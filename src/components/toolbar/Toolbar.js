import { createToolbar } from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'
import { ExelStateComponent } from '@core/ExelStateComponent'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML () {
    return this.template
  }

  storeChanged({currentStyles}) {
    this.setState(currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:setStyle', value)
    }
  }
}
