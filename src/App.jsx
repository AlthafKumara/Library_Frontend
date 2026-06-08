import { RouterProvider } from 'react-router-dom'
import { router } from '@/router/index.jsx'

/**
 * App.jsx — Root component
 * Renders the RouterProvider which drives all page navigation.
 * Global providers (QueryClient, etc.) are set up in main.jsx above this.
 */
function App() {
  return <RouterProvider router={router} />
}

export default App

