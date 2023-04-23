"use client"

import { FC } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/Hooks/useRentModal";

interface RentModalProps {}

const RentModal: FC<RentModalProps> = ({}) => {
  const rentModal = useRentModal();
  return (
    <Modal
      title="AirbNext Your Home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel="Submit"
    />
  );
};

export default RentModal;
