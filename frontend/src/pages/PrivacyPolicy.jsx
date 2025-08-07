import { Link } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const PrivacyPolicy = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

  return (
    <>
    <IoArrowBack
                onClick={goBack}
                className="text-2xl cursor-pointer absolute top-4 max-sm:top-2 max-sm:left-2 left-4 max-sm:text-xl font-semibold"
            />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" role="main">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          Privacy Policy for Vendify
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 text-center">
          Last Updated: August 07, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to Vendify, an online marketplace connecting buyers and sellers. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, or services (collectively, the "Service").
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            2. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and payment information when you register or make a purchase.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our Service, including IP address, browser type, pages visited, and time spent.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance your experience and analyze usage patterns.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We use your information to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
            <li>Provide, operate, and maintain our Service.</li>
            <li>Process transactions and send you order updates.</li>
            <li>Improve our platform based on your feedback and usage data.</li>
            <li>Send promotional emails or notifications (with your consent).</li>
            <li>Ensure compliance with legal obligations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            4. How We Share Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell your personal information. We may share it with:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
            <li><strong>Service Providers:</strong> Third parties that assist with payment processing, shipping, or analytics.</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
            <li><strong>Business Transfers:</strong> In case of a merger or acquisition.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            5. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement reasonable security measures to protect your data, including encryption and secure servers. However, no online service is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            6. Your Data Rights and Choices
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt-out of marketing communications.</li>
            <li>Request data portability or restrict processing.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            To exercise these rights, contact us at <a href="mailto:privacy@vendify.com" className="text-[#00bf63] hover:underline">privacy@vendify.com</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            7. Children’s Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our Service is not intended for individuals under 13. We do not knowingly collect data from children. If we learn of such data, we will delete it promptly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            8. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this policy periodically. Changes will be posted here with an updated "Last Updated" date. We encourage you to review this page regularly.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            9. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions, concerns, or requests regarding this Privacy Policy, please contact us at:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
            <li>Email: <a href="mailto:privacy@vendify.com" className="text-[#00bf63] hover:underline">privacy@vendify.com</a></li>
            <li>Phone: +1-800-VENDIFY</li>
            <li>Address: Vendify Inc., 123 Tech Lane, Silicon Valley, CA 94000</li>
          </ul>
        </section>
      </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;