import {ExelComponent} from '@core/ExelComponent'
import {$} from '@core/dom'

export class Formula extends ExelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  init() {
    super.init()

    this.formula = this.$root.find('#formula')
    this.$on('table:select', $cell => {
      this.formula.text($cell.text())
    })

    this.$on('table:input', $cell => {
      this.formula.text($cell.text())
    })
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']

    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }

  toHTML () {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }
}
