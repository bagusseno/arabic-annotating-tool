import React from 'react'

class Word extends React.Component {
  constructor(props) {
    super(props)
    this.value = props.value
    this.toggleHover = this.toggleHover.bind(this)
  }

  state = {
    isHover: false,
    // isClicking: false,
  }

  toggleHover = function toggleHover() {
    const { isHover } = this.state

    this.setState({
      isHover: !isHover,
    })
  }

  render() {
    const { isHover } = this.state
    if (isHover) {
      this.wordStyle = { color: 'red', cursor: 'pointer' }
    } else {
      this.wordStyle = { color: 'black' }
    }
    return (
      <span style={this.wordStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        {this.value}
      </span>
    )
  }
}

export default Word
