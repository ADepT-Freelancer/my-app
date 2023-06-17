import React from "react";
// import Preloader from "./../../../common/preloader/preloader";

class ProfileStatus extends React.Component {
  // if (!this.props.status) {    return <Preloader />;  }
  statusInputRef = React.createRef();

  state = {
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
  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
      console.log(" componentDidUpdate");
    }
  }

  render() {
    console.log("render");
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
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </section>
    );
  }
}

export default ProfileStatus;
