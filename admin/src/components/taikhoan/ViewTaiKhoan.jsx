"use client";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
} from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import axios from "@/configs/api";
import { toast } from "react-toastify";
export default function ViewTaiKhoan({ item, setData, dataOld, setDataOld }) {
  let [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(item.profiles.accountBalance);
  const [role, setRole] = useState(item.role);
  function open() {
    setIsOpen(true);
  }
  function handleChangeTotal(e) {
    setTotal(e.target.value);
  }
  function close() {
    setIsOpen(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "/user/admin/update/" + item.id,
        { total: total, role: role },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );

      const update = dataOld.map((value) => {
        if (value.id === item.id) {
          value = response.data;
        }
        return value;
      });
      setDataOld(update);
      setData(update);
      toast("Update thành công!");
      close();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra vui lòng thử lại!");
      console.log(error);
    }
  };
  const handleFilterStatus = (e) => {
    setRole(e.target.value);
  };
  return (
    <>
      <Button
        onClick={open}
        className="rounded-md text-xl font-medium text-yellow-500 focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <FaEdit />
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <form onSubmit={handleSubmit}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="data-[closed]:transform-[scale(95%)] card w-full max-w-max rounded-xl bg-white p-6 shadow-lg backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
              >
                <DialogTitle
                  as="h3"
                  className="text-center text-base/7 font-medium"
                >
                  <h3>Chỉnh sửa tài khoản</h3>{" "}
                  <div className="mt-10 flex items-center justify-center">
                    <label htmlFor="price">Thay đổi tiền: </label>
                    <Input
                      className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
                      value={total}
                      onChange={handleChangeTotal}
                      id="price"
                    ></Input>
                  </div>{" "}
                  <div className="mt-10 flex items-center justify-center">
                    <label htmlFor="price">Thay role: </label>{" "}
                    <select
                      name=""
                      id=""
                      className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
                      onChange={handleFilterStatus}
                      defaultValue={item.role}
                    >
                      <option value="CUSTOMER">Tài khoản bán hàng</option>
                      <option value="ADMIN">Tài khoản admin</option>
                      <option value="USER">Tài khoản USER</option>
                    </select>
                  </div>
                </DialogTitle>

                <div className="mt-4 flex items-center justify-end gap-x-1">
                  <Button
                    className="gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                    onClick={close}
                  >
                    Close!
                  </Button>{" "}
                  <Button
                    className="gap-2 rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-600 data-[open]:bg-green-700 data-[focus]:outline-1 data-[focus]:outline-white"
                    type="submit"
                  >
                    Xác nhận
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
}
