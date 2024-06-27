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
          <h1 className="flex-1 text-2xl font-medium">
            Đơn hàng đã được đặt trước
          </h1>

          <div className="flex min-w-full flex-col items-center gap-2 sm:flex-row md:min-w-fit">
            <Input
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              placeholder="Nhập mã đơn hàng..."
            ></Input>
            <Button className="px-2 py-0 text-sm">Tìm đơn hàng</Button>
          </div>
        </div>
        <div className="card space-y-6">
          <p className="text-lg font-medium text-red-500">Xin lưu ý:</p>
          <ul className="px-4">
            <li className="text-sm font-normal text-red-500">
              * Thời gian hoàn thành đơn hàng tính bằng ngày, trong thời gian
              đó, nếu kho hàng đủ số lượng thì đơn hàng sẽ tự động hoàn thành.
              Ngược lại đơn sẽ tự hủy và hoàn tiền cho khách.
            </li>
            <li className="text-sm font-normal text-green-500">
              * Bạn có thể hủy đơn trước khi làm mới kho nếu thấy giá bán cũ
              không còn hợp lý.
            </li>
          </ul>
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
