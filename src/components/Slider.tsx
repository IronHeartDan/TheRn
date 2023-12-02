import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {
    PanGestureHandler,
} from 'react-native-gesture-handler'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    clamp,
    useAnimatedGestureHandler,
    runOnJS,
} from 'react-native-reanimated'

const Slider = ({ value = 0, setValue }: {
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
}) => {

    const SLIDER_WIDTH = 250
    const KNOB_WIDTH = 50
    const MAX_RANGE = 100
    const sliderRange = SLIDER_WIDTH - KNOB_WIDTH
    const oneStepValue = sliderRange / MAX_RANGE


    function getXValue(value: any) {
        return Math.floor(value * oneStepValue)
    }

    function getStepValue(value: any) {
        return Math.ceil(value / oneStepValue)
    }

    function updateValue(value: any) {
        setValue(getStepValue(value))
    }

    const translateX = useSharedValue(getXValue(value))
    const isSliding = useSharedValue(false)


    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx: { offsetX: number }) => {
            ctx.offsetX = translateX.value
            isSliding.value = true
        },
        onActive: (event, ctx) => {
            const clampValue = clamp(event.translationX + ctx.offsetX, 0, sliderRange)
            translateX.value = clampValue
            runOnJS(updateValue)(clampValue)
        },
        onEnd: () => {
            isSliding.value = false
        },
    })

    const knobTranslationStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { scale: isSliding.value ? 1.1 : 1 }
            ],
        }
    }, [translateX])

    const progressTranslationStyle = useAnimatedStyle(() => {
        return {
            width: translateX.value + (KNOB_WIDTH / 2)
        }
    }, [translateX])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        slider: {
            flexDirection: 'row',
            height: KNOB_WIDTH,
            width: SLIDER_WIDTH,
            borderRadius: 100,
            backgroundColor: '#ddd',
            alignItems: 'center',
            elevation: 5,
        },
        progress: {
            height: '100%',
            borderRadius: 100,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: 'violet'
        },
        knob: {
            position: 'absolute',
            height: KNOB_WIDTH,
            width: KNOB_WIDTH,
            borderRadius: KNOB_WIDTH / 2,
            backgroundColor: '#757de8',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
        },
        mark: {
            position: 'absolute',
            width: 5,
            height: 5,
            borderRadius: 100,
        }
    })

    const marks: number[] = []

    return (
        <View style={styles.container}>
            <View style={styles.slider}>
                <Animated.View style={[styles.progress, progressTranslationStyle]} />
                {marks.map((mark, index) => (
                    <React.Fragment key={index}>
                        <Animated.View style={[styles.mark, { backgroundColor: value >= mark ? 'orange' : 'black', transform: [{ translateX: getXValue(mark) }] }]} />
                    </React.Fragment>
                ))}
                <PanGestureHandler onGestureEvent={onGestureEvent}>
                    <Animated.View style={[styles.knob, knobTranslationStyle]}>
                        <Text>{value}</Text>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </View>
    )
}

export default Slider