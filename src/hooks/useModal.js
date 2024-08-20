import {useContext} from "react";
import {ModalContext} from "../components/ModalProvider";

const UseModal = () => {
    const {isVisible, showModal, hideModal} = useContext(ModalContext);

    function showModalWrapper(title, content, leftButtonText, leftButtonOnPress, rightButtonText, rightButtonOnPress) {
        showModal(title, content, leftButtonText, leftButtonOnPress, rightButtonText, rightButtonOnPress);
    }

    return {isVisible, showModal: showModalWrapper, hideModal};
};

export default UseModal;