import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody } from 'reactstrap';
import * as Constants from '../../Constants';

class CardExplore extends Component{
  
  render() {
    let trending = this.props.trendings;
    return(
      <div className="cardExplore">
      <Card>
        <CardImg top width="100%" style={{height: '250px'}} src={`${trending.prefix}${'680x400'}${trending.suffiex}`}  alt="Card image cap" />
        <CardBody className="text-center">
          <CardTitle>
            <h1>{trending.businessName}</h1>
          </CardTitle>
          <h4>{Constants.EXPLORE_LOREM_IPSUM}</h4>
        </CardBody>
      </Card>
    </div>
    )

  }

}

export default (CardExplore);
