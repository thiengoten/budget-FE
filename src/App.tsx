import router from '@/routes'
import { RouterProvider } from 'react-router-dom'

function App() {
  // useEffect(() => {
  //   ;(async () => {
  //     const data = await getAllBudgets()
  //     console.log(data)
  //   })()
  // }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
