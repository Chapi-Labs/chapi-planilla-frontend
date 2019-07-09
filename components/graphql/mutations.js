import gql from 'graphql-tag';

const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UPDATE_EMPLOYEE_MUTATION(
    $id: ID!
    $first_name: String
    $last_name: String
    $email: String
    $base_salary: Float
    $company_name: String
  ) {
    updateEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
      base_salary: $base_salary
      company: $company_name
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
    $professional_risk: Float
  ) {
    createCompany(
      name: $name
      professional_risk: $professional_risk
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
    $weekly_hours: Int
    $spouse: Boolean
  ) {
    createEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
      base_salary: $base_salary
      legal_id: $legal_id
      company: $company_id
      hire_date: $hire_date
      spouse: $spouse
      weekly_hours: $weekly_hours
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

const UPDATE_COMPANY_MUTATION = gql`
  mutation UPDATE_COMPANY_MUTATION($name: String!) {
    updateCompany(name: $name) {
      id
      name
    }
  }
`;


const CREATE_PAYROLL_MUTATION = gql`
  mutation CREATE_PAYROLL_MUTATION(
    $name: String!
    $company: String!
    $frequency: String!
    $date_start: String!
    $date_end: String!
  ) {
    createPayrollRegistry(
      name: $name
      company: $company
      frequency: $frequency
      date_start: $date_start
      date_end: $date_end
    ) {
      id
      name
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

const CREATE_PAYROLL_TYPE_MUTATION = gql`
  mutation CREATE_PAYROLL_TYPE_MUTATION(
    $name: String!
    $type: String!
    $category: String
    $operator: String!
    $value: Float
    $order: Float
  ) {
    createPayrollType(
      name: $name
      type: $type
      category: $category
      operator: $operator
      value: $value
      order: $order
    ) {
      id
      name
    }
  }
`;

export {
  COMPANY_MUTATION,
  CREATE_EMPLOYEE_MUTATION,
  CREATE_PAYROLL_MUTATION,
  CREATE_PAYROLL_TYPE_MUTATION,
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
  UPDATE_COMPANY_MUTATION,
  UPDATE_EMPLOYEE_MUTATION,
};