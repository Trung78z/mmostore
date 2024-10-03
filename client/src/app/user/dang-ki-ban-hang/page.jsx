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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  async function handleLogin(data) {
    setLoading(true);
    try {
      const res = await axios.put("/user/dang-ki-ban-hang", data, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      if (res.data.success === false) {
        setLoading(false);
        return Swal.fire({
          title: "Đã có lỗi xảy ra",
          icon: "error",
          showConfirmButton: false,
          text: res.data.msg,
        });
      }
      Swal.fire({
        title: "Đăng kí thành công!",
        icon: "success",
        showConfirmButton: false,
        text: "Đăng kí bán hàng thành công vui. Để bán sản phẩm vui lòng click vào icon avatar!",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Đã có lỗi xảy ra",
        icon: "error",
        showConfirmButton: false,
        text: "Đã có lỗi xảy ra vui lòng đăng kí lại sau!",
      });
    }
  }

  return (
    <>
      <div className="flex min-h-[80vh] items-center">
        <div className="mx-auto flex w-full max-w-screen-lg flex-col justify-center gap-x-10 sm:flex-row">
          <ul className="w-full space-y-3 sm:w-[44%]">
            <h2>Cơ hội hợp tác</h2>
            <li className="text-base">
              Thông tin này hoàn toàn được bảo mật, được dùng để bên mình liên
              lạc với bên bạn trong những lúc cần thiết (xác thực người bán, khi
              có tranh chấp xảy ra...).
            </li>
            <li className="text-base">
              Cùng nhau kết nối, hợp tác, cùng phát triển cộng đồng kiếm tiền
              online.
            </li>
            <li className="text-base">
              <span className="text-lg font-medium"> Tối ưu hóa</span>
              <p>
                Đội ngũ hỗ trợ sẽ liên lạc để giúp bạn tối ưu hóa khả năng bán
                hàng.
              </p>
            </li>
            <li className="text-base">
              <span className="text-lg font-medium"> Đẩy tin nhắn</span>
              <p>
                Hãy vào phần thông tin tài khoản (profile), cập nhật thêm phần
                đẩy tin nhắn của khách về Telegram để không bỏ lỡ khách nào nhé.
              </p>
            </li>
            <li className="text-base">
              <span className="text-lg font-medium">
                {" "}
                Bật bảo mật 2 lớp (2FA)
              </span>
              <p>
                Đây là quy định bắt buộc trước khi đăng ký bán hàng, vui lòng
                cập nhật thêm trong profile.
              </p>
            </li>
          </ul>
          <div className="w-full sm:w-[56%]">
            {" "}
            <form
              className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              <h1 className="text-center sm:col-span-2"> Thông tin cửa hàng</h1>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Số điện thoại
                </label>
                <div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    {...register("phone")}
                    autoComplete="phone"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.phone && (
                    <p className="text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="nameBank"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên ngân hàng
                </label>
                <div>
                  <input
                    id="nameBank"
                    name="nameBank"
                    type="text"
                    {...register("nameBank")}
                    autoComplete="nameBank"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.nameBank && (
                    <p className="text-red-600">{errors.nameBank.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="bankId"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Số tài khoản
                </label>
                <div>
                  <input
                    id="bankId"
                    name="bankId"
                    type="text"
                    {...register("bankId")}
                    autoComplete="bankId"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.bankId && (
                    <p className="text-red-600">{errors.bankId.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Facebook
                </label>
                <div>
                  <input
                    id="facebook"
                    name="facebook"
                    type="text"
                    {...register("facebook")}
                    autoComplete="facebook"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.facebook && (
                    <p className="text-red-600">{errors.facebook.message}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-1 justify-end sm:col-span-2">
                <button
                  className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-max sm:px-10"
                  type="submit"
                  disabled={loading}
                >
                  {loading === true ? <LoadingPage /> : "Đăng kí ngay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
const schema = z.object({
  phone: z
    .string()
    .min(1, { message: "Vui lòng nhập phone của bạn!" })
    .regex(/^\d+$/, { message: "Số điện thoại chỉ được chứa số!" }) // Ràng buộc chỉ chứa số
    .length(10, { message: "Số điện thoại phải có đúng 10 chữ số!" }),
  bankId: z
    .string()
    .min(1, { message: "Vui lòng nhập số tài khoản của bạn!" })
    .regex(/^\d+$/, { message: "Số tài khoản chỉ được chứa số!" }) // Ràng buộc chỉ chứa số
    .max(20, { message: "Đây không phải số tài khoản!" }),
  nameBank: z
    .string()
    .min(1, { message: "Vui lòng nhập số tên ngân hàng của bạn!" }),
  facebook: z
    .string()
    .min(1, { message: "Vui lòng nhập liên kết tài khoản facebook của bạn!" }),
});
