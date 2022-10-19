import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Dropdown, Menu, message, Modal, TreeSelect } from 'antd'
import type { TreeSelectProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { removeUserInf } from '@/store/actions/user'
import { clearTableLists } from '@/store/actions/tables'
import { IRoute } from '@/route'
import { initTreeData, handleLoadTreeData, ITreeData } from '@/components/layout/utils'
import avatar from '@/assets/head_portrait.jpg'

interface IUserAvatar {
  cls: string,
  user: string[],
  routes: IRoute[]
}

const UserAvatar: React.FC<IUserAvatar> = (props) => {
  const { cls, user, routes } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initTree = useMemo(() => initTreeData(routes.filter(r => r.path?.includes('/') && r.path !== '/')), [routes])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [deg, setDeg] = useState<number>(0)
  const [value, setValue] = useState<string>()
  const [treeData, setTreeData] = useState<ITreeData[]>(initTree)
  const timer = useRef<any>(null)

  const layout = () => {
    dispatch(removeUserInf('userInf'))
    dispatch(clearTableLists())
    message.info('用户信息改变，重新登陆')

    setTimeout(() => navigate('/login', { replace: true }), 10)
  }

  const startSpin = () => {
    if (timer.current) clearInterval(timer.current)

    timer.current = setInterval(() => {
      setDeg(d => {
        if (d >= 3000) return d + 40
        if (d >= 750 && d < 3000) return d + 25
        return d + 10
      })
    }, 20)
  }

  const stopSpin = () => {
    setDeg(0)
    if (timer.current) clearInterval(timer.current)
  }

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [])

  const menu = useMemo(() => (
    <Menu
      items={[
        {
          key: '1',
          label: <span>首页</span>,
          onClick: () => navigate('/')
        },
        {
          key: '2',
          label: <span>个人信息</span>,
          onClick: () => setIsModalOpen(true)
        },
        {
          key: '3',
          label: (
            <a target='_blank' rel='noopener noreferrer' href='https://github.com/lingSoar/react-admin'>
              项目地址
            </a>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '4',
          label: <span>退出登录</span>,
          onClick: layout
        },
      ]}
    />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [])

  const onLoadData: TreeSelectProps['loadData'] = ({ id, item }) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const childrenTree = initTreeData(item?.children, id)
        setTreeData(handleLoadTreeData(treeData, id, childrenTree))

        resolve('请求结果...')
      }, 300)
    })
  }

  return (
    <div className={`${cls}-avatar`}>
      <Dropdown
        arrow
        overlay={menu}
        placement='bottom'
        trigger={['click']}
      >
        <img
          className={`${cls}-avatar-img`}
          src={avatar}
          alt=''
          onMouseEnter={startSpin}
          onMouseLeave={stopSpin}
          style={{ transform: `rotate(${deg}deg)` }}
        />
      </Dropdown>

      <Modal
        title='个人信息'
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>用户名：{user.map((i, index) => <span key={index}>{i}</span>)}</p>
        <div>
          用户可访问的权限路由：
          <TreeSelect
            allowClear
            placeholder='Please select'
            value={value}
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            onChange={(newValue) => setValue(newValue)}
            loadData={onLoadData}
            treeData={treeData}
          />
        </div>
      </Modal>
    </div>
  )
}

export default UserAvatar