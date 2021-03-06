import React, { Component } from "react";
import Link from "next/link";

class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card mini-stat bg-primary text-white">
            <div className="card-body">
              <div className="mb-4">
                <div className="float-left mini-stat-img mr-4">
                  <img
                    src="../static/assets/images/services-icon/01.png"
                    alt="nice"
                  />
                </div>
                <h5 className="font-16 text-uppercase mt-0 text-white-50">
                  Empresas
                </h5>
                <h4 className="font-500">
                  1,685 <i className="mdi mdi-arrow-up text-success ml-2" />
                </h4>
                <div className="mini-stat-label bg-success">
                  <p className="mb-0">+ 12%</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="float-right text-white-50">
                  <Link href="#">
                    <i className="mdi mdi-arrow-right h5" />
                  </Link>
                </div>

                <p className="text-white-50 mb-0">Since last month</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card mini-stat bg-primary text-white">
            <div className="card-body">
              <div className="mb-4">
                <div className="float-left mini-stat-img mr-4">
                  <img
                    src="../static/assets/images/services-icon/02.png"
                    alt=""
                  />
                </div>
                <h5 className="font-16 text-uppercase mt-0 text-white-50">
                  Colaboradores
                </h5>
                <h4 className="font-500">
                  52,368 <i className="mdi mdi-arrow-down text-danger ml-2" />
                </h4>
                <div className="mini-stat-label bg-danger">
                  <p className="mb-0">- 28%</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="float-right text-white-50">
                  <Link href="#">
                    <i className="mdi mdi-arrow-right h5" />
                  </Link>
                </div>

                <p className="text-white-50 mb-0">Since last month</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card mini-stat bg-primary text-white">
            <div className="card-body">
              <div className="mb-4">
                <div className="float-left mini-stat-img mr-4">
                  <img
                    src="../static/assets/images/services-icon/03.png"
                    alt=""
                  />
                </div>
                <h5 className="font-16 text-uppercase mt-0 text-white-50">
                  Mes Actual
                </h5>
                <h4 className="font-500">
                  15.8 <i className="mdi mdi-arrow-up text-success ml-2" />
                </h4>
                <div className="mini-stat-label bg-info">
                  <p className="mb-0"> 00%</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="float-right text-white-50">
                  <Link href="#">
                    <i className="mdi mdi-arrow-right h5" />
                  </Link>
                </div>

                <p className="text-white-50 mb-0">Since last month</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card mini-stat bg-primary text-white">
            <div className="card-body">
              <div className="mb-4">
                <div className="float-left mini-stat-img mr-4">
                  <img
                    src="../static/assets/images/services-icon/04.png"
                    alt=""
                  />
                </div>
                <h5 className="font-16 text-uppercase mt-0 text-white-50">
                  Product Sold
                </h5>
                <h4 className="font-500">
                  2436 <i className="mdi mdi-arrow-up text-success ml-2" />
                </h4>
                <div className="mini-stat-label bg-warning">
                  <p className="mb-0">+ 84%</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="float-right text-white-50">
                  <Link href="#">
                    <i className="mdi mdi-arrow-right h5" />
                  </Link>
                </div>

                <p className="text-white-50 mb-0">Since last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
