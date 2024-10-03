"use client";
import { FaCheck } from "react-icons/fa6";
import React, { Component, useEffect, useState } from "react";
import axios from "@/configs/api";
import { toast } from "react-toastify";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
export default function OrderSuccess() {
  const { id } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/orders/user-product/order/${id}`, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });

        setData(res.data?.msg);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  return (
    <>
      {data === "" || data === undefined ? (
        <div className="p-20 text-red-500">
          Xin lỗi bạn không được xem thông tin này
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-screen-lg space-y-8">
            <div className="flex flex-col items-center">
              <div className="w-max rounded-full border-2 p-2">
                <FaCheck className="h-10 w-10 text-blue-500" />
              </div>
              <h2>Cảm ơn</h2>
              <h3>Đơn hàng đã được xử lý thành công</h3>
              <div className="w-max rounded-lg bg-green-500 p-2 text-background hover:bg-green-700">
                <Link href="/user/don-hang-da-mua">
                  <p>Đơn hàng đã mua</p>
                </Link>
              </div>
            </div>
            <div className="mx-auto rounded-lg bg-white p-4 shadow-md">
              <div className="mb-4 grid grid-cols-6 gap-4">
                <div className="col-span-1 font-semibold text-gray-500">
                  Mã đơn hàng
                </div>

                <div className="col-span-1 font-semibold text-gray-500">
                  Ngày mua
                </div>

                <div className="col-span-1 font-semibold text-gray-500">
                  Tổng
                </div>

                <div className="col-span-1 font-semibold text-gray-500">
                  Giảm giá
                </div>

                <div className="col-span-1 font-semibold text-gray-500">
                  Thanh toán
                </div>

                <div className="col-span-1 font-semibold text-gray-500">
                  Trạng thái
                </div>
                <div className="col-span-1">{data?.id}</div>
                <div className="col-span-1">
                  {new Date(data?.createdAt).toLocaleDateString("vi-VN")}
                </div>
                <div className="col-span-1">{data?.unitPrice} VND</div>
                <div className="col-span-1">{data?.sale}</div>
                <div className="col-span-1">{data?.total} VND</div>
                <div className="col-span-1">{data?.status}</div>
              </div>
              <table className="w-full border-t border-gray-300 text-left">
                <thead>
                  <tr>
                    <th className="py-2">SẢN PHẨM</th>
                    <th className="py-2">SỐ LƯỢNG</th>
                    <th className="py-2">GIÁ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="flex items-center py-2">
                      <Image
                        src={data?.products.image}
                        alt="Google Account"
                        width={40}
                        height={40}
                        className="mr-2 h-12 w-12 rounded-lg"
                      />
                      <span>{data?.products.title}</span>
                    </td>
                    <td className="py-2">{data?.amount}</td>
                    <td className="py-2">{data?.productSales.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul>
              <h5 className="text-red-500">Lưu ý:</h5>

              <li className="text-green-500">
                Để lấy hàng đã mua: Bấm vào
                <span className="font-medium">{`"Mã đơn hàng"`}</span>
              </li>
              <li className="text-green-500">
                Sau khi mua hàng, vui lòng tải về máy, kiểm tra và đổi pass tất
                cả sản phẩm đã mua. Sau 1 tuần, tất cả sản phẩm sẽ bị xóa phần
                mật khẩu trên server. nên hãy lưu lại trên máy mình nhé!
              </li>
              <li className="text-red-500">
                Nếu có vấn đề gì về đơn hàng, vui lòng nhắn tin cho
                <span className="font-medium">người bán</span>, nếu không được
                giải quyết hãy vào lịch sử đơn hàng chọn Khiếu nại. Chúng tôi sẽ
                giữ tiền đơn hàng đó, và nếu 3 ngày chủ hàng không có động thái
                xử lý khiếu nại, chúng tôi sẽ thay mặt để hoàn tiền cho bạn.
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
