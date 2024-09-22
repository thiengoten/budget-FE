import router from '@/routes'
import { RouterProvider } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'

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
      <SpeedInsights />
    </>
  )
}

export default App
