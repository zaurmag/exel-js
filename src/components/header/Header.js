import { ExelComponent } from '@core/ExelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'keydown', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML () {
    const title = this.store.getState().title || defaultTitle

    return `
      <input type="text" class="input" value="${title}" />
      <div>
        <button class="button" type="button" data-button="delete">
          <i class="material-icons" data-button="delete">delete</i>
        </button>
      
        <button class="button" type="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </button>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const $target = event.target

    if ($target.dataset.button === 'delete') {
      const conf = confirm('Вы действительно хотите удалить данную таблицу?')

      if (conf) {
        localStorage.removeItem(`excel-state:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    } else if ($target.dataset.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.$emit('header:done')
    }
  }
}
