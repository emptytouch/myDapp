"use client";
// import Image from "next/image";
import Navbar from "@/components/navbar";
import MintERC20 from "@/components/ercmint20";
import { useState } from "react";
export default function Home() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="bg-etcoin-dapp min-h-screen">
      <Navbar accounts={accounts} setAccounts={setAccounts}/>
      <MintERC20 accounts={accounts} setAccounts={setAccounts}/>
    </div> 
  );
}
