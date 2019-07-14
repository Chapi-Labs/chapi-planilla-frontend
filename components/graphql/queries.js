
import gql from 'graphql-tag';

const LIST_EMPLOYEE = gql`
  query LIST_EMPLOYEE {
    employees {
      id
      first_name
      last_name
      legal_id
      email
      base_salary
      company {
        name
      }
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
      frequency
    }
  }
`

const LIST_COMPANIES = gql`
  query LIST_COMPANIES {
    companiesList {
      id
      name
      professional_risk
      createdAt
    }
  }
`;

const SELECT_PAYROLL_TYPE = gql`
  query SELECT_PAYROLL_TYPE {
    payrollTypeSelect {
      id
      value
      label
    }
  }
`;

const FIND_EMPLOYEES = gql`
  query FIND_EMPLOYEES (
    $company_id: String!
  ) {
    findEmployee(company_id: $company_id) {
      id
      first_name
      last_name
      legal_id
      email
      active
      base_salary
      hourly_rate
      payroll {
        name
        frequency
      }
    }
  }
`;

const LIST_FIELDS = gql`
  query LIST_FIELDS($category: String!) {
    payrollTypes(category: $category) {
      id
      name
      type
      operator
      category
      value
      operational_value
      calculated_value
      order
    }
  }
`;

export {
  COMPANY_QUERY,
  FIND_EMPLOYEES,
  LIST_COMPANIES,
  LIST_EMPLOYEE,
  LIST_FIELDS,
  SELECT_COMPANY_QUERY,
  SELECT_EMPLOYEE_LIST,
  SELECT_PAYROLL_CONFIG,
  SELECT_PAYROLL_TYPE,
};