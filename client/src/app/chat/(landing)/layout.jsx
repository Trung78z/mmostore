"use client";

import { AuthContext } from "@/lib/hooks/AuthProvider";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Input,
  Label,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import axios from "@/configs/api";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
const schema = z.object({
  name: z
    .string()
    .min(5, { message: "Vui lòng nhập ít nhất 5 kí tự!" })
    .max(40, { message: "Vui lòng nhập nhiều nhất 40 kí tự!" }),
});

export default function LayoutChat({ children }) {
  let [isOpen, setIsOpen] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);
  const { authState } = useContext(AuthContext);
  const { slug } = useParams();
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [user, setUsers] = useState([]);
  const [userOld, setUsersOld] = useState([]);
  const [listUserRoom, setListUserRoom] = useState([]);
  const [name, setName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  async function onSubmit(data) {
    const userListCreate = listUserRoom.map((user) => ({ userId: user.id }));
    try {
      const response = await axios.post(
        `/chats/room/admin/create`,
        { name: data.name, userId: userListCreate },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );
      setRooms((prev) => [...prev, response.data.msg.members[0]]);
      setIsOpen(false);
      setUsers([]);
      setListUserRoom([]);
      reset({ name: "" });
      toast.success("Bạn đã tạo phòng thành công!");
    } catch (error) {
      console.log(error);
    }
  }
  function open2() {
    setIsOpen2(true);
  }

  function close2() {
    setIsOpen2(false);
  }

  useEffect(() => {
    getUserRooms();
  }, []);

  const handleLogin = () => {
    router.push("/dang-nhap");
  };
  const getUserRooms = async () => {
    try {
      const data = await axios.get(`/chats/users/rooms`, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      if (typeof data.data === "object" && !Array.isArray(data.data)) {
        setRooms(data.data.members);
      } else if (Array.isArray(data.data)) {
        setRooms(data.data);
      }
    } catch (error) {
      console.error("Error fetching user rooms:", error);
    }
  };
  const fetchAllUser = async () => {
    open2();
    try {
      const data = await axios.get(`/user`, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      const filter = data.data.filter((item) => item.id !== authState.id);
      setUsersOld(filter);
    } catch (error) {
      console.error("Error fetching user rooms:", error);
    }
  };

  const handleSearchList = (e) => {
    const filter = userOld.filter(
      (item) =>
        item.profiles.fullName
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.username.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setUsers(filter);
  };
  const handleAddUserRoom = (id) => {
    const filter = userOld.find((item) => item.id === id);
    const filterList = user.filter((item) => item.id !== id);
    const userExistsInRoom = listUserRoom.some((item) => item.id === id);

    if (!userExistsInRoom && filter) {
      setUsers(filterList);
      setListUserRoom((prev) => [...prev, filter]);
    }
  };
  const handleSubUserRoom = (id) => {
    const filter = listUserRoom.filter((item) => item.id !== id);
    const filterList = user.filter((item) => item.id !== id);
    setUsers(filterList);
    setListUserRoom(filter);
  };

  const handleDeleteRom = async (id) => {
    try {
      const data = await axios.delete(`/chats/user/out/${id}`, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      const filter = rooms.filter((item) => item.id !== id);
      setRooms(filter);
      router.push("/chat");
      toast.success("Xóa thành công!");
    } catch (error) {
      console.log(error);
    }
  };
  const getRoomName = (room, authStateId) => {
    if (room._count.members > 2) {
      return room.name;
    } else {
      const data = room?.members.find(
        (member) => member.user.id !== authStateId,
      );
      return data ? `${data.user.profiles.fullName}` : "Unknown User";
    }
  };
  return (
    <div>
      {authState.status === true ? (
        <>
          <div className="mx-auto my-4 w-full max-w-screen-lg pt-4">
            <div className="grid h-full min-h-[60vh] grid-cols-1 md:grid-cols-7">
              <div
                className={
                  (``,
                  slug === undefined
                    ? "chat-container relative col-span-1 max-h-[80vh] min-h-[70vh] space-y-2 overflow-y-auto overflow-x-hidden border-r-4 bg-background md:col-span-2"
                    : "chat-container relative hidden max-h-[80vh] min-h-[70vh] space-y-2 overflow-y-auto overflow-x-hidden border-r-4 bg-background md:col-span-2 md:block")
                }
              >
                <div className="flex flex-shrink-0 items-center justify-between">
                  <Link
                    href="https://zalo.me/0565392901"
                    target="_blank"
                    className="rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                  >
                    Mua nhanh
                  </Link>
                  <Link
                    href="https://zalo.me/0565392901"
                    target="_blank"
                    className="rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                  >
                    Bán nhanh
                  </Link>
                </div>
                {rooms.length > 0 ? (
                  rooms.map((item) => {
                    return (
                      <div key={item.id} className="relative">
                        <Link
                          href={`/chat/${item.roomId}`}
                          className={cn(
                            "flex items-center gap-x-2 border-b p-2",
                            slug === item.roomId && "bg-slate-200",
                          )}
                        >
                          <div className="relative">
                            <Image
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                              className="rounded-full"
                              width={40}
                              height={40}
                            />
                          </div>
                          <h2 className="h-full w-full text-lg font-normal">
                            {item.room.name}
                            {item.room.members
                              .filter(
                                (member) =>
                                  member.user.id !== authState.id &&
                                  member.user.role === "ADMIN",
                              )
                              .map((filteredMember) => (
                                <div
                                  key={filteredMember.user.id}
                                  className="absolute bottom-0 left-10 ml-2 inline-block text-sm text-red-500"
                                >
                                  admin
                                </div>
                              ))}
                          </h2>
                        </Link>
                        {authState.role === "ADMIN" && (
                          <Button
                            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-1"
                            onClick={() => handleDeleteRom(item.id)}
                          >
                            <RiSubtractFill className="h-4 w-4 rounded-full bg-red-500" />
                          </Button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <h3 className="p-2 text-center font-medium">
                      Hiện tại bạn chưa có ai để chat TT👩‍🦰
                    </h3>
                  </div>
                )}
                {authState.role === "ADMIN" && (
                  <>
                    <Button
                      onClick={open}
                      className="sticky bottom-0 flex min-w-full justify-center rounded-md bg-blue-600 py-2 text-white"
                    >
                      Tạo nhóm chat
                    </Button>

                    <Dialog
                      open={isOpen}
                      as="div"
                      className="relative z-10 focus:outline-none"
                      onClose={close}
                    >
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                              transition="true"
                              className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-slate-500 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
                            >
                              <DialogTitle
                                as="h4"
                                className="text-center text-base/7 font-medium text-white"
                              >
                                Tạo phòng chat
                              </DialogTitle>
                              <Fieldset className="space-y-8">
                                <Field>
                                  <Label className="block">
                                    Tên phòng chat
                                    <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    {...register("name")}
                                    className="min-w-full rounded-lg px-2 py-1 text-black data-[checked]:border data-[active]:bg-slate-300"
                                  ></Input>
                                  {errors.name && (
                                    <p className="text-red-600">
                                      {errors.name.message}
                                    </p>
                                  )}
                                </Field>
                              </Fieldset>
                              <Dialog
                                open={isOpen2}
                                as="div"
                                className="relative z-10 focus:outline-none"
                                onClose={close2}
                              >
                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                  <div className="flex min-h-full items-center justify-center p-4">
                                    <DialogPanel
                                      transition
                                      className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-primary/80 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
                                    >
                                      <div className="pt-2">
                                        <Input
                                          className="min-w-full rounded-lg border px-2 py-1"
                                          placeholder="Search user..."
                                          onChange={handleSearchList}
                                        ></Input>
                                        <ul className="max-h-80 list-none overflow-y-auto overflow-x-hidden py-2">
                                          {user.map((item) => {
                                            return (
                                              <li
                                                className="ml-0 flex justify-between border-b font-medium text-white"
                                                key={item.id}
                                              >
                                                <h5 className="text-base/7">
                                                  {item.profiles.fullName}
                                                </h5>
                                                <div className="flex">
                                                  <Button
                                                    className="rounded-full p-1"
                                                    onClick={() =>
                                                      handleAddUserRoom(item.id)
                                                    }
                                                  >
                                                    <IoMdAdd className="h-4 w-4 rounded-full bg-green-500" />
                                                  </Button>
                                                </div>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                      </div>
                                      <div className="mt-4 flex justify-end">
                                        <Button
                                          className="shadow-blue/10 flex items-center justify-end gap-2 rounded-md bg-blue-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-blue-600 data-[open]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                          onClick={close2}
                                        >
                                          Đóng
                                        </Button>
                                      </div>
                                    </DialogPanel>
                                  </div>
                                </div>
                              </Dialog>
                              <lable className="mt-2 block">
                                Thêm thành viên
                                <span className="text-red-500">*</span>
                              </lable>
                              <ul className="max-h-80 list-none overflow-y-auto overflow-x-hidden py-2">
                                {listUserRoom.map((item) => {
                                  return (
                                    <li
                                      className="ml-0 flex justify-between border-b font-medium text-white"
                                      key={item.id}
                                    >
                                      <h5 className="text-base/7">
                                        {item.profiles.fullName}
                                      </h5>

                                      <Button
                                        className="rounded-full p-1"
                                        onClick={() =>
                                          handleSubUserRoom(item.id)
                                        }
                                      >
                                        <RiSubtractFill className="h-4 w-4 rounded-full bg-red-500" />
                                      </Button>
                                    </li>
                                  );
                                })}
                              </ul>
                              <Button
                                onClick={fetchAllUser}
                                className="bottom-1 flex min-w-full justify-center rounded-md bg-blue-600 py-2 text-white"
                              >
                                Thêm thành viên!
                              </Button>
                              <div className="mt-4 flex justify-end">
                                <Button
                                  className="shadow-blue/10 flex items-center justify-end gap-2 rounded-md bg-blue-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-blue-600 data-[open]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                  type="submit"
                                >
                                  Tạo phòng chat
                                </Button>
                              </div>
                            </DialogPanel>
                          </div>
                        </div>
                      </form>
                    </Dialog>
                  </>
                )}
              </div>
              <div className="col-span-1 md:col-span-5">{children}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex min-h-[70vh] flex-col items-center justify-center sm:flex-row">
          <h3 className="text-center">
            {"Vui lòng đăng nhập để chat với tư vấn viên"}
          </h3>
          <Button
            className="rounded-lg bg-primary p-1 text-white hover:bg-primary/80"
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </div>
      )}
    </div>
  );
}
