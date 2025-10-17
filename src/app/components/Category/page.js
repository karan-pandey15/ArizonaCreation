 
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import cat1 from "../../../../public/images/dresses.png";
import cat2 from "../../../../public/images/trouser.png";
import cat3 from "../../../../public/images/skirts.png";
import cat4 from "../../../../public/images/dresses.png";
import cat6 from "../../../../public/images/skirts.png";
import cat7 from "../../../../public/images/hoodie.png";

import "./Categofystyle.css";

const categories = [
  { name: "Dresses", image: cat1 },
  { name: "Trouser", image: cat2 },
  { name: "Tops", image: cat3 },
  { name: "Chikankari", image: cat4 },
  { name: "Skirts", image: cat7 },
  { name: "Bestsellers", image: cat6 },
  { name: "Handmade", image: cat7 },
];

const Category = () => {
  return (
    <section style={{ backgroundColor: "#fff" }}>
      <h1 className="four_heading_div">Watch Our Collection</h1>
      <div className="four_div_container">
        {categories.map((cat) => (
          <div key={cat.name} className="round_container">
            <Link href={`/ristalmica?category=${encodeURIComponent(cat.name)}`}>
              <Image
                src={cat.image}
                className="round_contaner_img"
                alt={cat.name}
              />
              <p className="txt_container">{cat.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
