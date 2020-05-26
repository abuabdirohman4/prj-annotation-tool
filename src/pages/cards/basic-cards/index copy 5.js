import React from 'react'
import { Helmet } from 'react-helmet'
import { Select } from 'antd'
// import Word from 'components/quran/Word'
import { State } from 'react-powerplug'
import Surah from './data.json'
import CreateWord from './CreateWord'

// coba pake state react-powerplug

const { Option } = Select
class CardsBasicCards extends React.Component {
  render() {
    return (
      <State initial={{ selectValue: 1 }}>
        {({ state, setState }) => (
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
                          defaultValue={state.selectValue}
                          onChange={e => {
                            console.log(e)
                            setState({ e })
                          }}
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
                  {/* {console.log(`woi ${this.onChange} `)} */}
                  <CreateWord methodName={1} />
                </div>
              </div>
            </div>
          </div>
        )}
      </State>
    )
  }
}

export default CardsBasicCards
