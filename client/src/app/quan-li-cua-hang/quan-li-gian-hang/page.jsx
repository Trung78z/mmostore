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
import { useRouter } from "next/navigation";
import axios from "@/configs/api";
import { formatContent, getMinMaxPrice } from "@/lib/utils";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle, FaEye } from "react-icons/fa";

export default function DonHangDaMua() {
  const [row, setRow] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await axios.get("/services/by/user", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      setRow(response.data.msg);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickAdd = () => {
    router.push("/quan-li-cua-hang/quan-li-gian-hang/them-moi");
  };
  const handleDelete = () => {};
  const handleActive = () => {};
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

              <Button className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90">
                Tìm đơn hàng
              </Button>
              <Button
                className="rounded-lg bg-green-400 px-3 py-2 text-sm font-medium text-white hover:bg-green-500"
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
            <TableCaption>
              {row.length < 1
                ? "Bạn chưa có sản phẩm nào trên gian hàng!"
                : "Danh sách sản phẩm trên gian hàng của bạn!"}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Tên đơn hàng</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead className="text-start">Trùng</TableHead>
                <TableHead className="text-start">Reseller</TableHead>
                <TableHead className="text-start">Đơn giá</TableHead>
                <TableHead className="text-start">Sàn</TableHead>
                <TableHead className="text-start">Kho</TableHead>
                <TableHead className="text-start">Ngày tạo</TableHead>
                <TableHead className="text-start">Trạng thái</TableHead>
                <TableHead className="w-[100px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {row.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-start font-medium">
                    {formatContent(item.content, 20)}
                  </TableCell>
                  <TableCell className="text-start font-medium">
                    {item.serviceSubCategory?.subCategory}
                  </TableCell>
                  <TableCell className="text-start font-medium">
                    {item.duplicate ? "Có" : "Không"}
                  </TableCell>
                  <TableCell className="text-start font-medium">
                    {item.reseller ? "Có" : "Không"}
                  </TableCell>
                  <TableCell className="text-start font-medium">
                    {item.serviceSales.length !== 0
                      ? item.serviceSales.length > 1
                        ? getMinMaxPrice(item.serviceSales)
                        : item.serviceSales[0].price
                      : 0}
                  </TableCell>
                  <TableCell className="text-start font-medium">Zalo</TableCell>
                  <TableCell className="text-start font-medium">1111</TableCell>
                  <TableCell className="text-start font-medium">
                    {new Date(item.updatedAt).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-start font-medium">
                    {item.published ? "Đã duyệt" : "Chờ xác nhận!"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      className="text-xl text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete />
                    </Button>
                    <Button
                      className="text-xl text-green-500 hover:text-green-600"
                      onClick={() => handleActive(item.id)}
                    >
                      <FaEye />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
