import { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredItems = [
    { id: 1, name: "Margherita Pizza", description: "Classic Italian pizza with fresh mozzarella.", image: "/images/margherita.jpg"  },
    { id: 2, name: "Cheeseburger", description: "Juicy burger with cheddar cheese.", image: "/images/cheese-b.jpg" },
    { id: 3, name: "Chocolate Cake", description: "Rich and moist chocolate cake.", image: "/images/chocolate.jpg" },
    { id: 1, name: "Rajma Kebab", description: "Vegan kidney bean patties.", image: "/images/rajma.jpg" },
  { id: 2, name: "Salmon steak", description: "Luscious Salmon steak with sambal salad.", image: "/images/salmon-steak.jpg" },
   { id: 3, name: "Chicken shashlik Kebabs", description: "Delicious spicy Indo-Chinese chicken shashlik kebabs.", image: "/images/chicken.jpg" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredItems = featuredItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="home-page">
      <h1>Welcome to Cravory</h1>
      <p>Your favorite meals delivered to your doorstep!</p>

      {/* Carousel/Slider */}
      <section className="carousel">
        <div className="carousel-container">
          {featuredItems.map((item) => (
            <div key={item.id} className="carousel-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section className="search-bar">
        <h2>Search Our Menu</h2>
        <input
          type="text"
          placeholder="Search for a dish..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </section>

      {/* Filtered Items */}
      <section className="search-results">
        <h2>Featured Dishes</h2>
        {filteredItems.length > 0 ? (
          <div className="featured-items">
            {filteredItems.map((item) => (
              <div key={item.id} className="featured-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No items match your search!</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
