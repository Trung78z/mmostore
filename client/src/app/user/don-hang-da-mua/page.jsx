"use client";

import { Input, Button } from "@headlessui/react";
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
export default function DonHangDaMua() {
  const [row, setRow] = useState([]);
  const [rowOld, setRowOld] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/orders/user", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (response.data.success === false) {
        setRow([]);
      }
      setRowOld(response.data.order);
      setLoading(false);
      setRow(response.data.order);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleActive = async (id) => {
    try {
      const response = await axios.put("/orders/" + id, null, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      const filter = row.filter((item) => {
        return item.id === id ? (item.buyerConfirm = true) : item;
      });
      setRow(filter);
      toast("Xác nhận thành công!");
    } catch (error) {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    const filter = rowOld.filter(
      (item) =>
        item.id.toString().includes(e.target.value) ||
        item.total.toString().includes(e.target.value) ||
        item.serviceSales.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase()),
    );
    setRow(filter);
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
          <Table>
            <TableCaption>
              {row.length < 1
                ? "Bạn chưa mua đơn hàng nào!"
                : "Danh sách đơn hàng của bạn!"}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Ngày mua</TableHead>
                <TableHead className="text-center">Gian hàng</TableHead>
                <TableHead className="text-center">Mặt hàng</TableHead>
                <TableHead className="text-center">Người bán</TableHead>
                <TableHead className="text-center">Số lượng</TableHead>
                <TableHead className="text-center">Đơn giá</TableHead>
                <TableHead className="text-center">Giảm</TableHead>
                <TableHead className="text-center">Tổng tiền</TableHead>
                <TableHead className="text-center">Hoàn tiền</TableHead>
                <TableHead className="flex-shrink-0 text-start">
                  Xác nhận hoàn thành
                </TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {row.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell className="font-medium">
                    {formatDatePost(item.createdAt)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.services.serviceSubCategory.subCategory}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.serviceSales.title}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.services.user.username}
                  </TableCell>
                  <TableCell className="font-medium">{item.amount}</TableCell>
                  <TableCell className="font-medium">
                    {item.unitPrice}
                  </TableCell>
                  <TableCell className="font-medium">{item.sale}</TableCell>
                  <TableCell className="font-medium">{item.total}</TableCell>
                  <TableCell className="font-medium">{item.refund}</TableCell>
                  <TableCell className="font-medium">
                    <Button
                      disabled={item.buyerConfirm}
                      className={`flex items-center gap-2 text-xl ${!item.buyerConfirm ? `text-red-500` : `text-green-500`} `}
                      onClick={() => handleActive(item.id)}
                    >
                      <FaCheckCircle />
                      <span
                        className={`text-sm font-normal ${!item.buyerConfirm && `text-red-500`} `}
                      >
                        {item.buyerConfirm ? "Đã xác nhận" : "Chưa xác nhận"}
                      </span>
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{item.sale}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
