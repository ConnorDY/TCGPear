import React from "react";

const Players = ({ players }) => players.map((player, i) => (
    <tr id={"p"+i} key={i}>
    <td>{player.firstName+" "+player.lastName}</td>
    <td>
        <input
            className="bEditPlayer"
            id={"bEditP"+i}
            type="button"
            value="Edit/Drop" />
    </td>
</tr>
));

export default Players;