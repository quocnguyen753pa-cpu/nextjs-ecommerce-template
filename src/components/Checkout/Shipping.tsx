"use client";

import { useEffect, useState } from "react";
import type { City } from "@/types/city";
import type { Ward } from "@/types/ward";

const selectClass =
  "rounded-md border border-gray-3 bg-gray-1 text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20 disabled:opacity-50";

const Shipping = () => {
  const [dropdown, setDropdown] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingWards, setLoadingWards] = useState(false);

  useEffect(() => {
    fetch("/api/v1/cities")
      .then((r) => r.json())
      .then(setCities)
      .catch(console.error);
  }, []);

  const handleCityChange = async (code: string) => {
    setSelectedCity(code);
    setWards([]);
    if (!code) return;
    setLoadingWards(true);
    try {
      const res = await fetch(`/api/v1/cities/${code}/wards`);
      const data = await res.json();
      setWards(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingWards(false);
    }
  };

  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div
        onClick={() => setDropdown(!dropdown)}
        className="cursor-pointer flex items-center gap-2.5 font-medium text-lg text-dark py-5 px-5.5"
      >
        Ship to a different address?
        <svg
          className={`fill-current ease-out duration-200 ${
            dropdown && "rotate-180"
          }`}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.06103 7.80259C4.30813 7.51431 4.74215 7.48092 5.03044 7.72802L10.9997 12.8445L16.9689 7.72802C17.2572 7.48092 17.6912 7.51431 17.9383 7.80259C18.1854 8.09088 18.1521 8.5249 17.8638 8.772L11.4471 14.272C11.1896 14.4927 10.8097 14.4927 10.5523 14.272L4.1356 8.772C3.84731 8.5249 3.81393 8.09088 4.06103 7.80259Z"
            fill=""
          />
        </svg>
      </div>

      {/* <!-- dropdown menu --> */}
      <div className={`p-4 sm:p-8.5 ${dropdown ? "block" : "hidden"}`}>
        <div className="mb-5">
          <label htmlFor="town" className="block mb-2.5">
            Town/ City <span className="text-red">*</span>
          </label>

          <select
            name="town"
            id="town"
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className={selectClass}
          >
            <option value="">-- Select town/city--</option>
            {cities.map((c) => (
              <option key={c.Code} value={c.Code}>
                {c.FullName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="country" className="block mb-2.5">
            Country
          </label>

          <select
            name="country"
            id="country"
            disabled={!selectedCity || loadingWards}
            className={selectClass}
          >
            <option value="">
              {loadingWards
                ? "Đang tải..."
                : selectedCity
                  ? "-- Select country --"
                  : "-- Select town/city first --"}
            </option>
            {wards.map((w) => (
              <option key={w.Code} value={w.Code}>
                {w.FullName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="address" className="block mb-2.5">
            Street Address
            <span className="text-red">*</span>
          </label>

          <input
            type="text"
            name="address"
            id="address"
            placeholder="House number and street name"
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />

          <div className="mt-5">
            <input
              type="text"
              name="address2"
              id="addressTwo"
              placeholder="Apartment, suite, unit, etc. (optional)"
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2.5">
            Phone <span className="text-red">*</span>
          </label>

          <input
            type="text"
            name="phone"
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2.5">
            Email Address <span className="text-red">*</span>
          </label>

          <input
            type="email"
            name="email"
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>
      </div>
    </div>
  );
};

export default Shipping;
