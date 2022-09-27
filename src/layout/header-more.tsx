import { MoreOutlined, SmileOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import React, { useMemo } from 'react'
interface IProps {}
const HeaderMore: React.FC<IProps> = (props) => {
  const menu = useMemo(
    () => (
      <Menu
        items={[
          {
            key: '1',
            label: (
              <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
              </a>
            ),
          },
          {
            key: '2',
            label: (
              <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
              </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
          },
          {
            key: '3',
            label: (
              <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item (disabled)
              </a>
            ),
            disabled: true,
          },
          {
            key: '4',
            danger: true,
            label: 'a danger item',
          },
        ]}
      />
    ),
    [],
  )
  return (
    <Dropdown overlay={menu}>
      <a title="更多" style={{ color: '#fff' }} onClick={(e) => e.preventDefault()}>
        <MoreOutlined />
      </a>
    </Dropdown>
  )
}

export default HeaderMore
