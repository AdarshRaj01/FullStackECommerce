import { Text } from '@/components/ui/text';
import { Stack, useLocalSearchParams } from 'expo-router';
import products from '@/assets/products.json'
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/api/product';
import { ActivityIndicator } from 'react-native';
import { useCart } from '@/store/cartStore';

export default function ProductDetailsScreen(){
    const {id} = useLocalSearchParams()

    const addProduct = useCart((state)=>(state.addProduct))
    const cartItems = useCart(state=>state.items)

    console.log(JSON.stringify(cartItems))

    const {data:product, isLoading, error} = useQuery({
        queryKey:['products',id],
        queryFn: () => fetchProductById(Number(id))
    })

    const addToCart = () => {
        addProduct(product)
    }

    if(isLoading){
        return <ActivityIndicator />
    }

    if(error){
        console.log(error)
        return <Text>Error in fetching product</Text>
    }

    return(
        <Box className=' flex-1 justify-center items-center p-3 '>
            <Stack.Screen options={{
                title:product.name,
                headerTitleAlign: "center",
            }}/>

            <Card className="p-5 rounded-lg max-w-[960px] w-full flex-1">


            <Image
                source={{
                uri: product.image
                }}
                alt={`${product.name} image`}
                resizeMode='contain'
                className="mb-6 h-[240px] w-full rounded-md"
            />
            <Text
                className="text-sm font-normal mb-2 text-typography-700"
            >
                {product.name}

            </Text>
            <VStack className="mb-6">
                <Heading size="md" className="mb-4">
                    ₹ {product.price}
                </Heading>
                <Text size="sm">
                {product.description}
                </Text>
            </VStack>
            <Box
                className="flex-col sm:flex-row"
            >
                <Button
                className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
                onPress={addToCart}
                >
                <ButtonText size="sm">Add to cart</ButtonText>
                </Button>
                <Button
                variant="outline"
                className="px-4 py-2 border-outline-300 sm:flex-1"
                >
                <ButtonText
                    size="sm"
                    className="text-typography-600"
                >
                    Wishlist
                </ButtonText>
                </Button>
            </Box>
            </Card>
        </Box>
    )
}