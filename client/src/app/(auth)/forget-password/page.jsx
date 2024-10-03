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
import Swal from "sweetalert2";
import LoadingPage from "@/components/Loading";
const schema = z.object({
  email: z
    .string()
    .email({ message: "Email không đúng định dạng" })
    .min(1, { message: "Vui lòng nhập email của bạn!" }),
});

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });
  const [referralCode, setReferralCode] = useState("");
  async function handleRegister(data) {
    setLoading(true);
    try {
      const response = await axios.post("/user/create-reset-password", data);

      if (response.data.success === false) {
        return toast(response.data.msg);
      }
      Swal.fire({
        title: "Success!",
        html: `
          <p>Chúng tôi vừa gửi email đến cho bạn!</p>
          <p><strong>Vui lòng kiểm tra và xác nhận thông tin!</strong></p>

        `,
        icon: "success",
      });
      setLoading(false);
      reset({ email: "" });
    } catch (error) {
      toast.error(error.response?.data.msg);
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex min-h-[70vh] flex-1 flex-col justify-center px-6 py-4 lg:px-8">
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
            Quên mật khẩu
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
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
                disabled={loading}
              >
                {loading === true ? <LoadingPage /> : "  Xác nhận"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
