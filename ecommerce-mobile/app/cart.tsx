import { useCart } from "@/store/cartStore";
import { FlatList } from "react-native";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect } from "expo-router";

export default function CartScreen(){
    const items = useCart((state:any)=>state.items)
    console.log((items))
    const resetCart = useCart((state:any)=>state.resetCart)

    const onCheckOut = async() => {
        // Logic to handle checkout
        resetCart()
    }

    if(items.length===0){
        return <Redirect href={'/'}/>
    }
    return(
        <FlatList
        data={items}
        contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-4"
        renderItem={({item})=>(
            <HStack className="bg-white p-3">
                <VStack space="sm">
                    <Text bold>{item.name}</Text>
                    <Text>{item.price}</Text>
                    <Text>Total - {(item.price*item.quantity)} </Text>
                </VStack>
                <Text className="ml-auto">{item.quantity}</Text>
            </HStack>
        )}
        ListFooterComponent={()=>(
            <Button onPress={onCheckOut}>
                <ButtonText>Checkout</ButtonText>

            </Button>
    )}
            
        />

    )
}