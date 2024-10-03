import axios from "axios";
// export const API_URL = "http://localhost:8080";
export const API_URL = "https://api.taphoazalo.com";
export default axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    "X-Custom-Header": "foobar",
  },
});

const data = [
  {
    id: 1,
    title: "Dịch Vụ Twttier X Buff Follow SIÊU RẺ",

    user: {
      username: "phannhatduy888",
    },
    category: {
      category: "Tài khoản",
    },
    subCategory: {
      subCategory: "Tài khoản FB",
    },
    productSales: [
      {
        id: 1,
        title: "Gmail tên Việt, đăng kí tay, nuôi lâu, đã kháng về rất cứng",
        price: 18000,
        poached: "1422",
        productId: 1,
        _count: {
          productAccount: 0,
        },
      },
    ],
    productReviews: [],
    _count: {
      productOrders: 0,
    },
  },
  {
    id: 2,
    title: "Gmail new đã ngâm từ 7 ngày đến 2 tháng siêu rẻ",

    category: {
      category: "Tài khoản",
    },
    subCategory: {
      subCategory: "Tài khoản FB",
    },
    productSales: [
      {
        id: 6,
        title: "Gmail tên Việt, đăng kí tay, nuôi lâu, đã kháng về rất cứng",
        price: 18000,
        poached: "14124",
        productId: 2,
        _count: {
          productAccount: 0,
        },
      },
      {
        id: 7,
        title: "Gmail Việt 2023, đăng kí tay, bao chất lượng , cực trâu",
        price: 28000,
        poached: "23113",
        productId: 2,
        _count: {
          productAccount: 0,
        },
      },
    ],
    productReviews: [],
    _count: {
      productOrders: 0,
    },
  },
  {
    id: 3,
    title: "Gmail ( cho thuê ) - Giá rẻ",
    user: {
      username: "phannhatduy888",
    },
    category: {
      category: "Tài khoản",
    },
    subCategory: {
      subCategory: "Tài khoản FB",
    },
    productSales: [
      {
        id: 11,
        title: "Gmail tên Việt, đăng kí tay, nuôi lâu, đã kháng về rất cứng",
        price: 18000,
        poached: "1fsd4",
        productId: 3,
        _count: {
          productAccount: 0,
        },
      },
      {
        id: 12,
        title: "Gmail Việt 2023, đăng kí tay, bao chất lượng , cực trâu",
        price: 28000,
        poached: "1fdsf3",
        productId: 3,
        _count: {
          productAccount: 0,
        },
      },
    ],
    productReviews: [],
    _count: {
      productOrders: 0,
    },
  },
];
