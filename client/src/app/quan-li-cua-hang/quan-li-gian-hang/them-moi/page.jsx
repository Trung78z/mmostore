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
  Textarea,
} from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "@/configs/api";

import Link from "next/link";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function Themmoi() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    description: "",
    poached: false,
    receiving: "",
    duplicate: true,
    reseller: true,
    categoryId: 1,
    subCategoryId: 1,
  });
  const [serviceSales, setServiceSales] = useState([]);
  const [formSales, setFormSales] = useState({ title: "", price: 0 });
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [value, setValue] = useState("");
  const router = useRouter();
  const [categories, setCategories] = useState("san-pham");
  const [subCategories, setSubCategories] = useState(productCate);
  const [childrenCategories, setChildrenCategories] = useState(
    productCate[0].subCategory,
  );
  const handleChangeServiceSale = (e) => {
    const { id, value } = e.target;
    setFormSales((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddServiceSell = (e) => {
    e.preventDefault();
    if (formSales.title === "") {
      return null;
    }
    setServiceSales((prev) => [formSales, ...prev]);
    setFormSales({ title: "", price: 0 });
  };

  const handleDeleteSale = (id) => {
    const filter = serviceSales.filter((item) => item.title !== id);
    setServiceSales(filter);
  };

  const handleChangeCategoryServices = (e) => {
    const { value } = e.target;
  };
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "category") {
      setCategories(value);
      if (value === "dich-vu") {
        setSubCategories(serviceCate);
        setChildrenCategories(serviceCate[0].subCategory);
        setForm((prev) => ({
          ...prev,
          categoryId: serviceCate[0].id,
        }));
        setForm((prev) => ({
          ...prev,
          subCategoryId: serviceCate[0].subCategory[0].id,
        }));
      } else {
        setSubCategories(productCate);
        setChildrenCategories(productCate[0].subCategory);
        setForm((prev) => ({
          ...prev,
          categoryId: productCate[0].id,
        }));
        setForm((prev) => ({
          ...prev,
          subCategoryId: productCate[0].subCategory[0].id,
        }));
      }
    } else if (id === "categoryId") {
      setForm((prev) => ({ ...prev, [id]: parseInt(value) }));
      const filter = subCategories.find(
        (item) => item.id === parseInt(value),
      ).subCategory;
      setForm((prev) => ({
        ...prev,
        subCategoryId: filter[0].id,
      }));

      setChildrenCategories(filter);
    } else if (id === "subCategoryId") {
      setForm((prev) => ({ ...prev, [id]: parseInt(value) }));
    } else if (id === "duplicate" || id === "reseller" || id === "poached") {
      setForm((prev) => ({ ...prev, [id]: !prev[id] }));
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image === undefined) {
      return toast.error("Vui lòng thêm hình ảnh!");
    }
    if (serviceSales.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Loại hàng hóa!",
        text: "Vui lòng thêm các sản phẩm!",
        showCloseButton: true,
      });
    }

    const forms = new FormData();
    Object.keys(form).map((key) => forms.append(key, form[key]));
    forms.append(categories === "dich-vu" ? "service" : "product", image);
    forms.append("serviceSales", JSON.stringify(serviceSales));
    try {
      Swal.fire({
        title: "Bán hàng?",
        text: "Bạn chắc chắn bán hàng chứ!",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy!",
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Bán hàng!",
        reverseButtons: true,
      }).then(async (value) => {
        if (value.value) {
          if (categories === "dich-vu") {
            const result = await axios.post("/services/create", forms, {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            });

            if (result.data.success === false) {
              return toast.error(result.data.msg, { autoClose: 2000 });
            }
            toast.success("Đăng bán thành công vui lòng đợi chủ shop duyệt!");
            router.back();
          } else {
            const result = await axios.post("/products/create", forms, {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            });

            if (result.data.success === false) {
              return toast.error(result.data.msg, { autoClose: 2000 });
            }
            toast.success("Đăng bán thành công vui lòng đợi chủ shop duyệt!");
            router.back();
          }
        }
      });
    } catch (error) {
      toast.error("Đã có lỗi xảy ra hoặc trùng thông tin đã có trên sàn!");
    }
  };
  return (
    <div className="space-y-2 px-2 py-4">
      <div className="card p-2 md:p-10">
        <h4>Thêm gian hàng</h4>
        <form onSubmit={handleSubmit} className="py-4">
          <Fieldset className="mt-10 space-y-8">
            <Field className="flex flex-col items-center gap-x-2 md:flex-row">
              <div className="min-w-full flex-1 space-y-6 sm:min-w-fit">
                <div className="flex-1">
                  <Label className="block">
                    Tên gian hàng <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    onChange={handleChange}
                    required
                    value={form.title}
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
                    id="category"
                    onChange={handleChange}
                  >
                    <option value="san-pham">Sản phẩm</option>
                    <option value="dich-vu">Dịch vụ</option>
                  </Select>
                </div>
                <div className="min-w-full flex-1">
                  <Label className="block">
                    Loại gian hàng <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    className="block min-w-full rounded-md border py-2"
                    id="categoryId"
                    onChange={handleChange}
                  >
                    {subCategories.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.id}>
                        {subCategory.category}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="min-w-full flex-1">
                  <Label className="block">
                    Loại sản phẩm
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    className="block min-w-full rounded-md border py-2"
                    id="subCategoryId"
                    onChange={handleChange}
                  >
                    {childrenCategories.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.id}>
                        {subCategory.subCategory}
                      </option>
                    ))}
                  </Select>
                </div>{" "}
                <div className="min-w-full flex-1">
                  <Label className="block">
                    Chiết khấu cho sàn
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="receiving"
                    onChange={handleChange}
                    required
                    type="number"
                    value={form.receiving}
                    min={0}
                    max={5}
                    maxLength={1}
                    className="min-h-10 min-w-full flex-1 rounded-lg border px-2"
                    placeholder="Nhập từ 0 - 5"
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
                      image && "bg-cover bg-center",
                    )}
                    style={
                      image ? { backgroundImage: `url(${imageUrl})` } : null
                    }
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
                            accept=".png, .jpg, .jpeg"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, JEPG up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </Field>
            </Field>
            <div className="space-y-2">
              <ul className="list-none space-y-4">
                {categories === "san-pham" && (
                  <li className="flex items-center gap-x-2">
                    <input
                      type="checkbox"
                      id="reseller"
                      value={form.reseller}
                      defaultChecked={form.reseller}
                      onChange={handleChange}
                    />
                    <label htmlFor="reseller">
                      Bạn có muốn cho reseller bán hàng không?
                    </label>
                  </li>
                )}
                {categories === "san-pham" && (
                  <li className="flex items-center gap-x-2">
                    <input
                      type="checkbox"
                      id="duplicate"
                      value={form.duplicate}
                      defaultChecked={form.duplicate}
                      onChange={handleChange}
                    />
                    <label htmlFor="duplicate">
                      Sản phẩm không trùng lặp (Cam kết sản phẩm chỉ được bán ra
                      1 lần duy nhất trên hệ thống)
                    </label>
                  </li>
                )}
                {categories === "san-pham" && (
                  <li className="flex items-center gap-x-2">
                    <input
                      type="checkbox"
                      id="poached"
                      value={form.poached}
                      defaultChecked={form.poached}
                      onChange={handleChange}
                    />
                    <label htmlFor="poached">
                      Sử dụng kho hàng riêng (Hàng sẽ không tải trực tiếp lên
                      Tạp hóa Zalo mà sử dụng API để lấy hàng từ kho của bạn!)
                    </label>
                  </li>
                )}
                <li className="ml-0">
                  <label htmlFor="content" className="cursor-pointer">
                    Mô tả ngắn <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="content"
                    required
                    onChange={handleChange}
                    value={form.content}
                    placeholder="Mô tả ngắn..."
                    className="min-h-10 min-w-full rounded-md border p-1"
                  ></Textarea>
                </li>
                <li className="ml-0">
                  <label htmlFor="content" className="cursor-pointer">
                    Loại hàng <span className="text-red-500">*</span>
                  </label>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Tiêu đề</TableHead>
                        <TableHead className="text-center">Giá thành</TableHead>
                        <TableHead className="text-center">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {serviceSales.map((item) => (
                        <TableRow key={item.title}>
                          <TableCell className="ext-center">
                            {item.title}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.price}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              className="col-span-1 ml-auto max-w-20 rounded-md bg-red-500 px-2 py-0 text-white hover:border-primary/80 md:col-span-2 lg:col-span-1"
                              onClick={() => handleDeleteSale(item.title)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="ml-0 grid min-w-full grid-cols-1 gap-2 pt-4 md:grid-cols-2 lg:grid-cols-5">
                    <Input
                      id="title"
                      onChange={handleChangeServiceSale}
                      value={formSales.title}
                      className="min-h-10 min-w-full flex-1 rounded-lg border px-2 lg:col-span-2"
                      placeholder="Nhập tiêu đề cho loại hàng..."
                    ></Input>
                    <Input
                      id="price"
                      onChange={handleChangeServiceSale}
                      type="number"
                      value={formSales.price.toLocaleString("vi-VN")}
                      className="min-h-10 min-w-full flex-1 rounded-lg border px-2 lg:col-span-2"
                      placeholder="Nhập giá tiền cho loại hàng..."
                    ></Input>
                    <Button
                      className="col-span-1 ml-auto w-full max-w-40 rounded-md bg-blue-500 px-4 py-2 text-white hover:border-primary/80 md:col-span-2 lg:col-span-1"
                      onClick={handleAddServiceSell}
                    >
                      Thêm
                    </Button>
                  </div>
                </li>
                <hr />
                <li className="ml-0">
                  <label htmlFor="description">
                    Mô tải chi tiết <span className="text-red-500">*</span>
                  </label>
                  <ReactQuill
                    theme="snow"
                    id="description"
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, description: e }))
                    }
                  />
                </li>
              </ul>
            </div>
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
        <p className="text-red-500">Vui lòng đọc kỹ trước khi tạo mới:</p>
        <ul className="ml-2 sm:ml-10">
          <li className="text-green-500">
            <p>
              Vì bên mình là sàn thương mại điện tử, nên nếu sản phẩm của bạn
              không bán trực tiếp trên site được thì sẽ không được duyệt. Ví dụ
              các sản phẩm không thể số hóa thành text file, phần mềm không có
              API để get hay active key (hãy liên hệ để coder 2 bên có thể map
              với nhau nhé)....
            </p>
          </li>
          <li className="text-green-500">
            <p>
              Không đăng thông tin liên hệ nào khác lên gian hàng (kể cả hình
              ảnh), không nhắn tin cách thức liên hệ ngoài site. Mong các bạn
              hiểu, bên mình là sàn, chi phí rất nhiều cho đội ngũ kỹ thuật, hỗ
              trợ, marketing, server, nên hi vọng chúng ta có thể hợp tác đôi
              bên cùng có lợi, về lâu về dài bên mình cũng cần có chi phí duy
              trì, phát triển nền tảng... nên rất cần đối tác hiểu, và có thể
              gắn bó lâu dài với site.
            </p>
          </li>
          <li className="text-green-500">
            <p>
              Nếu có yêu cầu gì thêm cho phần bán hàng, các bạn cứ nhắn tin cho
              support, bên mình sẵn sàng hỗ trợ sao cho các bạn bán được thuận
              tiện nhất.
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
      </div>
    </div>
  );
}

const serviceCate = [
  {
    id: 1,
    category: "Tăng tương tác",
    categoryCover: "tang-tuong-tac",
    subCategory: [
      {
        id: 1,
        subCategory: "Dịch vụ Facebook",
        categoryId: 1,
      },
      {
        id: 2,
        subCategory: "Dịch vụ Tiktok",
        categoryId: 1,
      },
      {
        id: 3,
        subCategory: "Dịch vụ Google",
        categoryId: 1,
      },
      {
        id: 4,
        subCategory: "Dịch vụ Telegram",
        categoryId: 1,
      },
      {
        id: 5,
        subCategory: "Dịch vụ Shopee",
        categoryId: 1,
      },
      {
        id: 6,
        subCategory: "Dịch vụ Discord",
        categoryId: 1,
      },
      {
        id: 7,
        subCategory: "Dịch vụ Twitter",
        categoryId: 1,
      },
      {
        id: 8,
        subCategory: "Dịch vụ Youtube",
        categoryId: 1,
      },
      {
        id: 9,
        subCategory: "Dịch vụ Zalo",
        categoryId: 1,
      },
      {
        id: 10,
        subCategory: "Dịch vụ Instagram",
        categoryId: 1,
      },
      {
        id: 11,
        subCategory: "Tương tác khác",
        categoryId: 1,
      },
    ],
  },
  {
    id: 2,
    category: "Dịch vụ phần mềm",
    categoryCover: "dich-vu-phan-mem",
    subCategory: [
      {
        id: 12,
        subCategory: "Dịch vụ code tool",
        categoryId: 2,
      },
      {
        id: 13,
        subCategory: "Dịch vụ đồ họa",
        categoryId: 2,
      },
      {
        id: 14,
        subCategory: "Dịch vụ video",
        categoryId: 2,
      },
      {
        id: 15,
        subCategory: "Dịch vụ tool khác",
        categoryId: 2,
      },
    ],
  },
  {
    id: 3,
    category: "BlockChain",
    categoryCover: "blockchain",
    subCategory: [
      {
        id: 16,
        subCategory: "Dịch vụ tiền ảo",
        categoryId: 3,
      },
      {
        id: 17,
        subCategory: "Dịch vụ NFT",
        categoryId: 3,
      },
      {
        id: 18,
        subCategory: "Dịch vụ Coinlist",
        categoryId: 3,
      },
      {
        id: 19,
        subCategory: "Blockchain khác",
        categoryId: 3,
      },
    ],
  },
  {
    id: 4,
    category: "Dịch vụ khác",
    categoryCover: "dich-vu-khac",
    subCategory: [
      {
        id: 20,
        subCategory: "Dịch vụ khác",
        categoryId: 4,
      },
    ],
  },
];

const productCate = [
  {
    id: 1,
    category: "Tài khoản",
    categoryCover: "tai-khoan",
    subCategory: [
      {
        id: 1,
        subCategory: "Tài khoản FB",
        categoryId: 1,
      },
      {
        id: 2,
        subCategory: "Tài Khoản BM",
        categoryId: 1,
      },
      {
        id: 3,
        subCategory: "Tài Khoản Zalo",
        categoryId: 1,
      },
      {
        id: 4,
        subCategory: "Tài Khoản Twitter",
        categoryId: 1,
      },
      {
        id: 5,
        subCategory: "Tài Khoản Telegram",
        categoryId: 1,
      },
      {
        id: 6,
        subCategory: "Tài Khoản Instagram",
        categoryId: 1,
      },
      {
        id: 7,
        subCategory: "Tài Khoản Shopee",
        categoryId: 1,
      },
      {
        id: 8,
        subCategory: "Tài Khoản Discord",
        categoryId: 1,
      },
      {
        id: 9,
        subCategory: "Tài khoản TikTok",
        categoryId: 1,
      },
      {
        id: 10,
        subCategory: "Key Diệt Virus",
        categoryId: 1,
      },
      {
        id: 11,
        subCategory: "Key Window",
        categoryId: 1,
      },
      {
        id: 12,
        subCategory: "Tài Khoản Khác",
        categoryId: 1,
      },
    ],
  },
  {
    id: 2,
    category: "Email",
    categoryCover: "email",
    subCategory: [
      {
        id: 13,
        subCategory: "Gmail",
        categoryId: 2,
      },
      {
        id: 14,
        subCategory: "HotMail",
        categoryId: 2,
      },
      {
        id: 15,
        subCategory: "OutlookMail",
        categoryId: 2,
      },
      {
        id: 16,
        subCategory: "RuMail",
        categoryId: 2,
      },
      {
        id: 17,
        subCategory: "DomainMail",
        categoryId: 2,
      },
      {
        id: 18,
        subCategory: "YahooMail",
        categoryId: 2,
      },
      {
        id: 19,
        subCategory: "ProtonMail",
        categoryId: 2,
      },
      {
        id: 20,
        subCategory: "Loại Mail Khác",
        categoryId: 2,
      },
    ],
  },
  {
    id: 3,
    category: "Phần mềm",
    categoryCover: "phan-mem",
    subCategory: [
      {
        id: 21,
        subCategory: "Phần Mềm FB",
        categoryId: 3,
      },
      {
        id: 22,
        subCategory: "Phần Mềm Google",
        categoryId: 3,
      },
      {
        id: 23,
        subCategory: "Phần Mềm Youtube",
        categoryId: 3,
      },
      {
        id: 24,
        subCategory: "Phần Mềm Tiền Ảo",
        categoryId: 3,
      },
      {
        id: 25,
        subCategory: "Phần Mềm PTC",
        categoryId: 3,
      },
      {
        id: 26,
        subCategory: "Phần Mềm Capcha",
        categoryId: 3,
      },
      {
        id: 27,
        subCategory: "Phần Mềm Offer",
        categoryId: 3,
      },
      {
        id: 28,
        subCategory: "Phần Mềm PTU",
        categoryId: 3,
      },
      {
        id: 29,
        subCategory: "Phần Mềm Khác",
        categoryId: 3,
      },
    ],
  },
  {
    id: 4,
    category: "Khác",
    categoryCover: "khac",
    subCategory: [
      {
        id: 30,
        subCategory: "Thẻ nạp",
        categoryId: 4,
      },
      {
        id: 31,
        subCategory: "VPS",
        categoryId: 4,
      },
      {
        id: 32,
        subCategory: "Khác",
        categoryId: 4,
      },
    ],
  },
];
