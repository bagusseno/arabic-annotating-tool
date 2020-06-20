import React from 'react'
import { Helmet } from 'react-helmet'
import { Checkbox } from 'antd'
import { useParams } from 'react-router-dom'
import CreateWord from './CreateWord'

export default class CardsBasicCards extends React.Component {
  constructor({ props }) {
    super(props)
    this.state = {
      projectData: undefined,
      checked: false,
    }
    this.word_key = -1
    console.log('Constructor')
    console.log(useParams)
  }

  componentDidMount() {
    console.log(this.props)

    const {
      location: { state: { projectID } = { projectID: undefined } },
    } = this.props

    if (projectID !== undefined)
      fetch(`http://localhost:5000/API/get_project?project_id=${projectID}`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            projectData: res[0],
          })
          console.log(res)
        })
  }

  handleCheckClick = () => {
    const { checked } = this.state
    this.setState({
      checked: !checked,
    })
    // console.log(`ini handleCheckClick ${checked}`)
  }

  render() {
    const {
      projectData: { chosenEntities, surahNumber, _id: { $oid } = { $oid: null } } = {
        surah_number: null,
      },
      checked,
    } = this.state
    const { projectData } = this.state
    console.log(`projectData: ${projectData}`)
    return (
      <div>
        <Helmet title="Al Quran" />
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
                  Show Suggestion
                </Checkbox>
              </div>
              <CreateWord
                projectID={$oid}
                showSuggestions={checked}
                chosenEntities={chosenEntities}
                getSurah={checked ? 'get_suggest' : 'get_surah'}
                noSurah={surahNumber}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
