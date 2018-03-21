import React from "react"
import { render }  from "react-dom";

class WindowEvent extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(<div>
            Event Name: <input type="text" id="eventName" /><br class="tall" />
            Number of Rounds: <select id="numRounds"></select><br class="tall" />
            Match Type:
            <select id="matchType">
                <option value="0">1v1</option>
                <option value="1">Free-for-All</option>
                <option value="2">Teams</option>
            </select><br class="tall" />
            <div id="defaultTeamPodSize">
                Default Team/Pod Size: <select id="podSize"></select>
            </div>
        </div>);
    }
}

export { WindowEvent };