'use client';

import React from 'react';
import Footer from '../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p>
                At SolCharge, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our platform and tell you about your privacy rights and how the law protects you.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Identity Data</strong> includes wallet address, username, or similar identifier.</li>
                <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our platform.</li>
                <li><strong>Usage Data</strong> includes information about how you use our platform and services.</li>
                <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of services you have purchased through our platform.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>To register you as a new user</li>
                <li>To process and deliver your service requests</li>
                <li>To manage our relationship with you</li>
                <li>To improve our platform and services</li>
                <li>To recommend content or features that may be of interest to you</li>
                <li>To measure or understand the effectiveness of the advertising we serve to you</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention</h2>
              <p>
                We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
              <p>
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the date at the top of this privacy policy.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@solcharge.com.
              </p>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
} 