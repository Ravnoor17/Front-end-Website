import React, { useEffect, useState } from "react";
import "../../Styles/image-gallery.css";
import ImageGallery from "react-image-gallery";

function Images(props) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    createImages();
  }, []);

  function createImages() {
    const imgs =
      props.imgUrl &&
      props.imgUrl.map((img) => {
        return {
          original: img,
          thumbnail: img,
        };
      });

    setImages(() => {
      return imgs;
    });
  }

  return (
    <div className="imagegallery">
      <ImageGallery items={images} />
    </div>
  );
}
export default Images;
