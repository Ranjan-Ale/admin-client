import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/home/index.tsx'
import ListCategories from './pages/categories/index.tsx'
import AddCategory from './pages/categories/add-category.tsx'
import EditCategory from './pages/categories/edit-category.tsx'
import AdminLayout from './layouts/index.tsx'

import ListProducts from './pages/products/index.tsx'
import ListReviews from './pages/reviews/index.tsx'
import ListOrders from './pages/orders/index.tsx'
import AddProduct from './pages/products/add-product.tsx'
import AddReview from './pages/reviews/add-review.tsx'
import AddOrder from './pages/orders/add-order.tsx'
import ListUsers from './pages/users/index.tsx'
import ListProductImages from './pages/product_images/index.tsx'
import UploadImage from './pages/product_images/UploadImage.tsx'



const router = createBrowserRouter([
  {
    path: '/',
    Component: AdminLayout,
    children: [
      { index: true, Component: Home },
      { path: '/categories', Component: ListCategories },
      { path: '/categories/list', Component: ListCategories },
      { path: '/categories/add', Component: AddCategory },
      { path: '/categories/:id', Component: EditCategory },
      { path: '/products', Component: ListProducts },
      { path: '/products/list', Component: ListProducts },
      { path: '/products/add', Component: AddProduct},
      { path: '/product-reviews', Component: ListReviews },
      { path: '/products-reviews/add', Component: AddReview},
      { path: '/reviews/list', Component: ListReviews },
      { path: '/orders', Component: ListOrders },
      { path: '/orders/list', Component: ListOrders },
      { path: '/orders/add', Component: AddOrder},
      { path: '/product-images', Component: ListProductImages},
      { path: '/product-images/list', Component: ListProductImages},
      { path: '/product-images/add', Component: UploadImage},
      { path: '/users', Component: ListUsers},
      { path: '/users/list', Component: ListUsers},
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
