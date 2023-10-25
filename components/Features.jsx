import React from "react";

const Features = ({ title, desc, img, style }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{desc}</p>
      <img src={img} alt="" style={style} className="follow-img" />
    </div>
  );
};

export default Features;
