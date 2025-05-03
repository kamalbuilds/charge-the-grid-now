'use client';

import React from 'react';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the SolCharge platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
              <p>
                SolCharge provides a decentralized electric vehicle charging infrastructure powered by the Solana blockchain. Our service connects EV owners with charging station hosts and facilitates payments using cryptocurrency.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
              <p>
                To access certain features of the platform, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Conduct</h2>
              <p>
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Violating any applicable laws or regulations</li>
                <li>Impersonating another person or entity</li>
                <li>Interfering with the proper functioning of the service</li>
                <li>Attempting to access areas of the service not intended for public use</li>
                <li>Using the service for any illegal or unauthorized purpose</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the SolCharge platform are owned by SolCharge and are protected by international copyright, trademark, patent, and other intellectual property laws.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Disclaimers</h2>
              <p>
                The SolCharge platform is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
              <p>
                In no event shall SolCharge be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the service.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the date at the top of these terms and/or by other means as determined by us.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which SolCharge is established, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at legal@solcharge.com.
              </p>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
} 