import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from '../components/Nav';
import SignIn from '../components/SignIn';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

// Add all icons to the library so you can use it in your page
library.add(fas, far);

const Container = ({ title, subtitle, children }) => (
  <SignIn>
    <Nav />
    <div className="wrapper">
      <div className="container-fluid">
        <div className="page-title-box">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h4 className="page-title">{subtitle}</h4>
              <ol className="breadcrumb">
                <li>
                  <Link href="/">
                    <a>Inicio</a>
                  </Link>
                </li>
                <li>
                  <FontAwesomeIcon icon="chevron-right" />
                  {title}
                </li>
              </ol>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  </SignIn>
);

export default Container;