import { Request, Response } from "express";
import * as userService from "../services/userService";
import { sendPayment } from "../utils/smsEmail";
import * as paymentService from "../services/paymentService";
export const createPayWithWebHook = async (req: Request, res: Response) => {
  let error = req.body.error;
  if (error != 0) {
    return;
  }

  let transactions = req.body.data;
  for (const data of transactions) {
    try {
      await userService.createTranSaction(
        data.id,
        data.amount,
        data.description,
        data.tid,
        new Date(data.when)
      );
    } catch (error) {
      console.log(error);
    }

    let aaaa = data.description.toLowerCase();
    let startIndex = aaaa.indexOf("mmo");
    if (startIndex !== -1) {
      let result = aaaa.substring(startIndex, startIndex + 11);
      const z = result.replace("mmo", "");
      try {
        const dataIdBank = await userService.findIdBank(z);
        sendPayment(
          data.tid,
          data.description,
          data.amount,
          data.when,
          dataIdBank?.email
        );
        const dataProfile = await userService.findProfileAccountBalance(
          dataIdBank?.id
        );
        await paymentService.createPayment(dataIdBank?.id, data.amount);
        await userService.updateAccountBalance(
          dataIdBank?.id,
          dataProfile?.accountBalance + data.amount
        );
      } catch (error) {
        console.log(error);
      }
      console.log("done");
    } else {
      console.log("Không tìm thấy 'MMO' trong chuỗi.");
    }
  }
  res.end("OK");
};
