import Root from '@/layouts/Root'
import HomePage from '@/pages/HomePage'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<HomePage />} />
    </Route>
  )
)
export default router