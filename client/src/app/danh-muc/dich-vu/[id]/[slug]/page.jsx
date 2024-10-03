"use client";
import { cn, formatTimeChat } from "@/lib/utils";
import { Button, Input, Textarea } from "@headlessui/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { IoMdAddCircleOutline, IoMdStarOutline } from "react-icons/io";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/configs/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "@/lib/hooks/AuthProvider";

import CardDichVuOther from "@/components/danh-muc/CardDichVuOther";
import LoadingPage from "@/components/Loading";
import Link from "next/link";
export default function SlugServices() {
  const { slug } = useParams();

  const { authState, setAuthState } = useContext(AuthContext);
  const [check, setCheck] = useState(1);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [row, setRow] = useState({});
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [buy, setBuy] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [require, setRequire] = useState("");

  const [open, setOpen] = useState(false);
  function handleCheck(id, price, title) {
    setCheck(id);
    setPrice(price);
    setTitle(title);
  }

  async function fetchBuy(id) {
    try {
      const response = await axios.get("/orders/user-service/" + id, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });

      if (response.data.msg !== null) {
        return setBuy(true);
      } else {
        setBuy(false);
      }
    } catch (error) {}
  }
  function sub() {
    if (amount > 1) {
      setAmount((pre) => pre - 1);
    } else {
      setAmount(1);
    }
  }
  function handleChangeAmount(e) {
    setAmount(e.target.value);
  }
  function add() {
    setAmount((pre) => pre + 1);
  }
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/services/id/" + slug);
        if (response.data.success === false) {
          setRow({});
          setLoading(false);
          return;
        }
        setStatus(true);

        fetchBuy(response.data.msg.id);
        setRow(response.data.msg);
        if (
          response.data.msg &&
          response.data.msg.serviceSales &&
          response.data.msg.serviceSales.length > 0
        ) {
          setPrice(response.data.msg.serviceSales[0].price);
        } else {
          setPrice(0); // Default value if price is not available
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);
  const handleReviews = async (e) => {
    e.preventDefault();
    const review = row.serviceReviews.find(
      (item) => item.userId === authState.id,
    );

    if (review) {
      return Swal.fire({
        title: "Bạn đã đánh giá cho sản phẩm này!",
        icon: "info",
      });
    }
    try {
      const response = await axios.post(
        "/services/createReview/" + row.id,
        {
          level: rating,
          content: content,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );

      setRow((prev) => ({
        ...prev,
        serviceReviews: [response.data.id, ...prev.serviceReviews],
      }));
      toast.success("Cám ơn bạn đã đánh giá");
      setRating(0);
      setContent("");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra vui lòng thử lại!");
    }
  };
  const handleChat = async () => {
    try {
      router.push(`/chat`);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra vui lòng thử lại hoặc liên hệ với admin!");
    }
  };
  const handleOrder = async (e) => {
    e.preventDefault();
    if (authState.id === row.userId) {
      return Swal.fire({
        title: "Bạn đã là người bán sản phẩm này!",
        text: "Bạn đã là người bán sản phẩm này",
        icon: "info",
      });
    }
    if (price * parseInt(amount) > authState.accountBalance) {
      return Swal.fire({
        title: "Error!",
        text: "Số tiền không đủ vui lòng nạp tiền thêm!",
        icon: "error",
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: "Nạp tiền?",
        cancelButtonText: "Không!",
      }).then((res) => {
        if (res.value) {
          router.push("/nap-tien");
        }
      });
    }
    const data = {
      amount: parseInt(amount),
      unitPrice: price * parseInt(amount),
      sale: 0,
      total: price * parseInt(amount) - 0,
      refund: 0,
      content: require,
      serviceId: row.id,
      serviceSaleId: check,
    };

    try {
      const response = await axios.post("/orders/create-service", data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      setAuthState({
        ...authState,
        accountBalance: authState.accountBalance - price * parseInt(amount) - 0,
      });

      Swal.fire({
        title: "Success!",
        html: `
              <p>Đặt hàng thành công!</p>
              <p>Đơn hàng của bạn là: <strong>${response.data.msg.id}</strong></p>
              <p>Có yêu cầu về đơn hàng vui lòng cung cấp thêm thông tin tại đoạn chat: <strong>Đơn hàng số ${response.data.msg.id}</strong></p>
            `,
        icon: "success",
      });
      // <p>Vui lòng vào đoạn chat có mã đơn hàng là <strong>${response.data.msg.id}</strong></p>

      await axios.post(
        "/chats/room/admin/create",
        {
          name: `Đơn hàng số ${response.data.msg.id}`,
          userId: row.userId,
          serviceOrdersId: response.data.msg.id,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );
      router.push(`/order/dich-vu/${response.data.msg.id}`);
      await fetchBuy(row.id);
      setOpen(false);
    } catch (error) {
      setOpen(false);
      toast.error("Đã xảy ra lỗi khi tạo phòng vui lòng thử lại!");
    }
  };
  const handleLoginPage = () => {
    router.push("/dang-nhap");
  };
  return (
    <>
      {loading ? (
        <>
          <LoadingPage />
        </>
      ) : (
        status && (
          <>
            <div className="mx-auto max-w-screen-xl space-y-6 p-4">
              <div className="card grid grid-cols-1 gap-x-20 md:grid-cols-2">
                <div className="col-span-1">
                  <div className="relative top-1/2 min-h-[80%] -translate-y-1/2">
                    <Image
                      src={
                        row.image ||
                        "https://taphoammo.net/img/gmail-ngoai-new-ios-random-ip-ngam-tren-14_728121551.png"
                      }
                      alt=""
                      fill="true"
                      className="h-full w-full rounded-md object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-1 space-y-1">
                  <div className="flex gap-1">
                    <h1 className="text-3xl text-primary">
                      <span className="rounded-sm bg-primary/80 p-1 text-2xl text-white">
                        Dịch vụ
                      </span>
                      {row.title}
                    </h1>
                  </div>
                  <div className="inline-flex items-center">
                    <FaStar className="h-4 w-4 text-yellow-500" />
                    <FaStar className="h-4 w-4 text-yellow-500" />
                    <FaStar className="h-4 w-4 text-yellow-500" />
                    <FaStar className="h-4 w-4 text-yellow-500" />
                    <FaRegStarHalfStroke className="h-4 w-4 text-yellow-500" />
                    <p className="inline-flex text-[14px]">
                      {row.serviceReviews.length} Reviews | Đã bán:
                      {row._count.serviceOrders} | Khiếu nại: 0.0%
                    </p>
                  </div>
                  <p>{row.content}</p>

                  <p className="space-x-1">
                    Người bán:
                    <Link href={`/trang-ca-nhan/${row.userId}`}>
                      <span className="text-primary"> {row.user.username}</span>
                    </Link>
                    <span className="border-l-2 pl-1">
                      {row.user?.status?.isOnline === true
                        ? "Online"
                        : `Online ${formatTimeChat(row.user?.status?.lastOnline)} trước`}
                    </span>
                  </p>
                  <div>
                    Dịch vụ:
                    <span className="text-primary">
                      {row.subCategory.subCategory}
                    </span>
                  </div>
                  {authState.status && (
                    <div>
                      <h4>{(price * amount).toLocaleString("vi-VN")} vnđ</h4>
                    </div>
                  )}
                  <hr />
                  {authState.status ? (
                    <div className="space-y-2">
                      <h5>Dịch vụ</h5>

                      {row.serviceSales.map((item) => (
                        <Button
                          key={item.id}
                          className={cn(
                            "rounded-sm px-2 text-[16px] font-normal",
                            check === item.id ? "bg-primary text-white" : "",
                          )}
                          onClick={() =>
                            handleCheck(item.id, item.price, item.title)
                          }
                        >
                          {item.title}
                        </Button>
                      ))}

                      <h5>Số lượng</h5>
                      <div className="flex items-center gap-1">
                        <Button
                          className="rounded-full hover:bg-slate-400"
                          onClick={sub}
                        >
                          <GrSubtractCircle className="h-6 w-6" />
                        </Button>
                        <input
                          className="flex w-10 text-center"
                          type="number"
                          min={1}
                          value={amount}
                          onChange={handleChangeAmount}
                        ></input>
                        <Button
                          className="rounded-full hover:bg-slate-400"
                          onClick={add}
                        >
                          <IoMdAddCircleOutline className="h-6 w-6" />
                        </Button>
                      </div>
                      {/* <Input
                        className="border px-2 py-1"
                        placeholder="Nhập mã giảm giá..."
                      ></Input> */}
                      <div className="flex items-center gap-x-2">
                        <Dialog onOpenChange={(e) => setOpen(e)} open={open}>
                          <DialogTrigger>
                            <Button className="rounded-sm bg-primary p-3 py-1 text-xl font-semibold text-white">
                              Mua hàng
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Xác nhận đơn hàng</DialogTitle>
                              <DialogDescription>
                                <form
                                  onSubmit={handleOrder}
                                  className="flex items-center justify-center"
                                >
                                  <div className="w-full p-6">
                                    <h2 className="mb-4 text-xl font-semibold"></h2>
                                    <p className="mb-2 font-medium text-green-600">
                                      Vui lòng xác nhận các thông tin sau:
                                    </p>

                                    <div className="mb-4">
                                      <span className="block text-sm font-medium text-gray-700">
                                        Mặt hàng:
                                      </span>
                                      <span className="mt-1 block rounded bg-yellow-400 px-4 py-2 font-semibold text-black">
                                        {title}
                                      </span>
                                    </div>

                                    <div className="mb-4">
                                      <label
                                        for="details"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Viết yêu cầu chi tiết:
                                      </label>
                                      <textarea
                                        id="details"
                                        onChange={(e) =>
                                          setRequire(e.target.value)
                                        }
                                        rows="4"
                                        required
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Nội dung này sẽ làm căn cứ để giải quyết tranh chấp (nếu có). VD: Like cho fanpage nào, cmt kênh nào..."
                                      ></textarea>
                                    </div>

                                    <div className="mb-4">
                                      <span className="block text-sm font-medium text-gray-700">
                                        Số lượng:
                                      </span>
                                      <span className="mt-1 block">
                                        {parseInt(amount)}
                                      </span>
                                    </div>

                                    <div className="mb-4">
                                      <span className="block text-sm font-medium text-gray-700">
                                        Tổng tiền:
                                      </span>
                                      <span className="mt-1 block">
                                        {parseInt(amount) * price} VND
                                      </span>
                                    </div>

                                    <div className="mb-4">
                                      <span className="block text-sm font-medium text-gray-700">
                                        Giảm giá:
                                      </span>
                                      <span className="mt-1 block">0 VND</span>
                                    </div>

                                    <div className="mb-4">
                                      <span className="block text-sm font-medium text-gray-700">
                                        Thời gian hoàn thành (tối đa):
                                      </span>
                                      <span className="mt-1 block">
                                        7 (Ngày)
                                      </span>
                                    </div>

                                    <div className="mb-6">
                                      <span className="block text-lg font-semibold text-gray-900">
                                        Tổng thanh toán:{" "}
                                        {parseInt(amount) * price} VND
                                      </span>
                                    </div>

                                    <div className="flex justify-end space-x-4">
                                      <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="rounded-md bg-gray-300 px-4 py-2 text-gray-700"
                                      >
                                        Đóng
                                      </button>
                                      <button
                                        type="submit"
                                        className="rounded-md bg-green-500 px-4 py-2 text-white"
                                      >
                                        Đặt dịch vụ
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>

                        {/* <Button className="rounded-sm bg-primary p-3 py-1 text-xl font-semibold text-white">
                          Đặt trước
                        </Button> */}
                        {buy && (
                          <Button
                            className="rounded-sm border border-primary p-3 py-1 text-xl font-semibold text-primary"
                            onClick={handleChat}
                          >
                            Nhắn tin
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <h5 className="font-normal">
                        Vui lòng đăng nhập để mua hàng, hoặc liên lạc với chủ
                        shop.
                      </h5>
                      <Button onClick={handleLoginPage}>Đăng nhập</Button>
                    </>
                  )}
                </div>
              </div>
              <div>
                <TabGroup>
                  <TabList className="flex items-center justify-center gap-x-10">
                    <Tab className="rounded-lg px-5 py-2 data-[selected]:border-none data-[selected]:bg-background data-[selected]:text-black data-[hover]:underline">
                      Mô tả
                    </Tab>
                    <Tab className="rounded-lg px-5 py-2 data-[selected]:border-none data-[selected]:bg-background data-[selected]:text-black data-[hover]:underline">
                      Reviews
                    </Tab>
                  </TabList>
                  <TabPanels className="md:mx-10">
                    <TabPanel
                      className="card"
                      dangerouslySetInnerHTML={{ __html: row.description }}
                    ></TabPanel>
                    <TabPanel className="card space-y-3 md:mx-20">
                      {buy ? (
                        <form onSubmit={handleReviews}>
                          <span> Đánh giá cho sản phẩm:</span>
                          <div>
                            {[...Array(5)].map((star, index) => {
                              const ratingValue = index + 1;

                              return (
                                <label key={index}>
                                  <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                    style={{ display: "none" }}
                                  />
                                  <FaStar
                                    className="star inline-block h-6 w-6"
                                    color={
                                      ratingValue <= (hover || rating)
                                        ? "#ffc107"
                                        : "#e4e5e9"
                                    }
                                    size={30}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                  />
                                </label>
                              );
                            })}
                          </div>
                          <Textarea
                            placeholder="Chi tiết đánh giá..."
                            className="w-full rounded-sm border px-2"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                          ></Textarea>
                          <div className="flex justify-end">
                            <Button
                              type="submit"
                              className="rounded-md bg-blue-500 p-1 text-white hover:bg-blue-600"
                            >
                              Gửi đánh giá
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex flex-col">
                          <p>Vui lòng mua sản phẩm để đánh giá! </p>
                        </div>
                      )}

                      {row.serviceReviews.map((item, index) => (
                        <div key={index} className="flex">
                          <Image
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                            alt=""
                            width={40}
                            height={40}
                            className="max-h-10 max-w-10 rounded-full"
                          />
                          <div>
                            {"*****" + item.user.profiles.fullName}
                            <div className="flex">
                              {Array.from({ length: item.level }).map(
                                (_, index) => {
                                  return (
                                    <FaStar
                                      key={index}
                                      className="h-4 w-4 text-yellow-500"
                                    />
                                  );
                                },
                              )}
                              {Array.from({ length: 5 - item.level }).map(
                                (_, index) => {
                                  return (
                                    <FaStar
                                      key={index}
                                      className="h-4 w-4 text-gray-400"
                                    />
                                  );
                                },
                              )}
                            </div>
                            <p>{item.content}.</p>
                            <p>
                              {new Date(item.createdAt).toLocaleDateString(
                                "vi-VN",
                              )}
                            </p>
                            <hr />
                          </div>
                        </div>
                      ))}
                    </TabPanel>
                    <TabPanel
                      dangerouslySetInnerHTML={{ __html: tab_api }}
                    ></TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>
              <div className="">
                <h4> Dịch vụ tương tự</h4>
                <CardDichVuOther />
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}

const tab_api = `<div class="product-tabs__pane" id="tab-api">
						<div class="typography">
							<h5 class="text-success">Mua hàng bằng API:</h5>
							<div>
								<p>Vui lòng đăng nhập xem API.</p>
								<a href="/login.html" style="color: #fff" class="btn btn-primary">Đăng nhập</a>
							</div>

							

						</div>
					</div>`;
