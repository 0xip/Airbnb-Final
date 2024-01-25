'use client';

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";

const RentModal = () => {
    const rentModal = useRentModal();
    return ( 
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel="Onayla"
            title="Airbnb senin evin"
        />
     );
}
 
export default RentModal;