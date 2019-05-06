import gql from 'graphql-tag';

const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UPDATE_EMPLOYEE_MUTATION(
    $id: ID!
    $first_name: String
    $last_name: String
    $email: String
  ) {
    updateEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
    ) {
      id
      first_name
      last_name
      email
    }
  }
`;

const COMPANY_MUTATION = gql`
  mutation COMPANY_MUTATION(
    $name: String!
  ) {
    createCompany(
      name: $name
    ) {
      id
      name
    }
  }
`;

const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CREATE_EMPLOYEE_MUTATION(
    $first_name: String!
    $last_name: String!
    $email: String!
    $hire_date: String
    $legal_id: String!
    $base_salary: Float
    $company_id: String
    $frequency: String
  ) {
    createEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
      base_salary: $base_salary
      legal_id: $legal_id
      company: $company_id
      hire_date: $hire_date
      payroll_frequency: $frequency
    ) {
      id
      email
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;


const CREATE_PAYROLL_MUTATION = gql`
  mutation CREATE_PAYROLL_MUTATION(
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

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

export {
  COMPANY_MUTATION,
  CREATE_EMPLOYEE_MUTATION,
  CREATE_PAYROLL_MUTATION,
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
  UPDATE_EMPLOYEE_MUTATION,
};