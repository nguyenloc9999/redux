import { createBrowserRouter, Navigate } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import LayoutAdmin from "./layouts/LayoutAdmin";
import ProductManagement from "./pages/admin/ProductManagement";
import ProductUpdate from "./pages/admin/ProductUpdate";
import ProductAdd from "./pages/admin/ProductAdd";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <div>HomePage</div>
    },
    {
        path: "/product",
        element: <ProductList />,
    },
    {
        path: "/product/:idProduct",
        element: <ProductDetail products={[]} />,
    },
    {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" />,
            },
            {
                path: "dashboard",
                element: (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                    </div>
                ),
            },
            {
                path: "product",
                element: <ProductManagement />,
            },
            {
                path: "product/add",
                element: <ProductAdd />,
            },
            {
                path: "product/:idProduct/update",
                element: <ProductUpdate />,
            },
        ],
    },
]);

