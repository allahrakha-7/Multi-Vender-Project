import SellerHeader from "./SellerHeader";
import CreateProduct from "./SellerProductCreationPage";


function SellerHomePage() {
  return (
    <>
      <SellerHeader activeHeading={1}/>
      <CreateProduct/>
    </>
  )
}


export default SellerHomePage;