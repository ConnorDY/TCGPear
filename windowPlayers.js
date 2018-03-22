import $ from "jquery";
import React from "react";
import Players from "./players";

class WindowPlayers extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleAddPlayer = this.handleAddPlayer.bind(this);
        this.handleEditPlayer = this.handleEditPlayer.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleAddPlayer()
    {
        if (this.firstNameInput.value.trim() == "" || this.lastNameInput.value.trim() == "") return 0;

        this.props.onAddPlayer(
            this.firstNameInput.value,
            this.lastNameInput.value
        );

        this.firstNameInput.value = "";
        this.lastNameInput.value = "";

        $("#playerFirstName").focus();
    }

    handleEditPlayer(id)
    {
        this.props.onShowPopupEditPlayer(id);
    }

    handleKeyPress(e)
    {
        if (e.which == 13) this.handleAddPlayer();
    }

    render()
    {
        const { players } = this.props;
        return (
            <table><tbody><tr>
                <td id="addPlayer" valign="top">
                    <b>Add Player:</b><br className="tall" />
                    First Name:&nbsp;
                    <input type="text" id="playerFirstName" ref={(input) => { this.firstNameInput = input; }} />
                    <br className="tall" />
                    Last Name:&nbsp;
                    <input type="text" id="playerLastName" ref={(input) => { this.lastNameInput = input; }} onKeyUp={this.handleKeyPress} />
                    <br className="tall" />
                    <input type="button" value="Add" id="bAddPlayer" onClick={this.handleAddPlayer} />
                </td>
                <td id="playerList" valign="top">
                    <table id="playerListTable">
                        <thead>
                            <tr><th colSpan="2">Current Players</th></tr>
                        </thead>
                        <tbody>
                            <Players players={players} handleEditPlayer={this.handleEditPlayer}/>
                        </tbody>
                    </table>
                </td>
            </tr></tbody></table>
        );
    }
}

export default WindowPlayers;