import Link from "next/link";
import { Container } from "react-bootstrap";
import Image from "next/image";
import {
  A11Y_WELCOME_DESCRIPTION,
  A11Y_WELCOME_HEADING,
} from "../common/messages";

export function Jumbotron() {
  return (
    <section className="p-sm-3 p-md-5 text-bg-dark">
      <Container>
        <h1 className="display-4">{A11Y_WELCOME_HEADING}</h1>
        <p className="lead">
          {A11Y_WELCOME_DESCRIPTION}
          <br />
          <br />
          Power packed by:&nbsp;
          <Link
            href={"https://www.deque.com/axe/"}
            className="text-decoration-none text-white"
            target="_blank"
          >
            <Image
              src={"/deque_blue.svg"}
              onMouseEnter={(e) => (e.currentTarget.src = "/deque.svg")}
              onMouseLeave={(e) => (e.currentTarget.src = "/deque_blue.svg")}
              alt="deque"
              width={60}
              height={20}
            ></Image>
            <sup>axeCore</sup>
          </Link>
        </p>
      </Container>
    </section>
  );
}
