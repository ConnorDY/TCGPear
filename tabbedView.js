import React from "react";
import { render }  from "react-dom"
import { Tab } from "./tab"
import { Window } from "./window"
import { WindowEvent } from "./windowEvent"

class TabbedView extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.closeSession = this.closeSession.bind(this);
    this.state = {
      currentTab: 0,
      lastSaved: "never"
    };
  }

  componentDidMount() {}
  componentWillUnmount() {}

  handleTabChange(tab)
  {
    this.setState({
      currentTab: tab
    });
  }

  closeSession()
  {
    var choice = confirm("Are you sure you want to close this session?\n\nAll session data will be lost and program defaults will be restored.");
    if (!choice) return 0;

    //clearInterval(autoSave);
    //$("#mainForm")[0].reset();
    localStorage.removeItem("event");
    location.reload();
  }

	render()
  {
		return (<div>
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
          <td id="notif">Last saved: {this.state.lastSaved}</td>
  				<td id="closeSession">
            <input
              type="button"
              id="bCloseSession"
              value="Close Session"
              onClick={this.closeSession} />
          </td>
        </tr>
      </tbody></table>
      <div id="main">
        <Window name="tabEvent">
          <WindowEvent />
        </Window>
      </div>
    </div>);
 	}
}

export { TabbedView };
