import { useEffect, useState } from "react";
import { Badge, CloseButton, Form } from "react-bootstrap";
import { debugIt, filterInvalidUrlOrFiles, splitAndRemoveSpace } from "../common/constants";

export function TagInput(props) {
  const [tagData, setTagData] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");

  useEffect(() => {
    //setTagInputValue(props.defaultValue);
    setTagData(splitAndRemoveSpace(props.defaultValue));
  }, [props.defaultValue]);

  const fnSetTagData = (e) => {
    //debugIt && console.log('eeeeeeee', e)
    let presentTagData = [...tagData];
    if (
      e.keyCode === 8 &&
      presentTagData.length > 0 &&
      tagInputValue.length == 0
    ) {
      presentTagData.pop();
      fnSetTagArrayValue(presentTagData);
    } else if (
      ([188, 32, 9, 91].indexOf(e.keyCode) != -1 || e.type === "blur") &&
      e.target.value.trim().length > 5
    ) {
      const inputTargetValue = e.target.value.replace('file://', '');
      debugIt && console.log("inputData", inputTargetValue);
      let identifySpace = inputTargetValue.split(/[\s,]+/);
      //let identifyComma = e.target.value.split(",");
      //identifySpace = identifySpace.concat(identifyComma);
      debugIt && ('concate====', identifySpace)
      if (identifySpace.length > 0) {
        for (let splitedItem of identifySpace) {
          if (splitedItem) {
            debugIt && console.log(
              "splitedItems=======",
              splitedItem
            );
            presentTagData.push(splitedItem.trim());
          }
        }
      } else {
        presentTagData.push(inputTargetValue);
      }
      //const data = splitAndRemoveSpace(e.target.value);

      fnSetTagArrayValue(presentTagData);
    }
    debugIt && console.log('presentTagData====>', presentTagData)
  };
  const fnSetTagArrayValue = async (presentTagData) => {
    presentTagData = (props.validateFiles ? await filterInvalidUrlOrFiles(presentTagData) : presentTagData).join(',');
    const getFilteredData =  await splitAndRemoveSpace(presentTagData)
    debugIt && console.log('presentTag after split & removed duplicate', getFilteredData)
    await props.updateFieldData(props.fieldKey, getFilteredData.join(','));
    setTagData(getFilteredData);
    fnSetTagInputValue();
  };

  const fnSetTagInputValue = (tagInputValue = "") => {
    //debugIt && console.log('eeee',tagInputValue)
    setTagInputValue(tagInputValue);
  };

  const fnRemoveTag = async (tagIndex) => {
    let tagNow = tagData.slice(0);
    tagNow.splice(tagIndex, 1);
    await props.updateFieldData(props.fieldKey, tagNow.join(','));
    setTagData(tagNow);
    setTagInputValue("");
  };
  return (
    <>
      <Form.Group as={"div"} controlId={props.fieldControlId}>
        <Form.Label>{props.fieldLabel} {props.fieldAddonLabel}</Form.Label>
        <div
          className={`d-flex flex-column border border-secondary rounded overflow-auto ${
            props.disabled ? "custom-disabled-bg" : ""
          }`}
        >
          <div className="p-2">
            {tagData.map((item, index) => (
              <Badge
                bg={`${props.disabled ? "secondary" : props.theme}`}
                text={`${props.disabled || ['danger', 'success'].indexOf(props.theme)!==-1 ? "" : "dark"}`}
                className="m-1 p-2 d-inline-flex"
                key={index}
              >
                {item}
                <CloseButton
                  className="ms-2"
                  aria-label="remove item"
                  onClick={() => fnRemoveTag(index)}
                  style={{ padding: 0 }}
                  disabled={props.disabled}
                />
              </Badge>
            ))}
          </div>
          <textarea
            id={props.fieldControlId}
            className="border-0 custom-focus-border-none w-100 ps-3"
            placeholder={props.placeholder}
            onKeyUp={(e) => fnSetTagData(e)}
            onBlurCapture={(e) => fnSetTagData(e)}
            onChange={(e) => {
              fnSetTagInputValue(e.target.value);
            }}
            value={tagInputValue}
            rows={props.rows ? props.rows : 3}
            disabled={props.disabled}
          />
        </div>
      </Form.Group>
    </>
  );
}
