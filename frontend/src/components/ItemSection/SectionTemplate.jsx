import "./section.css";
import ProductBox from "./ProductBox";
const SectionTemplate = ({ title }) => {
  return (
    <div className="p-4">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="flex justify-between overflow-x-auto py-2 gap-5 scroll-hidden">
        <ProductBox
          title={"Amul Gold Full Cream Milk"}
          quantity={"200 ml"}
          price={34}
        />
      </div>
    </div>
  );
};

export default SectionTemplate;
