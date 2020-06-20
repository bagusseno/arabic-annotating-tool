import React, { Component } from 'react'
import Word from 'components/quran/Word'
import _ from 'lodash'

const API = 'http://localhost:5000/API/get_surah/'

export default class CreateWord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      words: [],
      currentSelectedWords: [],
      chosenEntities: [],
      isMouseDown: false,
      entitySuggestions: [],
    }
    this.word_key = -1
    this.noSurah = props.noSurah
  }

  componentDidUpdate(prevProps) {
    const { noSurah, chosenEntities } = this.props

    if (noSurah !== prevProps.noSurah) {
      fetch(API + noSurah)
        .then(res => res.json())
        .then(res => {
          this.setState(
            {
              words: res,
            },
            () => {
              this.setState(
                {
                  chosenEntities,
                },
                () => {
                  this.setupWords()
                  this.setupEntitySuggestions()
                },
              )
            },
          )
        })
    }
  }

  setupWords = () => {
    const { words } = this.state

    words.forEach((word, k) => {
      if (k < words.length - 1) if (word.WORD_NUMBER !== words[k + 1].WORD_NUMBER) word.ARAB += ' '
    })
  }

  setupEntitySuggestions = () => {
    const { words } = this.state
    const entitySuggestions = []

    words.forEach((word, k) => {
      if (typeof word['OPEN TAG'] === 'string') {
        word['OPEN TAG'] = word['OPEN TAG'].split('(')

        word['OPEN TAG'].forEach(v => {
          if (v !== '')
            entitySuggestions.push({
              tagIndex: v,
              start: k,
              end: null,
            })
        })
      }

      if (typeof word['CLOSE TAG'] === 'string') {
        word['CLOSE TAG'] = word['CLOSE TAG'].split(')')

        word['CLOSE TAG'].forEach(v => {
          if (v !== '') entitySuggestions.find(e => e.tagIndex === v).end = k
        })
      }
    })

    this.setState({ entitySuggestions })
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
    const { currentSelectedWords } = this.state
    const newcurrentSelectedWords = currentSelectedWords.slice()
    newcurrentSelectedWords.push(index)
    this.setState({
      currentSelectedWords: newcurrentSelectedWords,
    })
  }

  validateNewIndex = index => {
    const { currentSelectedWords } = this.state
    const newcurrentSelectedWords = currentSelectedWords.slice()
    newcurrentSelectedWords.push(index)

    if (newcurrentSelectedWords.length > 0) {
      newcurrentSelectedWords.sort()

      for (let i = 0; i < newcurrentSelectedWords.length; i += 1) {
        if (i > 0) {
          if (newcurrentSelectedWords[i] - newcurrentSelectedWords[i - 1] > 1) return false
        }
      }
    }

    return true
  }

  resetWords = () => {
    const { words, entitySuggestions } = this.state
    const wordsCopy = words.slice()

    wordsCopy.forEach(word => {
      word.COLOR = ''
    })

    console.log(entitySuggestions)

    this.setState({
      words: wordsCopy,
      currentSelectedWords: [],
    })
  }

  annotate = () => {
    const { currentSelectedWords, chosenEntities } = this.state

    if (currentSelectedWords.length === 0) return

    const newChosenEntities = _.cloneDeep(chosenEntities)

    newChosenEntities.push({
      start: Math.min.apply(null, currentSelectedWords),
      end: Math.max.apply(null, currentSelectedWords) + 1,
    })

    this.setState(
      {
        chosenEntities: newChosenEntities,
      },
      this.saveChosenEntities,
    )

    this.resetWords()
  }

  saveChosenEntities = () => {
    const { chosenEntities } = this.state
    const { projectID } = this.props

    fetch('http://localhost:5000/API/save_project', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectID,
        chosenEntities,
      }),
    }).then(res => {
      if (res === 'success') console.log('success')
    })
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

  createWords = () => {
    const { words, chosenEntities, entitySuggestions } = this.state
    const { showSuggestions } = this.props

    if (words.length === 0) return ''

    const wordsToPrint = _.cloneDeep(words)

    if (chosenEntities !== '')
      chosenEntities.forEach((e, k) => {
        wordsToPrint[e.start].ARAB = `<font color=red>${k.toString().sup()}(</font>${
          wordsToPrint[e.start].ARAB
        }`
        wordsToPrint[e.end].ARAB = `${
          wordsToPrint[e.end].ARAB
        }<font color=red>)${k.toString().sup()}</font>`
      })

    if (showSuggestions)
      entitySuggestions.forEach((e, k) => {
        if (
          chosenEntities.find(e2 => e2.start === e.start) &&
          chosenEntities.find(e2 => e2.end === e.end)
        )
          return

        wordsToPrint[e.start].ARAB = `<font color=green>${k.toString().sup()}(</font>${
          wordsToPrint[e.start].ARAB
        }`
        wordsToPrint[e.end].ARAB = `${
          wordsToPrint[e.end].ARAB
        }<font color=green>)${k.toString().sup()}</font>`
      })

    console.log(wordsToPrint)

    return wordsToPrint.map((word, k) => {
      // word.COLOR = 'green'
      word.INDEX = k

      return this.createWord(word)
    })
  }

  render() {
    return (
      <>
        <div
          role="button"
          tabIndex="0"
          onMouseUp={this.setMouseDownStatus.bind(this, false)}
          className="card-body card-quran text-right"
        >
          {this.createWords()}
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
        <button onClick={this.resetWords.bind(this)} tabIndex="-1" type="button" className="btn">
          Clear
        </button>
      </>
    )
  }
}
