import React from 'react'
import { Helmet } from 'react-helmet'
import Table from './table'

class Recent extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Tables: Antd" />
        <div className="air__utils__heading">
          <h5>
            <span className="mr-3">Open Recent Projects</span>
            {/* <a className="btn btn-sm btn-light">
              <i className="fe fe-corner-right-up" />
            </a> */}
          </h5>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="mb-4">
              <strong>Your Recent Project</strong>
            </h4>
            <Table />
          </div>
        </div>
      </div>
    )
  }
}

export default Recent
