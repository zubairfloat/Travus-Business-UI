import * as React from "react";
import  EmailVerifyModal  from "./verification";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import * as authActions from '../../MyStore/actions/authActions';

// import history from "history";
// import { User } from "../../redux/users/types";
import "./style.css";
// import { verifyEmail } from "../../redux/users/actions";

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
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
  handleInputChange = (code) => {
    this.setState({ code });
  };
  verifyEmail = () => {
      let token = this.state.code
    this.props.TokenCode(token);
    this.props.history.push("/explore");
  };
  render() {
    return (
      <Container fluid={true}>
        <Row className="mainContiner">
          <>
            <Col xs="12" className="formContainer">
              <Row className="formWrapper">
                <Col xs="12">
                  <EmailVerifyModal
                    modal={this.state.modal}
                    setModal={() => {
                      this.setState({ modal: false });
                      this.props.history.push("/explore");
                    }}
                    onChange={this.handleInputChange}
                    onSubmit={this.verifyEmail}
                    loading={this.props.auth?.loading}
                    code={this.state.code}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    TokenCode: token => dispatch(authActions.TokenCode(token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);