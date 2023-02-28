import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'

// ROUTES CONTAINERS

import { Root } from './root'
import { Auth } from './auth'

// PAGES

import { Register } from '@/auth/pages/Register'
import { Login } from '@/auth/pages/Login'
import { Home } from '@/chat/pages/Home'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='auth' element={<Auth />}>
        <Route index element={<Navigate to='registro' replace />} />
        <Route path='registro' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Route>
    </>
  )
)
