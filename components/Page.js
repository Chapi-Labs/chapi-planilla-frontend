import Head from './head';
import SignIn from './SignIn';

const Page = props => (
    <div>
        <Head title="Home" />
        <SignIn>
            {props.children}
        </SignIn>
    </div>
);

export default Page;