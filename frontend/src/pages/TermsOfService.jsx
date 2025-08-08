import { Link } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center" aria-label="Terms of Service">
                        Terms of Service - Vendify
                    </h1>
                    <p className="text-gray-600 mb-6 text-center">
                        Last Updated: August 07, 2025
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            By accessing or using the Vendify platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service. Vendify reserves the right to update these Terms at any time, and continued use constitutes acceptance of the updated Terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Vendify is an online marketplace that allows users to buy, sell, and trade products such as computers, laptops, sports gear, and watches. The Service includes all features, content, and functionalities provided through the website or associated applications.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Eligibility</h2>
                        <p className="text-gray-700 leading-relaxed">
                            You must be at least 18 years old or have parental consent to use Vendify. By using the Service, you represent that you are legally capable of entering into a binding agreement.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. User Accounts</h2>
                        <p className="text-gray-700 leading-relaxed">
                            To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Vendify reserves the right to suspend or terminate accounts that violate these Terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Product Listings and Transactions</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Users may list products for sale, but must ensure all listings are accurate and comply with applicable laws. Vendify is not responsible for the quality, safety, or legality of items sold. Transactions are between users, and Vendify acts only as a platform facilitator.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Payment and Fees</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Vendify may charge fees for certain services, such as listing promotions or transaction processing. All fees are disclosed prior to charging, and payment is processed through secure third-party providers. Refunds are subject to our refund policy.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Intellectual Property</h2>
                        <p className="text-gray-700 leading-relaxed">
                            All content on Vendify, including logos, designs, and code, is the property of Vendify or its licensors and is protected by intellectual property laws. Users may not reproduce or distribute this content without permission.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. User Conduct</h2>
                        <p className="text-gray-700 leading-relaxed">
                            You agree not to use the Service for illegal activities, harassment, or to upload harmful content. Vendify may remove content or suspend users who violate these guidelines.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Vendify is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use the Service. Our liability is limited to the extent permitted by law.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Termination</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Vendify may terminate or suspend your access to the Service at its discretion, with or without notice, for any reason, including violation of these Terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">
                            For questions about these Terms, contact us at support@vendify.com or through our <Link to="/contact" className="text-[#00bf63] hover:underline">Contact Page</Link>.
                        </p>
                    </section>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            By using Vendify, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsOfService;