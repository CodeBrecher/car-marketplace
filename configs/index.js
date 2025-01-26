import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon("postgresql://car-marketplace_owner:4lC9LjWpuFGz@ep-young-sunset-a50om0r1.us-east-2.aws.neon.tech/car-marketplace?sslmode=require");
export const db = drizzle( sql , {schema});