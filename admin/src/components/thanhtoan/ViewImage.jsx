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
export default function ViewImage({ item }) {
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
              className="data-[closed]:transform-[scale(95%)] card h-full w-full max-w-max rounded-xl bg-white p-6 shadow-lg backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <div
                as="h3"
                className="relative min-h-[60vh] min-w-80 text-center text-base/7 font-medium md:min-h-[80vh] md:min-w-[766px] xl:min-w-[1080px]"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill="true"
                  className="rounded-md object-contain"
                />
              </div>

              <div className="mt-4 flex items-center justify-end gap-x-1">
                <Button
                  className="gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={close}
                >
                  Close!
                </Button>{" "}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
