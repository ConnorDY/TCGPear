import React from "react";

const Tab = ({ tabNum, name, isActive, onTabChange }) => (
<td>
  <input
    type="button"
    className={"tabButton"+(isActive ? " select" : "")}
    value={name}
    onClick={() => onTabChange(tabNum)} />
</td>
);

export default Tab;
