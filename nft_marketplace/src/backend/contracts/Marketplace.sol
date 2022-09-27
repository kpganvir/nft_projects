// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Marketplace is ReentrancyGuard 
{

//immutable : assinged value only once

    address  payable public immutable feeAccount;//receive fees
    uint public immutable feePercent;//fee % on sales
    uint public itemCount=0;
    struct Item{
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;

    }
    mapping(uint => Item) public items;

   event  offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
       
   );

    constructor(uint _feePercent)
    {

        feeAccount=payable(msg.sender);
        feePercent=_feePercent;
    }

    function  makeItem(IERC721 _nft,uint _tokenId,uint _price) external nonReentrant 
    {
        require(_price >0,"Price must be greater than zero");
        itemCount++; 
         _nft.transferFrom(msg.sender,address(this),_tokenId);

         //initialize new Item and add it in mapping

         items[itemCount]= Item({
            itemId: itemCount,
            nft:_nft,
           tokenId: _tokenId,
            price: _price,
            seller: payable(msg.sender),
            sold: false
         });
   //mint this token
          emit offered(
              itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
           
          );
 
    }

}