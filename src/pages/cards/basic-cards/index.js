import React from 'react'
import { Helmet } from 'react-helmet'
import { Select } from 'antd'
// import Word from 'components/quran/Word'
// import { State } from 'react-powerplug'
import Surah from './data.json'
import CreateWord from './CreateWord'

// berhasil pake antd dan fungsi handlechange

const { Option } = Select
class CardsBasicCards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: 1,
      // isChange: false
    }
    this.word_key = -1
  }

  onChange = selectValue => {
    // console.log(selectValue);
    // this.abu = { hanan: selectValue }
    // console.log(this.abu.hanan)
    this.setState({
      selectValue,
      // isChange: true
    })
    // return selectValue
  }

  render() {
    const { selectValue } = this.state
    // let { hasil } = 0
    // const { abu } = this.onChange

    return (
      // <State initial={{ selectValue: 'Al Fatihah' }}>
      //   {({ state, setState }) => (
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
                  {/* <h5 className="mb-0">Al Fatihah</h5> */}
                  <div className="mb-0 width-300">
                    <Select
                      value={selectValue}
                      onChange={this.onChange}
                      // onChange={value => {this.setState({ value })}}
                      style={{ width: 300 }}
                    >
                      {Surah.map(data => {
                        return (
                          <Option key={data.surahNumber} value={data.surahNumber}>
                            {data.surahName}
                          </Option>
                        )
                      })}
                    </Select>
                  </div>
                </div>
              </div>
              {/* {console.log(`woi ${selectValue} `)} */}
              {/* {coba = () => {
                                 if (isChange === true) {
                                  hasil = 2
                                 } else {
                                  hasil = 1
                                 }
                                 console.log(1)
                                 return hasil
                               }} */}
              <CreateWord noSurah={selectValue} />
              {/* {console.log(hasil)} */}
            </div>
          </div>
        </div>
      </div>
      //   )}
      // </State>
    )
  }
}

export default CardsBasicCards
