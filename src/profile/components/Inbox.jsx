import React, { useEffect, useState } from 'react';
import { SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useUser } from '@clerk/clerk-react';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';

function Inbox() {
    const { user } = useUser();
    const [userId, setUserId] = useState("");
    const [channelUrl, setChannelUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const id = user.primaryEmailAddress?.emailAddress?.split("@")[0];
            if (id) {
                setUserId(id);
            } else {
                console.error("Failed to derive user ID from email.");
            }
            setLoading(false);
        } else {
            console.error("User is not authenticated.");
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!userId) {
        return <div>Error: Unable to retrieve user information.</div>;
    }

    return (
        <div className="w-full h-screen flex flex-col overflow-hidden">
            <SendBirdProvider
                appId={import.meta.env.VITE_SENDBIRD_APP_ID}
                userId={userId}
                nickname={user?.fullName || "Guest"}
                profileUrl={user?.imageUrl || "https://via.placeholder.com/150"}
                allowProfileEdit={true}
                onError={(error) => {
                    console.error("SendBird Error:", error);
                    alert("Error loading chat: " + error.message);
                }}
            >
                <div className="flex h-full overflow-hidden">
                    {/* Channel list section */}
                    <div className="w-1/4 bg-white border-r border-gray-300 p-4 overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Channels</h2>
                        <GroupChannelList
                            onChannelSelect={(channel) => {
                                if (channel && channel.url) {
                                    setChannelUrl(channel.url);
                                } else {
                                    console.error("Selected channel is invalid or has no URL.");
                                    setChannelUrl(null);
                                }
                            }}
                            channelListQueryParams={{
                                includeEmpty: true, // Ensure empty channels are included
                                limit: 30, // Adjust limit as necessary
                            }}
                            renderChannelPreview={(channel) => {
                                console.log("Channel Data:", channel); // Log channel data for debugging

                                return (
                                    <div
                                        key={channel.url} // Add a key for proper list rendering
                                        className="flex items-center py-2 px-3 mb-3 rounded-lg hover:bg-gray-200 cursor-pointer"
                                        onClick={() => setChannelUrl(channel.url)}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                                        <div className="flex-1">
                                            {/* Show fallback name */}
                                            <p className="text-sm font-medium">
                                                {channel.name || "Unnamed Channel"}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {channel.lastMessage?.message || "No messages yet"}
                                            </p>
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {channel.lastMessage?.createdAt
                                                ? new Date(channel.lastMessage.createdAt).toLocaleTimeString()
                                                : ""}
                                        </div>
                                    </div>
                                );
                            }}
                        />
                    </div>

                    {/* Chat window section */}
                    <div className="flex-1 bg-white p-6 overflow-auto">
                        {channelUrl ? (
                            <GroupChannel channelUrl={channelUrl} />
                        ) : (
                            <div className="text-center text-gray-500">
                                <p className="text-xl font-medium">Select a channel to start chatting.</p>
                            </div>
                        )}
                    </div>
                </div>
            </SendBirdProvider>
        </div>
    );
}

export default Inbox;
