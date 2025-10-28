import { createApp } from '@coinbase/onchainkit/react';
import { useState } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';

const CONTRACT = "0x9BF0898b74Dd8535cCae7dc5D2404d25a382758A";
const CREATOR = "0x095c853C222934395a07D363967bed337F02a11F";

const ABI = [
  "function progress() view returns (uint256, uint256, bool, uint256, uint256)",
  "function donate(uint256)",
  "function withdraw()",
  "function refund()"
];

function App() {
  const { address } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const [amount, setAmount] = useState("");

  const { data: prog } = useReadContract({
    address: CONTRACT,
    abi: ABI,
    functionName: "progress",
  });
  const { data: myContrib } = useReadContract({
    address: CONTRACT,
    abi: ABI,
    functionName: "contributions",
    args: [address ?? "0x0"],
  });

  const [raised, goal, unlocked, timeLeft, timeUntilWithdraw] = prog || [0n, 0n, false, 0n, 0n];
  const progress = goal > 0 ? Number(raised * 100n / goal) : 0;
  const daysLeft = Math.ceil(Number(timeLeft) / 86400);
  const isCreator = address?.toLowerCase() === CREATOR.toLowerCase();

  const donate = () => {
    const amt = BigInt(Math.round(parseFloat(amount) * 1e6));
    writeContract({
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      abi: [{ name: "approve", inputs: [{ type: "address" }, { type: "uint256" }], type: "function" }],
      functionName: "approve",
      args: [CONTRACT, amt],
    });
    setTimeout(() => {
      writeContract({ address: CONTRACT, abi: ABI, functionName: "donate", args: [amt] });
    }, 8000);
  };

  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Send Me to the Moon</h1>
      <p>Goal: ${(Number(goal) / 1e6).toFixed(0)} USDC</p>

      <div className="progress">
        <div className="fill" style={{ width: `${progress}%` }} />
      </div>
      <p>Raised: ${(Number(raised) / 1e6).toFixed(2)} • {daysLeft} days left</p>

      {!unlocked && daysLeft > 0 && (
        <>
          <input
            type="number"
            placeholder="USDC"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <button onClick={donate} disabled={isPending || !amount}>
            {isPending ? "Confirming..." : "Donate USDC"}
          </button>
        </>
      )}

      {isCreator && unlocked && timeUntilWithdraw > 0 && (
        <p style={{ color: "#d97706", fontWeight: "bold" }}>
          Withdraw in {Math.ceil(Number(timeUntilWithdraw) / 3600)} hours
        </p>
      )}
      {isCreator && unlocked && timeUntilWithdraw === 0n && (
        <button onClick={() => writeContract({ address: CONTRACT, abi: ABI, functionName: "withdraw" })}>
          Withdraw Funds
        </button>
      )}

      {daysLeft === 0 && !unlocked && myContrib > 0 && (
        <button onClick={() => writeContract({ address: CONTRACT, abi: ABI, functionName: "refund" })}>
          Claim Refund
        </button>
      )}
    </div>
  );
}

createApp(App).mount('#root');
