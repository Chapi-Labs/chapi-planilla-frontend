import Signup from '../components/SignUp';
import SignIn from '../components/SignIn';

const SignupPage = props => (
  <div>
    <SignIn>
      <Signup />
    </SignIn>
  </div>
);

export default SignupPage;