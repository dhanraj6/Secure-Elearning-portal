import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "../core/helper/coreapicalls";
import "./style.css"

export default function CourseMain() {

  return (
    <Base title="" description="">
      <div className="text-center">
        <h3>Main course Page</h3>
      </div>
    </Base>
  );
}
