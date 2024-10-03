"use client";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { IoMdMailOpen } from "react-icons/io";
import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
export default function HeaderBar() {
  // const [currentTime, setCurrentTime] = useState(dayjs());

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentTime(dayjs()); // Update currentTime every second
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <>
      <div className="flex w-full items-center justify-between space-x-2 bg-blue-200 px-2 py-0 md:px-4 xl:px-40">
        <span className="flex items-center space-x-2">
          <span className="hidden items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 lg:block">
            Hỗ trợ trực tuyến:
          </span>
          <div className="hidden items-center space-x-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 md:flex">
            <FaFacebook />
            <span className=" ">facebook.com/shoptaphoazalo</span>
          </div>
          <div className="hidden items-center space-x-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 md:flex">
            <IoMdMailOpen />
            <span className=" ">shoptaphoazalo@gmail.com</span>
          </div>
        </span>
        <span className="flex items-center space-x-2">
          <span className="mr-auto rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Thời gian hoạt động của sàn 24/7
          </span>

          <Select defaultValue="vietnamese">
            <SelectTrigger className="mr-auto h-full w-32 rounded-md border-none bg-green-50 bg-transparent px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 focus:ring-0 focus:ring-offset-0 data-[checked]:border-none">
              <SelectValue
                defaultValue="vietnamese"
                defaultChecked="vietnamese"
                className="py-0"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vietnamese">
                <span className="relative flex items-center gap-x-2">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                    width={20}
                    height={20}
                    alt="Logo quốc gia"
                  />
                  Việt Nam
                </span>
              </SelectItem>
              <SelectItem value="english">
                <span className="relative flex items-center gap-x-2">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
                    width={20}
                    height={20}
                    alt="Logo quốc gia"
                  />
                  English
                </span>
              </SelectItem>
              <SelectItem value="china">
                <span className="relative flex items-center gap-x-2">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg"
                    width={20}
                    height={20}
                    alt="Logo quốc gia"
                  />
                  China
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
          {/* <span className="mr-auto rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            {new Date().toLocaleDateString("vi-VN")}
            {new Date().toTimeString()}
          </span> */}
        </span>
      </div>
    </>
  );
}
