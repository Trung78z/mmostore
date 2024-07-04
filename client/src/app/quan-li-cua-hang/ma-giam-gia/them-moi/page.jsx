"use client";

import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
} from "@headlessui/react";

import Link from "next/link";

export default function Themmoi() {
  return (
    <div className="space-y-2 px-2 py-4">
      <div className="card p-2 md:p-10">
        <h4>Thêm mã giảm giá</h4>
        <Fieldset className="mt-10 space-y-8">
          <Field className="flex flex-col items-center gap-x-2 md:flex-row">
            <div className="min-w-full flex-1 space-y-6 sm:min-w-fit">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="col-span-1">
                  <Label className="block">
                    Mã giảm giá <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="min-h-10 min-w-full rounded-lg border px-2"
                    placeholder="Nhập mã giảm giá..."
                  ></Input>
                </div>
                <div className="col-span-1">
                  <Label className="block">
                    Gian hàng <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    className="min-w-full rounded-md border py-2"
                    name="country"
                  >
                    <option>Tât cả</option>
                  </Select>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <Label className="block">
                    Mô tả<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="min-h-10 min-w-full rounded-lg border px-2"
                    placeholder="Nhập mô tả..."
                  ></Input>
                </div>
                <div className="col-span-1">
                  <Label className="block">
                    Ngày bắt đầu <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="min-h-10 min-w-full rounded-lg border px-2"
                    placeholder="Nhập ngày bắt đầu..."
                  ></Input>
                </div>
                <div className="col-span-1">
                  <Label className="block">
                    Ngày kết thúc <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="min-h-10 min-w-full rounded-lg border px-2"
                    placeholder="Nhập ngày kết thúc..."
                  ></Input>
                </div>
                <div className="col-span-1">
                  <Label className="block">
                    Loại giảm giá <span className="text-red-500">*</span>
                  </Label>
                  <Select className="min-w-full rounded-md border py-2">
                    <option>Giảm theo phần trăm</option>
                    <option>Giảm theo số tiền</option>
                    <option>Giảm theo tổng đơn hàng</option>
                  </Select>
                </div>
                <div className="col-span-1 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <Label className="block">
                      Tỷ lệ giảm <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      className="min-h-10 min-w-full rounded-lg border px-2"
                      placeholder="Nhập mã giảm giá..."
                    ></Input>
                  </div>
                  <div>
                    <Label className="block">
                      Số tiền tối đa <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      className="min-h-10 min-w-full rounded-lg border px-2"
                      placeholder="Nhập mã giảm giá..."
                    ></Input>
                  </div>
                </div>
                <div className="col-span-1">
                  <Label className="block">
                    Số lần sử dụng <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="min-h-10 min-w-full rounded-lg border px-2"
                    defaultValue={0}
                  ></Input>
                </div>
              </div>
            </div>
          </Field>

          <div className="flex justify-end gap-2">
            <Button className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:border-primary/80">
              Trở về
            </Button>
            <Button className="rounded-md bg-green-500 px-4 py-2 text-white hover:border-primary/80">
              Tạo bài mới
            </Button>
          </div>
          <hr />
          <p className="text-red-500">Vui lòng đọc kỹ trước khi tạo mới:</p>
          <ul className="ml-2 sm:ml-10">
            <li className="text-green-500">
              <p>
                Vì bên mình là sàn thương mại điện tử, nên nếu sản phẩm của bạn
                không bán trực tiếp trên site được thì sẽ không được duyệt. Ví
                dụ các sản phẩm không thể số hóa thành text file, phần mềm không
                có API để get hay active key (hãy liên hệ để coder 2 bên có thể
                map với nhau nhé)....
              </p>
            </li>
            <li className="text-green-500">
              <p>
                Không đăng thông tin liên hệ nào khác lên gian hàng (kể cả hình
                ảnh), không nhắn tin cách thức liên hệ ngoài site. Mong các bạn
                hiểu, bên mình là sàn, chi phí rất nhiều cho đội ngũ kỹ thuật,
                hỗ trợ, marketing, server, nên hi vọng chúng ta có thể hợp tác
                đôi bên cùng có lợi, về lâu về dài bên mình cũng cần có chi phí
                duy trì, phát triển nền tảng... nên rất cần đối tác hiểu, và có
                thể gắn bó lâu dài với site.
              </p>
            </li>
            <li className="text-green-500">
              <p>
                Nếu có yêu cầu gì thêm cho phần bán hàng, các bạn cứ nhắn tin
                cho support, bên mình sẵn sàng hỗ trợ sao cho các bạn bán được
                thuận tiện nhất.
              </p>
            </li>
            <li className="text-green-500">
              <p>
                Gian hàng mới có thể sẽ bán chậm hơn 1 chút, mong các bạn thông
                cảm, đừng nóng vội, chăm chút cho sản phẩm và khách hàng hơn, từ
                kết quả bán hàng sẽ quyết định thứ hạn hiển thị trên site.
              </p>
            </li>
            <li className="text-green-500">
              Các quy định khác về gian hàng các bạn đọc thêm ở đây:
              <Link href="/qui-dinh" className="border-b text-blue-500">
                Quy định về gian hàng và các mặt hàng bị cấm.
              </Link>
            </li>
          </ul>
        </Fieldset>
      </div>
    </div>
  );
}
