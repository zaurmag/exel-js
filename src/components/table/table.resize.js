import {$} from '@core/dom'

export function resize($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizeable"]')
    const coords = $parent.coords()
    const type = $resizer.data.resize
    const direction = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
      [direction]: '-5000px'
    })

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (type === 'col') {
        $parent.css({width: `${value}px`})
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => {
              el.style.width = value + 'px'
            })
        $resizer.css({
          right: 0
        })
      } else {
        $parent.css({height: `${value}px`})
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      })

      $resizer.css({
        bottom: 0
      })
    }
  })
}
