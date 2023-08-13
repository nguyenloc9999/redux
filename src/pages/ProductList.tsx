import { useGetProductsQuery } from "@/api/product";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";

const ProductList = () => {
  const {data, error, isLoading}  = useGetProductsQuery();

const dataSource = data?.map(({id, name, price, image, description}: any) => {
  return {
    key: id,
    name,
    price,
    image,
    description
  }
})

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: "image",  
    key: "name",
    render:(image) =><div><img src={image.image} alt="" /></div>
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Action',
    key: 'action',
    render: ({key: id}: any) => {
      return(
        <>
      <Button type="primary" danger className="ml-2">
        <Link to={`/product/${id}`}>Detail</Link>
      </Button>
        </>
      )
    }
  },
];

return (
    <div className="max-w-4xl mx-auto">
    <div className="flex justify-between items-center mb-10 mt-10">
      <h2 className="font-bold text-2xl">Danh sach san pham</h2>
    </div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 3 }} />
    </div>
  )
}
export default ProductList
