import React from 'react'

// const tagColor = {
//   Human: 'blue',
//   Location: 'red',
// }

class Word extends React.Component {
  constructor(props) {
    super(props)
    this.value = props.value
    this.color = props.color
    // this.tagName = props.tagName
    this.validateNewIndex = props.validateNewIndex
    this.addWordToSelected = props.addWordToSelected
    this.setMouseDownStatus = props.setMouseDownStatus
    this.setWordColor = props.setWordColor
    this.isMouseDown = props.isMouseDown
    this.index = props.index
    this.getMouseDownStatus = props.getMouseDownStatus
    this.toggleHover = this.toggleHover.bind(this)
    this.state = {
      ...this.state,
      wordStyle: {
        userSelect: 'none',
        color: this.color,
      },
    }
  }

  state = {
    isHover: false,
  }

  toggleHover = function toggleHover() {
    let { isHover } = this.state

    this.setState({
      isHover: !isHover,
    })

    isHover = this.state
    const { isMouseDown } = this.props

    const isValid = this.validateNewIndex(this.index)

    if (isHover && isMouseDown && isValid) {
      this.setWordColor(this.index, this.color)
      this.addWordToSelected(this.index)
    }
  }

  render() {
    const { wordStyle } = this.state

    return (
      <span
        style={wordStyle}
        role="button"
        tabIndex="-1"
        onMouseDown={this.setMouseDownStatus.bind(this, true)}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        dangerouslySetInnerHTML={{ __html: this.value }}
      />
    )
  }
}

export default Word
