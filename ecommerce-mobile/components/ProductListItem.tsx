import {Text} from 'react-native'

type Product = {
    name: string;
    price: number;
};

interface ProductListItemProps {
    product: Product;
}


export default function ProductListItem({product}: ProductListItemProps){
    return(
        <Text style={{fontSize:30}}>{product.name} {product.price}</Text>

    )
}