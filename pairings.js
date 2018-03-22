import React from "react";

const Pairings = ({ pairings }) => pairings.map((pairing, i) => (
    <tr key={i}>
        <td>{i+1}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
));

export default Pairings;