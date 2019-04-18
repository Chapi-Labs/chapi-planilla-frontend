import { Fragment } from 'react';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from '../components/Nav';

const Container = ({ title, subtitle, children }) => (
  <Fragment>
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
  </Fragment>
);

export default Container;