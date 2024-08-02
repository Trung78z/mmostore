import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
} from "@headlessui/react";
import axios from "@/configs/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SearchPage({ service = "products" }) {
  let [isOpen, setIsOpen] = useState(false);
  const [row, setRow] = useState([]);
  const [rowOld, setRowOld] = useState([]);

  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const response = await axios.get("/services/fetch/service");
      setRowOld(response.data.msg);
      setRow(response.data.msg);
    } catch (error) {}
  };
  const handleChangeSearch = (e) => {
    const filter = rowOld.filter(
      (item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.content.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.slug.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setRow(filter);
  };
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Tìm gian hàng"
          className="min-h-10 w-full rounded-md border pl-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
        />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="min-h-[60vh] min-w-96 max-w-lg space-y-4 rounded-lg border bg-gray-100 p-6">
            <Input
              type="text"
              name="title"
              id="title"
              onChange={handleChangeSearch}
              placeholder="Tìm gian hàng"
              className="min-h-10 w-full rounded-md border pl-2 data-[focus]:bg-blue-200 data-[hover]:shadow"
            />
            {row.map((item) => {
              return (
                <Description
                  key={item.id}
                  className="rounded-md bg-background p-1 hover:shadow-xl"
                >
                  <Link
                    href={`/danh-muc/${service === "product" ? "san-pham" : "dich-vu"}/${item.category.categoryCover}/${item.slug}`}
                    className="flex min-w-full flex-1"
                  >
                    {item.title}
                  </Link>
                </Description>
              );
            })}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
