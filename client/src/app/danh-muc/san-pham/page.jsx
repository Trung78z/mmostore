"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@headlessui/react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import LeftDoanhMuc from "@/components/danh-muc/LeftDoanhMuc";
import Link from "next/link";
import { convertToSlug } from "@/lib/utils";

export default function LienHe() {
  return (
    <div className="grid max-w-screen-2xl grid-cols-1 py-4 md:grid-cols-12">
      <div className="col-span-1 hidden md:col-span-3 md:block lg:col-span-2">
        <LeftDoanhMuc />
      </div>
      <div className="col-span-1 md:col-span-9 lg:col-span-10">
        <div className="space-y-6 px-2 md:px-4 lg:pr-10">
          <div className="flex items-center gap-x-4">
            <h3>Gian hàng email</h3>
            <p>Tổng 300 gian hàng</p>
          </div>
          <div className="flex w-full flex-wrap rounded-md border border-primary p-2">
            <h5>
              Đối với gian hàng không trùng, chúng tôi cam kết sản phẩm được bán
              ra 1 lần duy nhất trên hệ thống, tránh trường hợp sản phẩm đó được
              bán nhiều lần.
            </h5>
          </div>
          <Tabs defaultValue="pho-bien" className="w-full">
            <TabsList>
              <TabsTrigger value="pho-bien">Phổ biến</TabsTrigger>
              <TabsTrigger value="priceT">Giá tăng dần</TabsTrigger>
              <TabsTrigger value="priceL">Giá giảm dần</TabsTrigger>
            </TabsList>

            <TabsContent value="pho-bien" className="w-full space-y-2">
              <div className="grid w-full grid-cols-1">
                <CardDanhMuc />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Array.from({ length: 16 }).map((_, index) => (
                  <div key={index}>
                    <CardDanhMucS />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="priceT">Change your password here.</TabsContent>
            <TabsContent value="priceL">Change your password here.</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
const CardDanhMuc = () => {
  return (
    <>
      <div className="col-span-1 flex flex-col gap-4 border px-6 py-1 shadow-md md:flex-row">
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-40 w-40">
            <Image
              src="https://taphoammo.net/img/gmail-ngoai-new-ios-random-ip-ngam-tren-14_728121551.png"
              alt=""
              fill="true"
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div>
            <p>
              Tồn kho: <span className="text-primary"> 20783</span>
            </p>
            <h6>3.000 đ - 4.800 đ</h6>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="">
            <Button className="inline-flex items-center rounded-md bg-primary px-1 text-background hover:bg-primary/80">
              Sản phẩm
            </Button>
            <Link
              href={
                "/danh-muc/san-pham/" +
                convertToSlug(
                  "Gmail NEW iOS US và random,có API đọc mail k login",
                )
              }
            >
              <h6 className="inline-flex items-center">
                Gmail NEW iOS US và random,có API đọc mail k login
              </h6>
            </Link>
          </div>
          <div className="inline-flex items-center">
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaRegStarHalfStroke className="h-4 w-4 text-yellow-500" />
            <p className="inline-flex text-[14px]">
              306 Reviews | Đã bán: 3313997 | Khiếu nại: 0.0%
            </p>
          </div>
          <div>
            <p>
              Người bán: <span className="text-primary"> dviet92</span>
            </p>
          </div>
          <div>
            Sản phẩm: <span className="text-primary">Gmail</span>
          </div>
          <ul className="pl-6">
            <li className="ml-0">
              <p className="text-[14px]">
                Gmail ngoại iOS, random IP, đã ngâm đủ 14 ngày
              </p>
            </li>
            <li className="ml-0">
              <p className="text-[14px]">
                {
                  " Kinh doanh: Gmail random IP >7 ngày ( Đọc mô tả trước khi sử dụng) | Gmail random IP >8 tháng | Gmail random IP >6 tháng | Gmail API random > 7 ngày ( ĐỌC MAIL KHÔNG CẦN OGIN) | Gmail random IP >2 tháng"
                }
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
const CardDanhMucS = () => {
  return (
    <>
      <div className="col-span-1 flex flex-col gap-4 border px-6 py-1 shadow-md md:flex-row">
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-32 w-32">
            <Image
              src="https://taphoammo.net/img/gmail-ngoai-new-ios-random-ip-ngam-tren-14_728121551.png"
              alt=""
              fill="true"
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div>
            <p>
              Tồn kho: <span className="text-primary"> 20783</span>
            </p>
            <h6>3.000 đ - 4.800 đ</h6>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="">
            <Button className="inline-flex items-center rounded-md bg-primary px-1 text-background hover:bg-primary/80">
              Sản phẩm
            </Button>
            <Link
              href={
                "/danh-muc/san-pham/" +
                convertToSlug(
                  "Gmail NEW iOS US và random,có API đọc mail k login",
                )
              }
            >
              <h6 className="inline-flex items-center">
                Gmail NEW iOS US và random,có API đọc mail k login
              </h6>
            </Link>
          </div>
          <div className="inline-flex items-center">
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaStar className="h-4 w-4 text-yellow-500" />
            <FaRegStarHalfStroke className="h-4 w-4 text-yellow-500" />
            <p className="inline-flex text-[14px]">
              306 Reviews | Đã bán: 3313997 | Khiếu nại: 0.0%
            </p>
          </div>
          <div>
            <p>
              Người bán: <span className="text-primary"> dviet92</span>
            </p>
          </div>
          <div>
            Sản phẩm: <span className="text-primary">Gmail</span>
          </div>
          <ul className="pl-4">
            <li className="ml-0">
              <p className="text-[14px]">
                Gmail ngoại iOS, random IP, đã ngâm đủ 14 ngày
              </p>
            </li>
            <li className="ml-0">
              <p className="text-[14px]">
                {
                  " Kinh doanh: Gmail random IP >7 ngày ( Đọc mô tả trước khi sử dụng) | Gmail random IP >8 tháng | Gmail random IP >6 tháng | Gmail API random > 7 ngày ( ĐỌC MAIL KHÔNG CẦN OGIN) | Gmail random IP >2 tháng"
                }
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
