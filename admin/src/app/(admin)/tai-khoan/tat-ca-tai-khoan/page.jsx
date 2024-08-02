"use client";
import React, { useContext, useEffect, useState } from "react";
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
import axios from "@/configs/api";
import { formatDatePost } from "@/lib/utils";
import { toast } from "react-toastify";
import ViewPricingWithDraw from "@/components/thanhtoan/ViewPricingWithDraw";
import ViewTaiKhoan from "@/components/taikhoan/ViewTaiKhoan";
import { AuthContext } from "@/lib/hooks/AuthProvider";
export default function TaiKhoanSanZalo() {
  const [data, setData] = useState([]);
  const [dataOld, setDataOld] = useState([]);
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await axios.get("/user", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      const filter = response.data.filter((item) => item.id !== authState.id);
      setDataOld(filter);
      setData(filter);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("/user/" + id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      toast("Update thành công!");
      const update = dataOld.filter((value) => value.id !== id);
      setDataOld(update);
      setData(update);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
      console.log(error);
    }
  };
  const handleFilterStatus = (e) => {
    if (e.target.value === "ALL") {
      return setData(dataOld);
    }
    const update = dataOld.filter((item) => item.role === e.target.value);
    setData(update);
  };
  const handleSearch = (e) => {
    const filter = dataOld.filter((item) => item.id.includes(e.target.value));
    setData(filter);
  };
  return (
    <div className="space-y-2 px-2 py-4">
      <div className="space-y-2">
        <div className="card flex flex-col items-center justify-between md:flex-row">
          <h1 className="flex-1 text-2xl font-medium">Tài khoản</h1>
          <div className="space-x-4">
            <Input
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              onChange={handleSearch}
              placeholder="Tìm tên tài khoản..."
            ></Input>
            <select
              name=""
              id=""
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              onChange={handleFilterStatus}
            >
              <option value="ALL">Tất cả tài khoản</option>
              <option value="CUSTOMER">Tài khoản bán hàng</option>
              <option value="ADMIN">Tài khoản admin</option>
              <option value="USER">Tài khoản USER</option>
            </select>
          </div>
        </div>

        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Tên khách hàng</TableHead>
                <TableHead className="text-center">Tên tài khoản</TableHead>
                <TableHead className="text-center">Tên email</TableHead>
                <TableHead className="text-center">Số tiền</TableHead>
                <TableHead className="text-center">Ngày tạo</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">
                    {item.profiles.fullName}
                  </TableCell>
                  <TableCell className="text-center">{item.username}</TableCell>
                  <TableCell className="text-center">{item.email}</TableCell>
                  <TableCell className="text-center">
                    {parseInt(item.profiles.accountBalance).toLocaleString(
                      "vi-VN",
                    )}
                  </TableCell>
                  <TableCell className="w-[190px] text-center">
                    {formatDatePost(item.createdAt)}
                  </TableCell>{" "}
                  <TableCell className="w-[190px] text-center">
                    {item.role}
                  </TableCell>
                  <TableCell className="flex flex-shrink-0 text-center">
                    <ViewTaiKhoan
                      item={item}
                      setData={setData}
                      dataOld={dataOld}
                      setDataOld={setDataOld}
                    />
                    <Button
                      className="text-xl text-red-500"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete />
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
