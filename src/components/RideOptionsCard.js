import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList, SafeAreaView, Image, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tailwind from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../../slices/navSlice'

const data = [
    {
        id: 'Uber-X-123',
        title: 'Uber X',
        mulriplier: 1,
        image: 'https://links.papareact.com/3pn'
    },
    {
        id: 'Uber-XL-456',
        title: 'Uber XL',
        mulriplier: 1.2,
        image: 'https://links.papareact.com/5w8'
    },
    {
        id: 'Uber-X-789',
        title: 'Uber LUX',
        mulriplier: 1.75,
        image: 'https://links.papareact.com/7pf'
    },
]

const SURGE_CHARGE_RATE = 1.5; 

const RideOptionsCard = () => {

    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tailwind`bg-white flex-grow`}>
            <View>
                <TouchableOpacity style={tailwind`absolute top-3 left-5 p-3 rounded-full z-10`} onPress={() => navigation.navigate('NavigateCard')}>
                    <Icon 
                        name="chevron-left"
                        type="font-awesome"
                    />
                </TouchableOpacity>
                <Text style={tailwind`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
            </View>

            <FlatList 
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item : {id, title, mulriplier, image}, item}) => (
                    <TouchableOpacity 
                        style={tailwind`flex-row items-center justify-between px-10 ${id === selected?.id && "bg-gray-200"}`}
                        onPress={() => setSelected(item)}
                    >
                        <Image 
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                            }}
                            source={{uri: image  }}
                        />
                        <View style={tailwind`-ml-6`}>
                            <Text style={tailwind`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                        </View>
                        <Text style={tailwind`text-xl`}>

                            {new Intl.NumberFormat('en-gb', {
                                style: 'currency',
                                currency: 'GBP'
                            }).format(
                                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * mulriplier) / 100
                            )
                            }

                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tailwind`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tailwind`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
                    <Text style={tailwind`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard
