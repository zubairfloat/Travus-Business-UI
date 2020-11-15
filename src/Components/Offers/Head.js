import React from 'react';
import * as Constants from '../../Constants';
import './style.css';

const Head = () => {
  return (
    <div>
      <div className="searchHeading">
        <div className="insideSearch">
          <h1>{Constants.OUR_OFFERING}</h1>
        </div>
      </div>
      <div className="offerHeadP">
        <h1>{Constants.EXCEPTEUR_CUPIDATAT}</h1>
      </div>
      <div className="offerHeadh">
        <h2>{Constants.EXCEPTEUR_CUPIDATAT_PROIDENT}</h2>
      </div>
    </div>
  );
};
export default Head;
