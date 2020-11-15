import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Container } from 'reactstrap';
import { FaBed } from 'react-icons/fa';
import './style.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <Container className="tourDetails" fluid={true}>
                    <Row>
                        <Col xl="6">
                            <Row className="tourDetailFlight">
                                <h1>Flight Information</h1>
                            </Row>
                            <Row className="tourDetailFlightRow">
                                <Col md="6">
                                    <Row>
                                        <Col md="6">
                                            <Row className="tourDetailRowFlight">
                                                <h2 >Flight 1</h2>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>

                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" style={{ padding: "20px 0px 0px 30px" }}>
                                            <Row>
                                                <h3>From:</h3>
                                            </Row>
                                            <Row>
                                                <h3>To:</h3>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>

                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" style={{ padding: "20px 0px 0px 30px" }}>
                                            <Row>
                                                <h3>Departure Time:</h3>
                                            </Row>
                                            <Row>
                                                <h3>Arrival Time:</h3>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>

                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" style={{ padding: "20px 0px 0px 30px" }}>
                                            <Row>
                                                <h3>Seat Number:</h3>
                                            </Row>
                                            <Row>
                                                <h3>Booking Reference:</h3>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>

                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="6">
                                    <Row>
                                        <Col md="6">
                                            <Row className="tourDetailRowFlight">
                                                <h2 className="tourDetailFlightH1">Flight 2</h2>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>

                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" style={{ padding: "20px 0px 0px 30px" }}>
                                            <Row>
                                                <h3>From:</h3>
                                            </Row>
                                            <Row>
                                                <h3>To:</h3>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>

                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" style={{ padding: "20px 0px 0px 30px" }}>
                                            <Row>
                                                <h3>Departure Time:</h3>
                                            </Row>
                                            <Row>
                                                <h3>Arrival Time:</h3>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" style={{ padding: "20px 0px 0px 30px" }}>
                                            <Row>
                                                <h3>Seat Number:</h3>
                                            </Row>
                                            <Row>
                                                <h3>Booking Reference:</h3>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl="6">
                            <Row className="tourDetailFlight">
                                <h1>Lodging Information</h1>
                            </Row>
                            <Row style={{margin: '20px'}}>
                                <Col md="6">
                                    <Row>
                                        <Col md="6" style={{ padding: "20px 0px 0px 30px" }}>
                                            <Row>
                                                <h3>Check In:</h3>
                                            </Row>
                                            <Row>
                                                <h3>Check out:</h3>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" style={{ padding: "20px 0px 0px 30px" }}>
                                            <Row>
                                                <h3>Address::</h3>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" style={{ padding: "20px 0px 0px 30px" }}>
                                            <Row>
                                                <h3>Phone Number:</h3>
                                            </Row>
                                            <Row>
                                                <h3>Booking Reference::</h3>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>

                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="tourDetailIConBlurDiv"  md="6">
                                    <div className="tourLoadGoingIcon">
                                        <FaBed className="tourLoadIcon" />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Details);
