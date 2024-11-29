"use client";
import Image from "next/image";
import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchImagesJumbotron } from "@/app/redux/directory/directorySlicer";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...style,
        marginRight: "80px",
        zIndex: 1,
        transform: "scale(1.8)",
      }}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        marginLeft: "80px",
        zIndex: 1,
        transform: "scale(1.8)",
      }}
      onClick={onClick}
    />
  );
}

const Header = () => {
  const { imagesJumbotron } = useSelector((state) => state.directory);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchImagesJumbotron());
  }, []);
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section>
      <div className="slider-container">
        <Slider {...settings}>
          {imagesJumbotron.map((image) => (
            <Image
              key={image?._id}
              src={`http://localhost:3001/${image?.name}`}
              height="3000"
              width="3000"
              className="w-full object-cover  object-center"
              alt="gambar"
              priority
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Header;
