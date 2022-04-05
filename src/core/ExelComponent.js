import { DomListener } from '@core/DomListener'

export class ExelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsub = []
    this.store = options.store
    this.storeSub = null
    this.subscribe = options.subscribe || []
    this.prepare()
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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  toHTML() {
    return ''
  }

  // Инициализация компонента и слушателей
  init() {
    this.initDOMListeners()
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Уничтожение компонента и слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsub.forEach(unsub => unsub())
    this.storeSub.unsubscribe()
  }
}
