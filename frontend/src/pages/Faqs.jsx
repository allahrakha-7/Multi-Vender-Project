// pages/FAQs.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  // Sample FAQ data (replace with API fetch if needed)
  const faqs = [
    {
      question: "How do I place an order on Vendify?",
      answer:
        "To place an order, browse our categories, select your desired product, add it to your cart, and proceed to checkout. Sign in or create an account to complete your purchase with secure payment options.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, mobile payments (e.g., JazzCash, EasyPaisa), and bank transfers. All transactions are encrypted for your security.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery times vary by location. Typically, orders are delivered within 2-5 business days in urban areas and 5-7 days in rural areas. Track your order in your account dashboard.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes, you can return products within 7 days of delivery if they are unused and in original packaging. Contact our support team for a return request.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "Reach us via email at support@vendify.com, phone at +1-800-VENDIFY, or through our contact form on the website.",
    },
  ];

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">FAQs</h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about Vendify
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00bf63] placeholder-gray-400"
          />
        </div>

        {/* FAQ Accordion */}
        <section className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <button
                  className="w-full text-left p-4 font-semibold text-gray-900 focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{faq.question}</span>
                  <span className="float-right">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="p-4 text-gray-600 border-t border-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No FAQs found matching your search.</p>
          )}
        </section>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Can’t find what you’re looking for? Get in touch with us!
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#00bf63] text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQs;