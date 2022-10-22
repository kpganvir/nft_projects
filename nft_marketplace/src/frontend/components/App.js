import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navigation from './Navbar';
import Home from './Home.js'
import Create from './Create.js'
import MyListedItems from './MyListedItems.js'
import MyPurchases from './MyPurchases.js'
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import { useState } from 'react'

import { Spinner } from 'react-bootstrap'

import './App.css';
import {ethers }from "ethers";

function App() {

  const [account,setAccount]=useState(null); //hook

  //connecting to metamast/login
const web3Handler = async()=>{

  //get all accounts from wallet
  const accounts =await window.ethereum.request({method: 'eth_requestAccounts'}) ;
  setAccount(accounts[0]); //store connected account in const
  //get provider obj
  const provider =new ethers.providers.Web3Provider(window.ethereum);//
  //get deployer
  const signer =provider.getSigner();
  //load smartcontract 
  loadContracts(signer);
}


  const [loading, setLoading] = useState(true); //when app loading data from blockchain
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
 
  const loadContracts = async (signer) => {
    // Get deployed copies of deployed contracts : ref folder contractsData 
    const marketplace_contract = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
    setMarketplace(marketplace_contract);
    const nft_contract = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft_contract);

    //after loading done.set loading to false.
    setLoading(false);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
             <Route path="/" element= { < Home marketplace={marketplace} nft={nft} /> }  />         
             <Route path="/create" />          
             <Route  path="/my-listed-items" />  
             <Route  path="/my-purchase" />  

            </Routes>
          )}
       </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
