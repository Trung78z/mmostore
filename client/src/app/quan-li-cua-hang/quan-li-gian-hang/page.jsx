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
    router.push("/quan-li-cua-hang/quan-li-gian-hang/them-moi");
  };
  return (
    <>
      <div className="space-y-2 px-2 py-4">
        <div className="card flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-2xl font-medium">Gian hàng</h1>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <Input
                className="min-h-10 flex-1 rounded-lg border px-2"
                placeholder="Nhập mã đơn hàng..."
              ></Input>

              <Button className="px-2 py-0 text-sm">Tìm đơn hàng</Button>
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
          <p className="text-lg font-medium text-red-500">Xin lưu ý:</p>
          <ul className="px-4">
            <li className="text-sm font-normal text-red-500">
              Bấm vào MÃ ĐƠN HÀNG để xem chi tiết sản phẩm đã mua!
            </li>
            <li className="text-sm font-normal text-green-500">
              Tạp Hóa MMO là sàn thương mại điện tử, vì vậy tính năng và chất
              lượng sản phẩm không thể nào rõ bằng người bán hàng, nếu có bất cứ
              thắc mắc gì về mặt hàng, xin liên hệ chủ shop để được giải quyết
              hoặc bảo hành.
            </li>
            <li className="text-sm font-normal text-green-500">
              Tạp Hóa MMO là sàn thương mại điện tử, vì vậy tính năng và chất
              lượng sản phẩm không thể nào rõ bằng người bán hàng, nếu có bất cứ
              thắc mắc gì về mặt hàng, xin liên hệ chủ shop để được giải quyết
              hoặc bảo hành.
            </li>
            <li className="text-sm font-normal text-green-500">
              Tạp Hóa MMO là sàn thương mại điện tử, vì vậy tính năng và chất
              lượng sản phẩm không thể nào rõ bằng người bán hàng, nếu có bất cứ
              thắc mắc gì về mặt hàng, xin liên hệ chủ shop để được giải quyết
              hoặc bảo hành.
            </li>
          </ul>
          <Table>
            <TableCaption>A list of your recent .</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Thao tác</TableHead>
                <TableHead>Tên đơn hàng</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead className="text-right">Trùng</TableHead>
                <TableHead className="text-right">Reseller</TableHead>
                <TableHead className="text-right">Đơn giá</TableHead>
                <TableHead className="text-right">Sàn</TableHead>
                <TableHead className="text-right">Kho</TableHead>
                <TableHead className="text-right">Ngày tạo</TableHead>
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
