import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import Nav from '../components/Nav';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import Editable from 'react-x-editable';
import gql from 'graphql-tag';

const EMPLOYEE_MUTATION = gql`
  mutation EMPLOYEE_MUTATION(
    $first_name: String!
    $last_name: String!
    $email: String!
  ) {
    createEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
    ) {
      id
      email
    }
  }
`;
const data = {
    columns: [
        {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Position',
            field: 'position',
            sort: 'asc',
            width: 270
        },
        {
            label: 'Office',
            field: 'office',
            sort: 'asc',
            width: 200
        },
        {
            label: 'Age',
            field: 'age',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Start date',
            field: 'date',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Salary',
            field: 'salary',
            sort: 'asc',
            width: 100
        }
    ],
    rows: [
        {
            name: <Editable dataType="text" mode="inline" value="LOL" />,
            position: 'Senior Javascript Developer',
            office: 'Edinburgh',
            age: '22',
            date: '2012/03/29',
            salary: <Editable dataType="text" mode="inline" value="d" />
        }
    ]
};
class EmployeeList extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <Nav />
        <div className="wrapper">
          <div className="container-fluid">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h4 className="page-title">Crear Colaborador</h4>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">
                        <a>Inicio</a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Colaborador</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <h4 className="mt-0 header-title">Default Datatable</h4>
                            <p className="text-muted m-b-30">DataTables has most features enabled by
                                default, so all you need to do to use it with your own tables is to call
                            the construction function: <code>$().DataTable();</code>.
                        </p>

                            <MDBDataTable
                                bordered
                                hover
                                search={"props.value"}
                                data={data}
                            />
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeList;
