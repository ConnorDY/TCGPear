import React from "react";

const Tab = ({ tabNum, name, isSelected, onTabChange }) => (
<td>
  <input
    type="button"
    className={"tabButton"+isSelected}
    value={name}
    onClick={() => onTabChange(tabNum)} />
</td>
);

export default Tab;
