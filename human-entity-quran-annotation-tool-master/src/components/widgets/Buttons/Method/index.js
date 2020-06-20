import React from 'react'
import { Redirect } from 'react-router-dom'
import style from './style.module.scss'

class ButtonMethod extends React.Component {
  constructor(props) {
    super(props)
    this.methodName = props.methodName
    this.projectName = props.projectName
    this.projectImage = props.projectImage
    this.link = props.link
    this.click = props.click
    this.toggleHover = this.toggleHover.bind(this)
    this.tooltip = React.createRef()
    this.myRef = null
    this.createMarkup = this.createMarkup.bind(this)
    this.state = {
      legend: undefined,
      isHover: false,
      redirect: false,
    }
  }

  componentDidMount() {
    const leg = this.generateLegend()
    this.setState({ legend: leg })
  }

  onClick = () => {
    if (this.click) this.click()
    if (this.link) this.setRedirect()
  }

  setTextInputRef(element) {
    this.myRef = element
  }

  setRedirect = () => {
    this.setState({
      redirect: true,
    })
  }

  renderRedirect = () => {
    const { redirect } = this.state

    if (redirect) return <Redirect to={this.link} />

    return <></>
  }

  toggleHover = function toggleHover() {
    const { isHover } = this.state

    this.setState({
      isHover: !isHover,
    })
  }

  generateLegend() {
    if (!this.myRef) return null
    return this.myRef.chartInstance.generateLegend()
  }

  createMarkup() {
    const { legend } = this.state
    return { __html: legend }
  }

  render() {
    const { isHover } = this.state
    if (isHover) {
      this.cardEffect = 'bg-gray-1 border-blue'
    } else {
      this.cardEffect = ''
    }

    return (
      <div className="col-lg-6 col-lg-12" tabIndex="0" role="button">
        {this.renderRedirect()}
        <div
          className={`card ${this.cardEffect}`}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
        >
          <div
            className="card-body"
            onClick={this.onClick}
            onKeyDown={this.onClick}
            role="button"
            tabIndex="0"
          >
            <div className="text-center">
              <div className="text-dark font-size-18 font-weight-bold mb-1">{this.projectName}</div>
              <img
                className={`${style.itemCover} mr-3`}
                src={this.projectImage}
                alt="projects logo"
              />
              <div className="text-gray-6 mb-2">{this.methodName}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ButtonMethod
