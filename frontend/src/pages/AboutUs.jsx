import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";


const AboutUs = () => {
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
               
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Welcome to Vendify - Your Home Shopping Destination
                        </p>
                    </div>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            At Vendify, we are dedicated to revolutionizing the way you shop from the comfort of
                            your home. Founded with a passion for convenience and quality, our mission is to provide
                            a seamless online shopping experience with a wide range of products, from electronics
                            to personal care items. We strive to connect customers with trusted sellers, offering
                            the best deals and exceptional service every step of the way.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center bg-white p-6 rounded-lg shadow-md">
                                <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4"></div>
                                <h3 className="text-lg font-medium text-gray-900">Jane Doe</h3>
                                <p className="text-gray-600">Founder & CEO</p>
                            </div>
                            <div className="text-center bg-white p-6 rounded-lg shadow-md">
                                <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4"></div>
                                <h3 className="text-lg font-medium text-gray-900">John Smith</h3>
                                <p className="text-gray-600">Head of Operations</p>
                            </div>
                            <div className="text-center bg-white p-6 rounded-lg shadow-md">
                                <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4"></div>
                                <h3 className="text-lg font-medium text-gray-900">Emily Johnson</h3>
                                <p className="text-gray-600">Customer Support Lead</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Customer Satisfaction: Putting you first with top-notch support.</li>
                            <li>Quality Assurance: Offering only the best products from trusted sellers.</li>
                            <li>Innovation: Continuously improving to enhance your shopping experience.</li>
                            <li>Sustainability: Committed to eco-friendly practices where possible.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
                        <p className="text-gray-600 mb-4">
                            Have questions or feedback? We’d love to hear from you! Reach out to us at:
                        </p>
                        <div className="text-gray-600 space-y-2">
                            <p>Email: support@vendify.com</p>
                            <p>Phone: +1-800-VENDIFY</p>
                            <p>Address: 123 Shopping Lane, E-Shop City, PK</p>
                        </div>
                        <div className="mt-6">
                            <Link
                                to="/contact"
                                className="inline-block bg-[#00bf63] text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default AboutUs;