import {computed, action, observable} from 'mobx'

export class MainModel {
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

const mainState = new MainModel()

export default mainState
