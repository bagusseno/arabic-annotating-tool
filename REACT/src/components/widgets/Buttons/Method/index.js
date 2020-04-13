import React from 'react'
import style from './style.module.scss'

class ButtonMethod extends React.Component {
  constructor(props) {
    super(props)
    this.methodName = props.methodName
    this.projectName = props.projectName
    this.projectImage = props.projectImage
    this.tooltip = React.createRef()
    this.myRef = null
    this.createMarkup = this.createMarkup.bind(this)
  }

  state = {
    legend: undefined,
  }

  componentDidMount() {
    const leg = this.generateLegend()
    this.setState({ legend: leg })
  }

  setTextInputRef(element) {
    this.myRef = element
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
    return (
      <div className="text-center">
        <div className="text-dark font-size-18 font-weight-bold mb-1">{this.projectName}</div>
        <img className={`${style.itemCover} mr-3`} src={this.projectImage} alt="projects logo" />
        <div className="text-gray-6 mb-2">{this.methodName}</div>
      </div>
    )
  }
}

export default ButtonMethod
