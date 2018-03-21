import React from "react";
import { render }  from "react-dom";

class WindowPlayers extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleAddPlayer = this.handleAddPlayer.bind(this);
        this.updateInputFirstName = this.updateInputFirstName.bind(this);
        this.updateInputLastName = this.updateInputLastName.bind(this);
        this.state = {
            inputFirstName: "",
            inputLastName: ""
        };
    }

    handleAddPlayer()
    {
        if (this.state.inputFirstName.trim() == "" || this.state.inputLastName.trim() == "") return 0;

        this.props.onAddPlayer(this.state.inputFirstName, this.state.inputLastName);
        this.setState({
            inputFirstName: "",
            inputLastName: ""
        });
    }

    updateInputFirstName(e) {this.setState({inputFirstName: e.target.value});}
    updateInputLastName(e) {this.setState({inputLastName: e.target.value});}

    render()
    {
        return (
            <table><tbody><tr>
                <td id="addPlayer" valign="top">
                    <b>Add Player:</b><br className="tall" />
                    First Name:
                    <input type="text" id="playerFirstName" value={this.state.inputFirstName} onChange={this.updateInputFirstName} />
                    <br className="tall" />
                    Last Name:
                    <input type="text" id="playerLastName" value={this.state.inputLastName} onChange={this.updateInputLastName} />
                    <br className="tall" />
                    <input type="button" value="Add" id="bAddPlayer" onClick={this.handleAddPlayer} />
                </td>
                <td id="playerList" valign="top">
                    <table id="playerListTable">
                        <thead>
                            <tr><th colSpan="2">Current Players</th></tr>
                        </thead>
                        {this.props.players}
                    </table>
                </td>
            </tr></tbody></table>
        );
    }
}

export { WindowPlayers };