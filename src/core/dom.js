class Dom {
  constructor (selector) {
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector
  }

  html (html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html

      return this
    }

    return this.$el.outerHTML().trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text

      return this
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }

    return this.$el.textContent.trim()
  }

  clear () {
    this.html('')

    return this
  }

  append (node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  coords() {
    return this.$el.getBoundingClientRect()
  }

  id(parse) {
    if (parse) {
      const id = this.id().split(':')

      return {
        col: +id[1],
        row: +id[0]
      }
    }

    return this.data.id
  }

  focus() {
    this.$el.focus()

    return this
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(style = {}) {
    Object
        .keys(style)
        .forEach(key => this.$el.style[key] = style[key])
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const $el = document.createElement(tagName)
  if (classes) {
    $el.classList.add(classes)
  }

  return $($el)
}
