import React from 'react'

class Word extends React.Component {
  constructor(props) {
    super(props)
    this.validateNewIndex = props.validateNewIndex
    this.addWordToSelected = props.addWordToSelected
    this.setMouseDownStatus = props.setMouseDownStatus
    this.color = props.color
    this.index = props.index
    this.setWordColor = props.setWordColor
    this.isMouseDown = props.isMouseDown
    this.getMouseDownStatus = props.getMouseDownStatus
    this.value = props.value
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
    // isClicking: false,
  }

  componentDidMount() {
    // console.log(`${this.color}`);
  }

  componentDidUpdate() {
    // console.log((`${this.color}`));
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
      this.setWordColor(this.index, 'red')
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
      >
        {this.value}
      </span>
    )
  }
}

export default Word
