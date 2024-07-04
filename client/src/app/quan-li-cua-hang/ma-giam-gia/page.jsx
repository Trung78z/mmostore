"use client";
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
import { useRouter } from "next/navigation";

export default function DonHangDaMua() {
  const router = useRouter();
  const handleClickAdd = () => {
    router.push("/quan-li-cua-hang/ma-giam-gia/them-moi");
  };
  return (
    <>
      <div className="space-y-2 px-2 py-4">
        <div className="card flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-2xl font-medium">Giảm giá</h1>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <Button
                className="bg-green-400 px-2 py-0 text-sm"
                onClick={handleClickAdd}
              >
                Thêm mới
              </Button>
            </div>
          </div>
        </div>
        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">STT</TableHead>
                <TableHead className="w-[100px]">Thao tác</TableHead>
                <TableHead>Mã giảm giá</TableHead>
                <TableHead>Gian hàng</TableHead>
                <TableHead className="text-right">Bắt đầu</TableHead>
                <TableHead className="text-right">Kết thúc</TableHead>
                <TableHead className="text-right">Tỷ lệ giảm</TableHead>
                <TableHead className="text-right">Giảm tối đa</TableHead>
                <TableHead className="text-right">Lượt sử dụng</TableHead>
                <TableHead className="text-right">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
