import Link from "next/link";
import Image from "next/image";
import Github from "@/public/assets/github.png";
export default function Navabr({accounts,setAccounts}) {
    const isConnected = Boolean(accounts[0]); 
    const sepoliaChainParams = {
        chainId: '0x' + Number(11155111).toString(16), // 十六进制，需带 0x 前缀
        chainName: 'Sepolia Test Network',
        rpcUrls: ['https://sepolia.infura.io'],
        nativeCurrency: {
            name: 'SepoliaETH',
            symbol: 'SepoliaETH',
            decimals: 18,
        },
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
    };

    const connectAccount = async()=>{
        try{
            if(typeof window !== "undefined" && window.ethereum){
                const nextAccounts = await window.ethereum.request({
                    method:'eth_requestAccounts'
                    // method: 'wallet_switchEthereumChain',
                    // params: [{ chainId: sepoliaChainParams.chainId }],
                });
                setAccounts(nextAccounts);
            }else{
                console.log('Ethereum provider not found');
            }
        }catch(e){
            console.log("failed to connect to accounts:",e);
        }
    }

    return (
        <div className="flex justify-between items-center border-b border-cyan-500/20 bg-slate-950/40 px-6 py-5 text-xl font-wq text-slate-200 backdrop-blur-sm md:px-8 md:py-6 md:text-2xl">
            <div className="flex">
                <Link
                    href="https://github.com/emptyTouch"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="flex items-center gap-3 rounded-lg border border-cyan-400/35 bg-gradient-to-b from-slate-100 to-slate-200/95 px-3 py-2 shadow-md ring-1 ring-white/40 transition hover:border-cyan-400/70 hover:from-white hover:to-slate-100 hover:shadow-glow-cyan-sm">
                        <Image src={Github} alt="GitHub" width={32} height={32} className="opacity-95" />
                        {/* <span className="hidden text-base font-medium tracking-wide text-slate-600 sm:inline">
                            源码
                        </span> */}
                    </div>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                {isConnected ? (
                    <p className="rounded-md border border-tech-cyan/40 bg-tech-cyan/10 px-5 py-2 font-medium tracking-wide text-tech-cyan-bright shadow-glow-cyan-sm">
                        已连接
                    </p>
                ) : (
                    <button
                        type="button"
                        onClick={connectAccount}
                        className="rounded-md border border-tech-cyan/50 bg-gradient-to-b from-tech-cyan-deep to-slate-900 px-6 py-2.5 font-semibold tracking-wide text-white shadow-glow-cyan transition hover:border-tech-cyan-bright hover:from-tech-cyan hover:shadow-glow-cyan active:scale-[0.98]"
                    >
                        连接钱包
                    </button>
                )}
            </div>
        </div>
    );
}