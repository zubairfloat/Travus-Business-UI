import * as React from "react";
import  EmailVerifyModal  from "./verification";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import * as authActions from '../../MyStore/actions/authActions';
import "./style.css";

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      password: "",
      modal: true,
    };
  }
  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      this.setState({ code });
    }
  }
  componentWillReceiveProps(props) {
    if (props.auth.resetPassword && this.props.auth.resetPassword !== props.auth.resetPassword) {
      this.props.history.push("/explore");
    }
  }
  handleInputChange = (code) => {
    this.setState({ code });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  verifyEmail = () => {
    let reset = {
      code: this.state.code,
      password: this.state.password
    }
    this.props.resetPassword(reset);
  };
  render() {
    return (
      <Container fluid={true}>
        <Row className="mainContiner">
          <>
            <Col xs="12"  className="formContainer">
              <Row className="formWrapper">
                <Col xs="12"  className="">
                  <EmailVerifyModal
                    modal={this.state.modal}
                    setModal={() => {
                      this.setState({ modal: false });
                      this.props.history.push("/explore");
                    }}
                    onChange={this.handleInputChange}
                    onPasswordChange={this.handlePasswordChange}
                    onSubmit={this.verifyEmail}
                    loading={this.props.auth?.loading}
                    code={this.state.code}
                    password={this.state.password}
                  />
                </Col>
              </Row>
            </Col>
          </>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    resetPassword: state.auth.resetPassword
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: reset => dispatch(authActions.resetPassword(reset))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);