import { ExelComponent } from '@core/ExelComponent'
import { createTable } from './table.template'
import { resize } from '@/components/table/table.resize'
import { shouldResize } from '@/components/table/table.functions'

export class Table extends ExelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'mouseup']
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resize(this.$root, event)
    }
  }

  onMousemove(event) {
    // console.log(event)
  }

  onMouseup(event) {
    // console.log(event.target.dataset.resize)
  }

  toHTML () {
    return createTable(20)
  }
}
