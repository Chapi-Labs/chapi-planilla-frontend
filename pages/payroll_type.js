import PayrollType from "../components/PayrollTypeForm";
import Container from "../components/Container";

const NewPayrollType = props => (
  <Container title="Crear Configuración" subtitle="Configuración">
    <PayrollType {...props} />
  </Container>
);

export default NewPayrollType;
