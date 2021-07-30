import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'

const data = [
    {
        id: '123',
        title: 'Get a ride',
        image: 'https://links.papareact.com/3pn',
        screen: "MapScreen"
    },
    {
        id: '456',
        title: 'Order Food',
        image: 'https://links.papareact.com/28w',
        screen: "EatsScreen"
    },
];

const NavOptions = () => {
    return (
        <FlatList 
            keyExtractor={(item) => item.id}
            data={data}
            horizontal
            renderItem={({item}) => (
                <TouchableOpacity>
                    <View>
                        <Image 
                            source={{
                                uri: item.image
                            }}
                            style={{
                                width: 120,
                                height: 120,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavOptions
