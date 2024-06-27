"use client";
import { Button } from "@headlessui/react";
import React, { useState } from "react";
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

export default function LichSuThanhToan() {
  let [isOpen, setIsOpen] = useState(false);
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
                    <TableHead className="w-[100px]">Ngày </TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Số tiền</TableHead>
                    <TableHead className="text-center">Lí do</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      {new Date().toLocaleDateString()}
                    </TableCell>
                    <TableCell>VND</TableCell>
                    <TableCell>200k</TableCell>
                    <TableCell className="text-right">
                      Khủng hoảng kinh tế
                    </TableCell>
                  </TableRow>
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
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                  <DialogPanel className="max-w-lg space-y-4 rounded-lg border bg-white p-12">
                    <DialogTitle className="font-bold">
                      Yêu cầu rút tiền
                    </DialogTitle>

                    <Description className="text-green-500">
                      Hệ thống chỉ lưu số tài khoản cho đến khi giao dịch thành
                      công. Số tiền GD tối thiểu là 500.000 và phải là bội số
                      của 100.000 .
                    </Description>
                    <Fieldset className="space-y-4">
                      <Field>
                        <Label className="block">Số tiền</Label>
                        <Input
                          className="mt-1 block min-w-full rounded-sm border p-2"
                          name="price"
                        />
                      </Field>
                      <Field>
                        <Label className="block">Tên ngân hàng</Label>
                        <Select
                          className="mt-1 block min-w-full rounded-sm border p-2"
                          name="country"
                        >
                          <option>Canada</option>
                          <option>Mexico</option>
                          <option>United States</option>
                        </Select>
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
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg bg-green-500 px-4 py-2 text-white hover:border-primary/80"
                      >
                        Rút tiền
                      </Button>
                    </div>
                  </DialogPanel>
                </div>
              </Dialog>
            </div>
            <div className="card">
              <Table className="w-max">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Ngày yêu cầu </TableHead>
                    <TableHead className="text-center">Yêu cầu</TableHead>
                    <TableHead className="text-center">Số tiền</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead className="text-center">Mô tả</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      {new Date().toLocaleDateString()}
                    </TableCell>
                    <TableCell>VND</TableCell>
                    <TableCell>200k</TableCell>
                    <TableCell className="text-right">
                      Khủng hoảng kinh tế
                    </TableCell>
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
