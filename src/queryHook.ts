import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const serverUrl = `http://localhost:3000`




export const syncFetchProducts = (searchObject:searchType) => {

    const { category, price, pageNo, pageLength } = searchObject 

    let searchQuery = category ? `category=${category}` : ``
    searchQuery = `${searchQuery}&price_gte=${price[0]}&price_lte=${price[1]}`
    searchQuery = `${searchQuery}&_page=${pageNo}&_limit=${pageLength}`
    
    const fetcherFunc = () => (
        axios.get(`${serverUrl}/products?${searchQuery}`)
    )
    
    return useQuery(["allproducts",searchQuery], fetcherFunc,{
        select (data) { return data.data },
        cacheTime:0,
        refetchOnWindowFocus:false,
        keepPreviousData:true
    })
}







// TypeScript Types __________________________________________

export type searchType = {
    pageNo:number;
    pageLength:number;
    price:[number,number];
    category:string | null;
}

