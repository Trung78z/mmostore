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
  const [rowOld, setRowOld] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/orders/user-sell-product", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (response.data.success === false) {
        setRow([]);
      }

      setLoading(false);
      setRow(response.data.order);
      setRowOld(response.data.order);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleActive = async (id) => {
    try {
      const response = await axios.put("/orders/product/" + id, null, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      const filter = row.filter((item) => {
        return item.id === id ? (item.buyerConfirm = true) : item;
      });
      setRow(filter);
      toast("Xác nhận thành công!");
      // setLoading(false);
      // setRow(response.data.order);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    const filter = rowOld.filter(
      (item) =>
        item.id.toString().includes(e.target.value) ||
        item.total.toString().includes(e.target.value) ||
        item.productSales.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.products.user.username
          .toLowerCase()
          .includes(e.target.value.toLowerCase()),
    );
    setRow(filter);
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
              onChange={handleSearch}
            ></Input>
            <Input
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              placeholder="Nhập tên người mua..."
              onChange={handleSearch}
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
                  Mã đơn hàng
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Ngày mua
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Gian hàng
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-center">
                  Mặt hàng
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Người mua
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
                    {item.products.subCategory.subCategory}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.productSales.title}
                  </TableCell>
                  <TableCell className="px-1 py-2 font-medium">
                    {item.users.username}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
