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
            <li className="text-sm font-normal text-green-500">
              Đơn khiếu nại sẽ có 2 trạng thái. 1.Khiếu nại: Khách hàng khiếu
              nại về đơn hàng của bạn. 2.Tranh chấp: Bạn không đồng ý với khiếu
              nại trên và chủ động chuyển sang trạng thái 2 bên tranh chấp.
            </li>
            <li className="text-sm font-normal text-green-500">
              Khi đơn hàng ở trạng thái {"Khiếu nại"}, nếu trong vòng 72h, khách
              không hủy khiếu nại, hoặc bạn không chủ động chuyển sang tranh
              chấp, thì đơn hàng sẽ tự động hoàn tiền.
            </li>
            <li className="text-sm font-normal text-green-500">
              Đa phần khách khiếu nại là đợi các bạn bảo hành, nên hãy chủ động
              liên hệ và xử lý cho khách nhé.
            </li>
            <li className="text-sm font-normal text-green-500">
              Nếu tỷ lệ khiếu nại quá cao (so với tổng số đơn hàng), hệ thống sẽ
              tự động đóng gian hàng, các bạn hãy kiểm tra lại hàng trước khi mở
              bán lại nhé.
            </li>
          </ul>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">STT</TableHead>
                <TableHead className="w-[100px]">Thao tác</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead className="text-right">Mã</TableHead>
                <TableHead className="text-right">Gian hàng</TableHead>
                <TableHead className="text-right">Người mua</TableHead>
                <TableHead className="text-right">Số lượng</TableHead>
                <TableHead className="text-right">Tổng</TableHead>
                <TableHead className="text-right">Nội dung</TableHead>
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
