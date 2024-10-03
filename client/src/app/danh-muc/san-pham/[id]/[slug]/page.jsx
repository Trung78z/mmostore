"use client";
import { cn, formatTimeChat } from "@/lib/utils";
import { Button, Input, Textarea } from "@headlessui/react";

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
  const [poached, setPoached] = useState("");
  const [amountMax, setAmountMax] = useState(0);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("/products/id/" + slug);
        if (response.data.success === false) {
          setRow({});
          setLoading(false);
          return;
        }
        setStatus(true);

        fetchBuy(response.data.msg.id);
        setRow(response.data.msg);

        const update = response.data.msg.productSales.filter(
          (item) => item._count.productAccount > 0,
        );
        setCheck(update[0].id);
        setPoached(response.data.msg.productSales[0].poached);
        setAmountMax(response.data.msg.productSales[0]._count.productAccount);
        if (
          response.data.msg &&
          response.data.msg.productSales &&
          response.data.msg.productSales.length > 0
        ) {
          setPrice(response.data.msg.productSales[0].price);
        } else {
          setPrice(0);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  function handleCheck(id, price, max) {
    setAmount(1);
    setCheck(id);
    setPrice(price);
    setAmountMax(max);
  }

  async function fetchBuy(id) {
    try {
      const response = await axios.get("/orders/user-product/" + id, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });

      if (response.data.msg !== null) {
        return setBuy(true);
      } else {
        setBuy(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function sub() {
    if (amount > 1) {
      setAmount((pre) => pre - 1);
    } else {
      setAmount(1);
    }
  }
  function handleChangeAmount(e) {
    const value = parseInt(e.target.value);
    if (value > amountMax) {
      setAmount(amountMax);
    } else {
      setAmount(value);
    }
  }
  function add() {
    setAmount((pre) => {
      return amountMax === pre ? pre : pre + 1;
    });
  }

  const handleReviews = async (e) => {
    e.preventDefault();
    if (row.productReviews.find((item) => item.userId === authState.id)) {
      return Swal.fire({
        title: "Bạn đã đánh giá cho sản phẩm này!",
        icon: "info",
      });
    }
    try {
      const response = await axios.post(
        "products/createReview/" + row.id,
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
        productReviews: [response.data.id, ...prev.productReviews],
      }));
      toast.success("Cám ơn bạn đã đánh giá");
      setRating(0);
      setContent("");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra vui lòng thử lại!");
    }
  };

  const handleOrder = async () => {
    if (amount > amountMax) {
      return Swal.fire({
        title: "Số lượng không đủ!",
        text: "Xin lỗi bạn về vấn đề bất tiện này!",
        icon: "question",
      });
    }

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
      productId: row.id,
      productSaleId: check,
    };
    Swal.fire({
      title: "Mua hàng?",
      text: "Bạn chắc chắn mua hàng chứ!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Mua hàng!",
      cancelButtonText: "Hủy!",
      reverseButtons: true,
    }).then(async (res) => {
      if (res.value) {
        const loadingToast = toast.loading("Đang xử lý đơn hàng...");
        try {
          const response = await axios.post("/orders/create-product", data, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          });
          if (response.data.success === false) {
            return toast.error(response.data.msg);
          }
          setAuthState({
            ...authState,
            accountBalance:
              authState.accountBalance - price * parseInt(amount) - 0,
          });

          router.push(`/order/${response.data.msg.id}`);
          toast.update(loadingToast, {
            render: "Đơn hàng đã được tạo thành công!",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
          setBuy(true);
        } catch (error) {
          toast.error("Đã xảy ra lỗi khi tạo phòng vui lòng thử lại!");
        }
      }
    });
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
                  <div className="relative top-1/2 min-h-[90%] -translate-y-1/2">
                    <Image
                      src={
                        row.image ||
                        "https://taphoammo.net/img/gmail-ngoai-new-ios-random-ip-ngam-tren-14_728121551.png"
                      }
                      alt=""
                      fill="true"
                      className="h-full w-full rounded-md"
                    />
                  </div>
                </div>
                <div className="col-span-1 space-y-1">
                  <div className="flex gap-1">
                    <h1 className="text-3xl text-primary">
                      <span className="rounded-sm bg-primary/80 p-1 text-2xl text-white">
                        Sản phẩm
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
                      {row.productReviews.length} Reviews | Đã bán:
                      {row._count.productOrders} | Khiếu nại: 0.0%
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
                    Sản phẩm:
                    <span className="text-primary">
                      {row.subCategory.subCategory}
                    </span>{" "}
                    | Kho:
                    <span className="text-primary">{poached}</span>
                  </div>
                  {authState.status && (
                    <div>
                      <h4>{(price * amount).toLocaleString("vi-VN")} vnđ</h4>
                    </div>
                  )}
                  <hr />
                  {authState.status ? (
                    <div className="space-y-2">
                      <h5>Sản phẩm</h5>

                      {row.productSales.map((item) => (
                        <Button
                          key={item.id}
                          className={cn(
                            "rounded-sm px-2 text-[16px] font-normal",
                            check === item.id ? "bg-primary text-white" : "",
                          )}
                          disabled={
                            item._count.productAccount === 0 ? true : false
                          }
                          onClick={() => {
                            handleCheck(
                              item.id,
                              item.price,
                              item._count.productAccount,
                            );
                            setPoached(item.poached);
                          }}
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
                          max={amountMax}
                          onChange={handleChangeAmount}
                        ></input>
                        <Button
                          className="rounded-full hover:bg-slate-400"
                          onClick={add}
                        >
                          <IoMdAddCircleOutline className="h-6 w-6" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-x-2">
                        <Button
                          className="rounded-sm bg-primary p-3 py-1 text-xl font-semibold text-white"
                          onClick={handleOrder}
                        >
                          Mua hàng
                        </Button>
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

                      {row.productReviews.map((item, index) => (
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
                <h4> Sản phẩm tương tự</h4>
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
