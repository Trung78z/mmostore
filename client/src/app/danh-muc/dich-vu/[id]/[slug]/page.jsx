"use client";
import { cn } from "@/lib/utils";
import { Button, Input } from "@headlessui/react";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/configs/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "@/lib/hooks/AuthProvider";

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
  function handleCheck(id, price) {
    setCheck(id);
    setPrice(price);
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
        setRow(response.data.msg);

        // Ensure response.data.msg and serviceSales[0] are defined before accessing price
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

  const handleOrder = async () => {
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
      servicesId: row.id,
      serviceSalesId: check,
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
        try {
          const response = await axios.post("/orders/create", data, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          });
          setAuthState({
            ...authState,
            accountBalance:
              response.data.newService.updatedProfile.accountBalance,
          });

          Swal.fire("Success!", "Đặt hàng thành công!", "success");
        } catch (error) {
          toast.error("Đặt hàng không thành công vui lòng thử lại!");
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
        <>Loading.....</>
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
                      306 Reviews | Đã bán: 3313997 | Khiếu nại: 0.0%
                    </p>
                  </div>
                  <p>{row.content}</p>
                  <p className="space-x-1">
                    Người bán:
                    <span className="text-primary"> {row.user.username}</span>
                    <span className="border-l-2 pl-1">Online 1 giờ trước.</span>
                  </p>
                  <div>
                    Dịch vụ:
                    <span className="text-primary">
                      {row.serviceSubCategory.subCategory}
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
                          onClick={() => handleCheck(item.id, item.price)}
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
                      <Input
                        className="border px-2 py-1"
                        placeholder="Nhập mã giảm giá..."
                      ></Input>
                      <div className="flex items-center gap-x-2">
                        <Button
                          className="rounded-sm bg-primary p-3 py-1 text-xl font-semibold text-white"
                          onClick={handleOrder}
                        >
                          Mua hàng
                        </Button>
                        <Button className="rounded-sm bg-primary p-3 py-1 text-xl font-semibold text-white">
                          Đặt trước
                        </Button>
                        <Button className="rounded-sm border border-primary p-3 py-1 text-xl font-semibold text-primary">
                          Nhắn tin
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
                    <Tab className="rounded-lg px-5 py-2 data-[selected]:border-none data-[selected]:bg-background data-[selected]:text-black data-[hover]:underline">
                      Tab 3
                    </Tab>
                  </TabList>
                  <TabPanels className="md:mx-10">
                    <TabPanel
                      className="card"
                      dangerouslySetInnerHTML={{ __html: row.description }}
                    ></TabPanel>
                    <TabPanel className="card space-y-3 md:mx-20">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex">
                          <Image
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            width={40}
                            height={40}
                            className="max-h-10 max-w-10 rounded-full"
                          />
                          <div>
                            k****ungtls
                            <div className="flex">
                              <FaStar className="h-4 w-4 text-yellow-500" />
                              <FaStar className="h-4 w-4 text-yellow-500" />
                              <FaStar className="h-4 w-4 text-yellow-500" />
                              <FaStar className="h-4 w-4 text-yellow-500" />
                              <FaRegStarHalfStroke className="h-4 w-4 text-yellow-500" />
                            </div>
                            <p>Sản phẩm chuẩn chất lượng.</p>
                            <p>{new Date().toLocaleDateString()}</p>
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
