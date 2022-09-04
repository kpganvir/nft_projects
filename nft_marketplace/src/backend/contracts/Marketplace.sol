// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Marketplace is ReentrancyGuard 
{

//immutable : assinged value only once

    address  payable public immutable feeAccount;//receive fees
    uint public immutable feePercent;//fee % on sales


    constructor(uint _feePercent)
    {

        feeAccount=payable(msg.sender);
        feePercent=_feePercent;
    }

}