import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card3";
import "../Styles/CardCarousel.css";
import { Link } from "react-router-dom";

import $ from "jquery";
import Spinner from "react-bootstrap/Spinner";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1200, min: 700 },
    items: 3,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 965, min: 643 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  smalie: {
    breakpoint: { max: 643, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
function CardCarousel(props) {
  // const [trekkingPackages, setTrekkingPackages] = useState([]);
  // const db = firebase.firestore();
  // const [isFetched, setIsFetched] = useState(false);

  // useEffect(() => {
  //   fetchTrekkingPackages();
  // }, []);
  // useEffect(() => {
  //   $(document).ready(function () {
  //     $(this).scrollTop(0);
  //   });
  // }, []);
  // const fetchTrekkingPackages = () => {
  //   setTrekkingPackages([]);
  //   db.collection(props.packageType)
  //     .get()
  //     .then((res) => {
  //       res.forEach((doc) => {
  //         setIsFetched(true);
  //         setTrekkingPackages((prev) => {
  //           return [...prev, { data: doc.data(), _id: doc.id }];
  //         });
  //       });
  //     });
  // };

  return (
    <div className="parentcarouel">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className="cari"
      >
        <div>
          <Card />
        </div>

        <div>
          <Card />
        </div>

        <div>
          <Card />
        </div>

        <div>
          <Card />
        </div>
      </Carousel>
    </div>
  );
}
export default CardCarousel;
