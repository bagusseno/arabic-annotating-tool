import React, { Component } from 'react'
import Word from 'components/quran/Word'
import _ from 'lodash'

const API = 'http://localhost:5000/API/get_surah/'

export default class CreateWord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      words: [],
      plainWords: [],
      selectedWords: [],
      isMouseDown: false,
    }
    this.word_key = -1
    this.noSurah = props.noSurah
  }

  componentDidUpdate(prevProps) {
    const { noSurah } = this.props

    if (noSurah !== prevProps.noSurah) {
      fetch(API + noSurah)
        .then(res => res.json())
        .then(res => {
          this.setState({
            plainWords: res,
          })

          const { plainWords } = this.state
          const wordsCopy = _.cloneDeep(plainWords)

          wordsCopy.push({
            ARAB: 'test',
          })

          this.setState({
            words: wordsCopy,
          })
        })
    }
  }

  setMouseDownStatus = status => {
    console.log('setMouseDownStatus called')

    this.setState({
      isMouseDown: status,
    })

    if (status) this.resetWords()
  }

  setWordColor = (index, color) => {
    const { words } = this.state
    const wordsCopy = words.slice()
    wordsCopy[index].COLOR = color

    this.setState({
      words: wordsCopy,
    })
  }

  addWordToSelected = index => {
    const { selectedWords } = this.state
    const newSelectedWords = selectedWords.slice()
    newSelectedWords.push(index)
    this.setState({
      selectedWords: newSelectedWords,
    })
  }

  validateNewIndex = index => {
    const { selectedWords } = this.state
    const newSelectedWords = selectedWords.slice()
    newSelectedWords.push(index)

    if (newSelectedWords.length > 0) {
      newSelectedWords.sort()

      for (let i = 0; i < newSelectedWords.length; i += 1) {
        if (i > 0) {
          if (newSelectedWords[i] - newSelectedWords[i - 1] > 1) return false
        }
      }
    }

    return true
  }

  resetWords = () => {
    const { plainWords } = this.state
    const newWords = _.cloneDeep(plainWords)

    this.setState({
      words: newWords,
      selectedWords: [],
    })
  }

  annotate = () => {
    const { selectedWords } = this.state

    console.log(selectedWords)
  }

  createWord = word => {
    const { isMouseDown } = this.state
    this.word_key += 1

    return (
      <Word
        value={word.ARAB}
        color={word.COLOR}
        validateNewIndex={this.validateNewIndex}
        addWordToSelected={this.addWordToSelected}
        setMouseDownStatus={this.setMouseDownStatus}
        setWordColor={this.setWordColor}
        index={word.INDEX}
        key={this.word_key}
        isMouseDown={isMouseDown}
      />
    )
  }

  createWords = words => {
    return words.map((word, k) => {
      if (k < words.length - 1) if (word.WORD_NUMBER !== words[k + 1].WORD_NUMBER) word.ARAB += ' '

      if (typeof word['OPEN TAG'] === 'string') {
        word['OPEN TAG'] = word['OPEN TAG'].split('(')

        word['OPEN TAG'].forEach(v => {
          if (v !== '') word.ARAB = `${v}(${word.ARAB}`
        })
      }
      if (typeof word['CLOSE TAG'] === 'string') {
        word['CLOSE TAG'] = word['CLOSE TAG'].split(')')

        word['CLOSE TAG'].forEach(v => {
          if (v !== '') word.ARAB = `${word.ARAB})${v}`
        })
      }

      // word.COLOR = 'green'
      word.INDEX = k

      return this.createWord(word)
    })
  }

  render() {
    const { words } = this.state
    return (
      <>
        <div
          role="button"
          tabIndex="0"
          onBlur={this.setMouseDownStatus.bind(this, false)}
          onMouseUp={this.setMouseDownStatus.bind(this, false)}
          onKeyDown={this.setMouseDownStatus.bind(this, true)}
          onMouseDown={this.setMouseDownStatus.bind(this, true)}
          className="card-body card-quran text-right"
        >
          {this.createWords(words)}
        </div>
        <button
          onClick={this.annotate.bind(this)}
          onKeyDown={this.annotate.bind(this)}
          tabIndex="-1"
          type="button"
          className="btn"
        >
          Annotate as human
        </button>
      </>
    )
  }
}
