export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-950">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TrustBill
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#features"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                How It Works
              </a>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
              Pay Bills with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Blockchain Security
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              TrustBill is a revolutionary decentralized platform built on the Stacks blockchain that enables you to pay all your bills—airtime, data subscriptions, utilities, and more—using STX tokens with complete transparency, security, and immutability.
            </p>
            <p className="text-lg text-zinc-500 dark:text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              Experience the future of bill payments where every transaction is recorded on-chain, providing you with an immutable payment history and eliminating the need for intermediaries. TrustBill combines the convenience of traditional payment systems with the security and transparency of blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-semibold text-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Powerful Features for Modern Bill Payments
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              TrustBill offers a comprehensive suite of features designed to make bill payments secure, transparent, and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-900 dark:to-zinc-950 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                Multiple Bill Types
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                TrustBill supports a wide range of bill types including airtime top-ups, data subscription plans, utility bills (electricity, water, gas), and custom bill categories. Whether you need to recharge your phone, subscribe to a data plan, or pay your monthly utilities, TrustBill has you covered with a unified, blockchain-powered payment system.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-950 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                Blockchain Security
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every payment on TrustBill is secured by the Stacks blockchain, ensuring that your transactions are immutable, transparent, and tamper-proof. The decentralized nature of blockchain technology means that your payment data is not stored on a single server but distributed across the network, making it virtually impossible to hack or manipulate.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-pink-50 to-red-50 dark:from-zinc-900 dark:to-zinc-950 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                Payment Tracking
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                All your payment history is permanently recorded on the blockchain with unique payment IDs, making it easy to track, verify, and audit every transaction. You can access your complete payment history at any time, view payment details, verify transaction status, and generate reports for accounting or tax purposes—all with cryptographic proof of authenticity.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-zinc-900 dark:to-zinc-950 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                STX Token Payments
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Pay all your bills using STX (Stacks) tokens, the native cryptocurrency of the Stacks blockchain. STX tokens provide a fast, secure, and cost-effective way to make payments without the need for traditional banking infrastructure. With TrustBill, you can leverage your cryptocurrency holdings to pay everyday bills, bridging the gap between digital assets and real-world utility.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-zinc-900 dark:to-zinc-950 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                Secure Payment Processing
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                TrustBill implements robust security measures to ensure that only authorized users can process their payments. Each payment is tied to a specific user address, and the smart contract enforces strict authorization checks. This means that you have complete control over your payments, and no one else can initiate or complete transactions on your behalf without your explicit consent.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-zinc-900 dark:to-zinc-950 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                Transparent Service Fees
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                TrustBill operates with complete transparency regarding service fees. The platform charges a configurable service fee (default: 5%) that is clearly displayed before you confirm any payment. All fees are calculated and deducted automatically, and the fee structure is publicly visible on the blockchain, ensuring there are no hidden charges or surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              How TrustBill Works
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              TrustBill simplifies bill payments into three easy steps, leveraging the power of blockchain technology for security and transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
                1
              </div>
              <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-full pt-12">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                  Connect Your Wallet
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Start by connecting your Stacks wallet to TrustBill. We support all major Stacks wallet providers, including Hiro Wallet, Xverse, and other compatible wallets. Once connected, your wallet address will be securely linked to your TrustBill account, enabling seamless payment processing.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Your wallet connection is secure and private—we never store your private keys or seed phrases. All transactions are signed directly in your wallet, giving you complete control over your funds.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
                2
              </div>
              <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-full pt-12">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                  Create Your Payment
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Select the type of bill you want to pay—airtime, data subscription, utility, or custom bill. Enter the recipient details (phone number, account number, or identifier) and specify the amount you wish to pay in STX tokens. The system will calculate the total amount including service fees and display a summary for your review.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  At this stage, a pending payment record is created on the blockchain with a unique payment ID. This record is publicly visible and serves as proof that you initiated the payment, but no funds are transferred yet.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
                3
              </div>
              <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-full pt-12">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                  Process & Confirm
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Review the payment details one final time, then confirm the transaction in your wallet. Once you approve, the smart contract will automatically transfer the STX tokens from your wallet to the recipient, deduct the service fee, and mark the payment as completed on the blockchain.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The transaction is immediately recorded on the Stacks blockchain, providing you with an immutable receipt and complete payment history. You can track the status of your payment in real-time and access the transaction details at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Why Choose TrustBill?
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              TrustBill offers numerous advantages over traditional bill payment systems, combining the best of blockchain technology with user-friendly design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    Decentralized & Trustless
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    TrustBill operates on a decentralized blockchain network, eliminating the need for intermediaries or trusted third parties. The smart contract code is open-source and auditable, ensuring that the platform operates exactly as designed without requiring you to trust a central authority.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    Global Accessibility
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    As a blockchain-based platform, TrustBill is accessible from anywhere in the world, 24/7. There are no geographical restrictions, banking hours limitations, or currency conversion issues. As long as you have internet access and STX tokens, you can pay bills instantly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    Lower Transaction Costs
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Traditional payment processors often charge high fees for international transactions or impose minimum payment thresholds. TrustBill's blockchain-based system significantly reduces these costs, making it economical to pay bills of any size, from small airtime top-ups to large utility payments.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    Immutable Payment Records
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Every payment you make through TrustBill is permanently recorded on the Stacks blockchain, creating an unalterable audit trail. This is invaluable for accounting, tax purposes, dispute resolution, and maintaining a complete financial history that cannot be lost, deleted, or tampered with.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    Fast & Efficient Processing
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Blockchain transactions on Stacks are processed quickly, typically within minutes. Unlike traditional banking systems that may take days to process payments, especially for international transactions, TrustBill payments are confirmed and finalized rapidly, allowing you to complete bill payments when you need them most.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    Privacy & Control
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    With TrustBill, you maintain full control over your payment data. While transactions are transparent on the blockchain, you're not required to share sensitive personal information with multiple service providers. Your wallet address serves as your identifier, providing a level of privacy not available in traditional payment systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Bill Payments?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join the future of decentralized bill payments. Experience the security, transparency, and efficiency of blockchain technology with TrustBill. Start paying your bills with STX tokens today and take control of your financial transactions.
          </p>
          <p className="text-lg text-blue-50 mb-12 leading-relaxed">
            Whether you're paying for airtime, data subscriptions, utilities, or custom bills, TrustBill provides a seamless, secure, and transparent solution that puts you in control. Connect your wallet and make your first payment in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
              Start Paying Bills
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                TrustBill
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Decentralized bill payment platform on Stacks blockchain. Pay bills securely with STX tokens.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How It Works</a></li>
                <li><a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Smart Contract</a></li>
                <li><a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Blockchain</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.stacks.co" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Stacks Network</a></li>
                <li><a href="https://docs.stacks.co" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Stacks Docs</a></li>
                <li><a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Explorer</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>&copy; {new Date().getFullYear()} TrustBill. Built on Stacks Blockchain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
