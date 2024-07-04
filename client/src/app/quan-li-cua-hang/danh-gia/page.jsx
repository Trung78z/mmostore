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
          <h1 className="flex-1 text-2xl font-medium">Trả lời đánh giá</h1>
        </div>
        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Thao tác</TableHead>
                <TableHead className="text-center">Mã đơn hàng</TableHead>
                <TableHead className="text-center">Tên đơn hàng</TableHead>
                <TableHead className="text-center">Comment</TableHead>
                <TableHead className="text-center">Trả lời</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-center">Ngày tạo</TableHead>
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
