import React from 'react'
import { Helmet } from 'react-helmet'
import { Select, Checkbox } from 'antd'
import Surah from './data.json'
import CreateWord from './CreateWord'

const { Option } = Select
class CardsBasicCards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: 'Choose Surah',
      checked: false,
    }
    this.word_key = -1
  }

  onChange = e => {
    this.setState({
      selectValue: e,
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
    const { selectValue, checked } = this.state

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
                <div className="d-flex flex-column justify-content-center mr-auto">
                  <div className="mb-0 width-300">
                    <Select
                      defaultValue={selectValue}
                      onChange={this.onChange}
                      style={{ width: 300 }}
                    >
                      {Surah.map(data => {
                        return (
                          <Option key={data.surahNumber} value={data.surahNumber}>
                            {`${data.surahNumber} - ${data.surahName}`}
                          </Option>
                        )
                      })}
                    </Select>
                  </div>
                </div>
                <Checkbox checked={checked} onClick={this.handleCheckClick}>
                  Show Suggestion
                </Checkbox>
              </div>
              <CreateWord getSurah={checked ? 'get_suggest' : 'get_surah'} noSurah={selectValue} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CardsBasicCards
