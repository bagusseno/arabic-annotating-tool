/* eslint no-underscore-dangle: 0 */
import React from 'react'
import { Table, Divider, Tag } from 'antd'
import { Link } from 'react-router-dom'
import SurahJson from './surah.json'

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
          // let color = tag.length > 5 ? 'geekblue' : 'green'
          // if (tag === 'loser') {
          //   color = 'volcano'
          // }
          const color = 'geekblue'
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
    title: 'Surah',
    key: 'surahNumber',
    dataIndex: 'surahNumber',
    render: surah => {
      return (
        <>
          {SurahJson.map(data => {
            let name = null
            let number = null
            const strip = ' - '
            if (data.surahNumber === surah) {
              name = data.surahName
              number = data.surahNumber.concat(strip)
            }
            return (
              <span>
                {number}
                {name}
              </span>
            )
          })}
          {/* <span>{surah}</span> */}
        </>
      )
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
              pathname: '/edit',
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
