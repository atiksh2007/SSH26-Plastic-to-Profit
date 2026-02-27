import React from "react";
import Card from "../components/Card";


const SafeTradingPage = () => {
  return (
    <div id="det" className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Plastic to Profit Marketplace</h1>
          <p className="text-gray-600">
            Customer Awareness - Safe Trading Practices
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Verify Buyer & Seller"
            description="Check profile authenticity"
          >
            Always review ratings, business details, and past transactions
            before making a deal. Avoid incomplete or suspicious accounts.
          </Card>

          <Card
            title="Check Plastic Quality"
            description="Confirm type and condition"
          >
            Ensure materials are properly categorized (PET, HDPE, LDPE, etc.)
            and request images or inspection proof before confirming.
          </Card>

          <Card
            title="Use Secure Payments"
            description="Protect your money"
          >
            Use verified digital payments or escrow systems. Never share OTPs
            or confidential banking details.
          </Card>

          <Card
            title="Maintain Documentation"
            description="Keep transaction records"
          >
            Always collect invoices, weight slips, and transport receipts to
            ensure transparency and legal protection.
          </Card>
        </div>

        <footer className="mt-12 text-center text-gray-500">
          © 2026 Plastic to Profit Marketplace
        </footer>
      </div>
    </div>
  );
}

export default SafeTradingPage
