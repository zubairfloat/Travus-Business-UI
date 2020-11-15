import React from 'react';
import Head from './head';
import Profileabout from './about';
import Review from './Review';

const Profile = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="profile">
        <Head />
        <Profileabout />
        <Review />
      </div>
    </div>
  );
};
export default Profile;
