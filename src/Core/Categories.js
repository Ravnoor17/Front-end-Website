import React, { useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../Styles/categoryPage.css";
import category from "../helper/categoryData";
import CatStrip from "../Components/CategoryStrip";
import $ from "jquery";
const Categories = () => {
  useEffect(() => {
    $(document).ready(function () {
      $(this).scrollTop(0);
    });
  }, []);
  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <Header />
      {/* <div
        style={{ width: "100%", overflowX: "hidden" }}
        className="heading-categories"
      >
        <p>&nbsp;&nbsp;Categories&nbsp;&nbsp;</p>
      </div> */}
      <div className="heading-alt-1">
        <h2>Categories</h2>
        <h2>Categories</h2>
      </div>
      <div className="catt">
        {category.map((cat, index) => {
          return (
            <CatStrip
              Name={cat.Name}
              img={cat.img}
              quote={cat.quote}
              index={index}
            />
          );
        })}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#222222"
          fill-opacity="1"
          d="M0,256L48,245.3C96,235,192,213,288,181.3C384,149,480,107,576,117.3C672,128,768,192,864,202.7C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <Footer />
    </div>
  );
};
export default Categories;
