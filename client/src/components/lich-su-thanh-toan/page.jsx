import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Input,
  Label,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export default function RequestWithDraws() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-lg border bg-white p-12">
            <DialogTitle className="font-bold">Yêu cầu rút tiền</DialogTitle>

            <Description className="text-green-500">
              Hệ thống chỉ lưu số tài khoản cho đến khi giao dịch thành công. Số
              tiền GD tối thiểu là 500.000 và phải là bội số của 100.000 .
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
  );
}
