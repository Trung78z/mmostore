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
import axios from "@/configs/api";
import { formatDatePost } from "@/lib/utils";
import { toast } from "react-toastify";
import ViewPricingWithDraw from "@/components/thanhtoan/ViewPricingWithDraw";
export default function DonHangSanPham() {
  const [data, setData] = useState([]);
  const [dataOld, setDataOld] = useState([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await axios.get("/payment/withdraw/admin", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      setDataOld(response.data.payment);
      const filter = response.data.payment.filter(
        (item) => item.status === "ide",
      );
      setData(filter);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActive = async (id) => {
    try {
      const res = await axios.put(
        "/payment/admin/withdraw/" + id,
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
  const handleDelete = async (id) => {
    try {
      const res = await axios.put(
        "/payment/admin/withdraw/" + id,
        { status: "error" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );
      toast("Update thành công!");
      const update = dataOld.map((value) => {
        if (value.id === id) {
          value.status = "error";
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
    const filter = dataOld.filter((item) => item.id.includes(e.target.value));
    setData(filter);
  };
  return (
    <div className="space-y-2 px-2 py-4">
      <div className="space-y-2">
        <div className="card flex flex-col items-center justify-between md:flex-row">
          <h1 className="flex-1 text-2xl font-medium">Sản phẩm</h1>
          <div className="space-x-4">
            <Input
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              onChange={handleSearch}
              placeholder="Tìm mã đơn hàng..."
            ></Input>
            <select
              name=""
              id=""
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              onChange={handleFilterStatus}
            >
              <option value="ide">Đang chờ thanh toán</option>
              <option value="success">Đã thanh toán</option>
              <option value="error">Từ chối thanh toán</option>
            </select>
          </div>
        </div>

        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Mã đơn hàng</TableHead>
                <TableHead className="text-center">Tên khách hàng</TableHead>
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
                  <TableCell className="text-center">{item.id}</TableCell>
                  <TableCell className="text-center">
                    {item.users.profiles.firstName}
                    <> </>
                    {item.users.profiles.lastName}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.accountBank}
                  </TableCell>
                  <TableCell className="text-center">{item.banking}</TableCell>
                  <TableCell className="text-center">
                    {parseInt(item.total).toLocaleString("vi-VN")}
                  </TableCell>
                  <TableCell className="w-[190px] text-center">
                    {formatDatePost(item.createdAt)}
                  </TableCell>{" "}
                  <TableCell className="w-[190px] text-center">
                    {formatDatePost(item.updatedAt)}
                  </TableCell>{" "}
                  <TableCell className="text-center">{item.status}</TableCell>
                  <TableCell className="text-center">
                    <ViewPricingWithDraw
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
