"use client";
import Image from "next/image";
import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 9900,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section>
      <div className="slider-container">
        <Slider {...settings}>
          <Image
            src={"/cover/1.webp"}
            height="3000"
            width="3000"
            className="w-full object-cover object-center"
            alt="gambar"
            priority
          />
        </Slider>
      </div>
    </section>
  );
};

export default Header;
