import { Roboto } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/navbar";
import FooterPage from "@/components/footer";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/lib/hooks/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StoreProvider } from "./StoreProvider";
import { cn } from "@/lib/utils";
import { SocketProvider } from "@/lib/hooks/socketContext";
const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: {
    template: "%s | Tạp hóa Zalo",
    default: "Tạp hóa Zalo", // a default is required when creating a template
  },
  description:
    "Tạp hóa MMO chuyên cung cấp các dịch vụ về thị trường web, bao gồm mua bán sản phẩm số, hỗ trợ kiếm tiền trực tuyến, và cung cấp các công cụ tiện ích cho người dùng. Chúng tôi cam kết mang đến trải nghiệm mua sắm an toàn, tiện lợi với hệ thống kiểm tra sản phẩm trùng lặp, xử lý thanh toán tự động, và giữ tiền của người bán trong vòng 3 ngày sau khi giao dịch hoàn tất. Khám phá các dịch vụ của chúng tôi để nâng cao hiệu quả kinh doanh trực tuyến của bạn.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-[#f8f8f8]")}>
        <GoogleOAuthProvider clientId="234440017046-gb4v4hl1nv5al7r6a9updq4of67lgev4.apps.googleusercontent.com">
          <StoreProvider>
            <AuthProvider>
              <SocketProvider>
                <Navbar />
                {children}
                <FooterPage />
                <ToastContainer />
              </SocketProvider>
            </AuthProvider>
          </StoreProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
