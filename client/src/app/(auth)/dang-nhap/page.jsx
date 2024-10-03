"use client";
import Logo from "@/components/Logo";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "@/configs/api";
import { Button } from "@headlessui/react";
import Swal from "sweetalert2";
import { BiHide, BiShow } from "react-icons/bi";
import LoadingPage from "@/components/Loading";

export default function LoginPage() {
  const { setAuthState } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const user = await axios.get(
          `/user/google/login/${codeResponse.access_token}`,
          { withCredentials: true },
        );
        if (user.data.success === false) {
          return toast(user.data.msg);
        }

        setAuthState({
          status: true,
          id: user.data.id,
          role: user.data.role,
          accountBalance: user.data.accountBalance || 0,
          fullName: user.data.fullName,
        });
        sessionStorage.setItem("token", user.data.accessToken);
        toast("Đăng nhập thành công!", { autoClose: 700 });
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  async function handleLogin(data) {
    setLoading(true);
    try {
      const user = await axios.post("/user/login", data, {
        withCredentials: true,
      });

      if (user.data.success === false) {
        setLoading(false);
        return Swal.fire({
          title: "Tài khoản của bạn chưa xác thực!",
          text: user.data.msg,
          icon: "info",
        });
      }

      setAuthState({
        status: true,
        id: user.data.id,
        role: user.data.role,
        accountBalance: user.data.accountBalance || 0,
        fullName: user.data.fullName,
      });
      sessionStorage.setItem("token", user.data.accessToken);
      toast("Đăng nhập thành công!", { autoClose: 700 });
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.msg);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
            Đăng nhập tài khoản
          </h2>
        </div>

        <form
          className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="space-y-6">
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
                <div className="text-sm">
                  <Link
                    href="/forget-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
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
                </Button>{" "}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
                disabled={loading}
              >
                {loading === true ? <LoadingPage /> : "Đăng Nhập"}
              </button>
            </div>
          </div>
          <div className="w-full py-4">
            <Button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => login()}
            >
              Sign in with Google 🚀
            </Button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Bạn chưa có tài khoản?
            <Link href="/dang-ki" className="text-primary">
              Đăng kí
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
const schema = z.object({
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
});
