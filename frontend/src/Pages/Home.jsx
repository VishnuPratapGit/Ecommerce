import ListCategoriesAtHome from "../components/ItemSection/ListCategoriesAtHome";
import ItemSectionTemplate from "../components/ItemSection/SectionTemplate";

const Home = () => {
  return (
    <div>
      <ListCategoriesAtHome />
      <ItemSectionTemplate title={"Dairy & Breads"} />
    </div>
  );
};

export default Home;
