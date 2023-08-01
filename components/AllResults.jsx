import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import {
  Alert,
  Badge,
  Button,
  Col,
  ListGroup,
  Offcanvas,
  Row
} from "react-bootstrap";
import { ResultTable } from "./ResultTable";
import { API_GET_ALL_CSV_REPORTS, API_GET_CSV_RESULTS, debugIt, API_DOWNLOAD_REPORT_AS_ZIP2, API_EXPORT_AS_CSV } from "../common/constants";
import Link from "next/link";
import { A11Y_DOWNLOAD_AS_ZIP_TEXT, A11Y_EXPORT_AS_CSV_TEXT, A11Y_OPEN_RESULTS_TBL_MSG, A11Y_SCAN_RESULTS_CSV_MSG, A11Y_SCAN_RESULTS_TBL } from "../common/messages";

export function AllResults(props) {
  const [csvReports, setCsvReports] = useState([]);
  const [csvResults, setCsvResults] = useState([]);
  const [showOffCanvas, setOffCanvasShow] = useState(false);
  const [csvInfo, setCsvInfo] = useState({ csvFileName: "", csvHttpUrl: "", zipFileHttpUrl: "" });

  useEffect(() => {
    if (props.isTabChanged) getResults();
  }, [props.isTabChanged]);

  const router = useRouter();

  const handleOffCanvasClose = () => setOffCanvasShow(false);

  const getResults = async () => {
    props.showLoader(true);
    const response = await fetch(API_GET_ALL_CSV_REPORTS);
    const jsonResponse = await response.json();
    debugIt && console.log("jsonResponse", Object.keys(jsonResponse.csvReports));
    setCsvReports(jsonResponse.csvReports);
    props.showLoader(false);
  };

  const getCsvData = async (eventKey, httpFileUrl) => {
    if (eventKey) {
      props.showLoader(true);
      const response = await fetch(
        API_GET_CSV_RESULTS + eventKey
      );
      const jsonResponse = await response.json();
      debugIt && console.log("jsonResponse====", jsonResponse.csvResultsAsJson[0].URL);
      setCsvResults(jsonResponse.csvResultsAsJson);

      //await downloadReportAsZip(eventKey, httpFileUrl);
      setCsvInfo({csvFileName: eventKey, csvHttpUrl: httpFileUrl });
      setOffCanvasShow(true);
    }
    props.showLoader(false);
  };

  return (
    <>
      {Object.keys(csvReports).length > 0 ? <>
        <Alert variant="warning">
          {A11Y_SCAN_RESULTS_CSV_MSG}
        </Alert>
        <ListGroup as="ul">
        {Object.keys(csvReports).map((reportGroup, index) => (
          <ListGroup.Item key={index} as="li">
            <div className="d-flex align-items-center justify-content-between">
              <div className="">
                Report for &nbsp;
                <span className="fw-bold">
                  {new Date(reportGroup).toDateString()}
                </span>
              </div>
              <Badge bg="primary" pill>
                {csvReports[reportGroup].length}
              </Badge>
            </div>
            <div className="">
              {csvReports[reportGroup].map((report, i) => (
                <Button
                  key={i}
                  variant="link"
                  className="m-2"
                  onClick={() =>
                    getCsvData(report.csvFileName, report.httpFileUrl)
                  }
                  aria-label={`${A11Y_OPEN_RESULTS_TBL_MSG} ${report.csvFileName}`}
                >
                  {report.csvFileName}
                </Button>
              ))}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Offcanvas
        show={showOffCanvas}
        onHide={handleOffCanvasClose}
        placement={"top"}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Displaying results for {csvInfo.csvFileName}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            <Col>
              <Link
                className="btn btn-success mb-2 float-end mx-2"
                href={API_EXPORT_AS_CSV + csvInfo.csvFileName}
                target="_blank"
                role="button"
              >
                {A11Y_EXPORT_AS_CSV_TEXT}
              </Link>
              <Link
                className="btn btn-primary mb-2 float-end"
                href={API_DOWNLOAD_REPORT_AS_ZIP2 + csvInfo.csvFileName}
                target="_blank"
                role="button"
              >
                {A11Y_DOWNLOAD_AS_ZIP_TEXT}
              </Link>
            </Col>
          </Row>
          <ResultTable resultsArray={csvResults} />
        </Offcanvas.Body>
      </Offcanvas>
      </>
    : 
    <Alert variant="danger">
      {A11Y_SCAN_RESULTS_TBL.NO_RESULTS_TEXT}
    </Alert>
  }
    </>
  );
}