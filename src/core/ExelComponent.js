import { DomListener } from '@core/DomListener'

export class ExelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.prepare()
    this.emitter = options.emitter
    this.unsub = []
  }

  // Вставляем контент до инициализации
  prepare() {}

  // Эмитим события
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписываемся на события
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsub.push(unsub)
  }

  toHTML() {
    return ''
  }

  // Инициализация компонента и слушателей
  init() {
    this.initDOMListeners()
  }

  // Уничтожение компонента и слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsub.forEach(unsub => unsub())
  }
}
