import React, { useEffect } from 'react';
import { Button, Form, Input, Skeleton } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/product';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


const ProductUpdate = () => {
  const {idProduct} = useParams<{idProduct: string}>();
  const {data: productData, isLoading} = useGetProductByIdQuery(idProduct || "");
  const [updateProduct, {isLoading: isUpdateLoading}] = useUpdateProductMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  

  useEffect(() => {
    form.setFieldsValue({
      name: productData?.name,
      price: productData?.price,
      image: productData?.image,
      description: productData?.description,
    })
  }, [productData]);

const onFinish = (values: any) => {
  updateProduct({...values, id: idProduct})
  .unwrap()
  .then(() => {
    return navigate("/admin/product");
  });
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const validatePositiveNumber = (_: any, value: any) => {
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
    <h2 className='font-bold text-2xl mb-4'>Cap nhat san pham</h2>
    {isLoading ? (
      <Skeleton />
    ) : (
      <Form
      form={form}
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
      { validator: validatePositiveNumber }
    ]}
    >
      <Input type="number" />
    </Form.Item>
            

    <Form.Item<FieldType> label="img sản phẩm" name="image">
                        <Input />
                    </Form.Item>


    <Form.Item
      label="Mo ta san pham"
      name="description"
      rules={[{ required: true, message: 'Please input your description!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      
      wrapperCol={{ offset: 8, span: 16 }}
    >
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" danger htmlType="submit">
            {isUpdateLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
                "Cập nhật sản phẩm"
            )}
        </Button>
        <Button
            className="ml-2"
            type="primary"
            danger
            htmlType="submit"
            onClick={() => navigate("/admin/product")}
        >
            Quay lại
        </Button>
    </Form.Item>
  </Form>
    )}
    
  </div>
)
}
  

export default ProductUpdate;