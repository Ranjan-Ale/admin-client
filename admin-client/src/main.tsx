import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AdminLayout from './layouts/index.tsx'

import Home from './pages/home/index.tsx'

import ListCategories from './pages/categories/index.tsx'
import AddCategory from './pages/categories/add-category.tsx'
import EditCategory from './pages/categories/edit-category.tsx'


import ListProducts from './pages/products/index.tsx'
import AddProduct from './pages/products/add-product.tsx'
import EditProduct from './pages/products/edit-product.tsx'

import ListReviews from './pages/reviews/index.tsx'
import AddReview from './pages/reviews/add-review.tsx'
import EditReview from './pages/reviews/edit-review.tsx'

import ListOrders from './pages/orders/index.tsx'
import AddOrder from './pages/orders/add-order.tsx'
import EditOrder from './pages/orders/edit-order.tsx'

import ListProductImages from './pages/product_images/index.tsx'
import AddProductImage from './pages/product_images/UploadImage.tsx'
import EditProductImage from './pages/product_images/edit-images.tsx'

import ListUsers from './pages/users/index.tsx'






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
      { path: '/products/:id', Component: EditProduct},
      { path: '/product-reviews', Component: ListReviews },
      { path: '/products-reviews/add', Component: AddReview},
      { path: '/products-reviews/list', Component: ListReviews },
      { path: '/products-reviews/:id', Component: EditReview},
      { path: '/orders', Component: ListOrders },
      { path: '/orders/list', Component: ListOrders },
      { path: '/orders/add', Component: AddOrder},
      { path: '/orders/:id', Component: EditOrder},
      { path: '/product-images', Component: ListProductImages},
      { path: '/product-images/list', Component: ListProductImages},
      { path: '/product-images/add', Component: AddProductImage},
      { path: '/product-images/:id', Component: EditProductImage},
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
