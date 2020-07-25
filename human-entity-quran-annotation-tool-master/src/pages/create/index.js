import React from 'react'
import { Helmet } from 'react-helmet'
import ButtonMethod from 'components/widgets/Buttons/Method'
import { Modal, Input, Select, Form, Button } from 'antd'
import { Redirect } from 'react-router-dom'
import Data from './data.json'
import Surah from './surah.json'

class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalMethodIsVisible: false,
      modalInputIsVisible: false,
      annotator: '',
      redirect: false,
      projectID: '',
      surah: 'Select Surah',
    }
  }

  showModalMethod = () => {
    this.setState({
      modalMethodIsVisible: true,
      modalInputIsVisible: false,
    })
  }

  showModalInput = () => {
    this.setState({
      modalInputIsVisible: true,
      modalMethodIsVisible: false,
    })
  }

  handleOk = e => {
    console.log(e)
    this.setState({
      modalMethodIsVisible: false,
      modalInputIsVisible: false,
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      modalMethodIsVisible: false,
      modalInputIsVisible: false,
    })
  }

  handleChange = surah => {
    this.setState({
      surah,
    })
  }

  handleChangeAnnotator = event => {
    this.setState({
      annotator: event.target.value,
    })
  }

  createNewProject = () => {
    const { surah, annotator } = this.state
    fetch(
      `http://localhost:5000/API/new_project?project_type=RB&project_annotator=${annotator}&surah_number=${surah}`,
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          redirect: true,
          projectID: res.$oid,
        })
      })
  }

  renderRedirect = () => {
    const { redirect } = this.state
    const { projectID } = this.state

    if (redirect)
      return (
        <Redirect
          projectID={projectID}
          to={{
            pathname: '/edit',
            state: {
              projectID,
            },
          }}
        />
      )

    return <></>
  }

  render() {
    const { modalMethodIsVisible, modalInputIsVisible, surah, annotator } = this.state
    return (
      <div>
        {this.renderRedirect()}
        <Helmet title="Create Projects" />
        <div className="air__utils__heading">
          <h5>Create New Projects</h5>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-6">
            <div className="row">
              <ButtonMethod
                // link="/projects/create/method"
                projectName="New Custom Project"
                projectImage="resources/images/projects/new-project.png"
                methodName="Create a New Custom labeling project"
                click={this.showModalMethod}
              />
              <Modal
                title="Select Method"
                visible={modalMethodIsVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
              >
                {Data.map(data => {
                  return (
                    <ButtonMethod
                      projectName={data.projectName}
                      projectImage={data.projectImage}
                      methodName={data.methodName}
                      click={data.avaiable === 'true' ? this.showModalInput : this.showModalMethod}
                      key={data.id}
                    />
                  )
                })}
              </Modal>
              <Modal
                title="Input Data"
                visible={modalInputIsVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" onClick={this.showModalMethod}>
                    Back
                  </Button>,
                  <Button key="submit" type="primary" onClick={this.createNewProject}>
                    Create Project
                  </Button>,
                ]}
              >
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  layout="vertical"
                  visible={modalInputIsVisible}
                >
                  <Form.Item label="Annotator Name">
                    <Input value={annotator} onChange={this.handleChangeAnnotator} />
                  </Form.Item>
                  <Form.Item label="Surah">
                    <Select onChange={this.handleChange} defaultValue={surah}>
                      {Surah.map(data => {
                        return (
                          <Select.Option key={data.surahNumber} value={data.surahNumber}>
                            {`${data.surahNumber} - ${data.surahName}`}
                          </Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Create
