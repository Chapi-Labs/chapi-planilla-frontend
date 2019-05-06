
import gql from 'graphql-tag';

const LIST_EMPLOYEE = gql`
  query LIST_EMPLOYEE {
    employees {
      id
      first_name
      last_name
      email
    }
  }
`;
const COMPANY_QUERY = gql`
  query COMPANY_QUERY {
    companies(where: { active: true }) {
      id
      value
      label
    }
  }
`
const SELECT_COMPANY_QUERY = gql`
  query SELECT_COMPANY_QUERY {
    companies(where: { active: true }) {
      id
      value
      label
    }
  }
`

const SELECT_EMPLOYEE_LIST = gql`
  query SELECT_EMPLOYEE_LIST {
    employeesSelect {
      id
      value
      label
    }
  }
`;

const SELECT_PAYROLL_CONFIG = gql`
  query SELECT_PAYROLL_CONFIG {
    payrollConfigSelect {
      id
      value
      label
    }
  }
`

export {
  COMPANY_QUERY,
  LIST_EMPLOYEE,
  SELECT_EMPLOYEE_LIST,
  SELECT_COMPANY_QUERY,
  SELECT_PAYROLL_CONFIG,
};