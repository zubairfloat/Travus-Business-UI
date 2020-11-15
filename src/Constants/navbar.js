import ClaimPage from '../Components/Account/Claim';
import GetList from '../Components/List';
import About from '../Components/About/Head';
import OurOffering from '../Components/Offers';
import Profile from '../Components/Profile';

import Explore from '../Components/Explore/explore';
import Plan from '../Components/Plan';
import Home from '../Components/Home/section';
import TripPlan from '../Components/TripPlan';
import ViewProfile from '../Components/ViewProfile';
import VerifyEmail from '../Components/Verify/container';
import PasswordReset from '../Components/passwordReset/container';
import Tour from '../Components/Tour';
import Signin from '../Components/SignIn';
import Signup from '../Components/SignUp';

export const navbarRoutes = [
  { name: 'Explore', routes: '/explore' },
  // { name: 'Profile', routes: '/profile' },
  // { name: 'About', routes: '/about' },
  { name: 'Account', routes: '/signin' },
  { name: 'Plan', routes: '/plan' }
];

// { path: '/', component: Home  },
export const appRoutes = [
  { path: '/', component: Home },
  { path: '/claim', component: ClaimPage },
  { path: '/listed', component: GetList },
  { path: '/about', component: About },
  { path: '/offering', component: OurOffering },
  { path: '/profile', component: Profile },
  { path: '/explore', component: Explore },
  { path: '/trip', component: Plan },
  { path: '/plan', component: TripPlan },
  { path: '/viewprofile', component: ViewProfile },
  { path: '/VerifyEmail', component: VerifyEmail },
  { path: '/reset', component: PasswordReset },
  // { path: '/tour' , component: Tour},


  //my new 
  { path: '/signin', component: Signin },
  { path: '/signup', component: Signup }
];
