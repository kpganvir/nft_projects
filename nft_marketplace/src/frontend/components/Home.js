import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'

const Home = ({ marketplace, nft }) => 
{
  const [items,setItems]=useState(null);
  const[loading,setLoading]=useState(true)
  const loadMarketplaceItems=async ()=>{
    const itemCount = await marketplace.itemCount();
    let items=[];

    for(let i=1;i<=itemCount;i++){

      const item=await marketplace.items(i);
       if(!item.sold)
       {
         //get item url from nft contract
         const url= await nft.tokenURI(item.tokenId);
         const response=await fetch(url);
         const metadata=await response.json();
         const totalPrice=await marketplace.getTotalPrice(item.itemId);

         items.push({
            
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image


         })

       }

    }
    setItems(items);
    setLoading(false);
  }

return (
   <div className='flex justify-center'>
    </div>
)


}
export default Home