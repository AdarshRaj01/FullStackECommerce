const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function listProducts(){
    //console.log(`${API_URL}/api/v1/products`)

    const res = await fetch(`${API_URL}/api/v1/products`)
    if(!res.ok){
        throw new Error('Failed to fetch products')
    }  // If the response was not ok, throw an error with a message that explains what went wrong.  This is a good practice to handle errors in a centralized place.  This way, if the API endpoint changes, you only need to update this function once.  You also don't have to handle the error in each component that uses this function.

    const data = await res.json()
    //console.log(data)
    
    return data

}

export async function fetchProductById(id:number){
    const res = await fetch(`${API_URL}/api/v1/products/${id}`)
    if(!res.ok){
        throw new Error('Failed to fetch products')
    }  // If the response was not ok, throw an error with a message that explains what went wrong.  This is a good practice to handle errors in a centralized place.  This way, if the API endpoint changes, you only need to update this function once.  You also don't have to handle the error in each component that uses this function.

    const data = await res.json()
    //console.log(data)
    
    return data
 
}