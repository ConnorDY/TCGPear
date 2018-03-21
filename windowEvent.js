import React from "react";
import { render }  from "react-dom";

class WindowEvent extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        var roundOptions = [];
        for (var i = 1; i <= 30; i++)
        {
            roundOptions.push(<option key={i-1} value={i}>{i}</option>);
        }

        return(<div>
            Event Name: <input type="text" id="eventName" /><br className="tall" />
            Number of Rounds: <select id="numRounds">{roundOptions}</select><br className="tall" />
            Match Type:
            <select id="matchType">
                <option value="0">1v1</option>
                <option value="1">Free-for-All</option>
                <option value="2">Teams</option>
            </select><br className="tall" />
            <div id="defaultTeamPodSize">
                Default Team/Pod Size: <select id="podSize"></select>
            </div>
        </div>);
    }
}

export { WindowEvent };