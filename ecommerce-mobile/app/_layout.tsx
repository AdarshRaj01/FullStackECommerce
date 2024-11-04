import { Stack, Tabs } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

export default function RootLayout(){
    return (
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider mode="light">
                <Stack>
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