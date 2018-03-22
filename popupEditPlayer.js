import React from "react";
import range from "lodash/range";

class PopupEditPlayer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleUpdatePlayer = this.handleUpdatePlayer.bind(this);
        this.handleDropPlayer = this.handleDropPlayer.bind(this);

        this.state = {
            firstName: "",
            lastName: ""
        };
    }

    handleUpdatePlayer()
    {
        this.props.onUpdatePlayer(
            this.props.pid,
            this.state.firstName,
            this.state.lastName
        );
    }

    handleDropPlayer()
    {
        this.props.onDropPlayer(this.props.pid);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            firstName: nextProps.player.firstName || "",
            lastName: nextProps.player.lastName || ""
        });
    }


    render()
    {
        var styles = {};
        if (this.props.visible) styles.display = "block";

        const { pid } = this.props;
        const { firstName, lastName } = this.state;

        return(
            <div id="editPlayer" style={styles}>
                <div className="popupHeader">Update Player</div>
                <div className="inner">
                    <div className="spacer1"></div>
                    First Name:&nbsp;
                    <input type="text" id="editPlayerFirstName" value={firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                    <br className="tall" />
                    Last Name:&nbsp;
                    <input type="text" id="editPlayerLastName" value={lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
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