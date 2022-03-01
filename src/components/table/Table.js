import { ExelComponent } from '@core/ExelComponent'
import { createTable } from './table.template'
import { resize } from '@/components/table/table.resize'
import { isCell, matrix, nextSelector, shouldResize } from './table.functions'
import { TableSelection } from '@/components/table/TableSelection'
import { $ } from '@core/dom'

export class Table extends ExelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown']
    })
  }

  prepare() {
    this.selected = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selected.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resize(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.ctrlKey) {
        const $cells = []
        $cells.push($target)
        this.selected.selectGroup($cells)
      } else if (event.shiftKey) {
        const $cells = matrix($target, this.selected.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))

        this.selected.selectGroup($cells)
      } else {
        this.selected.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown'
    ]

    const { key } = event
    const id = this.selected.current.id(true)

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const $target = this.$root.find(nextSelector(key, id))
      this.selected.select($target)
    }
  }

  toHTML () {
    return createTable(20)
  }
}
