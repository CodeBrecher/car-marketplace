import { UserButton, useUser, useClerk } from '@clerk/clerk-react';
import React from 'react';
import { Button } from './button';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handleSubmitListingClick = () => {
    if (isSignedIn) {
      // Redirect to the listing submission page
      window.location.href = '/submit-listing';
    } else {
      // Open the Clerk sign-in modal
      openSignIn();
    }
  };

  return (
    <div className="flex justify-between items-center shadow-sm p-5 fixed top-0 left-0 w-full bg-white z-50 h-[80px]">
      <img src="/logo.svg" width={150} height={10} alt="Logo" />
      <ul className="hidden md:flex gap-16">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Home
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Search
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          About Us
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          New
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Preowned
        </li>
      </ul>

      <div className="flex items-center gap-5">
        {isSignedIn ? (
          <>
            <UserButton />
            <Link to="/profile">
              <Button>Submit Listing</Button>
            </Link>
          </>
        ) : (
          <Button onClick={handleSubmitListingClick}>Submit Listing</Button>
        )}
      </div>
    </div>
  );
};
