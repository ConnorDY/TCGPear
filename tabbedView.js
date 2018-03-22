import React from "react";
import Tab from "./tab";
import Window from "./window";
import WindowEvent from "./windowEvent";
import WindowPlayers from "./windowPlayers";
import WindowRound from "./windowRound";
import PopupEditPlayer from "./popupEditPlayer";
import { shuffle } from "./misc";

class TabbedView extends React.Component
{
  constructor(props)
  {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.changeMatchType = this.changeMatchType.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.editPlayer = this.editPlayer.bind(this);
    this.dropPlayer = this.dropPlayer.bind(this);
    this.createPairings = this.createPairings.bind(this);
    this.showPopupEditPlayer = this.showPopupEditPlayer.bind(this);
    this.hidePopupEditPlayer = this.hidePopupEditPlayer.bind(this);
    this.closeSession = this.closeSession.bind(this);
    this.state = {
      currentTab: 0,
      players: [],
      popupEditPlayerIsVis: false,
      popupEditPlayerPID: 0,
      matchType: 0,
      currentRound: 0,
      rounds: []
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
    this.setState({currentTab: tab});
    localStorage.currentTab = tab;
  }

  changeMatchType(type)
  {
    this.setState({matchType: type});
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

  createPairings()
  {
    /*
    * Pairing array structure
    * 0: team size (1, 2, 3, etc.)
    * 1: team 1 list
    * 2: team 2	list
    * 3: team 1 score
    * 4: team 2 score
    */

    var newRound = [];
    console.log("Round "+(this.state.currentRound+1)+" pairings:");

    switch(this.state.matchType)
    {
      // 1v1
      default:
        if (this.state.currentRound == 0)
        {
          var playersRandomized = this.state.players.slice(0);
          for (var i = 0; i < playersRandomized.length; i++) playersRandomized[i].pid = i;

          playersRandomized = shuffle(playersRandomized);
          for (var i = 0; i < playersRandomized.length; i += 2)
          {
            var p1 = playersRandomized[i].pid;
            var p2 = null;
            if (i+1 < playersRandomized.length) p2 = playersRandomized[i+1].pid;

            var pairing = [
              1,
              [p1],
              [p2],
              null,
              null
            ];

            console.log(pairing);
            newRound.push(pairing);
          }
        }
        else
        {

        }
    }

    var newRoundsArray = this.state.rounds.concat([newRound]);

    //displayPairings(currentRound);
    this.setState({
      currentRound: this.state.currentRound+1,
      rounds: newRoundsArray
    });
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
    let pairings = [];
    if (this.state.currentRound > 0) pairings = this.state.rounds[this.state.currentRound-1];

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
          isActive={this.state.currentTab == 0}
          onChangeMatchType={this.changeMatchType}>
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
        <Window
          name="tabRound"
          isActive={this.state.currentTab == 2}>
          <WindowRound
            pairings={pairings}
            onCreatePairings={this.createPairings} />
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
