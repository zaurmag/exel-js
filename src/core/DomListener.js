import {capitalize} from '@core/utils'

export class DomListener {
  constructor ($root, listeners = []) {
    if (!$root) {
      throw Error(`No ${$root} provided DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      const name = this.name || ''
      if (!this[method]) {
        throw new Error(`Method ${method} not implemented in ${name} Component`)
      }
      this.$root.on(listener, this[method].bind(this))
    })
  }

  removeDOMListeners() {

  }
}

function getMethodName(eventType) {
  return 'on' + capitalize(eventType)
}
