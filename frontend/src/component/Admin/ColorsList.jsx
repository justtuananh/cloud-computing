import React from "react";

const ColorsList = ({ list, deleteColor }) => {
  return (
    list.length > 0 && (
      <>
        <h3 style={{ textAlign: "center", fontSize: "15px" }}>Màu đã chọn</h3>
        <div style={{backgroundColor:"#c2c2c256", borderRadius:"8px", padding:"4px"}}>
          {list.map((color) => (
            <div
              key={color.name}
              className="ChooseColor"
              onClick={() => deleteColor(color.name)}
            >
              {color.name}
            </div>
          ))}
        </div>
      </>
    )
  );
};
export default ColorsList;
