import AppLayout from 'layouts/AppLayout';
import DashboardPage from 'pages/DashboardPage';
import LoginPage from 'pages/LoginPage';
import UserPage from 'pages/UserPage';
import CategoriesPage from 'pages/CategoriesPage';
import CategoryDetailPage from 'pages/CategoryDetailPage';
import ProductsPage from 'pages/ProductsPage';
import ProductDetailPage from 'pages/ProductDetailPage';
import OrdersPage from 'pages/OrdersPage';
import OrderDetailPage from 'pages/OrderDetailPage';
import ErrorPage from 'pages/ErrorPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'categories/create', element: <CategoryDetailPage /> },
      { path: 'categories/:id', element: <CategoryDetailPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/create', element: <ProductDetailPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'orders/:id', element: <OrderDetailPage /> },
      { path: 'users', element: <UserPage /> },
    ],
  },
  { path: 'login', element: <LoginPage /> },
  { path: '*', element: <ErrorPage /> },
];

export default routes;
