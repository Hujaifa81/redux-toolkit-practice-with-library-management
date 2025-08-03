import { StrictMode } from 'react'
import * as ReactDOM from "react-dom/client";
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from './components/ui/sonner.tsx'
import { router } from './routes/routes.tsx'
import {
  RouterProvider
} from "react-router-dom";




ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    <Toaster richColors position="top-right"/>
    </Provider>
  </StrictMode>,
)
