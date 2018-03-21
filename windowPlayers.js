import React from "react";
import { render }  from "react-dom";

class WindowPlayers extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <table><tbody><tr>
                <td id="addPlayer" valign="top">
                    <b>Add Player:</b><br className="tall" />
                    First Name: <input type="text" id="playerFirstName" /><br className="tall" />
                    Last Name: <input type="text" id="playerLastName" /><br className="tall" />
                    <input type="button" value="Add" id="bAddPlayer" />
                </td>
                <td id="playerList" valign="top">
                    <table id="playerListTable">
                        <thead>
                            <tr><th colSpan="2">Current Players</th></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </td>
            </tr></tbody></table>
        );
    }
}

export { WindowPlayers };