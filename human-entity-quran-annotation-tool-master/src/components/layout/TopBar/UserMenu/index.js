import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import styles from './style.module.scss'

@connect(({ user }) => ({ user }))
class ProfileMenu extends React.Component {
  state = {
    // count: 7,
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/LOGOUT',
    })
  }

  // addCount = () => {
  //   let { count } = this.state
  //   count += 1
  //   this.setState({
  //     count,
  //   })
  // }

  render() {
    const { user } = this.props
    // const { count } = this.state
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <strong>Hello, {user.name || 'Anonymous'}</strong>
          <div>
            {/* <strong className="mr-1">Billing Plan: </strong>
            Professional */}
          </div>
          <div>
            <strong>Role: </strong>
            {user.role}
          </div>
        </Menu.Item>
        <Menu.Divider />
        {/* <Menu.Item>
          <div>
            <strong>Email: </strong>
            {user.email}
            <br />
            <strong>Phone: </strong>
            {user.phone || '— '}
          </div>
        </Menu.Item> */}
        {/* <Menu.Divider /> */}
        {/* <Menu.Item>
          <a href="#">
            <i className={`${styles.menuIcon} fe fe-user`} />
            Edit Profile
          </a>
        </Menu.Item> */}
        {/* <Menu.Divider />
        <Menu.Item>
          <a href="#" onClick={this.logout}>
            <i className={`${styles.menuIcon} fe fe-log-out`} />
            Logout
          </a>
        </Menu.Item> */}
      </Menu>
    )
    return (
      // <Dropdown overlay={menu} trigger={['click']} onVisibleChange={this.addCount}>
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.dropdown}>
          <Badge>
            <Avatar className={styles.avatar} shape="square" size="large" icon="user" />
          </Badge>
        </div>
      </Dropdown>
    )
  }
}

export default ProfileMenu
