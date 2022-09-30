import { useMemoizedFn } from 'ahooks'
import { Badge, Form, Input, Modal } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ColorPicker from '@/components/ColorPicker'
import { randomColor } from '@/utils/random'

export interface IEnv {
  env: string
  env_color: string
}
interface IProps {
  ref: any
  data: any
  children?: React.ReactNode
  onChange: (v: IEnv) => void
}
const EditEnvModal: React.FC<IProps> = forwardRef((props, ref) => {
  const { data } = props
  const [formValue, setFormValue] = useState<IEnv>({} as IEnv)
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  useImperativeHandle(
    ref,
    () => ({
      open() {
        setVisible(true)
      },
      close() {
        setVisible(false)
      },
    }),
    [],
  )

  const handleSubmit = useMemoizedFn(() => {
    form.validateFields().then(async (values) => {
      props.onChange?.(values)
      setVisible(false)
    })
  })

  useEffect(() => {
    setFormValue(data)
    form.setFieldsValue(data)
  }, [data, visible])

  const handleUpdateView = useMemoizedFn(() => {
    setFormValue(form.getFieldsValue())
  })
  return (
    <>
      {props.children}
      <Modal
        destroyOnClose
        className="custom"
        open={visible}
        title="更新标签"
        onCancel={() => setVisible(false)}
        onOk={handleSubmit}
      >
        <Form
          initialValues={{
            env_color: props.data.env_color || randomColor(),
            env: props.data.env,
          }}
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <div style={{ paddingRight: 87 }}>
            <Badge.Ribbon color={formValue.env_color} text={formValue.env}>
              <div style={{ height: 30 }}></div>
            </Badge.Ribbon>
          </div>
          <Form.Item name="env" label="标签名" rules={[{ required: true, message: '请输入' }]}>
            <Input placeholder="请输入" onChange={handleUpdateView} />
          </Form.Item>
          <Form.Item name="env_color" label="颜色">
            <ColorPicker onChange={handleUpdateView} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default EditEnvModal
