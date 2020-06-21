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
      modal1IsVisible: false,
      modal2IsVisible: false,
      annotator: '',
      redirect: false,
      projectID: '',
      surah: 'Select Surah',
    }
  }

  showModal1 = () => {
    this.setState({
      modal1IsVisible: true,
      modal2IsVisible: false,
    })
  }

  showModal2 = () => {
    this.setState({
      modal2IsVisible: true,
      modal1IsVisible: false,
    })
  }

  handleOk = e => {
    console.log(e)
    this.setState({
      modal1IsVisible: false,
      modal2IsVisible: false,
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      modal1IsVisible: false,
      modal2IsVisible: false,
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
    const { modal1IsVisible, modal2IsVisible, surah, annotator } = this.state
    return (
      <div>
        {this.renderRedirect()}
        <Helmet title="Dashboard: Analytics" />
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
                click={this.showModal1}
              />
              <Modal
                title="Select Algorithm"
                visible={modal1IsVisible}
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
                      click={this.showModal2}
                      key={data.id}
                    />
                  )
                })}
              </Modal>
              <Modal
                title="Input Data"
                visible={modal2IsVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" onClick={this.showModal1}>
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
                  visible={modal2IsVisible}
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
