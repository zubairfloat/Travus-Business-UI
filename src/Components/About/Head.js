import React from 'react';
import * as Constants from '../../Constants';
import './style.css';

const About = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (

    <div>
      <div className="about">
        <div className="searchHeading">
          <div className="aboutheading">
            <h1>{Constants.OUR_STORY}</h1>
          </div>
        </div>
        <div className="aboutHeadP">
          <h1>{Constants.BLACK_PEOPLE_TRAVEL}</h1>
        </div>
        <div className="aboutHeadClick">
          <h2>{Constants.LOREM_IPSUM_DOLOR}</h2>
        </div>
        <div className="aboutReadMore">
          <h2>{Constants.READ_MORE}</h2>
        </div>
        {/* <div className="searchHeading">
        <div className="aboutheading">
          <h1>{Constants.THE_TEAM}</h1>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default About;