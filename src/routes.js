import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from './layouts/dashboard';
import UserLogin from './pages/users/login';
import UserRegister from './pages/users/register';
import CategoryCreate from './pages/categories/createCategory';
import ListCategory from './pages/categories/list';
import ProductCreate from './pages/products/createProducts';
import ListProduct from './pages/products/list';
// LandPage
import LandPage from './layouts/landpage';
import ListProductHome from './pages/home/products/list';
import ShowProductHome from './pages/home/products/show';

export default function Router(props) {
  const protectedDashboardRoutes = () => {
    if (localStorage.getItem('role') === 'admin') {
      return {
        path: 'dashboard/',
        element: <Dashboard {...props} />,
        children: [
          { path: '/login', element: <UserLogin {...props} /> },
          { path: '/register', element: <UserRegister {...props} /> },
          { path: '/dashboard/', element: <Navigate to="/dashboard/products" /> },
          { path: '/categories', element: <ListCategory {...props} /> },
          { path: '/categories/create', element: <CategoryCreate {...props} /> },
          { path: '/products', element: <ListProduct {...props} /> },
          { path: '/products/create', element: <ProductCreate {...props} /> },
        ]
      }
    }
    else {
      return {}
    }
  }

  return useRoutes([

    {
      path: '/',
      element: <LandPage />,
      children: [

        { path: '/login', element: <UserLogin {...props} /> },
        { path: '/register', element: <UserRegister {...props} /> },
        { path: '/products', element: <ListProductHome {...props} /> },
        { path: '/product/:id', element: <ShowProductHome {...props} /> },
        { path: '/', element: <Navigate to="/products" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    protectedDashboardRoutes(),
    { path: '*', element: <Navigate to="/404" replace /> }

  ]);
}