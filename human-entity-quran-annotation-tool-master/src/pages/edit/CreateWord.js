import React, { Component } from 'react'
import { Button } from 'antd'
import Word from 'components/quran/Word'
import _ from 'lodash'

const API = 'http://localhost:5000/API/get_surah/'
const tagColor = {
  Human: 'blue',
  Location: 'red',
}
export default class CreateWord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSelectedWords: [],
      chosenEntities: [],
      entitySuggestions: [],
      isMouseDown: false,
      tag: props.tagName,
      words: [],
      isDelete: true,
      deleteEntities: '',
      deleteText: 'Delete',
    }
    this.noSurah = props.noSurah
    this.tagName = props.tagName
    this.word_key = -1
  }

  componentDidUpdate(prevProps) {
    const { noSurah, chosenEntities, tagName } = this.props

    if (tagName !== prevProps.tagName) {
      this.updateTag(tagName)
    }

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

  updateTag = tag => {
    this.setState({
      tag,
    })
  }

  // Give space between word
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

  handleDeleteEntities = () => {
    const { isDelete } = this.state
    this.setState({
      isDelete: !isDelete,
    })
    this.showDeleteEntities()
  }

  showDeleteEntities = () => {
    const { isDelete } = this.state
    if (isDelete) {
      this.setState({
        // deleteEntities: `<sup><i class="fa fa-times-circle-o" style="font-size: 14px; color:${tagColor[tagName]};"></i></sup>`
        deleteEntities:
          '<sup><i class="fa fa-times-circle" style="cursor: pointer; font-size: 14px; color:red;"></i></sup>',
        deleteText: 'Cancel Delete',
      })
    } else {
      this.setState({
        deleteEntities: '',
        deleteText: 'Delete',
      })
    }
  }

  createWords = () => {
    const { words, chosenEntities, entitySuggestions, deleteEntities } = this.state
    // const { words, chosenEntities, entitySuggestions } = this.state
    const { showSuggestions, tagName } = this.props
    // const delete = '<sup><i class="fa fa-times-circle-o" style="font-size: 14px; color:${e.tagColor};"></i></sup>'
    // const select = '<sup><i class="fa fa-check-circle-o" style="font-size: 14px; color:green;"></i></sup>'

    if (words.length === 0) return ''

    const wordsToPrint = _.cloneDeep(words)

    if (chosenEntities !== '')
      chosenEntities.forEach(e => {
        // wordsToPrint[
        //   e.start
        // ].ARAB = `<sup><i class="fa fa-times-circle-o" style="font-size: 14px; color:${e.tagColor};"></i></sup><font color=${e.tagColor}>(</font>${wordsToPrint[e.start].ARAB}`
        wordsToPrint[
          e.start
        ].ARAB = `${deleteEntities}<font color=${e.tagColor}>(</font>${wordsToPrint[e.start].ARAB}`
        // `<span class='supsub'><sup class='superscript'>Sup</sup><sub class='subscript'>Sub</sub></span><font color=${e.tagColor}>(</font>${wordsToPrint[e.start].ARAB}`

        wordsToPrint[e.end].ARAB = `${wordsToPrint[e.end].ARAB}<font color=${e.tagColor}>)</font>`
      })

    if (showSuggestions)
      entitySuggestions.forEach(e => {
        if (
          chosenEntities.find(e2 => e2.start === e.start) &&
          chosenEntities.find(e2 => e2.end === e.end)
        )
          return

        console.log('${tagColor[tagName]} :', tagColor[tagName])
        wordsToPrint[e.start].ARAB =
          // `<sup><i class="fa fa-check-circle-o" style="font-size: 14px; color:green;"></i></sup><font color=${tagColor[tagName]}>(</font>${wordsToPrint[e.start].ARAB}`
          `<sup><i class="fa fa-plus-circle" style="cursor: pointer; font-size: 14px; color:green; position: relative; top:-4px; left:-12px"></i></sup><sub><i class="fa fa-times-circle" style="cursor: pointer; font-size: 14px; color:red;"></i></sub><font color=${tagColor[tagName]}>(</font>${wordsToPrint[e.start].ARAB}`

        wordsToPrint[e.end].ARAB =
          // `${wordsToPrint[e.end].ARAB}<font color=${tagColor[tagName]}>)</font><sup><i class="fa fa-times-circle-o" style="font-size: 14px; color:green;"></i></sup>`
          `${wordsToPrint[e.end].ARAB}<font color=${tagColor[tagName]}>)</font>`
      })

    return wordsToPrint.map((word, k) => {
      word.INDEX = k
      return this.createWord(word)
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

  addWordToSelected = index => {
    const { currentSelectedWords } = this.state
    const newcurrentSelectedWords = currentSelectedWords.slice()
    newcurrentSelectedWords.push(index)
    this.setState({
      currentSelectedWords: newcurrentSelectedWords,
    })
  }

  setMouseDownStatus = status => {
    this.setState({
      isMouseDown: status,
    })

    if (status) this.resetWords()
  }

  resetWords = () => {
    const { words } = this.state
    const wordsCopy = words.slice()

    wordsCopy.forEach(word => {
      word.COLOR = ''
    })

    this.setState({
      words: wordsCopy,
      currentSelectedWords: [],
    })
  }

  setWordColor = index => {
    const { words, tag } = this.state
    const wordsCopy = words.slice()

    wordsCopy[index].COLOR = tagColor[tag]

    this.setState({
      words: wordsCopy,
    })
  }

  annotate = () => {
    const { currentSelectedWords, chosenEntities } = this.state
    const { tagName } = this.props

    if (currentSelectedWords.length === 0) return

    const newChosenEntities = _.cloneDeep(chosenEntities)

    newChosenEntities.push({
      start: Math.min.apply(null, currentSelectedWords) - 1,
      end: Math.max.apply(null, currentSelectedWords),
      tagName,
      tagColor: tagColor[tagName],
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

  handleChangeButtonSuggest = () => {
    const { showSuggestions } = this.props

    if (showSuggestions) {
      return ''
    }
    return 'none'
  }

  render() {
    const divStyle = {
      display: this.handleChangeButtonSuggest(),
    }
    const { deleteText } = this.state

    return (
      <>
        <div
          role="button"
          style={{
            cursor: 'text',
            color: 'black',
          }}
          tabIndex="0"
          onMouseUp={this.setMouseDownStatus.bind(this, false)}
          className="card-body card-quran text-right"
        >
          {this.createWords()}
        </div>
        <div className="text-center">
          <Button className="mb-3 ml-3" type="primary" style={divStyle}>
            Annotate All Suggestion
          </Button>

          <Button
            onClick={this.annotate}
            onKeyDown={this.annotate}
            tabIndex="-1"
            type="primary"
            className="mb-3 ml-3"
          >
            Annotate
          </Button>

          <Button className="mb-3 ml-3" onClick={this.handleDeleteEntities}>
            {deleteText}
          </Button>
        </div>
      </>
    )
  }
}
