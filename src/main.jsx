import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Homepage from './routes/Homepage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import Write from './routes/Write.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
import MainLayout from './Layouts/MainLayout.jsx';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


// create a router
const router = createBrowserRouter([
 {
  element: <MainLayout />,
  children:  [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/posts",
      element: <PostListPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/write",
      element: <Write />,
    },
    {
      path: ":slug",
      element: <SinglePostPage />,
    }
  ]
 }
]
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
   </ClerkProvider>
  </StrictMode>,
)
