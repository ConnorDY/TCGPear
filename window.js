import React from "react";
import { render }  from "react-dom";

class Window extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const isSelected = this.props.isActive ? "" : " hidden";

        return (
            <div id={this.props.name} className={"tab"+isSelected}>
                {this.props.children}
            </div>
        );
    }
}

export { Window };