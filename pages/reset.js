import Link from 'next/link';

import RequestReset from '../components/RequestReset';
import ResetPassword from '../components/Reset';
import Container from "../components/Container";

const Reset = (props) => (
    <div className="wrapper-page">
      <div className="card overflow-hidden account-card mx-3">
        <div className="bg-primary p-4 text-white text-center position-relative">
          <h4 className="font-20 m-b-5">Recuperar Contraseña</h4>
          <p className="text-white-50 mb-4">Chapi Planilla</p>
          <div className="logo logo-admin">
            <Link href="/">
              <img
                src="../static/assets/images/logo-sm.png"
                height="50"
                alt="logo"
              />
            </Link>
          </div>
        </div>
        <div className="account-card-content">
          {!props.resetToken && <RequestReset {...props}/>}
          {props.resetToken && <ResetPassword {...props}/>}
        </div>
    </div>
  </div>
);

Reset.getInitialProps = async ({ query }) => {
  return { resetToken: query.resetToken ? query.resetToken : null };
};

export default Reset;