import { Text } from '@/components/ui/text';
import { Stack, useLocalSearchParams } from 'expo-router';
import products from '@/assets/products.json'
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';

export default function ProductDetailsScreen(){
    const {id} = useLocalSearchParams()

    const product = products.find(p => p.id === Number(id))
    if(!product)
        return <Text>Product not found</Text>
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