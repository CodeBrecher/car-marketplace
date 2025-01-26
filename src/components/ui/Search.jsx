import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-select";
import { CiSearch } from "react-icons/ci";
import data from "@/Data/data";
import { Link } from "react-router-dom";

export const Search = () => {
  const [cars, setCars] = useState('');
  const [make, setMake] = useState('');
  const [price, setPrice] = useState('');

  return (
    <div className="p-2 md:p-6 bg-white rounded-md md:rounded-full flex flex-col md:flex-row gap-10 px-5 items-center w-[55%]">
      {/* Select for New/Old Cars */}
      <Select onValueChange={(value) => setCars(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Used">Used</SelectItem>
          <SelectItem value="Certified Pre-owned">Certified Pre-owned</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-full w-[2px] bg-gray-400 mx-4" />

      {/* Select for Car Brands */}
      <Select onValueChange={(value) => setMake(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Car Brand" />
        </SelectTrigger>
        <SelectContent>
          {data.CarMakes?.map((maker, index) => (
            <SelectItem key={index} value={maker.name}>
              {maker.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-full w-[2px] bg-gray-400 mx-4" />

      {/* Select for Pricing */}
      

      {/* Search Button */}
      <Link to={`/search?${cars ? 'cars=' + cars + '&' : ''}${make ? 'make=' + make + '&' : ''}${price ? 'price=' + price : ''}`}>
        <CiSearch className="text-[40px] bg-primary rounded-full p-4 text-white hover:scale-105 transition-all cursor-pointer" />
      </Link>
    </div>
  );
};
