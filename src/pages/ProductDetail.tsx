import { useGetProductByIdQuery } from "@/api/product";
import { useParams } from "react-router-dom";


export default function ProductDetail() {

  const { idProduct } = useParams<{ idProduct: string  }>();
    const { data: productData, isLoading } = useGetProductByIdQuery(idProduct || "");
    const product = productData
  return (
    <div className="bg-white">
      <div className="pt-6">
       
        <div className="mx-auto max-w-2xl">
          <div className="lg:col-span-2">
            <img
              src={productData?.image}
              className="object-cover object-center"
            />
          </div>

          
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            
            <h1 className="text-2xl font-bold ">{product?.name}</h1>
            <p className="text-3xl text-gray-900">{product?.price}</p>

            <div className="mt-10">

              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product?.description}</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

