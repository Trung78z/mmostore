import { Button } from "@/components/ui/button";
import { Input } from "@headlessui/react";
import Image from "next/image";
import React from "react";

export default function NapTienUser() {
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
                    STK: <span className="font-semibold"> 08642421421421</span>
                  </li>
                  <li className="ml-0">
                    Người nhận:
                    <span className="font-semibold">Nguyen Van A</span>
                  </li>
                  <li className="ml-0">
                    Nội dung chuyên khoảng:
                    <span className="font-semibold text-red-500">
                      <span> </span>
                      Tên tài khoản-
                      {Math.floor(1000)}
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
            <h4 className="ml-2 font-bold text-red-500 md:ml-10">Lưu ý</h4>
            <ul className="space-y-1 p-4 px-2 md:px-20">
              <li className="text-red-500">
                Vui lòng điền nội dung chính xác nội dung chuyển khoản để thực
                nạp tiền tự động
              </li>
              <li className="ml-0">
                Tiền sẽ vào tài khoản trong 1-10 phút kể từ khi giao dịch thành
                công. Tuy nhiên đôi lúc do một vài lỗi khách quan, tiền có thể
                sẽ vào chậm hơn một chút.
              </li>
              <li className="text-red-500">
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
