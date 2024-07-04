"use client";

import React, { Suspense, lazy } from "react";

const ContactPage = lazy(() => import("./Contact"));
export default function LienHe() {
  return (
    <>
      <Suspense fallback={<>Loading....</>}>
        <ContactPage />
      </Suspense>
    </>
  );
}
