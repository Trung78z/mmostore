"use client";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import axios from "@/configs/api";
const schema = z
  .object({
    passwordOld: z
      .string()
      .min(8, { message: "Vui lòng nhập ít nhất 8 kí tự!" })
      .max(20, { message: "Vui lòng nhập nhiều nhất 20 kí tự!" })
      .regex(/[a-z]/, {
        message: "Vui lòng nhập ít nhất 1 chữ số viết thường!",
      })
      .regex(/[A-Z]/, {
        message: "Vui lòng nhập ít nhất 1 chữ số viết hoa!",
      })
      .regex(/[0-9]/, { message: "Vui lòng nhập ít nhất 1 chữ số!" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Vui lòng nhập ít nhất 1 kí tự đặc biệt!",
      }),

    passwordNew: z
      .string()
      .min(8, { message: "Vui lòng nhập ít nhất 8 kí tự!" })
      .max(20, { message: "Vui lòng nhập nhiều nhất 20 kí tự!" })
      .regex(/[a-z]/, {
        message: "Vui lòng nhập ít nhất 1 chữ số viết thường!",
      })
      .regex(/[A-Z]/, {
        message: "Vui lòng nhập ít nhất 1 chữ số viết hoa!",
      })
      .regex(/[0-9]/, { message: "Vui lòng nhập ít nhất 1 chữ số!" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Vui lòng nhập ít nhất 1 kí tự đặc biệt!",
      }),
    confirmPasswordNew: z
      .string()
      .min(8, { message: "Vui lòng nhập ít nhất 8 kí tự!" })
      .max(20, { message: "Vui lòng nhập nhiều nhất 20 kí tự!" })
      .regex(/[a-z]/, {
        message: "Vui lòng nhập ít nhất 1 chữ số viết thường!",
      })
      .regex(/[A-Z]/, {
        message: "Vui lòng nhập ít nhất 1 chữ số viết hoa!",
      })
      .regex(/[0-9]/, { message: "Vui lòng nhập ít nhất 1 chữ số!" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Vui lòng nhập ít nhất 1 kí tự đặc biệt!",
      }),
  })
  .refine((data) => data.passwordNew === data.confirmPasswordNew, {
    message: "Mật khẩu không trùng khớp!",
    path: ["confirmPassword"],
  });

export default function DoiMatKhau() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  async function handleUpdateUser(data) {
    try {
      const response = await axios.put(
        "/user",
        { data },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );
      if (response.data.success === false) {
        return toast(response.data.data.msg);
      }
      reset({ passwordOld: "", passwordNew: "", confirmPasswordNew: "" });
      toast("Update thành công!");
    } catch (error) {
      toast("Update không thành công!");
    }
  }
  return (
    <div className="relative max-w-full px-2">
      <h3>Đổi mật khẩu</h3>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <Fieldset className="mt-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Field>
              <Label className="block">
                Mật khẩu cũ<span className="text-red-500">*</span>
              </Label>
              <Input
                name="passwordOld"
                type="password"
                {...register("passwordOld")}
                className="min-h-10 min-w-full max-w-full rounded-lg border px-2"
                placeholder="Nhập mật khẩu cũ..."
              ></Input>{" "}
              {errors.passwordOld && (
                <p className="text-red-600">{errors.passwordOld.message}</p>
              )}
            </Field>{" "}
          </div>

          <div className="relative grid w-full grid-cols-2 gap-x-2">
            <Field>
              <Label>
                Mật khẩu mới<span className="text-red-500">*</span>
              </Label>
              <Input
                name="passwordNew"
                type="password"
                {...register("passwordNew")}
                className="min-h-10 min-w-full max-w-full rounded-lg border px-2"
                placeholder="Nhập mật khẩu mới..."
              ></Input>
              {errors.passwordNew && (
                <p className="text-red-600">{errors.passwordNew.message}</p>
              )}
            </Field>{" "}
            <Field>
              <Label>
                Nhập lại mật khẩu mới<span className="text-red-500">*</span>
              </Label>
              <Input
                name="confirmPasswordNew"
                type="password"
                {...register("confirmPasswordNew")}
                className="min-h-10 min-w-full max-w-full rounded-lg border px-2"
                placeholder="Nhập lại mật khẩu mới..."
              ></Input>{" "}
              {errors.confirmPasswordNew && (
                <p className="text-red-600">
                  {errors.confirmPasswordNew.message}
                </p>
              )}
            </Field>
          </div>

          <div className="flex justify-end gap-2">
            <Button className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:border-primary/80">
              Trở về
            </Button>
            <Button
              className="rounded-md bg-green-500 px-4 py-2 text-white hover:border-primary/80"
              type="submit"
            >
              Cập nhật
            </Button>
          </div>
        </Fieldset>
      </form>
    </div>
  );
}
