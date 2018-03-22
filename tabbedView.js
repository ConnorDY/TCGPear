import React from "react";
import { render }  from "react-dom";
import Tab from "./tab";
import Window from "./window";
import WindowEvent from "./windowEvent";
import WindowPlayers from "./windowPlayers";
import PopupEditPlayer from "./popupEditPlayer";

class TabbedView extends React.Component
{
  constructor(props)
  {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.editPlayer = this.editPlayer.bind(this);
    this.dropPlayer = this.dropPlayer.bind(this);
    this.showPopupEditPlayer = this.showPopupEditPlayer.bind(this);
    this.hidePopupEditPlayer = this.hidePopupEditPlayer.bind(this);
    this.closeSession = this.closeSession.bind(this);
    this.state = {
      currentTab: 0,
      players: [],
      popupEditPlayerIsVis: false,
      popupEditPlayerPID: 0
    };
  }

  componentDidMount()
  {
    if (localStorage.length <= 0) return;
    if (localStorage.getItem("currentTab") !== null) this.setState({currentTab: localStorage.currentTab});
    if (localStorage.getItem("players") !== null) this.setState({players: JSON.parse(localStorage.players)});
  }
  componentWillUnmount() {}

  changeTab(tab)
  {
    this.setState({
      currentTab: tab
    });

    localStorage.currentTab = tab;
  }

  addPlayer(firstName, lastName)
  {
    var player = {
      "firstName": firstName,
      "lastName": lastName
    };
    var newPlayersList = this.state.players.concat([player]);
    this.setState({
      players: newPlayersList
    });

    localStorage.players = JSON.stringify(newPlayersList);
  }

  editPlayer(pid, firstName, lastName)
  {
    var newPlayersList = this.state.players.map((player, i) => pid === i ? { firstName, lastName } : player);
    this.setState({
      players: newPlayersList,
      popupEditPlayerIsVis: false,
    });
    
    localStorage.players = JSON.stringify(newPlayersList);
  }

  dropPlayer(pid)
  {
    var newPlayersList = this.state.players.filter((player, i) => i !== pid);
    this.setState({
      players: newPlayersList,
      popupEditPlayerIsVis: false,
    })

    localStorage.players = JSON.stringify(newPlayersList);
  }

  showPopupEditPlayer(pid)
  {
    this.setState({
      popupEditPlayerIsVis: true,
      popupEditPlayerPID: pid
    });
  }

  hidePopupEditPlayer()
  {
    this.setState({popupEditPlayerIsVis: false});
  }

  closeSession()
  {
    var choice = confirm("Are you sure you want to close this session?\n\nAll session data will be lost and program defaults will be restored.");
    if (!choice) return;

    //clearInterval(autoSave);
    //$("#mainForm")[0].reset();
    localStorage.removeItem("event");
    location.reload();
  }

	render()
  {
    const tabs = ["Event Info", "Players", "Round", "Standings"];
		return (<div>
      <table id="header"><tbody>
        <tr id="headings">
        {tabs.map((tab, i) => <Tab name={tab} key={i} tabNum={i} isActive={(this.state.currentTab == i)} onTabChange={this.changeTab} />)}
          <td id="notif"></td>
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
        <Window
          name="tabEvent"
          isActive={this.state.currentTab == 0}>
          <WindowEvent />
        </Window>
        <Window
          name="tabPlayers"
          isActive={this.state.currentTab == 1}>
          <WindowPlayers
            players={this.state.players}
            onAddPlayer={this.addPlayer}
            onShowPopupEditPlayer={this.showPopupEditPlayer} />
        </Window>
      </div>
      { this.state.players.length ?
      <PopupEditPlayer
        visible={this.state.popupEditPlayerIsVis}
        pid={this.state.popupEditPlayerPID}
        player={this.state.players[this.state.popupEditPlayerPID]}
        onUpdatePlayer={this.editPlayer}
        onDropPlayer={this.dropPlayer}
        onHidePopupEditPlayer={this.hidePopupEditPlayer} /> 
        : null }
    </div>);
 	}
}

export default TabbedView;
