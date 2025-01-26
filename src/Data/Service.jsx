 import axios from 'axios';

const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;

const FormatResult = (resp) => {
    const result = {};
    const finalResult = [];

    resp.forEach((item) => {
        const carListing = item.carListing || item.CarListing;
        const images = Array.isArray(item.carImages) ? item.carImages : [item.carImages];

        const listingId = carListing?.id || images?.[0]?.carListingId;

        if (!listingId) {
            console.warn("Skipping item due to missing listingId:", item);
            return;
        }

        if (!result[listingId]) {
            result[listingId] = {
                car: carListing || { id: listingId },
                images: []
            };
        }

        result[listingId].images.push(...images);
    });

    for (const key in result) {
        if (result.hasOwnProperty(key)) {
            finalResult.push({
                ...result[key].car,
                images: result[key].images
            });
        }
    }

    console.log("Formatted Result:", finalResult);
    return finalResult;
};

const CreateSendBirdUser = (userId, nickName, profileUrl) => {
    return axios.post(`https://api-${SendBirdApplicationId}.sendbird.com/v3/users`, {
        user_id: userId,
        nickname: nickName,
        profile_url: profileUrl,
        issue_access_token: false
    }, {
        headers: { 
            'Content-Type': 'application/json',
            'Api-Token': SendBirdApiToken
        }
    });
};

const CreateSendBirdChannel = (users, title) => {
    return axios.post(`https://api-${SendBirdApplicationId}.sendbird.com/v3/group_channels`, {
        user_ids: users,
        is_distinct: true,
        name: title,
        operator_ids: [users[0]]
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Api-Token': SendBirdApiToken
        }
    });
};

export default {
    FormatResult,
    CreateSendBirdUser,
    CreateSendBirdChannel
};
