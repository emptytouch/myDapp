
import { ethers,BigNumber } from "ethers";
import {useState,useEffect} from "react";
import EtCoin from "../EtCoin.json";

export default function MintERC20({accounts,setAccounts}){
    const ContractAddress="0xd530c5798b8F420d06252Ea7746a4ec9e4eB9b02";
    const [balance,setBalance] = useState(null);
    const [mintAmount,setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(ContractAddress,EtCoin.abi,signer);
        
            try{
                const mintAmountInETH = ethers.utils.parseUnits(mintAmount.toString(),18);
                const response = await contract.mint(BigNumber.from(mintAmountInETH));
                console.log("Minting respone" , response);
                contract.on("Mint",async()=>{
                    fetchBalance();
                });
            }catch(e){
                console.log("error--",e);
            }
        }
    }

    async function fetchBalance() {
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(ContractAddress,EtCoin.abi,signer);
            // const code = await provider.getCode(ContractAddress);
            try{
                const userBalance = await contract.balanceOf(accounts[0]);
                const formattedBalance = parseFloat(
                    ethers.utils.formatUnits(userBalance,18)
                ).toFixed(2);
                setBalance(formattedBalance);
            }catch(e){
                console.log("error fetching balance",e);
            }
        }
    }

    useEffect(()=>{
        if(isConnected){
            fetchBalance();
            const intervalId = setInterval(fetchBalance,1000);
            return ()=> clearInterval(intervalId);
        }
    },[accounts,isConnected]);

    return (
        <div className="mb-12 mt-12 flex flex-grow flex-col items-center justify-center px-4 font-wq text-slate-200 md:mt-20">
            <div className="w-full max-w-2xl text-center">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-tech-muted">
                    DApp · ERC-20
                </p>
                <h1 className="text-5xl font-bold tracking-tight text-gradient-tech md:text-6xl">
                    铸造 EtCoin
                </h1>
                <p className="mt-8 text-xl text-tech-muted md:text-2xl">
                    在链上铸造你的 EtCoin（<span className="text-tech-cyan-bright">ET</span>）代币
                </p>
                {isConnected ? (
                    <>
                        <div className="mt-10 flex justify-center">
                            <input
                                value={mintAmount}
                                onChange={(e) => {
                                    setMintAmount(Number(e.target.value));
                                }}
                                className="h-12 w-full max-w-xs rounded-md border border-cyan-500/30 bg-slate-950/70 px-4 text-center font-mono text-2xl text-tech-cyan-bright shadow-inner-tech outline-none transition placeholder:text-slate-600 focus:border-tech-cyan focus:shadow-glow-cyan-sm"
                                type="number"
                                placeholder="数量"
                                min="0"
                            />
                        </div>
                        <div className="mt-8 flex flex-col items-center">
                            <button
                                type="button"
                                onClick={handleMint}
                                className="w-full max-w-xs rounded-md border border-tech-cyan/45 bg-gradient-to-b from-tech-cyan-deep via-tech-cyan-deep to-slate-950 py-4 text-xl font-semibold tracking-wide text-white shadow-glow-cyan transition hover:border-tech-cyan-bright hover:from-tech-cyan hover:shadow-glow-cyan active:scale-[0.99]"
                            >
                                立即铸造
                            </button>
                            <p className="mt-6 text-lg text-tech-muted">
                                当前 EtCoin 余额：
                                <span className="ml-2 font-mono text-tech-cyan-bright">
                                    {balance !== null ? `${balance} ET` : "加载中…"}
                                </span>
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="mt-32 flex items-center justify-center md:mt-40">
                        <p className="animate-pulse text-2xl text-tech-muted md:text-4xl">
                            连接钱包以开始铸造…
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}