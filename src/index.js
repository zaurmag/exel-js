import './scss/index.scss'
import {Router} from '@core/routes/Router'
import {DashboardPage} from '@/pages/DashboardPage'
import {ExelPage} from '@/pages/ExelPage'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExelPage
})
