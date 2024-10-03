import { useAppDispatch, useAppSelector } from "@/lib/reducer/hooks";
import React, { useEffect, useState } from "react";
import { subCategory } from "@/lib/data/post";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
} from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  editPostAsync,
  editPostAsyncByUser,
} from "@/lib/features/posts/actions/postUserActions";
import { toast } from "react-toastify";
import { selectPostsByUser } from "@/lib/features/posts/postUserSlice";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import axios from "@/configs/api";

export default function FormPostEdit({ post }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(post.image);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.postCategoryId);
  const [title, setTitle] = useState(post.title);
  const value = useAppSelector(selectPostsByUser);
  const [dataCategory, setDataCategory] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/categories/postShares");
      setDataCategory(res.data.msg);
    };
    fetch();
  }, []);

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
  };
  const handleChangeBody = (e) => {
    setContent(e);
  };
  const handleChangDoanhMuc = (e) => {
    setCategory(parseInt(e.target.value));
  };
  const handleChangTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleBackPage = () => {
    router.back();
  };
  const handleEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) {
      formData.append("post", image);
    }

    dispatch(
      editPostAsyncByUser({
        postId: post.id,
        formData,
      }),
    ).then(() => {
      toast.success("Đã thay đổi thông tin thành công!");
      router.push("/user/quan-li-noi-dung");
    });
  };
  return (
    <>
      <form onSubmit={handleEdit}>
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
                >
                  {dataCategory.map((row) => (
                    <option key={row.id} value={row.id}>
                      {row.category}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex-1">
                <Label className="block">
                  Tựa đề <span className="text-red-500">*</span>
                </Label>
                <Input
                  onChange={handleChangTitle}
                  value={title}
                  className="min-h-10 min-w-full flex-1 rounded-lg border px-2"
                  placeholder="Nhập tiêu đề cho bài viết..."
                  required={true}
                ></Input>
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
                    imageUrl && "bg-cover bg-center",
                  )}
                  style={
                    imageUrl ? { backgroundImage: `url(${imageUrl})` } : null
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
          </Field>
          <label htmlFor="mota">
            Mô tải chi tiết <span className="text-red-500">*</span>
          </label>
          <ReactQuill
            theme="snow"
            id="mota"
            value={content}
            required={true}
            onChange={handleChangeBody}
          />
          <div className="flex justify-end gap-2">
            <Button
              className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:border-primary/80"
              onClick={handleBackPage}
            >
              Trở về
            </Button>
            <Button
              className="rounded-md bg-green-500 px-4 py-2 text-white hover:border-primary/80"
              type="submit"
            >
              Chỉnh sửa
            </Button>
          </div>
        </Fieldset>
      </form>
    </>
  );
}
