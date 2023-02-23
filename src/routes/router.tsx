import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'

// ROUTES CONTAINERS

import { Root } from './root'

// PAGES

import { Register } from '../auth/pages/Register'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Root />}>
        <Route index />
      </Route>
      <Route path='auth'>
        <Route index element={<Navigate to='registro' replace />} />
        <Route path='registro' element={<Register />} />
        <Route path='login' element={<h1>Login</h1>} />
      </Route>
    </>
  )
)
