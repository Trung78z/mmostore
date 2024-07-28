"use client";

import LoadingPage from "@/components/Loading";
import React, { Suspense, lazy } from "react";

const ContactPage = lazy(() => import("./Contact"));
export default function LienHe() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <LoadingPage />
          </div>
        }
      >
        <ContactPage />
      </Suspense>
    </>
  );
}
