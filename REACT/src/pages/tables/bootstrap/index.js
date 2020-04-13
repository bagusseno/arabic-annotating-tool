import React from 'react'
import { Helmet } from 'react-helmet'
import TablesBootstrapBasic from './examples/basic'

class TablesBootstrap extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Tables: Bootstrap" />
        <div className="air__utils__heading">
          <h5>
            <span className="mr-3">Open Recent Project</span>
          </h5>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="mb-4">
              <strong>Basic</strong>
            </h4>
            <TablesBootstrapBasic />
          </div>
        </div>
      </div>
    )
  }
}

export default TablesBootstrap
