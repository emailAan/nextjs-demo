/*
  get info () {
    return `${this.title} - Dashboards; ${this.loadedDashboards}`
  }

  get currentDashboard () {
    return this.loadedDashboards[this.currentDashboardId]
  }

  getDashboardById (id) {
    return this.loadedDashboards[id]
  }

  newDashboard (id, dashboardModel, current = true) {
    this.currentDashboardId = current ? id : this.currentDashboardId
    this.loadedDashboards[id] = dashboardModel
  }
*/
export function getDashboardById ({main}, id) {
  return main.loadedDashboards[id]
}

export function isAuthenticated ({main}) {
  return main.authenticated
}
