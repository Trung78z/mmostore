import { Request, Response } from "express";
import * as contact from "../services/contactService";
import { RoleContactCus } from "../types/enums/contact";
export const createContact = async (req: Request, res: Response) => {
  const { email, phone, title, content } = req.body;

  try {
    if (req.user) {
      const msg = await contact.createContact(
        email,
        phone,
        title,
        content,
        req.user.role as RoleContactCus,
        req.user.id
      );
      return res.status(200).json({ success: true, msg });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const msg = await contact.updateContact(parseInt(id), status);
    res.status(200).json({ success: true, msg });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const findAllContact = async (req: Request, res: Response) => {
  const { role } = req.params;
  try {
    const msg = await contact.findAllContact(role as RoleContactCus);
    res.status(200).json({ success: true, msg });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
