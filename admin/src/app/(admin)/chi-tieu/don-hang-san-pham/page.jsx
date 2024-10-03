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

import axios from "@/configs/api";
import { cn, formatDatePost } from "@/lib/utils";
import { toast } from "react-toastify";
import { products } from "@/lib/placeholder";
export default function DonHangSanPham() {
  const [data, setData] = useState([]);
  const [dataOld, setDataOld] = useState([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await axios.get("/orders/product", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      setDataOld(response.data.order);
      const filter = response.data.order.filter(
        (item) => item.status === "create",
      );
      setData(filter);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActive = async (id, total, userId, receiving) => {
    try {
      const res = await axios.put(
        "/orders/admin-product/" + id,
        {
          status: "success",
          total: (total * (100 - parseInt(receiving))) / 100,
          userId,
        },
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
        "/orders/admin/" + id,
        { status: "cancel" },
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
              <option value="create">Chưa hoàn thành</option>
              <option value="cancel">Đã hủy</option>
              <option value="success">Đã hoàn thành</option>
            </select>
          </div>
        </div>
        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Mã đơn hàng</TableHead>
                <TableHead className="text-center">Tên khách hàng</TableHead>
                <TableHead className="text-center">Tên người bán</TableHead>
                <TableHead className="text-center">Số tiền</TableHead>
                <TableHead className="text-center">Thanh toán</TableHead>
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
                    {item.users.username}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.products?.user?.username}
                  </TableCell>
                  <TableCell className="text-center">{item.total}</TableCell>
                  <TableCell className="text-center">
                    {console.log(item.id, item.products?.receiving)}
                    {(item.total *
                      (100 - parseInt(item.products?.receiving || 0))) /
                      100}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDatePost(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDatePost(item.updatedAt)}
                  </TableCell>
                  <TableCell className="text-center">{item.status}</TableCell>

                  <TableCell className="text-center">
                    <Button
                      className="text-xl text-red-500"
                      disabled={
                        item.status === "success" || item.status === "cancel"
                          ? true
                          : false
                      }
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete />
                    </Button>
                    <Button
                      className="text-xl text-green-500"
                      disabled={
                        item.status === "success" || item.status === "cancel"
                          ? true
                          : false
                      }
                      onClick={() =>
                        handleActive(
                          item.id,
                          item.total,
                          item.products.userId,
                          item.products?.receiving || 0,
                        )
                      }
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
