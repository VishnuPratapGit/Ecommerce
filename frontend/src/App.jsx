import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ItemSection from "./components/ItemSection/SectionTemplate";

const App = () => {
  return (
    <>
      <div className="sticky top-0">
        <Navbar />
      </div>
      <main className="w-[90%] mx-auto">
        <ItemSection title={"Dairy & Breads"} />
      </main>
    </>
  );
};

export default App;
