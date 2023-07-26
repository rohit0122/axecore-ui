import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { TagInput } from "./TagInput";
import Link from "next/link";
import { debugIt, sleep } from "../common/constants";
import { A11Y_CONFIG_FORM } from "../common/messages";

export function ConfigForm(props) {
  const [isRegex, setIsRegex] = useState(false);
  const [findHtmlFromHere, setFindHtmlFromHere] = useState(null);
  const [tagInputFields, setTagInputFields] = useState({
    ignoreFileAndFolders: "", //"node_modules, example.html",
    filesToVerify: "", //"https://www.aarp.org/,/Users/Desktop/test-file.html",
    disableRules: "", //"document-title, html-has-lang, landmark-one-main, page-has-heading-one, region, duplicate-id"
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let ignoreFileAndFolders =
      localStorage.getItem("ignoreFileAndFolders") ??
      A11Y_CONFIG_FORM.FIELD_IGNORE_FILES_FOLDERS.DEFAULT_VALUE;
    let filesToVerify =
      localStorage.getItem("filesToVerify") ??
      A11Y_CONFIG_FORM.FIELD_FILES_TO_VERIFY.DEFAULT_VALUE;
    let disableRules =
      localStorage.getItem("disableRules") ??
      A11Y_CONFIG_FORM.FIELD_DISABLE_RULES.DEFAULT_VALUE;
    setTagInputFields({
      ignoreFileAndFolders,
      filesToVerify,
      disableRules,
    });
    setIsRegex(localStorage.getItem("isRegexNeeded") == "true" ? true : false);
    setFindHtmlFromHere(localStorage.getItem("findHtmlFromHere") ?? null);
    debugIt &&
      console.log(
        "boolen",
        localStorage.getItem("isRegexNeeded") == "true" ? true : false
      );
    debugIt && console.log("tagInputFields", tagInputFields);
  }, []);

  const fnSetTagInputField = (fieldKey, fieldValue) => {
    let data = { ...tagInputFields };
    data[fieldKey] = fieldValue;
    setTagInputFields(data);
    debugIt && console.log("data========", data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setErrorMsg("");
    props.showLoader(true);
    debugIt && console.log("Form Clicked", event);
    debugIt &&
      console.log("elements===", event.target.elements.formGridRegex.value);
    localStorage.setItem(
      "isRegexNeeded",
      event.target.elements.formGridRegex.checked
    );
    localStorage.setItem(
      "findHtmlFromHere",
      event.target.elements.formGridPathToVerify.value
    );
    localStorage.setItem(
      "ignoreFileAndFolders",
      tagInputFields.ignoreFileAndFolders
    );
    localStorage.setItem("filesToVerify", tagInputFields.filesToVerify);
    localStorage.setItem("disableRules", tagInputFields.disableRules);
    await sleep(1000);
    props.showLoader(false);
    setErrorMsg(A11Y_CONFIG_FORM.SUCCESS_MSG);
  };
  return (
    <>
      {errorMsg && (
        <Alert variant={"success"} dismissible>
          {errorMsg}
        </Alert>
      )}
      <Card>
        <Card.Header as={"h2"} className="fs-5">
          {A11Y_CONFIG_FORM.HEADER_TITLE}
        </Card.Header>
        <Form onSubmit={handleSubmit}>
          <Card.Body>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className={`${isRegex ? "col-4  border-2 border-end" : ""}`}
                controlId="formGridRegex"
              >
                {<Form.Label>Validate HTML files by Regex</Form.Label>}
                <Form.Check
                  onClick={(e) => setIsRegex(e.target.checked)}
                  type="switch"
                  defaultChecked={isRegex}
                  label={`${isRegex === true ? "Yes" : "No"}`}
                />
              </Form.Group>
              <Form.Group
                className={`${!isRegex ? "d-none" : ""}`}
                as={Col}
                controlId="formGridPathToVerify"
              >
                <Form.Label>
                  {A11Y_CONFIG_FORM.FIELD_FOLDER_PATH_TO_VERIFY.TITLE}{" "}
                  <span className="fst-italic">
                    {A11Y_CONFIG_FORM.FIELD_FOLDER_PATH_TO_VERIFY.SUB_INFO}
                  </span>
                </Form.Label>
                <Form.Control
                  type="input"
                  placeholder={
                    A11Y_CONFIG_FORM.FIELD_FOLDER_PATH_TO_VERIFY.PLACE_HOLDER
                  }
                  disabled={!isRegex}
                  defaultValue={findHtmlFromHere}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col>
                <TagInput
                  fieldLabel={A11Y_CONFIG_FORM.FIELD_DISABLE_RULES.TITLE}
                  fieldControlId="formGridDisableRules"
                  placeholder={
                    A11Y_CONFIG_FORM.FIELD_DISABLE_RULES.PLACE_HOLDER
                  }
                  defaultValue={tagInputFields.disableRules}
                  rows={6}
                  fieldKey={"disableRules"}
                  updateFieldData={(fieldKey, fieldValue) =>
                    fnSetTagInputField(fieldKey, fieldValue)
                  }
                  theme={"warning"}
                  fieldAddonLabel={
                    <Link
                      className="fst-italic"
                      target="_blank"
                      href={
                        "https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-20-level-a--aa-rules"
                      }
                    >
                      {A11Y_CONFIG_FORM.FIELD_DISABLE_RULES.SUB_INFO}
                    </Link>
                  }
                />
              </Col>
            </Row>
            {isRegex && (
              <Row className="mb-3">
                <Col>
                  <TagInput
                    fieldLabel={
                      A11Y_CONFIG_FORM.FIELD_IGNORE_FILES_FOLDERS.TITLE
                    }
                    fieldControlId="formGridFilesToExclude"
                    placeholder={
                      A11Y_CONFIG_FORM.FIELD_IGNORE_FILES_FOLDERS.PLACE_HOLDER
                    }
                    defaultValue={tagInputFields.ignoreFileAndFolders}
                    rows={3}
                    disabled={!isRegex}
                    fieldKey={"ignoreFileAndFolders"}
                    updateFieldData={(fieldKey, fieldValue) =>
                      fnSetTagInputField(fieldKey, fieldValue)
                    }
                    theme={"danger"}
                    fieldAddonLabel={
                      <span className="fst-italic">
                        {A11Y_CONFIG_FORM.FIELD_IGNORE_FILES_FOLDERS.SUB_INFO}
                      </span>
                    }
                  />
                </Col>
              </Row>
            )}
            {!isRegex && (
              <Row className="my-3">
                <Col>
                  <TagInput
                    fieldLabel={A11Y_CONFIG_FORM.FIELD_FILES_TO_VERIFY.TITLE}
                    fieldControlId="formGridFileToVerify"
                    placeholder={
                      A11Y_CONFIG_FORM.FIELD_FILES_TO_VERIFY.PLACE_HOLDER
                    }
                    disabled={isRegex}
                    defaultValue={tagInputFields.filesToVerify}
                    rows={6}
                    fieldKey={"filesToVerify"}
                    updateFieldData={(fieldKey, fieldValue) =>
                      fnSetTagInputField(fieldKey, fieldValue)
                    }
                    theme={"success"}
                    fieldAddonLabel={
                      <span className="fst-italic">
                        {A11Y_CONFIG_FORM.FIELD_FILES_TO_VERIFY.SUB_INFO}
                      </span>
                    }
                    validateFiles={true}
                  />
                </Col>
              </Row>
            )}
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              {A11Y_CONFIG_FORM.SAVE_BUTTON}
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </>
  );
}
