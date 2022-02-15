import {ExelComponent} from '@core/ExelComponent'

export class Formula extends ExelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'formula',
      listeners: ['input']
    })
  }

  toHTML () {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log('Input listener: ', event)
  }
}
