import React, {useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '@/api/product';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ProductAdd = () => {
  const [addProduct, {isLoading}] = useAddProductMutation();
  const navigate = useNavigate();

  
const onFinish = (values: any) => {
  addProduct(values)
  .unwrap()
  .then(() => {
    return navigate("/admin/product");
  });

};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


const validatePositiveNumber = (_:any, value:any) => {
  if (parseFloat(value) <= 0) {
    return Promise.reject('Giá phải lớn hơn 0');
  }
  return Promise.resolve();
};

type FieldType = {
  name: string;
  price: number;
  image: string;
  description: string
};

return (
  <div className='max-w-4xl mx-auto'>
    <h2 className='font-bold text-2xl mb-4'>Them san pham</h2>
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Ten san pham"
      name="name"
      rules={[{ required: true, message: 'Vui long nhap ten san pham' },
    {min: 3, message: "It nhat 3 ky tu"},]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Gia san pham"
      name="price"
      rules={[{ required: true, message: 'Vui long nhap gia san pham' },
      {validator:validatePositiveNumber} ]}
    >
      <Input type="number"/>
    </Form.Item>
      
    <Form.Item<FieldType>  
            label="Anh san pham" 
            name="image" 
            rules={[{ required: true, message: 'Vui long nhap anh san pham' }]}> 
                    <Input />
                </Form.Item>

    <Form.Item<FieldType>
      label="Mo ta san pham"
      name="description"
      rules={[{ required: true, message: 'Please input your description!' },
      {min: 3, message: "It nhat 3 ky tu"},
    ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      
      wrapperCol={{ offset: 8, span: 16 }}
    >
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" danger htmlType="submit">
        {isLoading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ): (
          "Submit"
        )}
      </Button>
      <Button type="primary" danger className="ml-2" onClick={() => navigate("/admin/product")}>
        Back
      </Button>
    </Form.Item>
  </Form>
  </div>
)
}
  

export default ProductAdd;