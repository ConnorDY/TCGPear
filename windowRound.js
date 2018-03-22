import React from "react";
import Pairings from "./pairings"

class WindowRound extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const { pairings } = this.props;
        return (<div>
            <div id="roundStep1">
                <input
                    type="button"
                    id="bCreatePairings"
                    value="Create Pairings"
                    onClick={this.props.onCreatePairings} />
                &nbsp;
                <input
                    type="button"
                    id="beCreatePairingsManual"
                    value="Create Pairings Manually" />
            </div>
            <br className="tall" />
            <table id="pairings">
                <thead>
                    <tr>
                        <th>Table #</th>
                        <th>Player 1</th>
                        <th>Player 1 Result</th>
                        <th>Player 2</th>
                        <th>Player 2 Result</th>
                    </tr>
                </thead>
                <tbody>
                    <Pairings pairings={pairings}/>
                </tbody>
            </table>
            <br className="tall" />
            <table id="reportResults"><tbody>
                <tr>
                    <td id="reportName1">Player 1</td>
                    <td><input type="number" id="reportNum1" defaultValue="0" /></td>
                    <td rowSpan="2" className="tReportResult"><button type="button" id="bRep0" className="bReportResult">2<br />0</button></td>
                    <td rowSpan="2" className="tReportResult"><button type="button" id="bRep1" className="bReportResult">2<br />1</button></td>
                    <td rowSpan="2" className="tReportResult"><button type="button" id="bRep2" className="bReportResult">1<br />1</button></td>
                    <td rowSpan="2" className="tReportResult"><button type="button" id="bRep3" className="bReportResult">1<br />0</button></td>
                    <td rowSpan="2" className="tReportResult"><button type="button" id="bRep4" className="bReportResult">0<br />0</button></td>
                    <td rowSpan="2" className="tReportResult"><button type="button" id="bRep5" className="bReportResult">0<br />1</button></td>
                    <td rowSpan="2" className="tReportResult"><button type="button" id="bRep6" className="bReportResult">1<br />2</button></td>
                    <td rowSpan="2" className="tReportResult"><button type="button" id="bRep7" className="bReportResult">0<br />2</button></td>
                </tr>
                <tr>
                    <td id="reportName2">Player 2</td>
                    <td><input type="number" id="reportNum2" defaultValue="0" /></td>
                </tr>
            </tbody></table>
        </div>);
    }
}

export default WindowRound;