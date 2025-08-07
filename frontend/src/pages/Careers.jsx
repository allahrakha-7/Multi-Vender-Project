import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";


const Careers = () => {
  const jobListings = [
    {
      title: "Senior Frontend Developer",
      location: "Remote",
      type: "Full-Time",
      description: "Develop and maintain user-facing features using React and Tailwind CSS. Collaborate with design and backend teams to deliver seamless shopping experiences.",
    },
    {
      title: "Customer Support Specialist",
      location: "Islamabad, PK",
      type: "Full-Time",
      description: "Provide top-notch support to customers, resolve inquiries, and ensure a positive shopping experience.",
    },
    {
      title: "Marketing Manager",
      location: "Lahore, PK",
      type: "Full-Time",
      description: "Lead marketing campaigns to promote Vendify’s products and deals, driving customer engagement and sales.",
    },
  ];

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
            <h1 className="text-4xl font-bold text-gray-900">Careers at Vendify</h1>
            <p className="mt-4 text-lg text-gray-600">
              Join our team and help shape the future of online shopping
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-gray-600 leading-relaxed">
              At Vendify, we’re more than just an e-commerce platform—we’re a community of innovators
              passionate about making shopping from home effortless and enjoyable. We offer a
              collaborative work environment, competitive salaries, and opportunities for growth.
              Whether you’re a developer, marketer, or customer support expert, your skills can make
              a difference here.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Current Openings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobListings.map((job, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-medium text-gray-900">{job.title}</h3>
                  <p className="text-gray-600 mt-2">{job.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Type:</strong> {job.type}</p>
                  </div>
                  <Link
                    to="/apply"
                    className="mt-4 inline-block bg-[#00bf63] text-white font-semibold px-4 py-2 rounded-full hover:bg-green-700 transition"
                  >
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
            {jobListings.length === 0 && (
              <p className="text-center text-gray-600">No openings available at this time.</p>
            )}
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Apply</h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>Review the job listings above and select a role that matches your skills.</li>
              <li>Click 'Apply Now' to submit your resume and a cover letter.</li>
              <li>Our team will review your application and contact you for an interview.</li>
              <li>Join our team and start making an impact!</li>
            </ol>
            <p className="mt-4 text-gray-600">
              Please send your application to <a href="mailto:careers@vendify.com" className="text-[#00bf63] hover:underline">careers@vendify.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Competitive salary and performance bonuses</li>
              <li>Flexible working hours and remote options</li>
              <li>Health insurance and wellness programs</li>
              <li>Ongoing training and career development</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default Careers;