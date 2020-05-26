import React from 'react'
import { Helmet } from 'react-helmet'
import ButtonMethod from 'components/widgets/Buttons/Method'
import { Modal } from 'antd'
import Data from '../data.json'

class Method extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  showModal = () => {
    // console.log("CEK MUNCUL GK")
    this.setState({
      visible: true,
    })
  }

  handleOk = e => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  render() {
    const { visible, handleOk, handleCancel } = this.state
    return (
      <div>
        <Helmet title="Dashboard: Analytics" />
        <div className="air__utils__heading">
          <h5>Create New Projects</h5>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-6">
            <div className="row">
              {Data.map(data => {
                return (
                  <ButtonMethod
                    projectName={data.projectName}
                    projectImage={data.projectImage}
                    methodName={data.methodName}
                    key={data.id}
                    click={this.showModal}
                    link="#"
                  />
                )
              })}
              <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel}>
                {Data.map(data => {
                  return (
                    <ButtonMethod
                      projectName={data.projectName}
                      projectImage={data.projectImage}
                      methodName={data.methodName}
                      key={data.id}
                      click={this.showModal}
                      link="#"
                    />
                  )
                })}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Method
