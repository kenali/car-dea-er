"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

export default function Home() {
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    )
      .then((response) => response.json())
      .then((data) => {
        setMakes(data.Results);
      });
  }, []);

  return (
    <div className="w-[900px] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Select parameters to filter cars
      </h1>
      <Suspense fallback="Loading...">
          <select
            className="w-[500px] border p-2 mb-4"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          >
            <option value="">Select car brand</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>

          <select
            className="w-[500px] border p-2 mb-4"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select year of release</option>
            {Array.from(
              { length: new Date().getFullYear() - 2014 },
              (_, i) => 2015 + i
            ).map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>

          <Link href={make && year ? `/result/${make}/${year}` : "#"}>
          <br />
            <button
              className="w-[500px] bg-blue-500 text-white p-2"
              disabled={!make || !year}
            >
              Next
            </button>
          </Link>

      </Suspense>
    </div>
  );
}
