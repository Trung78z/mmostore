"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import { Button, Input } from "@headlessui/react";
import ViewBaiviet from "@/components/kiemduyet/ViewBaiviet";
import { payment } from "@/lib/placeholder";
import ViewPricing from "@/components/thanhtoan/ViewPricing";

export default function DonHangSanPham() {
  const [data, setData] = useState([]);
  const [dataOld, setDataOld] = useState(payment);
  useEffect(() => {
    const update = payment.filter(
      (item) => item.status === "Đang chờ thanh toán",
    );
    setData(update);
  }, []);
  const handleDelete = (id) => {
    const updateData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: "Đã từ chối" };
      }
      return item;
    });
    const updateData1 = dataOld.map((item) => {
      if (item.id === id) {
        return { ...item, status: "Đã từ chối" };
      }
      return item;
    });
    setDataOld(updateData1);
    setData(updateData);
  };
  const handleActive = (id) => {
    const updateData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: "Đã thanh toán" };
      }
      return item;
    });
    setData(updateData);
    const updateData1 = dataOld.map((item) => {
      if (item.id === id) {
        return { ...item, status: "Đã thanh toán" };
      }
      return item;
    });
    setDataOld(updateData1);
  };
  const handleFilterStatus = (e) => {
    console.log(e.target.value);
    const update = dataOld.filter((item) => item.status === e.target.value);
    setData(update);
  };

  return (
    <div className="space-y-2 px-2 py-4">
      <div className="space-y-2">
        <div className="card flex flex-col items-center justify-between md:flex-row">
          <h1 className="flex-1 text-2xl font-medium">Sản phẩm</h1>
          <div className="space-x-4">
            <Input
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              placeholder="Nhập tiêu đề bài viết..."
            ></Input>
            <select
              name=""
              id=""
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              onChange={handleFilterStatus}
            >
              <option value="Đang chờ thanh toán">Đang chờ thanh toán</option>
              <option value="Đã thanh toán">Đã thanh toán</option>
              <option value="Từ chối thanh toán">Từ chối thanh toán</option>
            </select>
          </div>
        </div>
        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Mã đơn hàng</TableHead>
                <TableHead className="text-center">Tên đơn hàng</TableHead>
                <TableHead className="text-center">Số tài khoản</TableHead>
                <TableHead className="text-center">Tên ngân hàng</TableHead>
                <TableHead className="text-center">Số tiền</TableHead>
                <TableHead className="text-center">Ngày tạo</TableHead>
                <TableHead className="text-center">Ngày thanh toán</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{item.maDH}</TableCell>
                  <TableCell className="text-center">{item.tenDH}</TableCell>
                  <TableCell className="text-center">{item.stk}</TableCell>{" "}
                  <TableCell className="text-center">{item.tenNH}</TableCell>
                  <TableCell className="text-center">{item.pricing}</TableCell>
                  <TableCell className="text-center">
                    {item.dateUpdate}
                  </TableCell>{" "}
                  <TableCell className="text-center">
                    {item.dateBanking}
                  </TableCell>{" "}
                  <TableCell className="text-center">{item.status}</TableCell>
                  <TableCell className="text-center">
                    <ViewPricing item={item} />
                    <Button
                      className="text-xl text-red-500"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete />
                    </Button>{" "}
                    <Button
                      className="text-xl text-green-500"
                      onClick={() => handleActive(item.id)}
                    >
                      <FaCheckCircle />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
