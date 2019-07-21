import PayrollList from "../components/PayrollList";
import Container from "../components/Container";

const ListPayroll = (props) => (
  <Container title="Listar Nóminas" subtitle="Nóminas">
    <PayrollList {...props}/>
  </Container>
);

export default ListPayroll;
