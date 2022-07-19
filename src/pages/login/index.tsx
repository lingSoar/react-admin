import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInf } from '@/store/actions/user'
import './login.scss'
// 类名基准
const baseCls = 'admin-login'

const Login: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => (store as IStore)?.user)

  const onFinish = (values: IUser) => {
    const { password, username } = values
    dispatch(getUserInf({ username, password }) as any).then(() => {
      message.success('登录成功')
      navigate('/home', {
        replace: false,
        state: {
          name: '首页'
        }
      })
    }).catch((err: any) => {
      message.error(err.error)
    })
  };

  const onFinishFailed = () => {
    message.error('用户名或者是密码错误')
  };

  // 清除表单数据，setFieldsValue 在onFinish 里不会被执行
  useEffect(() => {
    const userInf = user?.roles ? user?.roles[0] : 'admin'
    form.setFieldsValue({ username: userInf, password: userInf })
    /* eslint-disable-next-line */
  }, [form])

  return (
    <div className={`${baseCls}`}>
      <Form
        form={form}
        name='basic'
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              max: 10,
              message: '用户名最大10位',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              min: 1,
              message: '密码最小1位',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Checkbox>保存用户</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit' >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login