import { Button } from "@/components/ui/button";
import { Input } from "@headlessui/react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function DonHangSanPham() {
  return (
    <div className="space-y-2 px-2 py-4">
      <div className="space-y-2">
        <div className="card flex flex-col items-center justify-between md:flex-row">
          <h1 className="flex-1 text-2xl font-medium">Đơn hàng đã bán</h1>

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
              <option value="Người bán">Tạm giữ tiền</option>
              <option value="Người bán">Hoàn thành</option>
              <option value="Người bán">Hủy</option>
              <option value="Người bán">Thất bại</option>
            </select>
            <Button className="px-2 py-0 text-sm">Tìm đơn hàng</Button>
          </div>
        </div>
        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Thao tác</TableHead>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Ngày mua</TableHead>
                <TableHead className="text-right">Gian hàng</TableHead>
                <TableHead className="text-right">Mặt hàng</TableHead>
                <TableHead className="text-right">Người bán</TableHead>
                <TableHead className="text-right">Số lượng</TableHead>
                <TableHead className="text-right">Đơn giá</TableHead>
                <TableHead className="text-right">Giảm</TableHead>
                <TableHead className="text-right">Tổng tiền</TableHead>
                <TableHead className="text-right">Hoàn tiền</TableHead>
                <TableHead className="text-right">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
