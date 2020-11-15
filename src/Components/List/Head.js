import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import * as Constants from '../../Constants';

const HeadList = () => {
  return (
    <div>
      <div className="searchHeading">
        <div className="insideSearch">
          <h1>{Constants.LIST_YOUR_BUSINESS}</h1>
        </div>
      </div>
      <div className="listHeadP">
        <h1>{Constants.EXCEPTEUR_SINT_OCCAECAT}</h1>
      </div>
      <div className="listHeadClick">
      <Link style={{ color: 'white' }} to="/claim">
        <h2>{Constants.ALL_READAY_LISTED}</h2>
        </Link>
      </div>
    </div>
  );
};
export default HeadList;
