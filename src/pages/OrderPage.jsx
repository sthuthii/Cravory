import { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import "./OrderPage.css";

const menuItems = [
  { id: 1, name: "Margherita Pizza", basePrice: 8.99, image: "/images/margherita.jpg" },
  { id: 2, name: "Grilled Salmon", basePrice: 15.99, image: "/images/grilled.jpg" },
  { id: 3, name: "Vegan Burger", basePrice: 12.99, image: "/images/vegan_burger.jpg" },
];

const sizes = [
  { size: "Small", multiplier: 1 },
  { size: "Medium", multiplier: 1.5 },
  { size: "Large", multiplier: 2 },
];

const addOns = [
  { name: "Extra Cheese", price: 2 },
  { name: "Bacon", price: 3 },
  { name: "Avocado", price: 2.5 },
];

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    const totalAddOnPrice = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    const sizeMultiplier = sizes.find((s) => s.size === selectedSize).multiplier;
    const totalPrice = ((currentItem.basePrice + totalAddOnPrice) * sizeMultiplier * quantity).toFixed(2);

    const item = {
      ...currentItem,
      size: selectedSize,
      addOns: selectedAddOns.map((addOn) => addOn.name),
      quantity,
      totalPrice,
    };

    setCart([...cart, item]);
    setCurrentItem(null);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const checkout = () => {
    const totalCost = cart.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2);
    alert(`Your total is $${totalCost}. Thank you for your order!`);
    setCart([]); // Clear the cart after checkout
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: "menu-item",
    drop: (item) => setCurrentItem(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const MenuItem = ({ item }) => {
    const [, dragRef] = useDrag({
      type: "menu-item",
      item,
    });

    return (
      <div ref={dragRef} className="menu-item">
        <img src={item.image} alt={item.name} />
        <h3>{item.name}</h3>
        <p>${item.basePrice.toFixed(2)}</p>
      </div>
    );
  };

  MenuItem.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      basePrice: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <div className="order-page">
      <section className="menu">
        <h2>Menu</h2>
        <div className="menu-list">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section ref={dropRef} className={`customization ${isOver ? "hovered" : ""}`}>
        <h2>Customization</h2>
        {currentItem ? (
          <div>
            <h3>{currentItem.name}</h3>
            <p>Base Price: ${currentItem.basePrice.toFixed(2)}</p>

            <div className="size-options">
              <h4>Size:</h4>
              {sizes.map((size) => (
                <label key={size.size}>
                  <input
                    type="radio"
                    name="size"
                    value={size.size}
                    checked={selectedSize === size.size}
                    onChange={() => setSelectedSize(size.size)}
                  />
                  {size.size} (+{(currentItem.basePrice * (size.multiplier - 1)).toFixed(2)})
                </label>
              ))}
            </div>

            <div className="add-ons">
              <h4>Add-Ons:</h4>
              {addOns.map((addOn) => (
                <label key={addOn.name}>
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addOn)}
                    onChange={() =>
                      setSelectedAddOns((prev) =>
                        prev.includes(addOn)
                          ? prev.filter((a) => a !== addOn)
                          : [...prev, addOn]
                      )
                    }
                  />
                  {addOn.name} (+${addOn.price.toFixed(2)})
                </label>
              ))}
            </div>

            <div className="quantity">
              <h4>Quantity:</h4>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <button onClick={addToCart}>Add to Cart</button>
          </div>
        ) : (
          <p>Drag a menu item here to customize your order.</p>
        )}
      </section>

      <section className="cart">
        <h2>Cart</h2>
        {cart.length > 0 ? (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Add-Ons: {item.addOns.join(", ") || "None"}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${item.totalPrice}</p>
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                </li>
              ))}
            </ul>
            <button onClick={checkout} className="checkout">Checkout</button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </section>
    </div>
  );
};

export default OrderPage;
