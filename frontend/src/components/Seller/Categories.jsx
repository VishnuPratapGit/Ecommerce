import React from "react";

const Categories = ({ value, onChange }) => {
  return (
    <div className="relative border-2 border-neutral-600 rounded-lg p-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent outline-none p-3 pr-8 rounded-md cursor-pointer transition-colors duration-200"
        name="product-category"
      >
        <option value="">Select Category</option>
        <optgroup label="Daily Essentials">
          <option value="dairy-bread-eggs">Dairy, Bread & Eggs</option>
          <option value="fruits-vegetables">Fruits & Vegetables</option>
          <option value="atta-rice-dal">Atta, Rice & Dal</option>
        </optgroup>

        <optgroup label="Beverages & Snacks">
          <option value="snacks-munchies">Snacks & Munchies</option>
          <option value="cold-drinks-juices">Cold Drinks & Juices</option>
          <option value="sweet-tooth">Sweet Tooth</option>
        </optgroup>

        <optgroup label="Breakfast & Packaged Food">
          <option value="breakfast-instant-food">
            Breakfast & Instant Food
          </option>
          <option value="sauces-spreads">Sauces & Spreads</option>
          <option value="organic-healthy">Organic & Healthy Living</option>
        </optgroup>

        <optgroup label="Baby & Wellness">
          <option value="baby-care">Baby Care</option>
          <option value="pharma-wellness">Pharma & Wellness</option>
        </optgroup>

        <optgroup label="Household">
          <option value="cleaning-essentials">Cleaning Essentials</option>
          <option value="home-office">Home & Office</option>
          <option value="personal-care">Personal Care</option>
          <option value="stationery">Stationery</option>
        </optgroup>

        <optgroup label="Specialty">
          <option value="masala-oil">Masala, Oil & More</option>
          <option value="bakery-biscuits">Bakery & Biscuits</option>
          <option value="tea-coffee">Tea, Coffee & Health Drinks</option>
          <option value="pet-care">Pet Care</option>
          <option value="paan-corner">Paan Corner</option>
          <option value="decoration">Decoration</option>
        </optgroup>
      </select>
    </div>
  );
};

export default Categories;
