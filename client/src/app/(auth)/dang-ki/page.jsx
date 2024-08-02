"use client";
import Logo from "@/components/Logo";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "@/configs/api";
import { useState } from "react";
import { Button } from "@headlessui/react";
import { BiHide, BiShow } from "react-icons/bi";
const schema = z
  .object({
    email: z
      .string()
      .email({ message: "Email không đúng định dạng" })
      .min(1, { message: "Vui lòng nhập email của bạn!" }),
    password: z
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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không trùng khớp!",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
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
    data = { ...data, referralCode };

    try {
      const user = await axios.post("/user/register", data);

      if (user.data.success === false) {
        return toast(user.data.msg);
      }
      toast("Cám ơn bạn đã đăng kí! Đăng kí thành công!", { autoClose: 2000 });
      router.push("/dang-nhap");
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
            Đăng kí tài khoản
          </h2>
        </div>

        <form
          className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="space-y-2">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email")}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>
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
                <p
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
                </p>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  autoComplete="current-password"
                  required
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
                <div className="text-sm">
                  <Link
                    href="/"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="relative mt-2">
                <p
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
                </p>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  {...register("confirmPassword")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="referralCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mã giới thiệu(nếu có)
                </label>
              </div>
              <div className="relative mt-2">
                <input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleRegister}
                type="submit"
              >
                Đăng kí
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
