"use client";

import React, { useEffect } from "react";
import { useBookingModal } from "@/context/BookingContext";
import CommonServiceSelectionModal from "./CommonServiceSelectionModal";
import Step1Card from "./Step1Card";
import Step2Card from "./Step2Card";
import Step3Card from "./Step3Card";

export default function BookingModal() {
  const { isModalOpen, step, closeModal } = useBookingModal();

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-[#071E3B]/75 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog Content */}
      <div
        className={`relative z-10 w-full ${
          step === 0 ? "max-w-4xl" : "max-w-[562px]"
        } my-auto animate-in fade-in zoom-in-95 duration-200 transition-all`}
      >
        {step === 0 && <CommonServiceSelectionModal />}
        {step === 1 && <Step1Card isModal={true} />}
        {step === 2 && <Step2Card isModal={true} />}
        {step === 3 && <Step3Card isModal={true} />}
      </div>
    </div>
  );
}
