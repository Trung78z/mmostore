"use client";
import { FaCheck } from "react-icons/fa6";
import React, { Component, useEffect, useState } from "react";
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
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Order() {
  const { id } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/orders/user-product/order/${id}`, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });

        setData(res.data.msg);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);
  const router = useRouter();
  if (data === "" || data === undefined || data === null) {
    return <></>;
  }
  const handleGetData = async () => {
    try {
      const fileResponse = await axios.get(
        `/file/data-account/${data.productFile[0].name}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(new Blob([fileResponse.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "account.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-auto max-w-screen-xl space-y-8 sm:py-10">
      <div className="gird grid-rows-2">
        <div className="grid grid-cols-1 items-center justify-center rounded-sm border-2 p-4 sm:grid-cols-2">
          <div className="col-span-1 space-y-1">
            <h1 className="text-2xl">{data.products.title}</h1>
            <p className="text-red-500">
              Đánh dấu hoặc tải lên file SP lỗi để báo lỗi. Nếu số lượng lỗi
              nhiều, xin hãy khiếu nại đơn hàng!
            </p>
          </div>
          <div className="col-span-1 flex justify-end space-x-4">
            <Button variant="outline" onClick={() => router.back()}>
              Quay lại
            </Button>
            <Button onClick={handleGetData}>Tải đơn hàng</Button>
          </div>
        </div>
        <ul className="list-none space-y-7 rounded-sm border-2 py-6 pl-0">
          <li className="pl-0 text-red-500">
            * Đơn hàng sẽ bị xóa sản phẩm sau{" "}
            <span className="font-semibold">30 ngày</span>, bạn vui lòng lưu về
            máy để tránh mất hàng!
          </li>
          <li className="pl-0 text-red-500">
            * Nếu cột sản phẩm không phải là tài khoản đăng nhập, mà là 1 chuỗi
            ngẫu nhiên, số thứ tự hoặc bất kỳ một chuỗi không liên quan nào, có
            nghĩa là chủ shop đã cố pass hệ thống check trùng của site . Vui
            lòng khiếu nại đơn hàng và báo cho hỗ trợ của sàn để được hoàn tiền.
          </li>
          <li className="pl-0 text-green-500">
            * Vui lòng yêu cầu shop bảo hành trực tiếp trên sàn bằng tính năng
            bảo hành để được bảo đảm quyền lợi và không nhận BH qua bất kỳ kênh
            nào khác, rất có thể bạn sẽ nhận được sản phẩm cũ đã bán cho người
            khác.
          </li>

          <li className="mt-10 pl-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Báo lỗi</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead> Giá trị</TableHead>
                  <TableHead className="text-right">Postback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.productAccountSold.map((item, key) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.password}</TableCell>
                    <TableCell className="text-right"></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </li>
        </ul>
      </div>
    </div>
  );
}
