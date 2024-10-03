"use client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
} from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function EditProduction() {
  const { slug } = useParams();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [value, setValue] = useState("");
  const [checked, setchecked] = useState(true);
  const [checked1, setchecked1] = useState(true);
  const [checked2, setchecked2] = useState();
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
  };
  return (
    <div className="space-y-2 px-2 py-4">
      <div className="card p-2 md:p-10">
        <h4>Chỉnh sửa gian hàng</h4>
        <Fieldset className="mt-10 space-y-8">
          <Field className="flex flex-col items-center gap-x-2 md:flex-row">
            <div className="min-w-full flex-1 space-y-6 sm:min-w-fit">
              <div className="flex-1">
                <Label className="block">
                  Tên gian hàng <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="min-h-10 min-w-full flex-1 rounded-lg border px-2"
                  placeholder="Nhập tiêu đề cho bài viết..."
                ></Input>
              </div>
              <div className="min-w-full flex-1">
                <Label className="block">
                  Loại hình kinh doanh <span className="text-red-500">*</span>
                </Label>
                <Select
                  className="block min-w-full rounded-md border py-2"
                  name="country"
                >
                  <option>Chọn...</option>
                  <option>Bán sản phẩm</option>
                  <option>Dịch vụ</option>
                </Select>
              </div>
              <div className="min-w-full flex-1">
                <Label className="block">
                  Loại gian hàng <span className="text-red-500">*</span>
                </Label>
                <Select
                  className="block min-w-full rounded-md border py-2"
                  name="country"
                >
                  <option>Chọn...</option>
                  <option>Email</option>
                  <option>Phần mềm</option>
                  <option>Tài khoản</option>
                  <option>Khác</option>
                </Select>
              </div>
              <div className="min-w-full flex-1">
                <Label className="block">
                  Loại sản phẩm - Chiết khấu cho sàn
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  className="block min-w-full rounded-md border py-2"
                  name="country"
                >
                  <option>Chọn...</option>
                  <option>Email</option>
                  <option>Phần mềm</option>
                  <option>Tài khoản</option>
                  <option>Khác</option>
                </Select>
              </div>
            </div>
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
                  style={image ? { backgroundImage: `url(${imageUrl})` } : null}
                >
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
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
          </Field>
          <div className="space-y-2">
            {/* <h4>
              Đánh giá hoàn tiền(%) - {"0"}:tắt | Khuyến khích khách hàng đánh
              giá bằng cách hoàn lại một khoản tiền (từ 0.1% - tối đa 5%)
            </h4>
            <Input className="min-w-full rounded-sm border px-2 py-1"></Input> */}
            <ul className="list-none space-y-4">
              <li className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  id="reseller"
                  checked={checked}
                  onClick={() => setchecked(!checked)}
                />
                <label htmlFor="reseller">
                  Bạn có muốn cho reseller bán hàng không?
                </label>
              </li>
              <li className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  id="reseller1"
                  checked={checked1}
                  onClick={() => setchecked1(!checked1)}
                />
                <label htmlFor="reseller1">
                  Sản phẩm không trùng lặp (Cam kết sản phẩm chỉ được bán ra 1
                  lần duy nhất trên hệ thống)
                </label>
              </li>
              <li className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  id="reseller2"
                  checked={checked2}
                  onClick={() => setchecked2(!checked2)}
                />
                <label htmlFor="reseller2">
                  Sử dụng kho hàng riêng (Hàng sẽ không tải trực tiếp lên Tạp
                  hóa Zalo mà sử dụng API để lấy hàng từ kho của bạn!)
                </label>
              </li>
              <li className="ml-0">
                <label htmlFor="mota">
                  Mô tải chi tiết <span className="text-red-500">*</span>
                </label>
                <ReactQuill
                  theme="snow"
                  id="mota"
                  value={value}
                  onChange={setValue}
                />
              </li>
            </ul>
          </div>
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
              <Link href="/quy-dinh" className="border-b text-blue-500">
                Quy định về gian hàng và các mặt hàng bị cấm.
              </Link>
            </li>
          </ul>
        </Fieldset>
      </div>
    </div>
  );
}
