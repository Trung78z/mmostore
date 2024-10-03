"use client";
import { Input, Button, Select } from "@headlessui/react";
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
import { toast } from "react-toastify";
import { IoIosAddCircle } from "react-icons/io";

export default function DonHangDaMua() {
  const [row, setRow] = useState([]);
  const [rowOld, setRowOld] = useState([]);
  const [rowService, setRowService] = useState([]);
  const [rowProduct, setRowProduct] = useState([]);
  const [category, setCategory] = useState("san-pham");
  const router = useRouter();
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const resService = await axios.get("/services/by/user", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      setRowService(resService.data.msg);
      const resProduct = await axios.get("/products/by/user", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      setRow(resProduct.data.msg);
      setRowOld(resProduct.data.msg);
      setRowProduct(resProduct.data.msg);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickAdd = () => {
    router.push("/quan-li-cua-hang/quan-li-gian-hang/them-moi");
  };
  const handleAddProductSell = (slug) => {
    router.push(`/quan-li-cua-hang/quan-li-gian-hang/${slug}`);
  };

  const handleDelete = async (id) => {
    const dele = category === "san-pham" ? "/products/" : "/services/";
    try {
      const resService = await axios.delete(dele + id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      const filter = row.filter((item) => item.id !== id);
      setRow(filter);
      toast("Đã xóa thành công! ");
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setCategory(value);
    if (value === "san-pham") {
      setRow(rowProduct);
    } else {
      setRow(rowService);
    }
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
          <div className="flex justify-end">
            <Select
              className="block min-w-max rounded-md border py-2"
              id="category"
              onChange={handleChange}
            >
              <option value="san-pham">Sản phẩm</option>
              <option value="dich-vu">Dịch vụ</option>
            </Select>
          </div>
          <Table>
            <TableCaption>
              {row.length < 1
                ? "Bạn chưa có sản phẩm nào trên gian hàng!"
                : "Danh sách sản phẩm trên gian hàng của bạn!"}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead className="text-start">Trùng</TableHead>
                <TableHead className="text-start">Reseller</TableHead>
                <TableHead className="text-start">Đơn giá</TableHead>
                <TableHead className="text-start">Sàn</TableHead>
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
                    {item.duplicate ? "Có" : "Không"}
                  </TableCell>
                  <TableCell className="text-start font-medium">
                    {item.reseller ? "Có" : "Không"}
                  </TableCell>
                  <TableCell className="text-start font-medium">
                    {category === "san-pham"
                      ? item.productSales.length !== 0
                        ? item.productSales.length > 1
                          ? getMinMaxPrice(item.productSales)
                          : item.productSales[0].price
                        : 0
                      : item.serviceSales?.length > 0
                        ? item.serviceSales?.length > 1
                          ? getMinMaxPrice(item.serviceSales)
                          : item.serviceSales[0]?.price
                        : 0}
                  </TableCell>
                  <TableCell className="text-start font-medium">Zalo</TableCell>

                  <TableCell className="text-start font-medium">
                    {new Date(item.updatedAt).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-start font-medium">
                    {item.status === "success"
                      ? "Đã duyệt"
                      : item.status === "error"
                        ? "Đã bị từ chối!"
                        : "Chờ xác nhận!"}
                  </TableCell>
                  <TableCell className="flex-shrink-0 text-center">
                    {category === "san-pham" && (
                      <Button
                        className="text-xl text-green-500 hover:text-green-600"
                        onClick={() => handleAddProductSell(item.slug)}
                      >
                        <IoIosAddCircle />
                      </Button>
                    )}

                    <Button
                      className="text-xl text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete />
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
