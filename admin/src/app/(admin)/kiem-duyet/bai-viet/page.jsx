"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { Button, Input } from "@headlessui/react";
import ViewBaiviet from "@/components/kiemduyet/ViewBaiviet";
import { toast } from "react-toastify";
import axios from "@/configs/api";
import { formatDatePost } from "@/lib/utils";
export default function DonHangSanPham() {
  const [data, setData] = useState([]);
  const [dataOld, setDataOld] = useState([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await axios.get("/posts/admin/posts", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      setData(response.data.msg);
      setDataOld(response.data.msg);
      const update = response.data.msg.filter((item) => item.status === "ide");
      if (update.length === 0) {
        setData(response.data.msg);
      } else {
        setData(update);
      }
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.put(
        "/posts/admin/byId/" + id,
        { status: "error" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );

      const update = dataOld.map((value) => {
        if (value.id === id) {
          value.status = "error";
        }
        return value;
      });
      toast("Update thành công!");
      setDataOld(update);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
      console.log(error);
    }
  };
  const handleActive = async (id) => {
    try {
      const res = await axios.put(
        "/posts/admin/byId/" + id,
        { status: "success" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );
      toast("Update thành công!");
      const update = dataOld.map((value) => {
        if (value.id === id) {
          value.status = "success";
        }
        return value;
      });
      setDataOld(update);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
      console.log(error);
    }
  };
  const handleFilterStatus = (e) => {
    const update = dataOld.filter((item) => item.status === e.target.value);
    setData(update);
  };

  return (
    <div className="space-y-2 px-2 py-4">
      <div className="space-y-2">
        <div className="card flex flex-col items-center justify-between px-2 md:flex-row">
          <h1 className="flex-1 text-2xl font-medium">Bài viết</h1>
          <div className="space-x-4">
            <Input
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              placeholder="Nhập tiêu đề bài viết..."
            ></Input>
            <select
              name=""
              id=""
              className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
              onChange={handleFilterStatus}
            >
              <option value="ide">Đang chờ xét duyệt</option>
              <option value="success">Đã xét duyệt</option>
              <option value="error">Đã từ chối</option>
            </select>
          </div>
        </div>
        <div className="card space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="text-center">Người đăng</TableHead>
                <TableHead className="text-center">Tiêu đề</TableHead>
                <TableHead className="text-center">Ngày tạo</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="ext-center">{item.id}</TableCell>
                  <TableCell className="text-center">
                    {item.user.username}
                  </TableCell>
                  <TableCell className="text-center">{item.title}</TableCell>
                  <TableCell className="text-center">
                    {formatDatePost(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-center">{item.status}</TableCell>
                  <TableCell className="text-center">
                    <ViewBaiviet item={item} />
                    <Button
                      className="text-xl text-red-500"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete />
                    </Button>
                    <Button
                      className="text-xl text-green-500"
                      onClick={() => handleActive(item.id)}
                    >
                      <FaCheckCircle />
                    </Button>
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
