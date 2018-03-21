import React from "react"
import { render }  from "react-dom"

class Window extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div id={this.props.name} className="tab">
                {this.props.children}
            </div>
        );
    }
}

export { Window };