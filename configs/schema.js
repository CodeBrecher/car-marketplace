import { varbinary } from "drizzle-orm/mysql-core"
import { integer, json, pgTable,serial,varchar } from "drizzle-orm/pg-core"

export const CarListing = pgTable('CarListing',{
    id:serial('id').primaryKey(),
    listingTitle:varchar('listing Title').notNull(), tagline:varchar('tagline').notNull(),
    originalPrice:varchar('originalPrice').notNull(),
    sellingPrice:varchar('selling Price').notNull(), category:varchar('category').notNull(), condition:varchar('condition').notNull(),
    make:varchar('make').notNull(),
    range:varchar('range').notNull(),
    year:varchar('year').notNull(),
    driveType:varchar('driveType').notNull(),
    transmission:varchar('transmission').notNull(),
    fuelType:varchar('fuelType').notNull(),
    mileage:varchar('mileage').notNull(),
    engineSize:varchar('engineSize').notNull(),
    cylinder:varchar('cylinder').notNull(),
    color:varchar('color').notNull(),
    door:varchar('door').notNull(),
    offerType:varchar('offerType').notNull(),
    vin:varchar('vin'),
    listingDescription:varchar('listing Description').notNull(),
    features:json('features'),
    createdBy: varchar('createdBy').notNull(),
    userName: varchar('userName').notNull().default('Dhruv Gupta'),
    userImageUrl: varchar('userImageUrl').default('https://oaomwriaxhxmmseqjgeo.supabase.co/storage/v1/object/public/images/images/Screenshot%202025-01-26%20at%201.15.16%20AM.png'),
    postedOn: varchar('postedOn')
})


export const CarImages=pgTable('carImages',{
    id:serial('id').primaryKey(),
    imageUrl:varchar('imageUrl').notNull(),
    carListingId:integer('carListingId').notNull().references (() =>CarListing.id)
})
