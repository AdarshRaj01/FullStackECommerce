import { Link, Stack, Tabs } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from '@/components/ui/icon';
import { ShoppingCart } from "lucide-react-native";
import { Pressable } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";


const queryClient = new QueryClient()

export default function RootLayout(){
    const cartItemNum = useCart((state)=>state.items.length)
    return (
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider mode="light">
                <Stack screenOptions={{ headerRight:()=>
                        <Link href={'/cart'} asChild>
                            <Pressable className="flex-row gap-2">
                                <Icon as={ShoppingCart} />
                                <Text>{cartItemNum}</Text>
                            </Pressable>
                        </Link>
                    }}>
                    <Stack.Screen name="index" options={{
                        title:"Shop",
                        headerTitleAlign: "center",
                    }}/>
                    <Stack.Screen name="products/[id]" options={{
                        title:"Product",
                        headerTitleAlign: "center",

                    }}/>

                </Stack>
            </GluestackUIProvider>
        </QueryClientProvider>
    )
}