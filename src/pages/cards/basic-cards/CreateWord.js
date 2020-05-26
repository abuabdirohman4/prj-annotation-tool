import React, { Component } from 'react'
import Word from 'components/quran/Word'

const API = 'http://localhost:5000/API/get_surah/'
// const DEFAULT_QUERY = this.methodName

export default class CreateWord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      words: [],
    }
    this.word_key = -1
    this.noSurah = props.noSurah
  }

  componentDidMount() {
    fetch(API + this.noSurah)
      .then(res => res.json())
      .then(res => {
        this.setState({ words: res })
      })
  }

  createWord = word => {
    this.word_key += 1
    return <Word value={word.ARAB} key={this.word_key} />
  }

  createWords = words => {
    // let humanEntityIndex = []
    return words.map((word, k) => {
      console.log(word)
      // console.log(k);
      console.log(words)

      if (k < words.length - 1) if (word.WORD_NUMBER !== words[k + 1].WORD_NUMBER) word.ARAB += ' '
      // console.log(word)
      // console.log(word['OPEN TAG'])

      if (word['OPEN TAG'] !== '') {
        word['OPEN TAG'] = word['OPEN TAG'].split('(')

        word['OPEN TAG'].forEach(v => {
          if (v !== '') word.ARAB = `${v}(${word.ARAB}`
        })
        // humanEntityIndex += humanEntityIndex.map(word["OPEN TAG"])
      }
      // console.log(word['CLOSE TAG'])
      if (word['CLOSE TAG'] !== '') {
        word['CLOSE TAG'] = word['CLOSE TAG'].split(')')

        word['CLOSE TAG'].forEach(v => {
          // console.log(v)

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
