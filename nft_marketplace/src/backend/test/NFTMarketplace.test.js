const {expect }=require("Chai");
const toWei =(num)=>ethers.utils.parseEther(num.toString());//ether to wei
const fromWei=(num)=>ethers.utils.formatEther(num); //put one decimal point

 describe("NFTMarketplace",async function(){

     let deployer,add1,add2,nft,marketplace;
     let feePercent=1;
     let URI="sample uri";
    beforeEach(async function()
    {
            const NFT = await ethers.getContractFactory("NFT");
            const Marketplace = await ethers.getContractFactory("Marketplace");

            [deployer,add1,add2]=await ethers.getSigners();

            nft= await NFT.deploy();
            marketplace= await Marketplace.deploy(1);

    });
 
    describe("Deployment",function(){
         it("Should track name and symbol of the nft collection",async function(){
            expect(await nft.name()).to.equal("this is demo NFT");
            expect(await nft.symbol()).to.equal("DAPP");
         })
         it("Should track feeAcc and %fee of the marketplace contrac",async function(){
            expect(await marketplace.feeAccount()).to.equal(deployer.address);
            const fee=await marketplace.feePercent();
            expect(Number(fee)).to.equal(1);
         })
    })

   describe("Minting NFT",function(){

    it("Should track each minted NFT",async function(){
        await nft.connect(add1).mint(URI);
        const _tokenCount=await nft.tokenCount();
        const _balanceOf=await nft.balanceOf(add1.address)
        expect(Number(_tokenCount)).to.equal(1);
        expect(Number(_balanceOf)).to.equal(1);
       expect(await nft.tokenURI(1)).to.equal(URI);


        await nft.connect(add2).mint(URI);
        const _tokenCount2=await nft.tokenCount();
        const _balanceOf2=await nft.balanceOf(add2.address)
      expect(Number(_tokenCount2)).to.equal(2);
       expect(Number(_balanceOf2)).to.equal(1);
       expect(await nft.tokenURI(2)).to.equal(URI);
     })

   })

   describe("Making marketplace item NFT",function(){

      beforeEach( async function(){
         ///add1 mints an nft
         await nft.connect(add1).mint(URI);
         await nft.connect(add1).setApprovalForAll(marketplace.address,true);
   
      })
   
      it( "should track newly created item,transafer NFT from seller to marketplace and emit offered event",
         async function(){

            await expect(marketplace.connect(add1).makeItem(nft.address,1,toWei()))
            .to.emit(marketplace,"offered")
            .withArgs(1,nft.address,1,toWei(),add1.address)

            expect(await nft.ownerOf()).to.equal(marketplace.address);
            expect(await marketplace.itemCount()).to.equal(1);

            const item= await marketplace.items(1);
            expect(item.itemId).to.equal(1);
            expect(item.nft).to.equal(nft.address);
            expect(item.tokenId).to.equal(1);
            expect(item.price).to.equal(toWei(1));
            expect(item.sold).to.equal(false);

         });

        
      
   


   // });

  
  



})