import React from "react";
import range from "lodash/range";

class WindowEvent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.updateEventName = this.updateEventName.bind(this);
        this.updateNumRounds = this.updateNumRounds.bind(this);
        this.updateMatchType = this.updateMatchType.bind(this);
        this.state = {
            inputEventName: "",
            inputNumRounds: 1,
            inputMatchType: 0
        };
    }

    componentDidMount()
    {
      if (localStorage.length <= 0) return;
      if (localStorage.getItem("eventName") !== null) this.setState({inputEventName: localStorage.eventName});
      if (localStorage.getItem("numRounds") !== null) this.setState({inputNumRounds: localStorage.numRounds});
      if (localStorage.getItem("matchType") !== null) this.setState({inputMatchType: localStorage.matchType});
    }

    updateEventName(e)
    {
        this.setState({inputEventName: e.target.value});
        localStorage.eventName = e.target.value;
    }
    updateNumRounds(e)
    {
        this.setState({inputNumRounds: e.target.value});
        localStorage.numRounds = e.target.value;
    }
    updateMatchType(e)
    {
        this.setState({inputMatchType: e.target.value});
        localStorage.matchType = e.target.value;
    }

    render()
    {
        return(<div>
            Event Name: <input type="text" id="eventName" value={this.state.inputEventName} onChange={this.updateEventName} /><br className="tall" />
            Number of Rounds: <select id="numRounds" value={this.state.inputNumRounds} onChange={this.updateNumRounds}>
                {range(1, 30).map((i) => <option key={i-1} value={i}>{i}</option>)}
            </select><br className="tall" />
            Match Type:&nbsp;
            <select id="matchType" value={this.state.inputMatchType} onChange={this.updateMatchType}>
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

export default WindowEvent;