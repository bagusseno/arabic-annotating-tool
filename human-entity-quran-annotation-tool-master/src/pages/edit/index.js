import React from 'react'
import { Helmet } from 'react-helmet'
import { Checkbox, Button, Select } from 'antd'
import { Link } from 'react-router-dom'
import CreateWord from './CreateWord'

export default class Edit extends React.Component {
  constructor({ props }) {
    super(props)
    this.state = {
      projectData: undefined,
      checked: false,
      tagName: 'Human',
    }
    this.word_key = -1
  }

  componentDidMount() {
    const {
      location: {
        state: { projectID } = {
          projectID: undefined,
        },
      },
    } = this.props

    if (projectID !== undefined)
      fetch(`http://localhost:5000/API/get_project/${projectID}`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            projectData: res[0],
          })
          console.log('RES: ')
          console.log(res)
        })
  }

  handleCheckClick = () => {
    const { checked } = this.state
    this.setState({
      checked: !checked,
    })
  }

  handleChange = tagName => {
    this.setState({
      tagName,
    })
  }

  render() {
    const {
      projectData: {
        chosenEntities,
        surahNumber,
        _id: { $oid } = {
          $oid: null,
        },
      } = {
        surahNumber: null,
      },
      checked,
      tagName,
    } = this.state

    return (
      <div>
        <Helmet title="Edit Projects" />
        <div className="air__utils__heading">
          <h5>
            <span className="mr-3">Edit Projects</span>
          </h5>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header card-header-flex align-items-center">
                <Checkbox checked={checked} onClick={this.handleCheckClick}>
                  Show Human Entity Suggestion
                </Checkbox>
                <div className="ml-auto">
                  <span className="mr-2">Select Tag</span>
                  <Select
                    onChange={this.handleChange}
                    defaultValue={tagName}
                    style={{ width: 130 }}
                  >
                    <Select.Option value="Human">
                      Human
                      <span
                        className="ml-4"
                        style={{
                          backgroundColor: 'blue',
                          color: 'blue',
                          border: '1px solid black',
                        }}
                      >
                        col
                      </span>{' '}
                    </Select.Option>
                    <Select.Option value="Location">
                      Location
                      <span
                        className="ml-3"
                        style={{ backgroundColor: 'red', color: 'red', border: '1px solid black' }}
                      >
                        col
                      </span>
                    </Select.Option>
                  </Select>
                </div>
              </div>
              <CreateWord
                projectID={$oid}
                showSuggestions={checked}
                chosenEntities={chosenEntities}
                // getSurah={checked ? 'get_suggest' : 'get_surah'}
                noSurah={surahNumber}
                tagName={tagName}
              />
            </div>
            <div className="text-right">
              <Link to="../recent">
                <Button type="primary" className="col-md-12">
                  Save Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
