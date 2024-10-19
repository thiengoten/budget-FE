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
      //comment: Just for test route
      <Route path='hehe' element={<div>Hehe</div>} />
    </Route>
  )
)
export default router
