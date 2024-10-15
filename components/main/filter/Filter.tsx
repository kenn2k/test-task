"use client";
import { useGetVehicle } from "@/hooks/useQueries";
import { VehicleType } from "@/types/types";
import Link from "next/link";
import React, { useState } from "react";

const Filter = () => {
  const { data } = useGetVehicle();
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => 2015 + i
  );

  const isDisabled = !selectedMake || !selectedYear;
  const selectedMakeId = data?.Results?.find(
    (make: VehicleType) => make.MakeName === selectedMake
  )?.MakeId;

  return (
    <div className="h-full flex items-center justify-center ">
      <div className=" bg-red-600 flex flex-col justify-between  gap-4 p-4">
        <div>
          <label
            htmlFor="make"
            className="block text-lg font-medium text-white"
          >
            Vehicle Make:
          </label>
          <select
            id="make"
            className="mt-1 block w-full px-6 py-3 rounded-md border-gray-300 shadow-sm "
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">Select a make</option>
            {data &&
              data.Results &&
              data.Results.map((make: VehicleType) => (
                <option key={make.MakeId} value={make.MakeName}>
                  {make.MakeName}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-lg font-medium text-white"
          >
            Model Year:
          </label>
          <select
            id="year"
            className="mt-1 block w-full px-6 py-3 p-3 rounded-md border-gray-300 shadow-sm "
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select a year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Link
          className={`text-center mt-4 ${
            isDisabled ? "bg-slate-400" : "bg-white"
          } text-red-600 font-bold rounded-md border-2 border-gray-300 px-1 py-2`}
          href={isDisabled ? "#" : `/result/${selectedMakeId}/${selectedYear}`}
          onClick={
            isDisabled
              ? (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()
              : undefined
          }
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Filter;
