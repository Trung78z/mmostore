"use client";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { IoMdMailOpen } from "react-icons/io";
import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
export default function HeaderBar() {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs()); // Update currentTime every second
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="flex w-full items-center justify-between space-x-2 bg-blue-200 px-2 py-0 md:px-10 lg:px-40">
        <span className="flex items-center space-x-2">
          <span className="hidden items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 md:block">
            Hỗ trợ trực tuyến:
          </span>
          <div className="hidden items-center space-x-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 md:flex">
            <FaFacebook />
            <span className=" ">facebook.com</span>
          </div>
          <div className="hidden items-center space-x-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 md:flex">
            <IoMdMailOpen />
            <span className=" ">gmail.com</span>
          </div>
        </span>
        <span className="flex items-center space-x-2">
          <span className="mr-auto rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Thời gian hoạt động từ: 08:00-16:00
          </span>
          {/* {currentTime && (
            <span className="mr-auto rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {currentTime.format("YYYY-MM-DD HH:mm:ss")}
            </span>
          )} */}
        </span>
      </div>
    </>
  );
}
