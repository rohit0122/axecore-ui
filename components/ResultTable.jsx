import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { debugIt } from "../common/constants";
import { A11Y_SCAN_RESULTS_TBL } from "../common/messages";

export function ResultTable(props) {
  const [resultsArray, setResultsArray] = useState([]);

  useEffect(() => {
    setResultsArray(props.resultsArray);
  }, [props.resultsArray]);

  return (
    <Table bordered hover responsive>
      <thead>
        <tr className="text-center">
          <th className="bg-secondary text-light text-break w-50">
            {A11Y_SCAN_RESULTS_TBL.TH_TEXT.PAGE_URL}
          </th>
          <th className="bg-secondary text-light">
            {A11Y_SCAN_RESULTS_TBL.TH_TEXT.SCORE}
          </th>
          <th className="bg-secondary text-light">
            {A11Y_SCAN_RESULTS_TBL.TH_TEXT.DETAIL_REPORT}
          </th>
          <th className="bg-secondary text-light">
            {A11Y_SCAN_RESULTS_TBL.TH_TEXT.MESSAGE}
          </th>
        </tr>
      </thead>
      <tbody>
        {resultsArray.length > 0 ? (
          resultsArray.map((item, ri) => {
            let scoreColor = item.Score != "-" ? "text-success" :'';
            debugIt && console.log("item.Score", item.Score);
            if (item.Score) {
              if (item.Score >= 50) {
                scoreColor = "text-success";
              } else if (item.Score >= 30) {
                scoreColor = "text-warning";
              } else if (item.Score < 30) {
                scoreColor = "text-danger";
              }
            }
            return (
              <tr key={`resultTable_${ri}`} className="text-center">
                {item.Message.indexOf("Invalid") === -1 ? (
                  <>
                    <td className="text-start">
                      <Link target="_blank" href={item.URL}>
                        {item.URL}
                      </Link>
                    </td>
                    <td className={`${scoreColor}`}>
                      {item.Score ? item.Score : "100"}
                    </td>
                    <td>
                      {item.ReportUrl != "-" ? (
                        <>
                          <Link target="_blank" href={item.ReportUrl}>
                            View
                          </Link>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td
                      className={
                        item.Message.indexOf("looks good") === -1
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {item.Message.indexOf("looks good") === -1
                        ? `✘ ${item.Message}`
                        : `✓ ${item.Message}`}
                    </td>
                  </>
                ) : (
                  <>
                    <td className="text-start text-muted">{item.URL}</td>
                    <td className="text-muted">-</td>
                    <td className="text-muted">-</td>
                    <td className="text-muted">✘ {item.Message}</td>
                  </>
                )}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              {A11Y_SCAN_RESULTS_TBL.NO_RESULTS_TEXT}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
