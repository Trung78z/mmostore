"use client";
import Logo from "@/components/Logo";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "@/configs/api";
import { Suspense, useState } from "react";
import { Button } from "@headlessui/react";
import { BiHide, BiShow } from "react-icons/bi";
import Swal from "sweetalert2";
export default function PageChange() {
  return (
    <Suspense>
      <ChangNewPasswordWhenForget />
    </Suspense>
  );
}
function ChangNewPasswordWhenForget() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [referralCode, setReferralCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  async function handleRegister(data) {
    try {
      const user = await axios.post(
        `/user/reset-password?token=${token}`,
        data,
      );

      if (user.data.success === false) {
        return toast(user.data.msg);
      }
      return Swal.fire({
        title: "Success!",
        html: `<strong>Chúng tôi đã cập nhật lại mật khẩu của bạn</strong> <br/>
                <p>Cám ơn bạn đã sử dụng dịch vụ của chúng tôi</p>  `,
        icon: "success",
      }).then((res) => res.value && router.push("/dang-nhap"));
    } catch (error) {
      toast.error(error.response?.data.msg);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link
            href="/"
            className="flex flex-shrink-0 items-center justify-center rounded-md border-2 border-primary bg-primary p-2"
          >
            <div className="relative mr-2 flex h-10 w-10 flex-shrink-0 animate-spin items-center rounded-full border-2 border-white">
              <Logo />
            </div>
            <span className="animate-text text-xl font-medium text-[#f8f8f8]">
              Tạp hóa zalo
            </span>
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Cập nhật mật khẩu
          </h2>
        </div>

        <form
          className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="relative mt-2">
                <Button
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? (
                    <div className="transition-all">
                      <BiShow />
                    </div>
                  ) : (
                    <div className="transition-all">
                      <BiHide />
                    </div>
                  )}
                </Button>
                <input
                  id="passwordNew"
                  name="passwordNew"
                  type={showPassword ? "text" : "password"}
                  {...register("passwordNew")}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-600"> {errors.password.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>
              </div>
              <div className="relative mt-2">
                <Button
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? (
                    <div className="transition-all">
                      <BiShow />
                    </div>
                  ) : (
                    <div className="transition-all">
                      <BiHide />
                    </div>
                  )}
                </Button>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  {...register("confirmPassword")}
                  type={showPassword ? "text" : "password"}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleRegister}
                type="submit"
              >
                Thay đổi{" "}
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Bạn đã có tài khoản?
            <Link href="/dang-nhap" className="text-primary">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
const schema = z
  .object({
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

    confirmPassword: z
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
  .refine((data) => data.passwordNew === data.confirmPassword, {
    message: "Mật khẩu không trùng khớp!",
    path: ["confirmPassword"],
  });
