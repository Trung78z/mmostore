"use client";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
export default function ViewPhanHoi({ item }) {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    toast("Đã phản hồi thành công!");
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
              className="data-[closed]:transform-[scale(95%)] card w-full max-w-sm rounded-xl bg-white p-6 shadow-lg backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="flex flex-col text-center text-base/7 font-medium"
              >
                <h3>Phản hồi cho khách hàng</h3>{" "}
              </DialogTitle>
              <p className="mt-2 text-center text-sm/6 text-black">
                {item.description}
              </p>
              <div className="mt-10">
                <Field>
                  <Textarea
                    className={clsx(
                      "mt-3 block w-full resize-none rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black",
                    )}
                    rows={3}
                  />
                </Field>
              </div>
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
