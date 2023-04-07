import React from "react";
import './Loading.css';

export const Loading = () => {
  return (
    <div id="loading">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
