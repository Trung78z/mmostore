"use client";
import { Button } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from "@headlessui/react";

import axios from "@/configs/api";
import { formatDatePost } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
function formatPrice(price) {
  return price.toLocaleString("vi-VN");
}
const schema = z.object({
  total: z
    .number()
    .min(10000, { message: "Vui lòng nạp ít nhất 10k VND" })
    .max(1000000, { message: "Vui lòng nạp nhiều nhất 1tr VND" }),
  banking: z
    .string()
    .min(10, { message: "Vui lòng ghi rõ tên ngân hàng" })
    .max(100, { message: "Tên ngân hàng gì mà nhiều thế!" }),
  accountBank: z
    .string()
    .min(8, { message: "Vui lòng ghi rõ tên ngân hàng" })
    .max(30, { message: "Tên ngân hàng gì mà nhiều thế!" }),
});

export default function LichSuThanhToan() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  let [isOpen, setIsOpen] = useState(false);
  const [row, setRow] = useState([]);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const response = await axios.get("/payment/", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      console.log(response.data);
      setRow(response.data.payment);
    } catch (error) {}
  };
  const onSubmit = async (data) => {
    try {
    } catch (error) {}
  };
  return (
    <div>
      <TabGroup>
        <TabList className="space-x-2">
          <Tab className="rounded-lg bg-primary px-4 py-2 text-white hover:border-primary/80">
            Lịch sử giao dịch
          </Tab>
          <Tab className="rounded-lg bg-green-500 px-4 py-2 text-white hover:border-primary/80">
            Rút tiền
          </Tab>
        </TabList>
        <TabPanels className="mt-10">
          <TabPanel>
            <div className="card">
              <h2 className="text-xl">Lịch sử giao dịch</h2>
            </div>
            <div className="card">
              <Table className="w-max">
                <TableHeader>
                  <TableRow>
                    <TableHead className="">id </TableHead>
                    <TableHead className="w-[100px]">Ngày </TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Số tiền</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {row.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell className="w-[180px] flex-shrink-0 font-medium">
                        {formatDatePost(item.updatedAt)}
                      </TableCell>
                      <TableCell>VND</TableCell>
                      <TableCell>
                        {item.total.toLocaleString("vi-VN")}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.status === "ide" ? "Đang chờ" : "Đã thành công"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="card flex items-center justify-between">
              <h2 className="text-xl">Lịch sử rút tiền</h2>
              <Button
                className="rounded-lg bg-green-500 px-4 py-2 text-white hover:border-primary/80"
                onClick={() => setIsOpen(true)}
              >
                Tạo yêu cầu rút tiền
              </Button>
              <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
              >
                <form onSubmit={handleSubmit}>
                  <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 rounded-lg border bg-white p-12">
                      <DialogTitle className="font-bold">
                        Yêu cầu rút tiền
                      </DialogTitle>

                      <Description className="text-green-500">
                        Hệ thống chỉ lưu số tài khoản cho đến khi giao dịch
                        thành công. Số tiền GD tối thiểu là 500.000 và phải là
                        bội số của 100.000 .
                      </Description>
                      <Fieldset className="space-y-4">
                        <Field>
                          <Label className="block">Số tiền</Label>
                          <Input
                            name="total"
                            type="number"
                            {...register("total", { valueAsNumber: true })}
                            className="mt-1 block min-w-full rounded-sm border p-2"
                          />
                        </Field>

                        <Field>
                          <Label className="block">Tên ngân hàng</Label>
                          <Input
                            className="mt-1 block min-w-full rounded-sm border p-2"
                            name="bank"
                          />
                        </Field>
                        <Field>
                          <Label className="block">Số tài khoản</Label>
                          <Input
                            className="mt-1 block min-w-full rounded-sm border p-2"
                            name="bankId"
                          />
                        </Field>
                      </Fieldset>
                      <div className="flex justify-end gap-4">
                        <Button
                          onClick={() => setIsOpen(false)}
                          className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:border-primary/80"
                        >
                          Đóng
                        </Button>
                        <Button
                          type="submit"
                          className="rounded-lg bg-green-500 px-4 py-2 text-white hover:border-primary/80"
                        >
                          Rút tiền
                        </Button>
                      </div>
                    </DialogPanel>
                  </div>
                </form>
              </Dialog>
            </div>
            <div className="card">
              <Table className="w-max">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">ID </TableHead>
                    <TableHead className="text-center">Ngày yêu cầu </TableHead>
                    <TableHead className="text-center">Tên ngân hàng</TableHead>
                    <TableHead className="text-center">Số tài khoản</TableHead>
                    <TableHead className="text-center">Yêu cầu</TableHead>
                    <TableHead className="text-center">Số tiền</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>dsadsads</TableCell>
                    <TableCell className="font-medium">
                      {new Date().toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>AGRIBANK</TableCell>
                    <TableCell>29381023812093</TableCell>
                    <TableCell>VND</TableCell>
                    <TableCell>222222</TableCell>
                    <TableCell>ide</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
