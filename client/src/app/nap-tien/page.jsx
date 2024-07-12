"use client";
import { Button } from "@/components/ui/button";
import { Field, Fieldset, Input, Label } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import axios from "@/configs/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const schema = z.object({
  total: z
    .number()
    .min(10000, { message: "Vui lòng nạp ít nhất 10k VND" })
    .max(1000000, { message: "Vui lòng nạp nhiều nhất 1tr VND" }),
});

export default function NapTienUser() {
  const [active, setActive] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [row, setRow] = useState({});
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
  };
  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "/payment",
        {},
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );
      setRow(response.data.newService.msg);
      console.log(response.data.newService.msg.id);
      setActive(true);
    } catch (error) {
      toast("Server đang lỗi vui lòng thử lại!");
    }
  };

  const handleUpdate = async (data) => {
    const forms = new FormData();
    console.log(data.total, image);
    forms.append("total", data.total);
    forms.append("payment", image);

    Swal.fire({
      title: "Nạp tiền",
      text: "Bạn chắc chắn đã chuyển khoản rồi chứ chứ!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đã nạp!",
      cancelButtonText: "Hủy!",
      reverseButtons: true,
    }).then(async (res) => {
      if (res.value) {
        try {
          await axios.put("/payment/" + row.id, forms, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          });
          reset({ total: 0 });
          setImageUrl();
          setImage();
          toast("Đã xác nhận thành công!");
        } catch (error) {
          toast("Server đang lỗi vui lòng thử lại!");
        }
      }
    });
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl p-4">
        <h1 className="text-center text-3xl text-gray-500">Redeem gift code</h1>
        <div className="relative mx-auto flex max-w-[80%] items-center justify-center p-4 md:px-40">
          <Input
            className="min-h-10 min-w-full rounded-s-lg border border-primary/80 px-2"
            placeholder="Nhập vào mã gift*"
          ></Input>
          <Button className="my-0 min-h-full rounded-none rounded-r-lg py-0">
            Redeem
          </Button>
        </div>
        <div className="card">
          <div>
            {active ? (
              <>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="col-span-2 px-2 md:px-20">
                    <div className="relative flex min-h-20 max-w-40 justify-center">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Vietcombank_logo_fixed.svg"
                        alt=""
                        fill={true}
                      />
                    </div>
                    <ul>
                      <li className="ml-0">
                        STK:
                        <span className="font-semibold">08642421421421</span>
                      </li>
                      <li className="ml-0">
                        Người nhận:
                        <span className="font-semibold">Nguyen Van A</span>
                      </li>
                      <li className="ml-0">
                        Nội dung chuyên khoảng:
                        <span className="font-semibold text-red-500">
                          <span className="text-blue-500"> Tên tài khoản-</span>
                          {row.id}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-span-2 px-2 text-red-500 md:px-20">
                    <p>Quét mã QR Code để nội dung chuyển khoản chính xác</p>
                    <div className="relative mx-auto max-h-60 min-h-60 max-w-60 text-center">
                      <Image src="/qr.png" alt="" fill={true} />
                    </div>
                  </div>
                </div>
                <form
                  className="md:mx-10"
                  onSubmit={handleSubmit(handleUpdate)}
                >
                  <Fieldset className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
                    <Field>
                      <Label className="block">
                        Nhập số tiền<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        name="total"
                        type="number"
                        {...register("total", { valueAsNumber: true })}
                        className="min-h-10 min-w-full max-w-full rounded-lg border px-2"
                        placeholder="Nhập số tiền đã nạp..."
                      ></Input>
                      {errors.total && (
                        <p className="text-red-600">{errors.total.message}</p>
                      )}
                    </Field>
                    <Field className="min-w-full flex-1 sm:min-w-fit">
                      <div className="rounded-md p-2">
                        <Label className="block">
                          Hình ảnh <span className="text-red-500">*</span>
                        </Label>
                        <div
                          className={cn(
                            "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                            image && "bg-cover bg-center",
                          )}
                          style={
                            image
                              ? { backgroundImage: `url(${imageUrl})` }
                              : null
                          }
                        >
                          <div className="text-center">
                            <PhotoIcon
                              name="avatar"
                              className="mx-auto h-12 w-12 text-gray-300"
                              aria-hidden="true"
                              required={true}
                            />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleChangeImage}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </Field>
                  </Fieldset>
                  <div className="flex justify-end">
                    <Button className="text-right">Xác nhận</Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex justify-center">
                <Button onClick={handleCreate}>Tạo đơn nạp</Button>
              </div>
            )}
            <h4 className="ml-2 font-bold text-red-500 md:ml-10">Lưu ý</h4>
            <ul className="space-y-1 p-4 px-2 md:px-20">
              <li className="ml-0 text-red-500">
                Vui lòng điền nội dung chính xác nội dung chuyển khoản để thực
                nạp tiền tự động
              </li>
              <li className="ml-0">
                Tiền sẽ vào tài khoản trong 1-10 phút kể từ khi giao dịch thành
                công. Tuy nhiên đôi lúc do một vài lỗi khách quan, tiền có thể
                sẽ vào chậm hơn một chút.
              </li>
              <li className="ml-0 text-red-500">
                Vietcombank trong khoảng 23-3h không thể kiểm tra lịch sử giao
                dịch, các giao dịch trong khung giờ này có thể mất từ 15 phút
                đến 2 giờ tiền mới vào tài khoản. bạn có thể tránh nạp tiền
                trong khung giờ này để đỡ mất thời gian chờ đợi nhé.
              </li>
              <li className="ml-0">
                Nếu quá lâu không thấy cập nhật số dư, Vui lòng liên hệ hỗ trợ
                viên. Tại đây
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
