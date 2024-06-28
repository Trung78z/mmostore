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
import { products } from "@/lib/placeholder";
import { Button, Input } from "@headlessui/react";
import ViewBaiviet from "@/components/kiemduyet/ViewBaiviet";

export default function DonHangSanPham() {
  const [data, setData] = useState([]);
  const [dataOld, setDataOld] = useState(products);
  useEffect(() => {
    const update = products.filter(
      (item) => item.status === "Đang chờ xét duyệt",
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
    toast("Đã từ chối thành công!");
    setDataOld(updateData1);
    setData(updateData);
  };
  const handleActive = (id) => {
    const updateData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: "Đã xét duyệt" };
      }
      return item;
    });
    setData(updateData);
    const updateData1 = dataOld.map((item) => {
      if (item.id === id) {
        return { ...item, status: "Đã xét duyệt" };
      }
      return item;
    });
    toast("Đã xét duyệt thành công!");
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
        <div className="card flex flex-col items-center justify-between px-2 md:flex-row">
          <h1 className="flex-1 text-2xl font-medium">Bài viết</h1>
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
              <option value="Đang chờ xét duyệt">Đang chờ xét duyệt</option>
              <option value="Đã xét duyệt">Đã xét duyệt</option>
              <option value="Đã từ chối">Đã từ chối</option>
            </select>
          </div>
        </div>
        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="text-center">Người đăng</TableHead>
                <TableHead className="text-center">Tiêu đề</TableHead>
                <TableHead className="text-center">Ngày tạo</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="ext-center">{item.id}</TableCell>
                  <TableCell className="text-center">{item.user}</TableCell>
                  <TableCell className="text-center">{item.title}</TableCell>
                  <TableCell className="text-center">
                    {item.dateUpdate}
                  </TableCell>
                  <TableCell className="text-center">{item.status}</TableCell>
                  <TableCell className="text-center">
                    <ViewBaiviet item={item} />
                    <Button
                      className="text-xl text-red-500"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete />
                    </Button>
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
