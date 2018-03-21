import React from "react"
import { render }  from "react-dom"

class Tab extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e)
  {
    this.props.onTabChange(this.props.tabNum);
  }

  render()
  {
    const isSelected = this.props.isActive ? " select" : "";

    return (
      <td>
        <input
          type="button"
          className={"tabButton"+isSelected}
          value={this.props.name}
          onClick={this.handleChange} />
      </td>
    );
  }
}

export { Tab };
