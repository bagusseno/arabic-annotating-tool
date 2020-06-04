import React from 'react'
import { Table, Divider, Tag } from 'antd'
import data from './data.json'

const columns = [
  {
    title: 'Type',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Created',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Last Modified',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Labelers',
    key: 'tags',
    dataIndex: 'tags',
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
    title: 'Status',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Incomplete {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  },
]

class Recent extends React.Component {
  render() {
    return (
      <div className="mb-4 air__utils__scrollTable">
        <Table columns={columns} dataSource={data} scroll={{ x: '100%' }} />
      </div>
    )
  }
}

export default Recent
