// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract MyNFT is ERC721URIStorage,Ownable {

//to use lib :Counters.sol
    using Counters for Counters.Counter;

   Counters.Counter private _tokenIds;


   constructor() ERC721("KPdemoNFT" ,"KPG" ){}

// tokenURI -image url
  function mintNFT(address recipient , string memory tokenURI) public onlyOwner returns(uint)
  {
          _tokenIds.increment();
          uint newItemId=_tokenIds.current();
          _mint(recipient,newItemId);
          _setTokenURI(newItemId,tokenURI);

        return newItemId;

  }

}
//address of contract
//Lock with 1 ETH and unlock timestamp 1693455218 deployed to 0xa11Bd5bA5dA78372c40cc86ebe879e2F72D7dA2d

//address of meta accoount
//0xeacdD8383b4592AE066d64bB1b5CF6F48FF34152

//token[1]=0xf7ac258b70c0b15de86d1567b74ce989dc276b6ef7f293a484335f2a7c7350f4


==========

Account balance: 10000000000000000000000
nft contract address : 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
market place contract address : 0x5FbDB2315678afecb367f032d93F642f64180aa3