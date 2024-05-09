import React from "react";
import "./Loading.css";

const Loading = () => {
  // return (
  //     <div className="loading">
  //        <input type="checkbox" id="check" />
  //        <label for="check">
  //       <div class="check-icon"></div>
  //       </label>
  //     </div>
  // )

  return (
    <div className="loading">
      <div class="lds-heart">
        <div></div>
       </div>
       <h1 className="name_shop">...KIANA SHOP...</h1>
    </div>
  );
};

export default Loading;
