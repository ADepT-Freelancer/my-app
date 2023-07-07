import React, { ChangeEvent } from "react";

type PropsType = {
  status: string | null;
  updateStatus: (newStatus: string | null) => void;
};

type StateType = {
  editMode: boolean;
  status: string | null ;
};

class ProfileStatus extends React.Component<PropsType, StateType> {
  statusInputRef = React.createRef();

  state: StateType = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({ editMode: true });
  };
  deactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateStatus(this.state.status);
  };
  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
      console.log(" componentDidUpdate");
    }
  }

  render() {
    console.log("render status");
    return (
      <section data-fp-section="" className="page__main main-section">
        {!this.state.editMode && (
          <div onDoubleClick={this.activateEditMode}>
            <span>{this.props.status || "-----"}</span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              title="status"
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.props.status || "-----"}
            />
          </div>
        )}
      </section>
    );
  }
}

export default ProfileStatus;
