import React from 'react'
import data from '@/Data/data'
import { Link } from 'react-router-dom'
export const Category = () => 
{
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-3xl text-center mb-6'>Browse By Type</h2>

        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20'>
            {data.Category.map((category,index)=>(
              <Link to ={'search/'+category.name}>
                <div className='border rounded-xl p-3 items-center flex flex-col'>
                    <img src = {category.icon} width={40} height = {35}></img>
                    <h2>{category.name}</h2>
                    </div>
              </Link>
            ))}
        </div>

    </div>
  )
}
