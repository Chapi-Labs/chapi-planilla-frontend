import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../components/User';
import Login from './Login';

const SignIn = props => (
    <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (data == null || !data.me) {
        return <p>s</p>
    
      }
      return props.children;
    }}
    </Query>
);

export default SignIn;