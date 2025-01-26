import { Button } from "@/components/ui/button";
import React from "react";
import { useState } from "react";

function FinancialCalculator() {

    const [carPrice, setCarPrice] = useState(0);
    const [intrestRate, setIntrestRate] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [downPayment, setDownPayment] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    
    const CalculateMonthlyPayment = () => {
        const Principal = carPrice - downPayment;
        const MonthlyInterestRate = intrestRate / 1200; // Convert to Decimal
    
        const MonthlyPayment = (Principal * MonthlyInterestRate * Math.pow(1 + MonthlyInterestRate, loanTerm)) / 
                               (Math.pow(1 + MonthlyInterestRate, loanTerm) - 1);
    
        setMonthlyPayment(MonthlyPayment.toFixed(2));
    };
    
  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl">Financial Calculator</h2>
      <div className="flex gap-5 mt-5">
        <div className="w-full">
          <label className="block mb-2 font-medium">Price $</label>
          <input
            type="number"
            className="w-full border rounded-lg p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setCarPrice(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="block mb-2 font-medium">Interest Rate</label>
          <input
            type="number"
            className="w-full border rounded-lg p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setIntrestRate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-5 mt-5">
        <div className="w-full">
          <label className="block mb-2 font-medium">Loan Term (Months)</label>
          <input
            type="number"
            className="w-full border rounded-lg p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setLoanTerm(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="block mb-2 font-medium">Down Payment</label>
          <input
            type="number"
            className="w-full border rounded-lg p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setDownPayment(e.target.value)}
          />
        </div>
      </div>
      {monthlyPayment>0 &&<h2 className="font-medium text-2xl mt-5">Your Monthly Payment Is: <span className="text-4xl font-bold"> ${monthlyPayment}</span></h2>}
      <Button onClick ={CalculateMonthlyPayment} className="w-full mt-5" size="lg">Calculate</Button>
    </div>
  );
}

export default FinancialCalculator;
