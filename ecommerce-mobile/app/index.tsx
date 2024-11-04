import { View, Text, FlatList, useWindowDimensions, ActivityIndicator } from "react-native";
import ProductListItem from "../components/ProductListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { listProducts } from "@/api/product";
import { useQuery } from "@tanstack/react-query";





export default function HomeScreen(){
    // const {width} = useWindowDimensions()
    // const numColumns = width>700?3:2

    const {data, isLoading, error} = useQuery({queryKey:['products'],queryFn:listProducts})

    const numColumns = useBreakpointValue({
        default: 2,
        sm:3,
        xl:4
    })
    if(isLoading){
        return <ActivityIndicator></ActivityIndicator>
    }

    if(error){
        return <Text>Error fetching products</Text>
    }
    
    return(
        <FlatList 
        key={numColumns}
        data={data}
        numColumns={numColumns}
        contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto"
        columnWrapperClassName="gap-2"
        renderItem={({item})=> (

            <ProductListItem product={item} /> 
        )} 
        />
    )
}