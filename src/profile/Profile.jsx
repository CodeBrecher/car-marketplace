import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/ui/header';
import MyListing from './components/MyListing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//import Inbox from './components/Inbox';

function Profile() {
    return (
        <div>
            <Header />
            <br /><br /><br /><br />
            
            <div className='px-10 md:px-20 my-10'>
                <Tabs defaultValue="my-listing" className="w-full">
                    <TabsList className="w-full flex justify-start">
                        <TabsTrigger 
                            value="my-listing" 
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-l-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600">
                            My Listing
                        </TabsTrigger>
                        <TabsTrigger 
                            value="inbox" 
                            className="bg-gray-300 text-gray-800 py-2 px-4 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        >
                            Inbox
                        </TabsTrigger>
                        <TabsTrigger 
                            value="profile" 
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-r-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        >
                            Profile
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-listing">
                        <MyListing />
                    </TabsContent>
                    <TabsContent value="inbox"></TabsContent>
                    <TabsContent value="profile">Change your password here.</TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Profile;
