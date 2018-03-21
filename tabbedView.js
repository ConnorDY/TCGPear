import React from "react"
import { render}  from "react-dom"
import { Tab } from "./tab"

class TabbedView extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.state = {
      currentTab: 0
    };
  }

  componentDidMount()
  {

  }

  componentWillUnmount()
  {

  }

  handleTabChange(tab)
  {
    this.setState({
      currentTab: tab
    });
  }

	render()
  {
		return (
      <table id="header"><tbody>
        <tr id="headings">
          <Tab
            name="Event Info"
            tabNum={0}
            isActive={(this.state.currentTab == 0)}
            onTabChange={this.handleTabChange} />
          <Tab
            name="Players"
            tabNum={1}
            isActive={(this.state.currentTab == 1)}
            onTabChange={this.handleTabChange} />
          <Tab
            name="Round"
            tabNum={2}
            isActive={(this.state.currentTab == 2)}
            onTabChange={this.handleTabChange} />
          <Tab
            name="Standings"
            tabNum={3}
            isActive={(this.state.currentTab == 3)}
            onTabChange={this.handleTabChange} />
        </tr>
      </tbody></table>
		);
 	}
}

export { TabbedView };
