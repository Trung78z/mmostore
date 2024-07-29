import { configDotenv } from "dotenv";
import { transporter } from "../configs/mail";
configDotenv();
export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.SERVER_HOST}/api/user/verify-email?token=${token}`;
  return await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Kích hoạt tài khoản của bạn",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <img src="https://yourdomain.com/logo.png" alt="Your Logo" style="width: 100px; height: auto;"/>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #333;">Xin chào,</h2>
          <p>Chúng tôi đã nhận được yêu cầu tạo tài khoản mới từ bạn. Để hoàn tất quá trình đăng ký, vui lòng nhấp vào liên kết sau để kích hoạt tài khoản của bạn:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${verificationLink}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Kích hoạt tài khoản</a>
          </div>
          <p>Nếu bạn không yêu cầu tạo tài khoản, vui lòng bỏ qua email này. Liên kết này sẽ hết hạn sau 1 giờ.</p>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          <p>Trân trọng,</p>
          <p><strong>Đội ngũ hỗ trợ</strong></p>
          <p>Email: <a href="mailto:support@yourdomain.com">support@yourdomain.com</a></p>
          <p>Điện thoại: +123-456-7890</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://facebook.com/yourpage" style="margin: 0 10px;"><img src="https://yourdomain.com/facebook-icon.png" alt="Facebook" style="width: 24px; height: 24px;"/></a>
            <a href="https://twitter.com/yourpage" style="margin: 0 10px;"><img src="https://yourdomain.com/twitter-icon.png" alt="Twitter" style="width: 24px; height: 24px;"/></a>
            <a href="https://instagram.com/yourpage" style="margin: 0 10px;"><img src="https://yourdomain.com/instagram-icon.png" alt="Instagram" style="width: 24px; height: 24px;"/></a>
          </div>
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <p style="font-size: 12px; color: #666;">Bạn nhận được email này vì bạn đã đăng ký tài khoản trên <a href="https://yourdomain.com">yourdomain.com</a>. Nếu bạn không muốn nhận email này nữa, vui lòng <a href="https://yourdomain.com/unsubscribe">hủy đăng ký</a>.</p>
        </div>
      </div>
    `,
  });
};
export const sendForgetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.WEB_HOST}/change-new-password?token=${token}`;
  return await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Đặt lại mật khẩu của bạn",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <img src="https://yourdomain.com/logo.png" alt="Your Logo" style="width: 100px; height: auto;"/>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #333;">Xin chào,</h2>
          <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu từ bạn. Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu của bạn:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a>
          </div>
          <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này. Liên kết này sẽ hết hạn sau 1 giờ.</p>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          <p>Trân trọng,</p>
          <p><strong>Đội ngũ hỗ trợ</strong></p>
          <p>Email: <a href="mailto:support@yourdomain.com">support@yourdomain.com</a></p>
          <p>Điện thoại: +123-456-7890</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://facebook.com/yourpage" style="margin: 0 10px;"><img src="https://yourdomain.com/facebook-icon.png" alt="Facebook" style="width: 24px; height: 24px;"/></a>
            <a href="https://twitter.com/yourpage" style="margin: 0 10px;"><img src="https://yourdomain.com/twitter-icon.png" alt="Twitter" style="width: 24px; height: 24px;"/></a>
            <a href="https://instagram.com/yourpage" style="margin: 0 10px;"><img src="https://yourdomain.com/instagram-icon.png" alt="Instagram" style="width: 24px; height: 24px;"/></a>
          </div>
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <p style="font-size: 12px; color: #666;">Bạn nhận được email này vì bạn đã yêu cầu đặt lại mật khẩu trên <a href="https://yourdomain.com">yourdomain.com</a>. Nếu bạn không muốn nhận email này nữa, vui lòng <a href="https://yourdomain.com/unsubscribe">hủy đăng ký</a>.</p>
        </div>
      </div>
    `,
  });
};
