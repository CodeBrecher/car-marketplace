import { Button } from '@/components/ui/button';
import Service from '@/Data/Service';
import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function OwnersDetail({ carDetail }) {
  const { user } = useUser();
  // const userId = user?.primaryEmailAddress?.emailAddress?.split('@')[0];
  // const ownerUserId = carDetail?.createdBy?.split('@')[0];
  const navigation = useNavigate();

  // const onMessageOwnerClick = async () => {
  //   try {
  //     // Check if user already exists before creating
  //     const checkUserExists = async (id, name, profileUrl) => {
  //       try {
  //         const existingUser = await Service.GetSendBirdUser(id);
  //         if (!existingUser) {
  //           await Service.CreateSendBirdUser(id, name, profileUrl);
  //           console.log(`User created: ${id}`);
  //         } else {
  //           console.log(`User already exists: ${id}`);
  //         }
  //       } catch (error) {
  //         console.error(`Error checking/creating user ${id}:`, error);
  //       }
  //     };

  //     await checkUserExists(userId, user?.fullName, user?.imageUrl);
  //     await checkUserExists(ownerUserId, carDetail?.userName, carDetail?.userImageUrl);

  //     // Create or retrieve an existing channel
  //     const channelResponse = await Service.CreateSendBirdChannel([userId, ownerUserId], carDetail?.listingTitle);
  //     console.log("Channel response:", channelResponse);

  //     if (channelResponse?.channel_url) {
  //       console.log("Channel Created Successfully");
  //     } else {
  //       console.error("Failed to create channel");
  //     }

  //     // Redirect to profile page after the process
  //     navigation('/profile');  // Navigate to profile page after messaging flow
  //   } catch (error) {
  //     console.error("Error in messaging flow:", error);
  //   }
  // };

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
      <h2 className='font-medium text-2xl mb-3'>Owner/Deals</h2>
      <img src={carDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full mt-4' alt='Owner' />
      <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
      <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>
      <Button 
        className='w-full mt-6'      >
        Message Owner
      </Button>
    </div>
  );
}

export default OwnersDetail;
