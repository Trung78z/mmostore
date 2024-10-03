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
import React, { useEffect, useState } from "react";
import { subCategory } from "@/lib/data/post";
import axios from "@/configs/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const schema = z.object({
  title: z.string().min(1, { message: "Vui lòng nhập tiêu đề!" }),
  content: z.string().min(1, { message: "Vui lòng nhập content!" }),
  category: z.number().min(1, { message: "Vui lòng chọn danh mục!" }),
});

export default function TaoBaiViet() {
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/categories/postShares");
      setCategory(res.data.msg);
    };
    fetch();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
  };
  const handleChangeBody = (e) => {
    setValue("content", e);
  };
  const handleChangDoanhMuc = (e) => {
    setValue("category", parseInt(e.target.value));
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const item in data) {
      formData.append(item, data[item]);
    }
    formData.append("post", image);
    try {
      const msg = await axios.post("/posts/create", formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (msg.data.success === false) {
        return toast("Lỗi thông tin vui lòng thử lại!");
      }
      setImage("");
      setImageUrl("");
      router.back();
      toast("Bạn đã tạo bài viết thành công!");
    } catch (error) {
      toast.error("Đã xảy ra lỗi vui lòng thử lại!");
    }
  };

  return (
    <div className="card p-2 md:p-10">
      <h4>Thêm bài viết</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="my-10 space-y-8">
          <Field className="flex flex-col items-center gap-x-2 md:flex-row">
            <div className="min-w-full flex-1 space-y-6 sm:min-w-fit">
              <div className="min-w-full flex-1">
                <Label className="block">
                  Chọn doanh mục <span className="text-red-500">*</span>
                </Label>
                <Select
                  className="block min-w-full rounded-md border py-2"
                  onChange={handleChangDoanhMuc}
                  name="country"
                  value={category}
                  required={true}
                >
                  {category.map((row) => (
                    <option key={row.id} value={row.id}>
                      {row.category}
                    </option>
                  ))}
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <Label className="block">
                  Tựa đề <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("title")}
                  className="min-h-10 min-w-full flex-1 rounded-lg border px-2"
                  placeholder="Nhập tiêu đề cho bài viết..."
                ></Input>
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title.message}</p>
                )}
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
          </Field>
          <label htmlFor="mota">
            Mô tải chi tiết <span className="text-red-500">*</span>
          </label>
          <ReactQuill
            theme="snow"
            id="mota"
            value={watch("content")}
            required={true}
            onChange={handleChangeBody}
          />
          <div className="flex justify-end gap-2">
            <Button className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:border-primary/80">
              Trở về
            </Button>
            <Button
              className="rounded-md bg-green-500 px-4 py-2 text-white hover:border-primary/80"
              type="submit"
            >
              Tạo bài mới
            </Button>
          </div>
        </Fieldset>
      </form>
      <hr />
      <p className="text-red-500">Lưu ý khi viết bài:</p>
      <ul className="ml-2 sm:ml-10">
        <li className="text-green-500">
          <p>
            Lưu ý khi viết bài: Những nội dung được duyệt chỉ gói gọn trong các
            chia sẻ về {"nghề"} MMO, kiến thức, kinh nghiệm, trải nghiệm về mọi
            mảng trong cách kiếm tiền online! Các nội dung về chính trị, tôn
            giáo, kích động... sẽ không được duyệt! Không đăng các bài viết
            quảng cáo, tuyển ref, giới thiệu dự án, lùa gà... (không cần biết dự
            án có lừa đảo hay không) Không đăng nội dung vi phạm quyền sở hữu
            trí tuệ của người khác, bao gồm vi phạm nhãn hiệu hàng hóa và bản
            quyền. Những bài viết chất lượng sẽ được lựa chọn để làm điểm tuần
            và nhận thưởng từ sàn. Tiền donate sẽ được nhận sau 3 ngày.
          </p>
        </li>
        <li className="text-green-500">
          <p>
            Không đăng các bài viết quảng cáo, tuyển ref, giới thiệu dự án, lùa
            gà... (không cần biết dự án có lừa đảo hay không)
          </p>
        </li>
        <li className="text-green-500">
          <p>
            Không đăng nội dung vi phạm quyền sở hữu trí tuệ của người khác, bao
            gồm vi phạm nhãn hiệu hàng hóa và bản quyền.
          </p>
        </li>
        <li className="text-green-500">
          <p>
            Những bài viết chất lượng sẽ được lựa chọn để làm điểm tuần và nhận
            thưởng từ sàn.
          </p>
        </li>
        {/* <li className="text-green-500">
          <p>Tiền donate sẽ được nhận sau 3 ngày.</p>
        </li> */}
      </ul>
    </div>
  );
}
