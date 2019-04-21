import Container from "../components/Container";
import Employee from "../components/Employee";

const EmployeePage = (props) => (
  <Container title="Crear Colaborador" subtitle="Colaborador">
    <Employee {...props}/>
  </Container>
);

export default EmployeePage;
