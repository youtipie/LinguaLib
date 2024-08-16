import {useState} from "react";
import {Pressable, Animated, Text} from "react-native";

const AnimatedTextExpand = ({startText, endText, containerStyle, textStyle, addEllipsis = false}) => {
    const [showFullText, setShowFullText] = useState(false);
    const [animation] = useState(new Animated.Value(1));

    const handlePress = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setShowFullText(prevState => !prevState)
            Animated.timing(animation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    };

    // Wanted to animate only endText but have to animate whole text
    // because nested Text doesn't support changing opacity
    return (
        <Pressable onPress={handlePress} style={containerStyle}>
            <Animated.View style={{opacity: animation}}>
                {
                    <Text style={textStyle}>
                        {startText}{addEllipsis && !showFullText && "..."}
                        {showFullText &&
                            <Text
                                style={textStyle}>{endText}</Text>
                        }
                    </Text>
                }
            </Animated.View>
        </Pressable>
    );
};

export default AnimatedTextExpand;