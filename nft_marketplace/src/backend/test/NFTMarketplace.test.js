const {expect }=require("Chai");

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
     })

   })

})