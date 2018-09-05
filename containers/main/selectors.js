
export const getDashboardById = ({main}, id) => main.loadedDashboards[id]

export const isAuthenticated = ({main}) => main.authenticated

export const getJwt = ({main}) => main.authData.token
