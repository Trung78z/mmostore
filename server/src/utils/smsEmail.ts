import { configDotenv } from "dotenv";
import { transporter } from "../configs/mail";
configDotenv();
export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.SERVER_HOST}/api/user/verify-email?token=${token}`;
  try {
    return transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Kích hoạt tài khoản của bạn",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <img src="https://taphoazalo.com/favicon.ico" alt="Your Logo" style="width: 100px; height: auto;"/>
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
          <p>Email: <a href="mailto:shoptaphoazalo@gmail.com">shoptaphoazalo@gmail.com</a></p>
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
  } catch (error) {
    throw new Error();
  }
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
          <img src="https://taphoazalo.com/favicon.ico" alt="Your Logo" style="width: 100px; height: auto;"/>
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
      <p>Email: <a href="mailto:shoptaphoazalo@gmail.com">shoptaphoazalo@gmail.com</a></p>
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

export const sendPayment = async (
  tid: string,
  description: string,
  amount: number,
  when: string,
  email?: string
) => {
  return await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Nạp tiền vào tài khoản thành công",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <img src="https://taphoazalo.com/favicon.ico" alt="Your Logo" style="width: 100px; height: auto;"/>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #333;">Xin chào,</h2>
          <p>Chúng tôi xin thông báo rằng bạn đã nạp tiền thành công vào tài khoản của mình.</p>
          <div style="margin-top: 20px; border: 1px solid #ddd; padding: 10px;">
            <h3 style="color: #333;">Thông tin giao dịch:</h3>
            <p><strong>Mã giao dịch:</strong> ${tid}</p>
            <p><strong>Mô tả:</strong> ${description}</p>
            <p><strong>Số tiền:</strong> ${amount.toLocaleString()} VNĐ</p>
            <p><strong>Thời gian giao dịch:</strong> ${when}</p>
          </div>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          <p>Trân trọng,</p>
          <p><strong>Đội ngũ hỗ trợ</strong></p>
          <p>Email: <a href="mailto:shoptaphoazalo@gmail.com">shoptaphoazalo@gmail.com</a></p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://facebook.com/yourpage" style="margin: 0 10px;"><img src="https://yourdomain.com/facebook-icon.png" alt="Facebook" style="width: 24px; height: 24px;"/></a>
            <a href="https://twitter.com/yourpage" style="margin: 0 10px;"><img src="https://yourdomain.com/twitter-icon.png" alt="Twitter" style="width: 24px; height: 24px;"/></a>
            <a href="https://instagram.com/yourpage" style="margin: 0 10px;"><img src="https://yourdomain.com/instagram-icon.png" alt="Instagram" style="width: 24px; height: 24px;"/></a>
          </div>
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <p style="font-size: 12px; color: #666;">Bạn nhận được email này vì bạn đã thực hiện giao dịch nạp tiền trên <a href="https://yourdomain.com">yourdomain.com</a>. Nếu bạn không muốn nhận email này nữa, vui lòng <a href="https://yourdomain.com/unsubscribe">hủy đăng ký</a>.</p>
        </div>
      </div>
    `,
  });
};
