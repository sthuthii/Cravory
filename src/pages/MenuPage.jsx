import { useState} from "react";
import "./MenuPage.css";

const menuItems = [
  { id: 1, name: "Caesar Salad", category: "Starters", price: 8.99, image: "/images/salad.jpg", dietary: ["vegetarian"] },
  { id: 2, name: "Chicken Wings", category: "Starters", price: 12.99, image: "/images/wings.jpg", dietary: ["gluten-free"] },
  { id: 3, name: "Grilled Salmon", category: "Main Course", price: 15.99, image: "/images/salmon.jpg", dietary: ["gluten-free"] },
  { id: 4, name: "Vegan Burger", category: "Main Course", price: 13.99, image: "/images/burger.jpg", dietary: ["vegan"] },
  { id: 5, name: "Chocolate Cake", category: "Desserts", price: 6.99, image: "/images/cake.jpg", dietary: ["vegetarian"] },
  { id: 6, name: "Fruit Platter", category: "Desserts", price: 5.99, image: "/images/fruit.jpg", dietary: ["vegan", "gluten-free"] },
];

const categories = ["All", "Starters", "Main Course", "Desserts"];
const dietaryOptions = ["vegetarian", "vegan", "gluten-free"];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter menu items based on category and dietary filters
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesDietary = selectedDietary.every((filter) => item.dietary.includes(filter));
    return matchesCategory && matchesDietary;
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle dietary filter toggling
  const toggleDietaryFilter = (filter) => {
    setSelectedDietary((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="menu-page">
      <header>
        <h1>Our Menu</h1>
      </header>

      {/* Category Filter */}
      <div className="filters">
        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dietary Filters */}
        <div className="dietary-filter">
          {dietaryOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={selectedDietary.includes(option)}
                onChange={() => toggleDietaryFilter(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu-grid">
        {displayedItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} />
            <div className="menu-info">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="hover-actions">
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
