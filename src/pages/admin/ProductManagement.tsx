import { useGetProductsQuery, useRemoveProductMutation } from "@/api/product";
import { Button, Skeleton, Table, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProductManagement = () => {
  const {data, error, isLoading}  = useGetProductsQuery();
  const [removeProduct, {isLoading: isRemoveLoading}] = useRemoveProductMutation();
  if (isLoading) return <Skeleton/>;
  if(error) return <div>Error</div>;

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
    title: "Image",
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
        <Popconfirm
           placement="topLeft"
           title={"Ban co chac chan muon xoa khong?"}
           onConfirm={() => confirm(id)}
           okText="Yes"
           cancelText="No"
        >
          <Button>
            {isRemoveLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ): (
              "Delete"
            )}
          </Button>
      </Popconfirm>
      <Button type="primary" danger className="ml-2">
        <Link to={`/admin/product/${id}/update`}>Update</Link>
      </Button>
        </>
      )
    }
  },
];
const confirm = (id) => {
  removeProduct(id)
}
return (
  <div className="max-w-4xl mx-auto">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-2xl">Quan ly san pham</h2>
      <Button type="primary" danger>
        <Link to="/admin/product/add">Them san pham</Link>
      </Button>
    </div>
    <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 3 }} />
  </div>
)

}
export default ProductManagement