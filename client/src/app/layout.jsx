import { Roboto } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/navbar";
import FooterPage from "@/components/footer";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/lib/hooks/AuthProvider";

import { StoreProvider } from "./StoreProvider";
import { cn } from "@/lib/utils";
const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: {
    template: "%s | Tạp hóa Zalo",
    default: "Tạp hóa Zalo", // a default is required when creating a template
  },
  description: "Tạp hóa MMO chuyên cung cấp các dịch vụ về thị trường web",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-[#f8f8f8]")}>
        <StoreProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <FooterPage />
            <ToastContainer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
