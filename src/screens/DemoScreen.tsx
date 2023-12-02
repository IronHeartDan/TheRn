import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { useNavigation } from '@react-navigation/native'
import BottomSheet from '../components/BottomSheet'

const DemoScreen = () => {

    const [value, setValue] = useState(0)

    return (
        <View style={{ flex: 1 }}>
            {/* <StatusBar
                barStyle='light-content'
                backgroundColor='black'
            /> */}
            {/* <Slider value={value} setValue={setValue} /> */}
            <BottomSheet />
        </View>
    )
}

export default DemoScreen