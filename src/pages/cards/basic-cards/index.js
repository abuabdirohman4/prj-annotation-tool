import React from 'react'
import { Helmet } from 'react-helmet'
import { Select, Switch } from 'antd'
import Surah from './data.json'
import CreateWord from './CreateWord'

const { Option } = Select
class CardsBasicCards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: 'Choose Surah',
      checked: false,
      // suggest: "get_surah2"
    }
    this.word_key = -1
  }

  onChange = e => {
    this.setState({
      selectValue: e,
    })
  }

  handleCheckClick = () => {
    const { checked } = this.state
    console.log(checked)
    this.setState({
      checked: !checked,
      // suggest: "get_surah"
    })
    console.log(!checked)
    // console.log(`Ini suggest ${suggest}`)
  }

  render() {
    const { selectValue, checked } = this.state

    return (
      <div>
        <Helmet title="Al Quran" />
        <div className="air__utils__heading">
          <h5>
            <span className="mr-3">Edit Projects</span>
          </h5>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header card-header-flex align-items-center">
                <div className="d-flex flex-column justify-content-center mr-auto">
                  <div className="mb-0 width-300">
                    <Select value={selectValue} onChange={this.onChange} style={{ width: 300 }}>
                      {Surah.map(data => {
                        return (
                          <Option key={data.surahNumber} value={data.surahNumber}>
                            {`${data.surahNumber} - ${data.surahName}`}
                          </Option>
                        )
                      })}
                    </Select>
                  </div>
                </div>
                <Switch checked={checked} onClick={this.handleCheckClick}>
                  {' '}
                  Show{' '}
                </Switch>
              </div>
              <CreateWord getSurah={checked ? 'get_suggest' : 'get_surah'} noSurah={selectValue} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CardsBasicCards
