import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../components/User';
import Login from '../components/Login';
import Loading from '../components/Loading';
const SignIn = props => (
    <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <Login loading={loading}/>;
      if (data == null || !data.me) {
        return <Login/>
      }
      return props.children;
    }}
    </Query>
);

export default SignIn;