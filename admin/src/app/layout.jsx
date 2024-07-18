import { Roboto } from "next/font/google";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/lib/hooks/AuthProvider";
import AuthCheck from "./authorcheck";
const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Tạp hóa MMO",
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
      <body className={(inter.className, "bg-[#f8f8f8]")}>
        <AuthProvider>
          <AuthCheck>
            <div>{children}</div>
          </AuthCheck>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
