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
import { FaEye } from "react-icons/fa";
export default function ViewPricing({ item }) {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <>
      <Button
        onClick={open}
        className="rounded-md text-xl font-medium text-yellow-500 focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <FaEye />
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
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
                <h3>Thêm tiền vào tài khoản</h3>{" "}
                <div className="mt-10 flex items-center justify-center">
                  <label htmlFor="price">Thay đổi tiền: </label>
                  <Input
                    className="min-h-10 min-w-full rounded-lg border px-2 md:min-w-max"
                    defaultValue={item.priceOld}
                    id="price"
                  ></Input>
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
                  onClick={close}
                >
                  Xác nhận
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
