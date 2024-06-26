"use client";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
} from "@headlessui/react";
import React from "react";
import { toast } from "react-toastify";

export default function DoiMatKhau() {
  function handleUpdateUser() {
    toast("Update thành công!");
  }
  return (
    <div>
      <h3>DoiMatKhau</h3>
      <Fieldset className="mt-10 space-y-8">
        <Field>
          <Label className="block">
            Mật khẩu cũ<span className="text-red-500">*</span>
          </Label>
          <Input
            className="min-h-10 min-w-[49%] flex-1 rounded-lg border px-2"
            placeholder="Nhập mật khẩu cũ..."
          ></Input>
        </Field>
        <Field className="flex items-center gap-x-2">
          <div className="flex-1">
            <Label className="block">
              Mật khẩu mới<span className="text-red-500">*</span>
            </Label>
            <Input
              className="min-h-10 min-w-full flex-1 rounded-lg border px-2"
              placeholder="Nhập mật khẩu mới..."
            ></Input>
          </div>{" "}
          <div className="flex-1">
            <Label className="block">
              Mật khẩu mới<span className="text-red-500">*</span>
            </Label>
            <Input
              className="min-h-10 min-w-full flex-1 rounded-lg border px-2"
              placeholder="Nhập lại mật khẩu mới..."
            ></Input>
          </div>
        </Field>
        <div className="flex justify-end gap-2">
          <Button className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:border-primary/80">
            Trở về
          </Button>
          <Button
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:border-primary/80"
            onClick={handleUpdateUser}
          >
            Cập nhật
          </Button>
        </div>
      </Fieldset>
    </div>
  );
}
