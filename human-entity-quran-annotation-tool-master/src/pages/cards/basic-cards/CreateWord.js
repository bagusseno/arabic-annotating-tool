import React, { Component } from 'react'
import Word from 'components/quran/Word'

// const API = 'http://localhost:5000/API/get_surah2/'
export default class CreateWord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      words: [],
    }
    this.word_key = -1
    this.noSurah = props.noSurah
    this.getSurah = props.getSurah
  }

  componentDidMount() {
    // console.log('TEST')
    fetch(`http://localhost:5000/API/${this.getSurah}/${this.noSurah}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ words: res })
      })
    console.log(`ini componentDidMount CreateWord`)
  }

  componentDidUpdate(prevProps) {
    const { noSurah, getSurah } = this.props

    if (noSurah !== prevProps.noSurah || getSurah !== prevProps.getSurah) {
      // console.log(`${noSurah} | ${prevProps.noSurah}`)
      fetch(`http://localhost:5000/API/${getSurah}/${noSurah}`)
        .then(res => res.json())
        .then(res => {
          this.setState({ words: res })
        })
    }
    console.log(`ini componentDidUpdate CreateWord`)
  }

  createWord = word => {
    this.word_key += 1
    return <Word value={word.ARAB} key={this.word_key} />
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
      return this.createWord(word)
    })
  }

  render() {
    const { words } = this.state
    return (
      <>
        <div className="card-body card-quran text-right">{this.createWords(words)}</div>
      </>
    )
  }
}
