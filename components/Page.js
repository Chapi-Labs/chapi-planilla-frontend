import Head from './Header';
import SignIn from './SignIn';

const Page = props => (
    <div>
        <Head title="Chapi Planilla" />
        <SignIn>
            {props.children}
        </SignIn>
    </div>
);

export default Page;