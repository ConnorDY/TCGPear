import React from "react";
import range from "lodash/range";

class PopupEditPlayer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleUpdatePlayer = this.handleUpdatePlayer.bind(this);
        this.handleDropPlayer = this.handleDropPlayer.bind(this);
    }

    handleUpdatePlayer()
    {
        this.props.onUpdatePlayer(
            this.pidInput.value,
            this.firstNameInput.value,
            this.lastNameInput.value
        );
    }

    handleDropPlayer()
    {
        this.props.onDropPlayer(this.pidInput.value);
    }

    render()
    {
        var styles = {};
        if (this.props.visible) styles.display = "block";

        var pid = this.props.pid;
        var firstName = "";
        var lastName = "";
        if (this.props.player)
        {
            firstName = this.props.player.firstName;
            lastName = this.props.player.lastName;
        }

        return(
            <div id="editPlayer" style={styles}>
                <div className="popupHeader">Update Player</div>
                <div className="inner">
                    <div className="spacer1"></div>
                    <input type="hidden" id="editPlayerID" defaultValue={pid} ref={(input) => { this.pidInput = input; }} />
                    First Name:&nbsp;
                    <input type="text" id="editPlayerFirstName" defaultValue={firstName} ref={(input) => { this.firstNameInput = input; }} />
                    <br className="tall" />
                    Last Name:&nbsp;
                    <input type="text" id="editPlayerLastName" defaultValue={lastName} ref={(input) => { this.lastNameInput = input; }} />
                    <br className="tall" />
                    <div className="spacer1"></div>
                    <center>
                        <input
                            type="button"
                            value="Update Info"
                            id="bUpdatePlayer"
                            onClick={this.handleUpdatePlayer} />
                        &nbsp;
                        <input
                            type="button"
                            value="Drop Player"
                            id="bDropPlayer"
                            onClick={this.handleDropPlayer} />
                    </center>
                </div>
                <div id="cancelEdit">
                    <input
                        type="button"
                        value="X"
                        id="bCancelEdit"
                        onClick={this.props.onHidePopupEditPlayer} />
                </div>
		    </div>
        );
    }
}

export default PopupEditPlayer;