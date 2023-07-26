import Image from "next/image";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const NavBar = (props) => {
  return (
    <Navbar variant="light" bg="light">
      <Container fluid="md">
        <Navbar.Brand href="/">
            <Image src={'/logo.jpeg'} width={150} height={40} alt="A11Y tool home page"></Image>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
