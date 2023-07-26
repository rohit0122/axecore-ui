import Image from "next/image";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const Footer = (props) => {
  return (
    <footer className="bg-dark text-center text-lg-start">
      <Container className="py-2"  fluid="md">
        <Nav>
          {/*<Nav.Item>
            <Nav.Link href="https://www.aarp.org/" className="text-white" target="_blank">
              AARP Home
            </Nav.Link>
          </Nav.Item>
        */}
          <Nav.Item className="ms-auto">
            <Nav.Link href="https://docs.deque.com/devtools-mobile/2022.11.17/en/score" className="text-white" target="_blank">
              How A11Y score is calculated?
            </Nav.Link>
          </Nav.Item>
          {/*<Nav.Item>
            <Nav.Link href="https://www.deque.com/blog/axe-core-packages-migrating/" className="text-white" target="_blank">
              NPM Package References
            </Nav.Link>
          </Nav.Item>
        */}
        </Nav>
      </Container>
    </footer>
  );
};
export default Footer;