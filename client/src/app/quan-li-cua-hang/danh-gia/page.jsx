"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "@/configs/api";
export default function DonHangSanPham() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  useEffect(() => {
    fetch();
    fetch2();
  }, []);
  const fetch = async () => {
    try {
      const res = await axios.get("/products/review/by-product", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      const combinedProductReviews = res.data.msg.flatMap(
        (item) => item.productReviews,
      );

      setData(combinedProductReviews);
    } catch (error) {
      console.log(error);
    }
  };
  const fetch2 = async () => {
    try {
      const res = await axios.get("/services/review/by-service", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      const combinedProductReviews = res.data.msg.flatMap(
        (item) => item.serviceReviews,
      );

      setData2(combinedProductReviews);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-2 px-2 py-4">
      <div className="space-y-2">
        <div className="card flex flex-col items-center justify-between md:flex-row">
          <h1 className="flex-1 text-2xl font-medium">Đánh giá</h1>
        </div>
        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Sản phẩm</TableHead>
                <TableHead className="text-center">Loại</TableHead>
                <TableHead className="text-center">Comment</TableHead>

                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-center">Ngày tạo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    {item.products.title}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.products.subCategory.subCategory}
                  </TableCell>
                  <TableCell className="text-center">{item.content}</TableCell>
                  <TableCell className="text-center">{item.level}/5</TableCell>
                  <TableCell className="text-center">
                    {item.createdAt}/5
                  </TableCell>
                </TableRow>
              ))}{" "}
              {data2.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    {item.services.title}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.services.subCategory.subCategory}
                  </TableCell>
                  <TableCell className="text-center">{item.content}</TableCell>
                  <TableCell className="text-center">{item.level}/5</TableCell>
                  <TableCell className="text-center">
                    {item.createdAt}/5
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
