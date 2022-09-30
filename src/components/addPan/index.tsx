import { useMemoizedFn } from 'ahooks'
import { Form, Input, message, Modal } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { savePan } from '@/chrome/pans'
import useGlobalContext from '@/context/globalContext'
import { randomColor } from '@/utils/random'

import ColorPicker from '../ColorPicker'
interface IProps {
  ref: any
}
const AddPanModal: React.FC<IProps> = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const { pans, setPans } = useGlobalContext()
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
      const res = await savePan({
        ...values,
      })
      if (res.uuid) {
        setVisible(false)
        pans.push(res)
        setPans([...pans])
        message.success('success')
      }
    })
  })
  return (
    <Modal
      forceRender
      className="custom"
      open={visible}
      title="新增标签"
      onCancel={() => setVisible(false)}
      onOk={handleSubmit}
    >
      <Form
        initialValues={{
          ft_color: randomColor(),
          bg_color: randomColor(),
        }}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item name="name" label="标签名" rules={[{ required: true, message: '请输入' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="ft_color" label="字体颜色">
          <ColorPicker />
        </Form.Item>
        <Form.Item name="bg_color" label="背景颜色">
          <ColorPicker />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default AddPanModal
