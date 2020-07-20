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
    }
    // this.props = {
    //   // chosenEntities: props.chosenEntities
    //   noSurah: props.noSurah,
    //   tagName: props.tagName,
    // }
    this.noSurah = props.noSurah
    this.tagName = props.tagName
    this.word_key = -1
    console.log(`chosenEntities CreateWord: ${this.chosenEntities}`)
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

  createWords = () => {
    const { words, chosenEntities, entitySuggestions } = this.state
    const { showSuggestions } = this.props

    if (words.length === 0) return ''

    const wordsToPrint = _.cloneDeep(words)

    if (chosenEntities !== '')
      chosenEntities.forEach(e => {
        wordsToPrint[
          e.start
        ].ARAB = `<font color=${e.tagColor}>(</font>${wordsToPrint[e.start].ARAB}`
        // `<sup><i class="fa fa-times-circle-o" style="font-size: 16px;"></i></sup><font color=${e.tagColor}>(</font>${wordsToPrint[e.start].ARAB}`
        wordsToPrint[e.end].ARAB = `${wordsToPrint[e.end].ARAB}<font color=${e.tagColor}>)</font>`
      })
    // chosenEntities.forEach((e, k) => {
    // wordsToPrint[e.start].ARAB = `<font color=red>${k.toString().sup()}(</font>${
    // }<font color=red>)${k.toString().sup()}</font>`

    if (showSuggestions)
      // entitySuggestions.forEach((e, k) => {
      entitySuggestions.forEach(e => {
        if (
          chosenEntities.find(e2 => e2.start === e.start) &&
          chosenEntities.find(e2 => e2.end === e.end)
        )
          return

        wordsToPrint[e.start].ARAB = `<font color=green>(</font>${wordsToPrint[e.start].ARAB}`
        wordsToPrint[e.end].ARAB = `${wordsToPrint[e.end].ARAB}<font color=green>)</font>`
        // wordsToPrint[e.start].ARAB = `<font color=green>${k.toString().sup()}(</font>${
        // }<font color=green>)${k.toString().sup()}</font>`
      })

    console.log('createWords : ', wordsToPrint)

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
        // tagName={this.tagName}
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
    // console.log('setMouseDownStatus called')

    this.setState({
      isMouseDown: status,
    })

    if (status) this.resetWords()
  }

  resetWords = () => {
    // const { words, entitySuggestions } = this.state
    const { words } = this.state
    const wordsCopy = words.slice()

    wordsCopy.forEach(word => {
      word.COLOR = ''
    })

    // console.log('entity Suggestion', entitySuggestions)

    this.setState({
      words: wordsCopy,
      currentSelectedWords: [],
    })
  }

  setWordColor = index => {
    const { words, tag } = this.state
    const wordsCopy = words.slice()

    // wordsCopy[index].COLOR = color
    // console.log('wordsCopy[index].COLOR : ', wordsCopy[index].COLOR)
    // console.log('this.tagName : ', tag)
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
      // start: Math.min.apply(null, currentSelectedWords),
      // end: Math.max.apply(null, currentSelectedWords) + 1,
      start: Math.min.apply(null, currentSelectedWords) - 1,
      end: Math.max.apply(null, currentSelectedWords),
      tagName,
      tagColor: tagColor[tagName],
    })

    // console.log('newChosenEntities : ', newChosenEntities)

    this.setState(
      {
        chosenEntities: newChosenEntities,
      },
      this.saveChosenEntities,
    )

    this.resetWords()
    console.log(`chosenEntities CreateWord 2: ${this.chosenEntities}`)
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

  render() {
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
          <Button
            onClick={this.annotate}
            onKeyDown={this.annotate}
            tabIndex="-1"
            type="primary"
            className="mb-3 ml-3"
          >
            Annotate
          </Button>
          <Button onClick={this.resetWords} tabIndex="-1" className="ml-2">
            Clear
          </Button>
        </div>
      </>
    )
  }
}
