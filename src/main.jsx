import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import './index.css'
import Home from './home';
import { ClerkProvider } from '@clerk/clerk-react';
import Profile from './profile/Profile';
import AddListing from './AddListing/AddListing';
import SearchByCategory from './search/[category]';
import SearchByOptions from './search/SearchByOptions';
import ListingDetail from './listingDetail/[id]/ListingDetail';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/add-listing',
    element: <AddListing />
  },
  {
    path: '/search/:category',
    element: <SearchByCategory />
  },
  {
    path: '/search',
    element: <SearchByOptions />
  },
  {
    path: '/listing-details/:id',
    element: <ListingDetail />
  }

]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router = {router} />
    </ClerkProvider>
  </StrictMode>,
)
