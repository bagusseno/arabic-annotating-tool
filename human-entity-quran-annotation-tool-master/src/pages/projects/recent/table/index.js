/* eslint no-underscore-dangle: 0 */
import React from 'react'
import { Table, Divider, Tag } from 'antd'
import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Labelers',
    key: 'labelers',
    dataIndex: 'labelers',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    ),
  },
  {
    title: 'Surah number',
    key: 'surahNumber',
    dataIndex: 'surahNumber',
    render: surah => {
      return <span>{surah}</span>
    },
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'projectID',
    render: projectID => {
      console.log(`proj:${projectID}`)
      return (
        <span>
          <Link
            to={{
              pathname: '/cards/basic-cards',
              state: {
                projectID,
              },
            }}
          >
            Open
          </Link>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      )
    },
  },
]

class Recent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
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

  render() {
    const { data } = this.state
    return (
      <div className="mb-4 air__utils__scrollTable">
        <Table columns={columns} dataSource={data} scroll={{ x: '100%' }} />
      </div>
    )
  }
}

export default Recent
