// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {EtCoin} from "../src/EtCoin.sol";

contract EtCoinTest is Test {
    constructor() {}

    EtCoin public et;

    address owner = vm.addr(1);
    address user = vm.addr(2);

    function setUp() public {
        et = new EtCoin(owner);
        vm.deal(owner, 10 ether);
    }

    function testSuccessIfOwnerMint() public {
        vm.startPrank(owner);
        et.mint(10 ether);
        vm.stopPrank();
        assertEq(et.balanceOf(owner), 10 ether);
    }

    function testRevertIfUserMint() public {
        vm.startPrank(user);
        vm.expectRevert();
        et.mint(10 ether);
        vm.stopPrank();

        assertEq(et.balanceOf(user) , 0 ether);
    }

    function testSuccessIfOwnerBurn() public {
        vm.startPrank(owner);
        et.mint(10 ether);
        vm.stopPrank();
        assertEq(et.balanceOf(owner), 10 ether);

        vm.startPrank(owner);
        et.burn(5 ether);
        vm.stopPrank();
        
        assertEq(et.balanceOf(owner) , 5 ether);
    }

    function testRevertIfUserBurn() public {
        vm.startPrank(owner);
        et.mint(10 ether);
        vm.stopPrank();
        assertEq(et.balanceOf(owner), 10 ether);

        vm.startPrank(user);
        vm.expectRevert();
        et.burn(5 ether);
        vm.stopPrank();
        assertEq(et.balanceOf(owner) , 10 ether);
        assertEq(et.balanceOf(user) , 0 ether);
    }
}
