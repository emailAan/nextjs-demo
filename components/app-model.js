import {computed, action, observable} from 'mobx'

export class AppModel {
  @observable loadedDashboards = {}
  @observable currentDashboardId
  @observable title = 'Avinty'
  @observable subTitle = 'ZORGVERNIEUWERS NET ALS JIJ'

  @computed get info () {
    return `${this.title} - Dashboards; ${this.loadedDashboards}`
  }

  @computed get currentDashboard () {
    return this.loadedDashboards[this.currentDashboardId]
  }

  getDashboardById (id) {
    return this.loadedDashboards[id]
  }

  @action newDashboard (id, dashboardModel, current = true) {
    this.currentDashboardId = current ? id : this.currentDashboardId
    this.loadedDashboards[id] = dashboardModel
  }
}

const appState = new AppModel()

export default appState
