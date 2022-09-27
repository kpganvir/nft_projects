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
event  bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
         address indexed buyer
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





    function getTotalPrice(uint _itemid) view public returns (uint)
    {
        return items[_itemid].price *(100+feePercent)/100;

    }

    function purchaseItem(uint _itemid) external payable  nonReentrant
    {
        uint _totalPrice=getTotalPrice(_itemid);
        Item storage _item=items[_itemid];
        //check input itemid is valid and present in mapping
        require(_itemid >=1 && _itemid <= itemCount,"item doesnt exists");
        //check price send by caller(buyer) is greater than totol price of an item
        require( msg.value >=_item.price ,"not enough ether to cover the item price and fee");
        //check item is not sold already
        require(!_item.sold ,"item already sold !");
          
           //transfer price amount to seller's address 
        _item.seller.transfer(_item.price);

        //transfer fee into marketplace's account
         feeAccount.transfer(_totalPrice- _item.price);

           //transfer nft to buyer's address (msg.sender)
        _item.nft.transferFrom(address(this),msg.sender,_item.tokenId);
           //mark item is sold.
         _item.sold=true;

          //emit bought event 

    }

}