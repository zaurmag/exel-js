import {Page} from '@core/Page'
import {$} from '@core/dom'
import {createTable} from '@/pages/dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const id = Date.now().toString()

    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel Dashboard</h1>
      </div>

      <div class="db__new">
        <div class="db__view">
          <a href="/#excel/${id}" class="db__create">
            Новая <br /> Таблица
          </a>
        </div>
      </div>
      
      ${createTable()}
    `)
  }
}
