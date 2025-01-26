
/** @type { import ("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql', 
    dbCredentials:{
        url: 'postgresql://car-marketplace_owner:4lC9LjWpuFGz@ep-young-sunset-a50om0r1.us-east-2.aws.neon.tech/car-marketplace?sslmode=require',
    }
};