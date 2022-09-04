// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage,Ownable  {

  uint public tokenCount;

constructor() ERC721("this is demo NFT","DAPP") {

}
//tokenURI link to uploaded nft(image ) on ipfs
function mint(string memory _tokenURI) external returns (uint)
{
    tokenCount++;
    _safeMint(msg.sender,tokenCount);
    _setTokenURI(tokenCount,_tokenURI);

       return  tokenCount;
}

}