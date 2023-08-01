import { useState } from "react";
import { Button, Card, Col, Row, Alert } from "react-bootstrap";
import { io } from "socket.io-client";
import { ResultTable } from "./ResultTable";
import {
  API_A11Y_EXECUTE_SCAN,
  API_SOCKET_SERVER,
  SOCKET_CONNECT_DOMAIN,
  debugIt,
} from "../common/constants";
import { A11Y_EXPORT_AS_CSV_TEXT, A11Y_SCAN_RESULTS_MSG, A11Y_START_SCAN_MSG } from "../common/messages";
import Link from "next/link";

export function RunA11yScan(props) {
  let socket = null;
  const [initialMsg, setInitalMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [downloadCsv, setDownloadCsv] = useState("");
  let [a11yToolOutputTable, setA11yToolOutputTable] = useState([]);
  const [infoWarningMsg, setInfoWarningMsg] = useState([]);

  async function triggerA11yTool() {
    await socketInitializer();
    setErrorMsg("");
    setSuccessMsg("");
    setInfoWarningMsg([]);
    let scanConfigObj = {
      isRegexNeeded: localStorage.getItem("isRegexNeeded"),
      disableRules: localStorage.getItem("disableRules"),
      filesToVerify: localStorage.getItem("filesToVerify"),
      findHtmlFromHere: localStorage.getItem("findHtmlFromHere"),
      ignoreFileAndFolders: localStorage.getItem("ignoreFileAndFolders"),
    };
    setA11yToolOutputTable([]);
    setDownloadCsv("");
    debugIt && console.log("socket connection open");
    await socket.open();
    await socket.emit("join", { email: "user1@example.com" });
    await props.showLoader(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scanConfigObj),
    };
    debugIt && console.log("scanConfig==========", scanConfigObj);
    await fetch(API_A11Y_EXECUTE_SCAN, requestOptions);
    await props.showLoader(false);
    await socket.disconnect();
    debugIt && console.log("socket connection closed");
  }

  async function socketInitializer() {
    await fetch(API_SOCKET_SERVER);
    //socket = io();
    socket = await io.connect(SOCKET_CONNECT_DOMAIN, {
      autoConnect: false,
    });
    socket.on("initialMsgToFront", (data) => {
      setInitalMsg(<h3 className="text-primary text-center">{data}</h3>);
      debugIt && console.log("initialMsgToFront:", data);
    });
    socket.on("errorMsgToFront", async (data) => {
      debugIt && console.log("errorMsgToFront:", data);
      setErrorMsg(data);
      await props.showLoader(false);
    });
    socket.on("infoWarningMsgToFront", async (data) => {
      debugIt && console.log("infoWarningMsgToFront:", data);
      let infoMsg = [...infoWarningMsg];
      infoMsg.push(data);
      setInfoWarningMsg(infoMsg.filter((item, index) => infoMsg.indexOf(item)==index));
    });
    /*socket.on("executingUrlMsgToFront", (data) => {
      debugIt && console.log("ExecutingUrlMsgToFront:", data);
      setA11yToolOutputTable(a11yToolOutputTable + `<tr><td>${data}</td>`);
    });

    socket.on("a11yScoreMsgToFront", (data) => {
      debugIt && console.log("a11yScoreMsgToFront:", data);
      a11yToolOutputTable += `<td class="text-center">${data}</td>`;
    });

    socket.on("a11yReportMsgToFront", (data) => {
      debugIt && console.log("a11yReportMsgToFront:", data);
      a11yToolOutputTable += `<td>${data}</td>`;
    });

    socket.on("a11yIssueMsgToFront", (data) => {
      debugIt && console.log("a11yIssueMsgToFront:", data);
      setA11yToolOutputTable(
        a11yToolOutputTable + `<td class="text-danger">${data}</td><tr/>`
      );
    });
    socket.on("a11ySuccessMsgToFront", (data) => {
      debugIt && console.log("a11ySuccessMsgToFront:", data);
      setA11yToolOutputTable(
        a11yToolOutputTable +
          `<td class="text-success text-center" colspan="3">${data}</td><tr/>`
      );
    });*/
    socket.on("a11yCsvReportMsgToFront", (data) => {
      debugIt && console.log("a11yCsvReportMsgToFront:", data);
      setDownloadCsv(data);
      setSuccessMsg(A11Y_SCAN_RESULTS_MSG);
    });
    socket.on("a11yRowResultsToFront", (data) => {
      setA11yToolOutputTable((oldA11yData) => [...oldA11yData, data]);
    });
  }

  return (
    <>
      <Card className="mt-4">
        <Card.Header
          as={"h2"}
          className="fs-5 card-header d-flex justify-content-between"
        >
          <span className="mt-2">{A11Y_START_SCAN_MSG}</span>
          <Row as={"span"}>
            {downloadCsv && (
              <Col className="col-md-auto mt-1">
                <Link href={downloadCsv}>{A11Y_EXPORT_AS_CSV_TEXT}</Link>
              </Col>
            )}
            <Button className="mx-2 col" onClick={triggerA11yTool}>
              Run Scan
            </Button>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              {initialMsg}
              {infoWarningMsg.length > 0
                ?  <Alert as={"<ul>"} variant={"warning"} dismissible>{infoWarningMsg.map((item, index) => (<li key={index}>{item}</li>))}</Alert>
                : null}
              {errorMsg && (
                <Alert variant={"danger"} dismissible>
                  {errorMsg}
                </Alert>
              )}
              {successMsg && (
                <Alert variant={"success"} dismissible>
                  {successMsg}
                </Alert>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <ResultTable resultsArray={a11yToolOutputTable} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
