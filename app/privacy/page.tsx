import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - Director',
  description: 'Director Privacy Policy - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container px-4 py-16 max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-8">
          <span className="text-2xl font-bold text-white">Director</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        
        <p className="text-gray-400 mb-8">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Director (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website directorforgood.org (the &quot;Site&quot;). Please read this privacy policy carefully. 
              If you do not agree with the terms of this privacy policy, please do not access the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Register for our programs or events</li>
              <li>Subscribe to our newsletter</li>
              <li>Make a donation</li>
              <li>Contact us through forms or email</li>
              <li>Contact us about our services</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              This information may include your name, email address, phone number, mailing address, 
              payment information, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-gray-300 leading-relaxed">
              When you visit our Site, we may automatically collect certain information about your device, 
              including information about your web browser, IP address, time zone, and some of the cookies 
              that are installed on your device. Additionally, as you browse the Site, we may collect 
              information about the individual web pages that you view, what websites or search terms 
              referred you to the Site, and information about how you interact with the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Process your donations and program applications</li>
              <li>Send you newsletters, updates, and information about our programs</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and user experience</li>
              <li>Comply with legal obligations</li>
              <li>Protect our rights and prevent fraud</li>
              <li>Analyze website usage and trends</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-300 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our Site and store 
              certain information. Cookies are files with a small amount of data which may include an 
              anonymous unique identifier. You can instruct your browser to refuse all cookies or to 
              indicate when a cookie is being sent. However, if you do not accept cookies, you may not 
              be able to use some portions of our Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed">
              We may use third-party services to help us operate our Site and administer our programs. 
              These third parties have access to your information only to perform specific tasks on our 
              behalf and are obligated not to disclose or use it for any other purpose. We may use 
              services such as:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Payment processors for donations</li>
              <li>Email service providers for newsletters</li>
              <li>Analytics services to understand website usage</li>
              <li>Cloud hosting services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your 
              personal information. However, no method of transmission over the Internet or electronic 
              storage is 100% secure. While we strive to use commercially acceptable means to protect 
              your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to opt-out of certain communications</li>
              <li>The right to data portability</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              To exercise these rights, please contact us at <a href="mailto:hello@directorforgood.org" className="text-white hover:underline">hello@directorforgood.org</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Our Site is not intended for children under the age of 13. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe 
              your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. 
              You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 text-gray-300">
              <p><strong>Director</strong></p>
              <p className="mt-2">
                Email: <a href="mailto:hello@directorforgood.org" className="text-white hover:underline">hello@directorforgood.org</a>
              </p>
              <p className="mt-2">
                Website: <a href="https://directorforgood.org" className="text-white hover:underline">directorforgood.org</a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link href="/" className="text-white hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}




