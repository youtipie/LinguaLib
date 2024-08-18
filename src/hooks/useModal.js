import {useContext} from "react";
import {ModalContext} from "../components/ModalProvider";

const UseModal = (title, content, leftButtonText, leftButtonOnPress, rightButtonText, rightButtonOnPress) => {
    const {isVisible, showModal, hideModal} = useContext(ModalContext);

    function showModalWrapper() {
        showModal(title, content, leftButtonText, leftButtonOnPress, rightButtonText, rightButtonOnPress);
    }

    return {isVisible, showModal: showModalWrapper, hideModal};
};

export default UseModal;