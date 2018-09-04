import React from 'react'

const ApiContext = React.createContext({})

export const withApiContext = (Page) => {
  return class extends React.Component {
    static getInitialProps (ctx) {
      if (Page.getInitialProps) { return Page.getInitialProps(ctx) }
    }
    render () {
      return <ApiContext.Consumer>
        {apiCtx => <Page {...this.props} apiCtx={apiCtx} />}
      </ApiContext.Consumer>
    }
  }
}

// export function withApiContext (Component) {
//   return function ThemedComponent (props) {
//     return (
//       <ApiContext.Consumer>
//         {apiCtx => <Component {...props} apiCtx={apiCtx} />}
//       </ApiContext.Consumer>
//     )
//   }
// }
export const ApiProvider = ApiContext.Provider

export default ApiContext
