"use client";
import { Button } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import Swal from "sweetalert2";
function formatPrice(price) {
  return price.toLocaleString("vi-VN");
}
const schema = z.object({
  total: z
    .number({ invalid_type_error: "Chỉ chấp nhận số" })
    .min(10000, { message: "Vui lòng rút ít nhất 10k VND" })
    .max(5000000, { message: "Vui lòng rút nhiều nhất 5tr VND" }),
  banking: z
    .string()
    .min(10, { message: "Vui lòng ghi rõ tên ngân hàng" })
    .max(100, { message: "Tên ngân hàng gì mà nhiều thế!" }),
  accountBank: z
    .string()
    .min(8, { message: "Vui lòng ghi rõ số tài khoản" })
    .max(30, { message: "Số tài khoản gì mà nhiều thế!" }),
});

export default function LichSuThanhToan() {
  const { authState, setAuthState } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  let [isOpen, setIsOpen] = useState(false);
  const [row, setRow] = useState([]);
  const [rowDraw, setRowDraw] = useState([]);
  useEffect(() => {
    fetch();
    fetchWithdraw();
  }, []);
  const fetchWithdraw = async () => {
    try {
      const res = await axios.get("/payment/withdraw/user", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      setRowDraw(res.data.payment);
    } catch (error) {
      console.log(error);
    }
  };
  const fetch = async () => {
    try {
      const response = await axios.get("/payment/", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      setRow(response.data.payment);
    } catch (error) {}
  };
  const onSubmit = async (data) => {
    if (authState.accountBalance < data.total) {
      return Swal.fire({
        title: "Bạn không đủ tiền?",
        text: "Bạn không đủ tiền để rút?",
        icon: "info",
      });
    }
    try {
      const response = await axios.post("/payment/withdraw", data, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });

      setRowDraw((prev) => [...prev, response.data.withDraw.msg]);
      setAuthState({
        ...authState,
        accountBalance: response.data.withDraw.resProfile.accountBalance,
      });
      reset({ total: 0, banking: "", accountBank: "" });
      toast.success("Yêu cầu rút tiền thành công!");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Yêu cầu rút tiền không thành công!");
    }
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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                          />{" "}
                          {errors.total && (
                            <p className="text-red-600">
                              {errors.total.message}
                            </p>
                          )}
                        </Field>

                        <Field>
                          <Label className="block">Tên ngân hàng</Label>
                          <Input
                            name="banking"
                            type="text"
                            {...register("banking")}
                            className="mt-1 block min-w-full rounded-sm border p-2"
                          />{" "}
                          {errors.banking && (
                            <p className="text-red-600">
                              {errors.banking.message}
                            </p>
                          )}
                        </Field>
                        <Field>
                          <Label className="block">Số tài khoản</Label>
                          <Input
                            name="accountBank"
                            type="text"
                            {...register("accountBank")}
                            className="mt-1 block min-w-full rounded-sm border p-2"
                          />{" "}
                          {errors.accountBank && (
                            <p className="text-red-600">
                              {errors.accountBank.message}
                            </p>
                          )}
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
                  {rowDraw.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell className="font-medium">
                        {formatDatePost(item.createdAt)}
                      </TableCell>
                      <TableCell>{item.banking}</TableCell>
                      <TableCell>{item.accountBank}</TableCell>
                      <TableCell>VND</TableCell>
                      <TableCell>{item.total}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
