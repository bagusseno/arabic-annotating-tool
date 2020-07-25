/* eslint no-underscore-dangle: 0 */
import React from 'react'
import { Table, Tag, Divider, Modal } from 'antd'
import { Link } from 'react-router-dom'
import SurahJson from './surah.json'

// const { confirm } = Modal

class Recent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      visible: false,
    }
  }

  componentDidMount() {
    this.getPostAPI()
  }

  getPostAPI = () => {
    fetch('http://localhost:5000/API/get_projects')
      .then(res => res.json())
      .then(res => {
        const data = []
        res.forEach((e, k) => {
          data.push({
            key: k,
            type: e.projectType,
            labelers: [e.projectAnnotator],
            surahNumber: e.surahNumber,
            projectID: e._id.$oid,
          })
        })

        this.setState({
          data,
        })
      })
  }

  // showDeleteConfirm = (projectID) => {
  //   Modal.confirm({
  //     title: 'Are you sure delete this project?',
  //     okText: 'Yes',
  //     okType: 'primary',
  //     cancelText: 'No',
  //     onOk() {
  //       console.log('OK')
  //       console.log('projectID : ', projectID)
  //       this.handleDelete(projectID)
  //     },
  //     onCancel() {
  //       console.log('Cancel')
  //     },
  //   })
  // }

  handleDelete = projectID => {
    fetch(`http://localhost:5000/API/delete_project/${projectID}`, { method: 'delete' }).then(
      () =>
        // console.log(res)
        this.getPostAPI(),
      this.hideModal(),
    )
    // console.log('handleDelete : ', projectID)
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  hideModal = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { data, visible } = this.state

    const columns = [
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Annotator Name',
        key: 'labelers',
        dataIndex: 'labelers',
        render: tags => (
          <span>
            {tags.map(tag => {
              const color = 'geekblue'
              return (
                <Tag color={color} key={tag}>
                  {tag != null ? tag.toUpperCase() : ''}
                </Tag>
              )
            })}
          </span>
        ),
      },
      {
        title: 'Surah',
        key: 'surahNumber',
        dataIndex: 'surahNumber',
        render: surah => {
          return (
            <>
              {SurahJson.map(e => {
                let name = null
                let number = null
                const strip = ' - '
                if (e.surahNumber === surah) {
                  name = e.surahName
                  number = e.surahNumber.concat(strip)
                }
                return (
                  <span>
                    {number}
                    {name}
                  </span>
                )
              })}
            </>
          )
        },
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: 'projectID',
        render: projectID => {
          return (
            <span>
              <Link
                to={{
                  pathname: '/edit',
                  state: {
                    projectID,
                  },
                }}
              >
                Edit
              </Link>
              <Divider type="vertical" />
              {/* {console.log('delete :',projectID)} */}
              <span
                role="button"
                tabIndex="-1"
                style={{
                  cursor: 'pointer',
                  color: '#786fa4',
                }}
                onClick={this.showModal}
                onKeyDown={this.showModal}
                // onClick={() => this.handleDelete(projectID)}
                // onKeyDown={this.handleDelete}
              >
                Delete
              </span>
              <Modal
                title="Delete Project"
                visible={visible}
                onOk={() => this.handleDelete(projectID)}
                onCancel={this.hideModal}
                okText="Yes"
                cancelText="No"
              >
                <p>Are you sure delete this project?</p>
              </Modal>
            </span>
          )
        },
      },
    ]

    return (
      <>
        <div className="mb-4 air__utils__scrollTable">
          <Table columns={columns} dataSource={data} scroll={{ x: '100%' }} />
        </div>
      </>
    )
  }
}

export default Recent
