"use client";
import { Button, Input, Select } from "@headlessui/react";
import { FaWindowRestore } from "react-icons/fa";
import { IoMdMailOpen } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import {
  HiMiniChartBarSquare,
  HiMiniRocketLaunch,
  HiMiniServerStack,
  HiMiniSquare3Stack3D,
} from "react-icons/hi2";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/configs/api";
import { useRouter } from "next/navigation";
import SearchPage from "@/components/home/Search";

export default function Home() {
  const router = useRouter();
  const [more, setMore] = useState(false);
  const [item, setItems] = useState([]);
  const handleChangeMore = () => {
    setMore(!more);
  };
  const [initialContent, setInitialContent] = useState("");
  const [fullContent, setFullContent] = useState("");
  useEffect(() => {
    fetch();
  }, []);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [valueCate, setValueCate] = useState("");
  const [subValueCate, setValueSubCate] = useState("");
  const [subCate, setSubCate] = useState([]);
  const [subChildCate, setChildSubCate] = useState([]);
  useEffect(() => {
    const fetchCate = async () => {
      try {
        const response = await axios.get("/categories/services");
        setItems(response.data.msg);
        setSubCate(response.data.msg[0].serviceSubCategory);

        setValueCate(response.data.msg[0].category);
        setValueSubCate(
          response.data.msg[0].serviceSubCategory[0].subCategoryCover,
        );
      } catch (error) {}
    };
    fetchCate();
  }, []);

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await axios.get("/home");

      setContent(data.data.content.content);
      setLoading(false);
      setFullContent(data.data.content.content);
      const maxLength = 300;
      setInitialContent(data.data.content.content.slice(0, maxLength));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleChangeCate = (e) => {
    const filter = item.find((item) => item.category === e.target.value);
    setValueCate(e.target.value);
    setSubCate(filter.serviceSubCategory);
    setValueSubCate(filter.serviceSubCategory[0].subCategoryCover);
  };
  const handleChangeSubCate = (e) => {
    const filter = subCate.find(
      (item) => item.subCategoryCover === e.target.value,
    );
    setValueSubCate(e.target.value);
  };
  const handleSearchButton = () => {
    router.push(
      `/danh-muc/${
        valueCate === "product" ? "san-pham" : "dich-vu"
      }/${subValueCate}`,
    );
  };
  return (
    <>
      <div className="mx-auto max-w-screen-xl space-y-4 p-2 md:p-10 lg:space-y-10 lg:p-20">
        <div className="min-h-60 rounded-md bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfTEJ-1XyZARbRXYSqFgPvdVTvCow6K4PVw&s)] bg-cover bg-no-repeat p-10 md:px-20 lg:px-24 xl:px-40">
          <ul className="space-y-4 md:space-y-7">
            <li className="ml-0 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Select
                name="status"
                className="rounded-md border p-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                aria-label="Project status"
                onChange={handleChangeCate}
              >
                {item.map((item) => {
                  return (
                    <option key={item.id} value={item.category}>
                      {item.category === "product" ? "Sản phẩm" : "Dịch vụ"}
                    </option>
                  );
                })}
              </Select>
              <Select
                name="status"
                className="rounded-md border p-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                aria-label="Project status"
                onChange={handleChangeSubCate}
              >
                {subCate.map((item) => {
                  return (
                    <option key={item.id} value={item.subCategoryCover}>
                      {item.subCategory}
                    </option>
                  );
                })}
              </Select>
            </li>
            <h2 className="text-center text-blue-500">Hoặc</h2>
            <li className="text-md ml-0 flex items-center gap-x-2 font-medium">
              <div className="flex flex-1 flex-col">
                <SearchPage />
              </div>
            </li>
            <li className="ml-0 text-center">
              <Button
                className="rounded bg-primary px-4 py-2 text-sm text-white data-[hover]:bg-primary/80 data-[hover]:data-[active]:bg-primary/90"
                onClick={handleSearchButton}
              >
                Tìm kiếm
              </Button>
            </li>
          </ul>
        </div>

        <div className="space-y-4 px-4 md:px-0">
          <h2 className="text-center text-xl font-medium text-emerald-500">
            -- DANH SÁCH SẢN PHẨM --
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-4">
            <Link href="/danh-muc/san-pham/email">
              <li className="ml-0 flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <IoMdMailOpen className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">Email</h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Gmail, yahoo mail, hot mail... và nhiều hơn thế nữa
                  </p>
                </div>
              </li>
            </Link>
            <Link href="/danh-muc/san-pham/phan-mem">
              <li className="ml-0 flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <HiMiniServerStack className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">Phần mềm</h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Các phần mềm chuyên dụng cho kiếm tiền online từ những coder
                    uy tín
                  </p>
                </div>
              </li>
            </Link>
            <Link href="/danh-muc/san-pham/tai-khoan">
              <li className="ml-0 flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <FaCircleUser className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">Tài khoản</h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Fb, BM, key window, kaspersky....
                  </p>
                </div>
              </li>
            </Link>
            <Link href="/danh-muc/san-pham/khac">
              <li className="ml-0 flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <FaWindowRestore className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">Khác</h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Các sản phẩm số khác
                  </p>
                </div>
              </li>
            </Link>
          </ul>
        </div>
        <div className="space-y-4 px-4 md:px-0">
          <h2 className="text-center text-xl font-medium text-emerald-500">
            -- DANH SÁCH DỊCH VỤ --
          </h2>
          <ul
            className={clsx(
              "transition-max-height grid grid-cols-1 gap-4 overflow-hidden duration-300 ease-in-out md:grid-cols-2 lg:gap-6 xl:grid-cols-4",
            )}
          >
            <Link href="/danh-muc/dich-vu/tang-tuong-tac">
              <li className="ml-0 flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <HiMiniChartBarSquare className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">
                    Tăng tương tác
                  </h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Tăng like, view.share, comment... cho sản phẩm của bạn
                  </p>
                </div>
              </li>
            </Link>
            <Link href="/danh-muc/dich-vu/dich-vu-phan-mem">
              <li className="ml-0 flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <HiMiniServerStack className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">
                    Dịch vụ phần mềm
                  </h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Dịch vụ code tool MMO, đồ họa, video... và các dịch vụ liên
                    quan
                  </p>
                </div>
              </li>
            </Link>
            <Link href="/danh-muc/dich-vu/blockchain">
              <li className="ml-0 flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <HiMiniSquare3Stack3D className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">
                    Blockchain
                  </h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Dịch vụ tiền ảo, NFT, coinlist... và các dịch vụ blockchain
                    khác
                  </p>
                </div>
              </li>
            </Link>
            <Link href="/danh-muc/dich-vu/dich-vu-khac">
              <li className="ml-0 flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <HiMiniRocketLaunch className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">
                    Dịch vụ khác
                  </h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Các dịch vụ MMO phổ biến khác hiện nay
                  </p>
                </div>
              </li>
            </Link>
          </ul>
        </div>
        <div className="relative space-y-3 rounded-md border border-blue-600 bg-background p-2 shadow-md transition-all">
          <div
            dangerouslySetInnerHTML={{
              __html: more ? fullContent : initialContent,
            }}
            id="contentFetch"
          ></div>
          <Button
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 rounded bg-primary px-4 text-sm text-white data-[hover]:bg-primary/80 data-[hover]:data-[active]:bg-primary/90"
            onClick={handleChangeMore}
          >
            {more ? "Ít hơn" : "Nhiều hơn"}
          </Button>
        </div>
      </div>
    </>
  );
}
