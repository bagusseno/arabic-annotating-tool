import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import Switch from 'react-router-transition-switch'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import Layout from 'layouts'
import Loader from 'components/layout/Loader'
import NotFoundPage from 'pages/system/404'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

const routes = [
  // Annotation Tool
  {
    path: '/projects/create',
    Component: loadable(() => import('pages/projects/create')),
    exact: true,
  },
  {
    path: '/projects/create/method',
    Component: loadable(() => import('pages/projects/create/method')),
    exact: true,
  },
  {
    path: '/projects/recent',
    Component: loadable(() => import('pages/projects/recent')),
    exact: true,
  },
  {
    path: 'projects/edit',
    Component: loadable(() => import('pages/projects/edit')),
    exact: true,
  },

  // Cards
  {
    path: '/cards/basic-cards',
    Component: loadable(() => import('pages/cards/basic-cards')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({ settings })

@connect(mapStateToProps)
class Router extends React.Component {
  render() {
    const {
      history,
      settings: { routerAnimation },
    } = this.props
    return (
      <ConnectedRouter history={history}>
        <Layout>
          <Switch
            render={props => {
              const {
                children,
                location: { pathname },
              } = props
              return (
                <SwitchTransition>
                  <CSSTransition
                    key={pathname}
                    classNames={routerAnimation}
                    timeout={routerAnimation === 'none' ? 0 : 300}
                  >
                    {children}
                  </CSSTransition>
                </SwitchTransition>
              )
            }}
          >
            <Route exact path="/" render={() => <Redirect to="projects/create" />} />
            {routes.map(({ path, Component, exact }) => (
              <Route
                path={path}
                key={path}
                exact={exact}
                render={props => <Component {...props} />}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </ConnectedRouter>
    )
  }
}

export default Router
