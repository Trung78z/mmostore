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
import ViewPhanHoi from "@/components/phanhoi/ViewPhanHoi";
import { toast } from "react-toastify";
import axios from "@/configs/api";
import { formatContent } from "@/lib/utils";
export default function DonHangSanPham() {
  const [data, setData] = useState([]);
  const [dataOld, setDataOld] = useState(payment);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await axios.get("/contacts/admin/USER", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      setDataOld(response.data.msg);
      const filter = response.data.msg.filter((item) => item.status === "ide");
      setData(filter);
    } catch (error) {}
  };

  const handleActive = async (id) => {
    try {
      const res = await axios.put(
        "/contacts/" + id,
        { status: "success" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );
      toast("Update thành công!");
      const update = dataOld.map((value) => {
        if (value.id === id) {
          value.status = "success";
        }
        return value;
      });
      setDataOld(update);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
      console.log(error);
    }
  };
  const handleFilterStatus = (e) => {
    const update = dataOld.filter((item) => item.status === e.target.value);
    setData(update);
  };
  const handleSearch = (e) => {
    const filter = dataOld.filter(
      (item) =>
        item.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.phone
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.title.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setData(filter);
  };
  return (
    <div className="space-y-2 px-2 py-4">
      <div className="space-y-2">
        <div className="card flex flex-col items-center justify-between md:flex-row">
          <h1 className="flex-1 text-2xl font-medium">
            Phản hồi cho khách hàng
          </h1>
          <div className="space-x-4">
            <Input
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              onChange={handleSearch}
              placeholder="Tìm tên email | số đt..."
            ></Input>
            <select
              name=""
              id=""
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              onChange={handleFilterStatus}
            >
              <option value="ide">Đang chờ phản hồi</option>
              <option value="success">Đã phản hồi</option>
            </select>
          </div>
        </div>
        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Số điện thoại</TableHead>
                <TableHead className="text-center">Chủ đề</TableHead>
                <TableHead className="text-center">Mô tả</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{item.email}</TableCell>
                  <TableCell className="text-center">{item.phone}</TableCell>
                  <TableCell className="text-center">{item.title}</TableCell>
                  <TableCell className="text-center">
                    {formatContent(item.content, 15)}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.status === "ide"
                      ? "Đang chờ phản hồi"
                      : "Đã phản hồi"}
                  </TableCell>
                  <TableCell className="text-center">
                    <ViewPhanHoi item={item} />

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
