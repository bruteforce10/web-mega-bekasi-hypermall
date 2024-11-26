"use client";
import React from "react";
import Lottie from "lottie-react";
import LoadingSreeen from "../public/loading.json";

const LoadingComponent = () => {
  return <Lottie animationData={LoadingSreeen} loop={true} />;
};

export default LoadingComponent;
