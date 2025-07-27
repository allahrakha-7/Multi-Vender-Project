import big from "../../images/big.png";
import amazon from "../../images/amazonlogo.png";
import etsy from "../../images/etsy.png";
import squarespace from "../../images/squarespace.png";
import shopify from "../../images/shopify.png";
import magneto from "../../images/magneto.png";
import ebay from "../../images/enbay.png";
import apple from '../../images/apple.png';

const Sponsored = () => {
  const logos = [
    { src: big, alt: "BigCommerce" },
    { src: amazon, alt: "Amazon" },
    { src: etsy, alt: "Etsy" },
    { src: squarespace, alt: "Squarespace" },
    { src: shopify, alt: "Shopify" },
    { src: magneto, alt: "Magento" },
    { src: apple, alt: "Apple" },
    { src: ebay, alt: "eBay" },
  ];

  return (
    <>
      
    <section className="w-92/93 mx-auto hidden sm:block py-4 bg-white px-5 mb-2 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-6">
          <h2 className="text-[27px] md:text-[32px] font-[700] font-Roboto relative">
            Trusted by leading brands
            <span className="absolute -bottom-2 left-0 h-[3px] w-10 rounded-full bg-yellow-500/80" />
          </h2>
          </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 place-items-center">
        {logos.map((logo, idx) => (
          <div
            key={idx}
            className="opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="w-[120px] h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
            />
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default Sponsored;
