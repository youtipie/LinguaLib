import {createContext, useState} from "react";
import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {colors, commonIcons, fonts} from "../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../utils/metrics";
import Button from "../UI/Button";

const initialModal = {
    title: null,
    content: null,
    leftButtonText: null,
    leftButtonOnPress: null,
    rightButtonText: null,
    rightButtonOnPress: null,
};

export const ModalContext = createContext({...initialModal});

const ModalProvider = ({children}) => {
    const [isVisible, setIsVisible] = useState(false);

    const [modal, setModal] = useState(initialModal);

    function showModal(title, content, leftButtonText, leftButtonOnPress, rightButtonText, rightButtonOnPress) {
        setModal({
            title,
            content,
            leftButtonText,
            leftButtonOnPress,
            rightButtonText,
            rightButtonOnPress
        });
        setIsVisible(true);
    }

    function hideModal() {
        setIsVisible(false);
        setModal(initialModal);
    }

    function handleLeftButtonPress() {
        modal.leftButtonOnPress && modal.leftButtonOnPress();
        hideModal();
    }

    function handleRightButtonPress() {
        modal.rightButtonOnPress && modal.rightButtonOnPress();
        hideModal();
    }

    return (
        <ModalContext.Provider value={{isVisible, modal, showModal, hideModal}}>
            {children}
            <Modal visible={isVisible} transparent={true} animationType={"fade"} onRequestClose={hideModal}>
                <Pressable style={styles.backdrop} onPress={hideModal}>
                    <View style={styles.modal}>
                        <View style={styles.header}>
                            <FontAwesomeIcon
                                icon={commonIcons.info}
                                size={moderateScale(16)}
                                color={colors.textAccent200}
                            />
                            <Text style={styles.title}>{modal.title}</Text>
                        </View>
                        <View style={styles.contentWrapper}>
                            <View style={styles.contentContainer}>
                                <Text style={styles.content}>{modal.content}</Text>
                            </View>
                            <View style={styles.buttonsWrapper}>
                                {modal.leftButtonText &&
                                    <Button
                                        containerStyle={styles.leftButtonContainer}
                                        onPress={handleLeftButtonPress}
                                        text={modal.leftButtonText}/>
                                }
                                {modal.rightButtonText &&
                                    <Button
                                        containerStyle={styles.rightButtonContainer}
                                        onPress={handleRightButtonPress}
                                        text={modal.rightButtonText}
                                    />
                                }
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </ModalContext.Provider>
    );
};

export default ModalProvider;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modal: {
        backgroundColor: colors.primary100,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: colors.primary200,
        paddingHorizontal: horizontalScale(5),
        paddingVertical: verticalScale(10),
    },
    title: {
        fontSize: moderateScale(16),
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary200,
        marginLeft: horizontalScale(5)
    },
    contentWrapper: {
        padding: moderateScale(10),
    },
    contentContainer: {
        paddingVertical: verticalScale(10),
    },
    content: {
        fontSize: moderateScale(16),
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary200,
        textAlign: "center"
    },
    buttonsWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: verticalScale(5)
    },
    leftButtonContainer: {
        marginHorizontal: horizontalScale(5),
        backgroundColor: colors.fail100,
    },
    rightButtonContainer: {
        marginHorizontal: horizontalScale(5),
        backgroundColor: colors.success100,
    }
});