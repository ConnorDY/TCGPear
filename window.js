import React from "react";

const Window = ({ name, isActive, children }) => (
<div id={name} className={"tab" + (isActive ? "" : " hidden")}>
    {children}
</div>
);

export default Window;