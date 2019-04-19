import PayrollForm from "../components/PayrollForm";
import Container from "../components/Container";

const NewPayroll = (props) => (
  <Container title="Crear Nómina" subtitle="Nónimna">
    <PayrollForm {...props}/>
  </Container>
);

export default NewPayroll;
