"use client";
import axios from "@/configs/api";
import {
  Button,
  Input,
  Select,
  Field,
  Fieldset,
  Label,
  Legend,
  Textarea,
} from "@headlessui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
export default function ThemTaiKhoan() {
  const { slug } = useParams();
  const [row, setRow] = useState([]);
  const [rowOld, setRowOld] = useState([]);
  const [poached, setPoached] = useState("");
  const [productAccount, setProductAccount] = useState([]);
  const [productAccountOld, setProductAccountOld] = useState([]);
  const [form, setForm] = useState({ account: "", password: "", poached: "" });
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/products/by-product-sales/${slug}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setProductAccount(res.data.msg.productSales[0].productAccount);
        setProductAccountOld(res.data.msg.productSales[0].productAccount);
        setPoached(res.data.msg.productSales[0].poached);
        setForm((prev) => ({
          ...prev,
          poached: res.data.msg.productSales[0].poached,
        }));
        setRow(res.data.msg);
        setRowOld(res.data.msg);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [slug]);
  const handleChangePoached = (e) => {
    const { value } = e.target;
    const update = rowOld.productSales.find((item) => item.poached === value);

    setPoached(update.poached);
    setForm((prev) => ({ ...prev, poached: value }));
    setProductAccount(update.productAccount);
    setProductAccountOld(update.productAccount);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };
  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/products/by-product-account", form, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      const dataUpdate = { ...form, id: res.data.msg.id, sold: false };
      const updatedProductSales = rowOld.productSales.map((productSale) => {
        if (productSale.poached === form.poached) {
          return {
            ...productSale,
            productAccount: [dataUpdate, ...productSale.productAccount], // Thêm dataUpdate vào productAccount
          };
        }
        return productSale;
      });

      setRowOld((prev) => ({
        ...prev,
        productSales: updatedProductSales,
      }));
      setRow((prev) => ({
        ...prev,
        productSales: updatedProductSales,
      }));
      const update = updatedProductSales.find(
        (item) => item.poached === form.poached,
      );
      setProductAccount(update.productAccount);
      setProductAccountOld(update.productAccount);
      setForm({ account: "", password: "" });
      toast.success("Thêm thành công!");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
      console.log(error);
    }
  };
  const handleChangeSold = (e) => {
    const { value } = e.target;
    if (value === "sold") {
      const update = productAccountOld.filter((item) => item.sold === true);
      setProductAccount(update);
    } else if (value === "no-sold") {
      const update = productAccountOld.filter((item) => item.sold === false);
      setProductAccount(update);
    } else {
      setProductAccount(productAccountOld);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `/products/by-product-account?id=${id}&poached=${poached}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );
      const updatedProductSales = rowOld.productSales.map((productSale) => {
        if (productSale.poached === poached) {
          return {
            ...productSale,
            productAccount: productSale.productAccount.filter(
              (account) => account.id !== id,
            ),
          };
        }
        return productSale;
      });
      setRowOld((prev) => ({
        ...prev,
        productSales: updatedProductSales,
      }));
      setRow((prev) => ({
        ...prev,
        productSales: updatedProductSales,
      }));
      const update = productAccount.filter((item) => item.id !== id);
      const updateOld = productAccountOld.filter((item) => item.id !== id);
      setProductAccount(update);
      setProductAccountOld(updateOld);
      toast.success("Đã xóa thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xảy ra!");
    }
  };
  return (
    <div className="relative space-y-2 overflow-x-hidden px-2 py-4">
      <div className="card flex flex-col items-center justify-between md:flex-row">
        <h1 className="text-2xl font-medium">Thêm tài khoản vào gian hàng</h1>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <Input
              className="min-h-10 flex-1 rounded-lg border px-2"
              placeholder="Tìm tên sản phẩm..."
            ></Input>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-10 px-2 md:grid-cols-4 md:px-10">
        <div className="col-span-2 max-h-[40vh] min-h-[40vh] overflow-y-auto rounded-xl border-2 border-red-500 px-2">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Tên sản phẩm
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Đơn giá
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Kho
                </TableHead>
              </TableRow>
            </TableHeader>

            {row.productSales?.map((item) => {
              return (
                <TableBody key={item.id}>
                  <TableCell className="px-1 py-2 text-start font-medium">
                    {item.title}
                  </TableCell>
                  <TableCell className="px-1 py-2 text-start font-medium">
                    {item.price}
                  </TableCell>
                  <TableCell className="px-1 py-2 text-start font-medium">
                    {item.poached}
                  </TableCell>
                </TableBody>
              );
            })}
          </Table>
        </div>
        <div className="relative col-span-2 max-h-[40vh] min-h-[40vh] overflow-y-auto rounded-xl border-2 border-green-500 px-2">
          <Table>
            <TableHeader className="sticky top-0">
              <TableRow>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Tên tài khoản
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Mật khẩu
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Kho
                </TableHead>
                <TableHead className="flex-shrink-0 p-1 text-start">
                  Đã bán
                </TableHead>
              </TableRow>
            </TableHeader>
            {productAccount.map((item) => {
              return (
                <TableBody key={item.id}>
                  <TableCell className="px-1 py-2 text-start font-medium">
                    {item.account}
                  </TableCell>
                  <TableCell className="px-1 py-2 text-start font-medium">
                    {item.password}
                  </TableCell>
                  <TableCell className="px-1 py-2 text-start font-medium">
                    {poached}
                  </TableCell>
                  <TableCell className="flex items-center px-1 py-2 text-start font-medium">
                    {item.sold === false ? "Chưa" : "Đã bán"}
                    {item.sold === false ? (
                      <Button
                        className="text-red-500"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdDelete />
                      </Button>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableBody>
              );
            })}
          </Table>
        </div>
      </div>

      <div>
        <div className="mt-10 flex w-full items-center justify-between px-10">
          <h5>Thêm tài khoản</h5>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-4">
              {" "}
              <label htmlFor="category" className="block text-lg font-medium">
                Kho:
              </label>
              <Select
                className="block w-max rounded-md border py-2 pr-10"
                id="category"
                value={poached}
                onChange={handleChangePoached}
              >
                {row.productSales?.map((item) => (
                  <option value={item.poached} key={item.id}>
                    {item.poached}
                  </option>
                ))}
              </Select>
            </div>{" "}
            <div className="flex items-center gap-x-4">
              {" "}
              <label htmlFor="sold" className="block text-lg font-medium">
                Tồn kho
              </label>
              <Select
                className="block w-max rounded-md border py-2 pr-10"
                id="sold"
                onChange={handleChangeSold}
              >
                <option value="all">Tất cả</option>
                <option value="sold">Đã bán</option>
                <option value="no-sold">Chưa bán</option>
              </Select>
            </div>
          </div>
        </div>
        <form
          className="ml-2 w-max rounded-lg border-2 p-4 md:ml-10"
          onSubmit={handleAddAccount}
        >
          <Fieldset className="flex flex-wrap items-center gap-x-4 py-0">
            <Field className="py-0">
              <Label className="block text-lg font-medium">Tài khoản</Label>
              <Input
                className="block rounded-md border px-2 py-1"
                name="address"
                id="account"
                required
                value={form.account}
                onChange={handleChange}
              />
            </Field>
            <Field className="py-0">
              <Label className="block text-lg font-medium">Mật khẩu</Label>
              <Input
                className="block rounded-md border px-2 py-1"
                name="address"
                id="password"
                required
                value={form.password}
                onChange={handleChange}
              />
            </Field>
            <Field className="py-0">
              <Label className="block text-lg font-medium">Kho</Label>
              <Select
                className="block w-max rounded-md border py-1 pr-10"
                name="country"
                id="category"
                value={poached}
                onChange={handleChangePoached}
              >
                {row.productSales?.map((item) => (
                  <option value={item.poached} key={item.id}>
                    {item.poached}
                  </option>
                ))}
              </Select>
            </Field>
            <Button
              className="rounded-lg bg-primary/80 px-2 py-1 text-lg font-medium text-white"
              type="submit"
            >
              Thêm
            </Button>
          </Fieldset>
        </form>
      </div>
    </div>
  );
}
