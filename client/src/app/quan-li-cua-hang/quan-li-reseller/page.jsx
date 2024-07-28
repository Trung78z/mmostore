import { Button } from "@/components/ui/button";
import { Input } from "@headlessui/react";
import React from "react";
import {
  Table,
  TableBody,
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
          <h1 className="flex-1 text-2xl font-medium">Quản lí reseller</h1>

          <div className="flex min-w-full flex-col items-center gap-2 sm:flex-row md:min-w-fit">
            <select
              name=""
              id=""
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
            >
              <option value="Người bán">Tất cả</option>
              <option value="Người bán">Đang chờ</option>
              <option value="Người bán">Đã duyệt</option>
              <option value="Người bán">Đã từ chối</option>
            </select>
            <Button className="px-2 py-0 text-sm">Tìm đơn hàng</Button>
          </div>
        </div>
        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Thao tác</TableHead>
                <TableHead className="text-center">Gian hàng</TableHead>
                <TableHead className="text-center">Tên reseller</TableHead>
                <TableHead className="text-center">Chiết khấu(%)</TableHead>
                <TableHead className="text-center">Ngày yêu cầu</TableHead>
                <TableHead className="text-center">Lời giới thiệu</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="ext-center">INV001</TableCell>
                <TableCell className="text-center">Paid</TableCell>
                <TableCell className="text-center">Credit Card</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
