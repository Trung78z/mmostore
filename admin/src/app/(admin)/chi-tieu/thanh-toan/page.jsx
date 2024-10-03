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
import { cn } from "@/lib/utils";
export default function Payment() {
  const [data, setData] = useState([]);
  const [dataOld, setDataOld] = useState(payment);
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await axios.get("/payment/withdraw/admin", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });

        if (data.data.success === false) {
          return setData([]);
        }
        setData(data.data.payment);
        setDataOld(data.data.payment);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
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
  const handleActive = async (id) => {
    try {
      const data = await axios.put(
        `/payment/admin/draw/${id}`,
        { status: "success" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );
      const update = dataOld.map((value) => {
        if (value.id === id) {
          value.status = "success";
        }
        return value;
      });
      setDataOld(update);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilterStatus = (e) => {
    console.log(e.target.value);
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
          <h1 className="flex-1 text-2xl font-medium">Thanh toán</h1>
          <div className="space-x-4">
            <Input
              onChange={handleSearch}
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              placeholder="Nhập tên hóa đơn..."
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
              {data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{item?.id}</TableCell>
                  <TableCell className="text-center">
                    {item?.accountBank}
                  </TableCell>{" "}
                  <TableCell className="text-center">{item?.banking}</TableCell>
                  <TableCell className="text-center">{item?.total}</TableCell>
                  <TableCell className="text-center">
                    {item?.updatedAt}
                  </TableCell>{" "}
                  <TableCell className="text-center">
                    {item?.createdAt}
                  </TableCell>{" "}
                  <TableCell className="text-center">{item?.status}</TableCell>
                  <TableCell className="text-center">
                    {/* <Button
                      className="text-xl text-red-500"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete />
                    </Button>{" "} */}
                    <Button
                      className={cn(
                        "text-xl",
                        item.status === "success" || item.status === "cancel"
                          ? "text-green-300"
                          : "text-green-500",
                      )}
                      disabled={
                        item.status === "success" || item.status === "cancel"
                          ? true
                          : false
                      }
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
