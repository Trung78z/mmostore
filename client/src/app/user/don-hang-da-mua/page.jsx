"use client";

import {
  Input,
  Button,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "@/configs/api";
import { FaS } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { formatDatePost } from "@/lib/utils";
import { toast } from "react-toastify";
import Link from "next/link";
export default function DonHangDaMua() {
  const [rowService, setRowService] = useState([]);
  const [rowOldService, setRowOldService] = useState([]);
  const [rowProduct, setRowProduct] = useState([]);
  const [rowOldProduct, setRowOldProduct] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoading(true);
    try {
      const resService = await axios.get("/orders/user-service", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      const resProduct = await axios.get("/orders/user-product", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (resService.data.success === false) {
        setRowService([]);
      }
      if (resProduct.data.success === false) {
        setRowProduct([]);
      }
      setRowOldService(resService.data.order);
      setRowService(resService.data.order);
      setRowOldProduct(resProduct.data.order);
      setRowProduct(resProduct.data.order);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleActive = async (id) => {
    try {
      const resService = await axios.put("/orders/service/" + id, null, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      const filter = rowService.filter((item) => {
        return item?.id === id ? (item.buyerConfirm = true) : item;
      });
      setRowService(filter);
      toast("Xác nhận thành công!");
    } catch (error) {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    if (active) {
      const filter = rowOldService.filter(
        (item) =>
          item?.id.toString().includes(e.target.value) ||
          item?.total.toString().includes(e.target.value) ||
          item?.serviceSales?.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase()),
      );
      setRowService(filter);
    } else {
      const filter = rowOldProduct.filter(
        (item) =>
          item?.id.toString().includes(e.target.value) ||
          item?.total.toString().includes(e.target.value) ||
          item?.productSales.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase()),
      );
      setRowProduct(filter);
    }
  };
  return (
    <>
      <div className="space-y-2">
        <div className="card flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-2xl font-medium">Đơn hàng đã mua</h1>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <Input
                className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-96"
                onChange={handleSearch}
                placeholder="Tìm mã đơn hàng hoặc số tiền hoặc mặc hàng..."
              ></Input>
            </div>
          </div>
        </div>
        <div className="card space-y-6">
          <p className="text-lg font-medium text-red-500">Xin lưu ý:</p>
          <ul className="px-4">
            <li className="text-sm font-normal text-red-500">
              Bấm vào MÃ ĐƠN HÀNG để xem chi tiết sản phẩm đã mua!
            </li>
            <li className="text-sm font-normal text-green-500">
              Tạp Hóa MMO là sàn thương mại điện tử, vì vậy tính năng và chất
              lượng sản phẩm không thể nào rõ bằng người bán hàng, nếu có bất cứ
              thắc mắc gì về mặt hàng, xin liên hệ chủ shop để được giải quyết
              hoặc bảo hành.
            </li>
            <li className="text-sm font-normal text-green-500">
              Tạp Hóa MMO là sàn thương mại điện tử, vì vậy tính năng và chất
              lượng sản phẩm không thể nào rõ bằng người bán hàng, nếu có bất cứ
              thắc mắc gì về mặt hàng, xin liên hệ chủ shop để được giải quyết
              hoặc bảo hành.
            </li>
            <li className="text-sm font-normal text-green-500">
              Tạp Hóa MMO là sàn thương mại điện tử, vì vậy tính năng và chất
              lượng sản phẩm không thể nào rõ bằng người bán hàng, nếu có bất cứ
              thắc mắc gì về mặt hàng, xin liên hệ chủ shop để được giải quyết
              hoặc bảo hành.
            </li>
          </ul>

          <TabGroup>
            <TabList className="flex items-center gap-x-2">
              <Tab
                className="rounded-lg px-2 py-1 data-[selected]:bg-blue-500 data-[selected]:text-white"
                onClick={() => setActive(false)}
              >
                Đơn hàng sản phẩm
              </Tab>
              <Tab
                className="rounded-lg px-2 py-1 data-[selected]:bg-blue-500 data-[selected]:text-white"
                onClick={() => setActive(true)}
              >
                Đơn hàng dịch vụ
              </Tab>
            </TabList>
            <TabPanels className="w-full">
              <TabPanel>
                <Table>
                  <TableCaption>
                    {rowService.length > 0
                      ? "Bạn chưa mua đơn hàng nào!"
                      : "Danh sách đơn hàng của bạn!"}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn hàng</TableHead>
                      <TableHead>Ngày mua</TableHead>
                      <TableHead className="px-1 text-center">
                        Gian hàng
                      </TableHead>
                      <TableHead className="px-1 text-center">
                        Mặt hàng
                      </TableHead>
                      <TableHead className="px-1 text-center">
                        Người bán
                      </TableHead>

                      <TableHead className="px-1 text-center">
                        Số lượng
                      </TableHead>
                      <TableHead className="px-1 text-center">
                        Đơn giá
                      </TableHead>
                      <TableHead className="px-1 text-center">Giảm</TableHead>
                      <TableHead className="px-1 text-center">
                        Tổng tiền
                      </TableHead>
                      <TableHead className="px-1 text-center">
                        Hoàn tiền
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rowProduct.map((item) => (
                      <TableRow key={item?.id}>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          <Link
                            href={`/user/don-hang/${item?.id}`}
                            className="rounded-md bg-blue-500 px-2 text-background"
                          >
                            {item?.id}
                          </Link>
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {formatDatePost(item?.createdAt)}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.products.subCategory.subCategory}
                        </TableCell>
                        <TableCell className="p-1 text-start font-medium">
                          {item?.productSales.title}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.products?.user?.username}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.amount}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.unitPrice}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.sale}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.total}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.refund}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel>
                <Table>
                  <TableCaption>
                    {rowService.length < 1
                      ? "Bạn chưa mua đơn hàng nào!"
                      : "Danh sách đơn hàng của bạn!"}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn hàng</TableHead>
                      <TableHead>Ngày mua</TableHead>
                      <TableHead className="px-1 text-center">
                        Gian hàng
                      </TableHead>
                      <TableHead className="px-1 text-center">
                        Mặt hàng
                      </TableHead>
                      <TableHead className="px-1 text-center">
                        Người bán
                      </TableHead>
                      <TableHead className="px-1 text-center">
                        Số lượng
                      </TableHead>
                      <TableHead className="px-1 text-center">
                        Đơn giá
                      </TableHead>
                      <TableHead className="px-1 text-center">Giảm</TableHead>
                      <TableHead className="px-1 text-center">
                        Tổng tiền
                      </TableHead>
                      <TableHead className="px-1 text-center">
                        Hoàn tiền
                      </TableHead>
                      <TableHead className="flex-shrink-0 px-1 text-start">
                        Xác nhận hoàn thành
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rowService.map((item) => (
                      <TableRow key={item?.id}>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.room?.length > 0 ? (
                            <Link
                              href={`/chat/${item?.room[0]?.id}`}
                              className="rounded-md bg-blue-500 px-2 text-background"
                            >
                              {item?.id}
                            </Link>
                          ) : (
                            item?.id
                          )}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {formatDatePost(item?.createdAt)}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.services?.subCategory?.subCategory}
                        </TableCell>
                        <TableCell className="p-1 text-start font-medium">
                          {item?.serviceSales?.title}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.services?.user?.username}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.amount}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.unitPrice}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.sale}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.total}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          {item?.refund}
                        </TableCell>
                        <TableCell className="px-1 py-2 text-center font-medium">
                          <Button
                            disabled={item?.buyerConfirm}
                            className={`flex items-center gap-2 text-xl ${!item.buyerConfirm ? `text-red-500` : `text-green-500`} `}
                            onClick={() => handleActive(item?.id)}
                          >
                            <FaCheckCircle />
                            <span
                              className={`text-sm font-normal ${!item.buyerConfirm && `text-red-500`} `}
                            >
                              {item?.buyerConfirm
                                ? "Đã xác nhận"
                                : "Chưa xác nhận"}
                            </span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </>
  );
}
