import { ExelComponent } from '@core/ExelComponent'
import { createTable } from './table.template'
import { resize } from '@/components/table/table.resize'
import { isCell, matrix, nextSelector, shouldResize } from './table.functions'
import { TableSelection } from '@/components/table/TableSelection'
import * as actions from '@/redux/actions'
import { $ } from '@core/dom'
import { defaultStyles } from '@/constants'
import {changeStyles, setStyles} from '@/redux/actions'
import {parse} from '@core/parse'

export class Table extends ExelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  prepare() {
    this.selected = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', value => {
      this.selected.current
          .attr('data-value', value)
          .text(parse(value))

      this.updateTextInStore(value)
    })

    this.done('formula:done')
    this.done('header:done')

    this.$on('toolbar:setStyle', value => {
      this.selected.setStyle(value)
      this.$dispatch(setStyles({
        value,
        ids: this.selected.selectedIds
      }))
    })
  }

  done(eventName) {
    this.$on(eventName, () => {
      this.selected.current.focus()
    })
  }

  selectCell($cell) {
    this.selected.select($cell)
    this.$emit('table:select', $cell)

    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(changeStyles(styles))
  }

  async tableResize(event) {
    try {
      const data = await resize(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.error('Error resize', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.tableResize(event)
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
        this.selectCell($target)
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
      this.selectCell(this.$root.find(nextSelector(key, id)))
    }
  }

  toHTML () {
    return createTable(20, this.store.getState())
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selected.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
