import { LayoutChangeEvent, StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useState } from 'react'
import Animated, { clamp, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler'
import { Button, Portal } from 'react-native-paper'

const BottomSheet = () => {

    const dimension = Dimensions.get('window')

    const isGestureActive = useSharedValue(false)
    const translateY = useSharedValue(0)


    const [isOpen, setOpen] = useState(false)
    const [sheetHeight, setSheetHeight] = useState(0)
    const onLayout = useCallback((e: LayoutChangeEvent) => setSheetHeight(e.nativeEvent.layout.height), [])

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (e, ctx) => {
            ctx.offsetY = translateY.value
        },
        onActive: (e, ctx) => {
            isGestureActive.value = true
            translateY.value = clamp(e.translationY + ctx.offsetY, 0, sheetHeight)
        },
        onEnd: (e) => {
            isGestureActive.value = false
        },
        onFinish: (e) => {
            isGestureActive.value = false
            if (translateY.value >= sheetHeight / 2) {
                runOnJS(setOpen)(false)
            }
            translateY.value = 0
        }
    })

    const animatedDropDownStyle = useAnimatedStyle(() => {
        return {
            opacity: isOpen ? interpolate(translateY.value, [0, sheetHeight], [1, 0]) : 0
        }
    }, [translateY.value, isOpen])

    const animatedSheetStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: isGestureActive.value ? 'pink' : 'orange',
            transform: [{
                translateY: isGestureActive.value ? translateY.value : withTiming(isOpen ? translateY.value : dimension.height)
            }]
        }
    }, [isGestureActive.value, isOpen, translateY.value])



    return (
        <View style={{ flex: 1 }}>

            <Button onPress={() => setOpen(!isOpen)}>
                <Text style={{ color: 'black' }}>Toggle</Text>
            </Button>

            <Portal>

                <TouchableWithoutFeedback onPress={() => setOpen(!isOpen)}>
                    <Animated.View
                        style={[{
                            ...StyleSheet.absoluteFillObject,
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        },
                            animatedDropDownStyle
                        ]}
                    />
                </TouchableWithoutFeedback>

                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View
                        onLayout={onLayout}
                        style={[
                            { width: '100%', height: '50%', position: 'absolute', bottom: 0 },
                            animatedSheetStyle
                        ]}
                    >
                        <View style={{ position: 'absolute', top: 0, right: 0, margin: 10 }}>
                            <Button onPress={() => setOpen(!isOpen)}>
                                <Text style={{ color: 'black' }}>Close</Text>
                            </Button>
                        </View>

                        <View>
                            <ScrollView>

                            </ScrollView>
                        </View>

                    </Animated.View>
                </PanGestureHandler>
            </Portal>
        </View>
    )
}

export default BottomSheet

const styles = StyleSheet.create({})