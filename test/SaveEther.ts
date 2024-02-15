import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";

describe("Save Ether Contract", () => {

    const deploySaveEther = async () => {
        const [owner, otherAccounts] = await ethers.getSigners();
        const SaveEther = await ethers.getContractFactory("SaveEther");
        const saveEther = await SaveEther.deploy();

        return {saveEther, owner, otherAccounts};
    }

    describe("Deployment", () => {
        it('Should deploy', async () => {
            const {saveEther} = await loadFixture(deploySaveEther);

            expect(saveEther).to.exist;
        });
    });

    describe("Deposit", () => {
        it('Should take in a value before depositing', async () => {
            const {saveEther, owner} = await loadFixture(deploySaveEther);

            await saveEther.deposit({value: 1});

            const ownerSavings = await saveEther.checkSavings(owner.address);
            const deposit = saveEther.deposit;
            expect(ownerSavings).to.equal(1);
        });
    });
});