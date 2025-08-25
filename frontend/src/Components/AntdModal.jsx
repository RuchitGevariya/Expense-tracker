import React, { useEffect } from "react";
import { Modal, Form, Button, Input } from "antd";
const AntdModal = ({visible,mode,initialValuse,onSubmit,onCancel,loading}) => {
const [form]=Form.useForm();

useEffect(()=>{
if(mode ==="edit" && initialValuse){
  form.setFieldsValue(initialValuse)
} else{
form.resetFields()
}
},[mode,initialValuse,form])

const handleFinish=(value)=>{
  onSubmit(value)
}
  return (
    <>
    {/*  Modal  */}
      <Modal
        title={`${mode==="add"?"Add Member":"Edit Member"}`}
        open={visible}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>,
           <Button key="submit" loading={loading} type="primary" onClick={()=>form.submit()}>
            {mode==="add"?"Add Member":"Edit Member"}
          </Button>
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
           <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter member name" />
          </Form.Item>
          {mode ==="add"&&(
            <>
           <Form.Item label="Email" name="email">
            <Input placeholder="Enter member email (optional)" />
          </Form.Item>
          </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default AntdModal;
