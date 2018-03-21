import React from "react";
import { render }  from "react-dom";

class Players extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        var players = [];
        for (var i = 0; i < this.props.players.length; i++)
        {
            const player = this.props.players[i];
            players.push(
                <tr id={"p"+i} key={i}>
                    <td>{player["firstName"]+" "+player["lastName"]}</td>
                    <td>
                        <input
                            className="bEditPlayer"
                            id={"bEditP"+i}
                            type="button"
                            value="Edit/Drop" />
                    </td>
                </tr>
            );
        }

        return(<tbody>
            {players}
        </tbody>);
    }
}

export { Players };