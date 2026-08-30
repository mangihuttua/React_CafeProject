import Container from "../Container/Container";
import SectionTitle from "../SectionTitle/SectionTitle";
import menuData from "../../data/menuData";
import MenuCard from "../MenuCard/MenuCard";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import  { useState } from "react";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All"); // Kategori List
  const [searchTerm, setSearchTerm] = useState(""); // Search 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
  "All",
  ...new Set(menuData.map((menu) => menu.category)),
    ]

  const filteredMenu = menuData.filter((menu) => {
  const matchCategory =
    selectedCategory === "All" ||
    menu.category === selectedCategory;

  const matchSearch = menu.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  return matchCategory && matchSearch;
  });

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredMenu.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

  return (
    <section className="py-16 bg-amber-50">
      <Container>

        <SectionTitle
          title="Our Menu"
          subtitle="Choose your favorite coffee"
        />

        {/* Search */}
        <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your favorite menu..."
          />

        {/* Category */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-5 py-2 rounded-full font-medium
                transition-all duration-300
                ${
                  selectedCategory === category
                    ? "bg-orange-700 text-white"
                    : "bg-white text-gray-700 hover:bg-orange-100"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>


        {/* Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {filteredMenu.length > 0 ? (
            currentData.map((menu) => (
              <MenuCard
                key={menu.id}
                {...menu}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Menu tidak ditemukan
            </p>
          )}

        </div>

        {/* Pagination */}
          <div className="flex  lg:justify-center justify-end mt-10">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
      </Container>
    </section>
  );
}

export default Menu;