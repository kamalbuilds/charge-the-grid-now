'use client';

import React from 'react';
import Footer from '../../components/Footer';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Disclaimer</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. No Financial Advice</h2>
              <p>
                The information provided on the SolCharge platform is for general informational purposes only. It should not be considered as financial advice. We strongly recommend consulting with a professional financial advisor before making any investment decisions related to cryptocurrency.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Investment Risks</h2>
              <p>
                Cryptocurrency investments involve high risk. The value of cryptocurrencies, including CHARGE and WATT tokens, can be volatile and may fluctuate significantly. You should be prepared to lose your entire investment. Only invest what you can afford to lose.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. No Guarantees</h2>
              <p>
                SolCharge makes no guarantees about the performance of our platform or the value of our tokens. Past performance is not indicative of future results. Any projected returns or statements about the potential growth of the platform are forward-looking and not guaranteed.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Technical Risks</h2>
              <p>
                Using blockchain technology involves technical risks. These include but are not limited to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Smart contract vulnerabilities</li>
                <li>Wallet security risks</li>
                <li>Network congestion and high gas fees</li>
                <li>Regulatory changes affecting cryptocurrency</li>
                <li>Protocol upgrades or forks that may affect functionality</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Accuracy of Information</h2>
              <p>
                While we strive to provide accurate information, SolCharge does not warrant the accuracy, completeness, or usefulness of any information on the platform. Any reliance you place on such information is strictly at your own risk.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Regulatory Compliance</h2>
              <p>
                Cryptocurrency regulations vary by jurisdiction. It is your responsibility to ensure that your use of our platform complies with all applicable laws in your jurisdiction. SolCharge is not responsible for any regulatory issues you may face.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Third-Party Services</h2>
              <p>
                SolCharge may integrate with third-party services, including wallets, oracles, and other blockchain protocols. We are not responsible for the actions, content, or policies of these third parties.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, SolCharge and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the platform.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Disclaimer</h2>
              <p>
                We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting to our platform.
              </p>

              <p className="mt-8 text-lg font-semibold">
                By using the SolCharge platform, you acknowledge that you have read, understood, and agree to this disclaimer.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 