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
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
export default function DonHangSanPham() {
  const [row, setRow] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/orders/user-sell-service", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (response.data.success === false) {
        setRow([]);
      }

      setLoading(false);
      setRow(response.data.order);
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
      const filter = row.filter((item) => {
        return item?.id === id ? (item.confirmSeller = true) : item;
      });
      setRow(filter);
      toast("Xác nhận thành công!");
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-2 px-2 py-4">
      <div className="space-y-2">
        <div className="card flex flex-col items-center justify-between md:flex-row">
          <h1 className="flex-1 text-2xl font-medium">Đơn hàng dịch vụ</h1>

          <div className="flex min-w-full flex-col items-center gap-2 sm:flex-row md:min-w-fit">
            <Input
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              placeholder="Nhập mã đơn hàng..."
            ></Input>
            <Input
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              placeholder="Nhập tên người mua..."
            ></Input>
            <select
              name=""
              id=""
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
            >
              <option value="Người bán">Tất cả</option>
              <option value="Người bán">Đang đợi chấp nhận</option>
              <option value="Người bán">Đang thực hiện</option>
              <option value="Người bán">Tạm giữ tiền</option>
              <option value="Người bán">Hoàn thành</option>
              <option value="Người bán">Hủy</option>
              <option value="Người bán">Thất bại</option>
            </select>
            <Button className="rounded-md bg-blue-500 px-2 py-2 text-sm font-medium text-white hover:bg-blue-600">
              Tìm đơn hàng
            </Button>
          </div>
        </div>
        <div className="card space-y-6">
          <Table>
            <TableCaption>
              {row.length < 1
                ? "Bạn chưa có đơn hàng nào!"
                : "Danh sách đơn hàng của bạn!"}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  {" "}
                  Mã đơn hàng
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Ngày tạo
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Gian hàng
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-center">
                  Mặt hàng
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Người mua
                </TableHead>{" "}
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Yêu cầu từ người mua
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Số lượng
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Đơn giá
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Giảm
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Tổng tiền
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Hoàn tiền
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Trạng thái
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Xác nhận hoàn thành
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {row.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.id}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.services.subCategory.subCategory}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.serviceSales.title}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.users.username}
                  </TableCell>{" "}
                  <TableCell className="px-1 py-2 font-medium">
                    {item?.content}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.amount}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.unitPrice}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.sale}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.total}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.refund}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.status}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    <Button
                      disabled={item.confirmSeller}
                      className={`flex items-center gap-2 text-xl ${!item.confirmSeller ? `text-red-500` : `text-green-500`} `}
                      onClick={() => handleActive(item.id)}
                    >
                      <FaCheckCircle />
                      <span
                        className={`text-sm font-normal ${!item.confirmSeller && `text-red-500`} `}
                      >
                        {item.confirmSeller ? "Đã xác nhận" : "Chưa xác nhận"}
                      </span>
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
