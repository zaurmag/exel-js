export class DomListener {
  constructor ($root, listeners = []) {
    if (!$root) {
      throw Error(`No ${$root} provided DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    console.log(this.listeners)
  }

  removeDOMListeners() {

  }
}
