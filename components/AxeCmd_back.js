import AxeBuilder from "@axe-core/webdriverjs";
import WebDriver from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import firefox from "selenium-webdriver/firefox.js";

import fs from "fs";
import fileUrl from "file-url";
import { createHtmlReport } from "axe-html-reporter";
import {
  disableRules,
  filesToVerify,
  findHtmlFromHere,
  ignoreFileAndFolders,
} from "../common/config";
import { glob } from "glob";
import chalk from "chalk";
import { API_EXPORT_AS_CSV, API_VIEW_HTML_REPORT, PROJECT_DOMAIN, SOCKET_CONNECT_DOMAIN, debugIt, isValidUrl, sleep } from "../common/constants.js";
import { io } from "socket.io-client";
import { json2csv } from 'json-2-csv';
import { A11Y_AXE_CLI_OUTPUT_TEXT, A11Y_EXPORT_AS_CSV_TEXT } from "../common/messages";

const AxeCmdCallBack = async (req) => {
  //(async () => {
  let scanConfigObj = {
    isRegexNeeded: req.body.isRegexNeeded ? (req.body.isRegexNeeded === "true") : false,
    disableRules: req.body.disableRules ? req.body.disableRules.split(',').map(item => item.trim()) : disableRules,
    filesToVerify: req.body.filesToVerify ? req.body.filesToVerify.split(',').map(item => item.trim()) : filesToVerify,
    findHtmlFromHere: req.body.findHtmlFromHere ? req.body.findHtmlFromHere : findHtmlFromHere,
    ignoreFileAndFolders: req.body.ignoreFileAndFolders ? req.body.ignoreFileAndFolders.split(',').map(item => item.trim()) : ignoreFileAndFolders,
  };
  //debugIt && console.log('scanConfigObj======================', scanConfigObj);return;
  let socket = io(SOCKET_CONNECT_DOMAIN);
  const initialMsg = A11Y_AXE_CLI_OUTPUT_TEXT.TOOL_STARTED;
  console.log(chalk.bold.underline.blueBright(initialMsg));
  socket.emit('initialMsg', initialMsg);
  
  // get unique id of each run
  const uniqueId = Math.random().toString().substring(2, 8);
  const currentDate = new Date().toJSON().slice(0, 10);

  // store consolidated reports here
  const reportPathForBrowser = `artifacts/${currentDate}/${uniqueId}`;
  const reportStorageFolder = `./public/${reportPathForBrowser}`;
  // HTML Report output dir
  const outputDir = reportStorageFolder;

  // CSV file name and dir
  const csvFileName = `${currentDate}_${uniqueId}.csv`;
  const csvFilePath = `${reportStorageFolder}/${csvFileName}`;

  let csvJsonArray = [];
  const csvKeys = {
    URL: '',
    Score: 0,
    ReportUrl: '-',
    Message: '-',
    ReportFilePath: '-'
  };

  try {
    if (!fs.existsSync(reportStorageFolder)) {
      fs.mkdirSync(reportStorageFolder, { recursive: true });
    }
    let htmlFiles = scanConfigObj.isRegexNeeded === false ? scanConfigObj.filesToVerify : [];
    if (scanConfigObj.findHtmlFromHere && scanConfigObj.isRegexNeeded === true) {
      htmlFiles = await glob(scanConfigObj.findHtmlFromHere + "**/*.html");
      for (let igF of scanConfigObj.ignoreFileAndFolders) {
        htmlFiles = htmlFiles.filter((item) => !item.includes(igF));
      }
    }
    //return;
    let count = 1;
    if (htmlFiles.length > 0) {
      for (const file of htmlFiles) {
        let csvRowInfo = { ...csvKeys };
        const driver = await new WebDriver.Builder()
          /*.forBrowser("chrome")
          .withCapabilities(WebDriver.Capabilities.chrome())
          .setChromeOptions(new chrome.Options().headless())
          */
          .forBrowser("firefox")
          .withCapabilities(WebDriver.Capabilities.firefox())
          .setFirefoxOptions(new firefox.Options().headless())
          .build();
        //const url = await fileUrl(file);
        const url = isValidUrl(file)
          ? file
          : fs.existsSync(file)
            ? fileUrl(file)
            : false;
        if (url) {
          csvRowInfo.URL = url;
          console.log(
            chalk.dim.blackBright(A11Y_AXE_CLI_OUTPUT_TEXT.FOR_URL),
            chalk.bgBlueBright(url)
          );
          try {
            await driver.get(url).then(async () => {
              await new AxeBuilder(driver)
                .disableRules(scanConfigObj.disableRules)
                .analyze(async (err, results) => {
                  if (err) {
                    // Handle error somehow
                    console.log(chalk.redBright("Exception: ", err.message));
                    socket.emit('errorMsg', err.message);
                    //await driver.quit();
                  } else {
                    //console.log(results);
                    if (results && results.violations.length > 0) {
                      /*
                                      A11y score calculation formula
                                    * p2 = 1  //number of Critical and Serious issues
                                    * p1 = 59 //number of Moderate issues
                                    * p0 = 4 //number of Minor issues
                                    * total = 64 //number of total issues
                                    Formula====== ( 0.4 * p2 + 0.8 * p1 + p0 ) / total
                                  */
                      let dataToCalculate = {
                        critical: 0,
                        serious: 0,
                        moderate: 0,
                        minor: 0,
                        total: 0,
                      };
                      for (let item of results.violations) {
                        dataToCalculate[item.impact] =
                          dataToCalculate[item.impact] + item.nodes.length;
                        dataToCalculate["total"] =
                          dataToCalculate["total"] + item.nodes.length;
                      }
                      const p0 = dataToCalculate.minor;
                      const p1 = dataToCalculate.moderate;
                      const p2 =
                        dataToCalculate.critical + dataToCalculate.serious;
                      const totalViolation = dataToCalculate.total;
                      const a11yScore = parseInt(
                        ((0.4 * p2 + 0.8 * p1 + p0) / totalViolation) * 100
                      );

                      debugIt && console.log('Data to calculate=====', dataToCalculate);
                      const reportFileName = `a11yReport_${uniqueId}_${count}.html`;
                      let options = { reportFileName, outputDir };
                      createHtmlReport({ results: results, options: options });
                      console.log(
                        chalk.hex("#EBA832")(
                          A11Y_AXE_CLI_OUTPUT_TEXT.CALCUALTED_SCORE,
                          chalk.inverse.bold(a11yScore)
                        )
                      );
                      //socket.emit('a11yScoreMsg',  a11yScore);
                      csvRowInfo.Score = a11yScore;
                      // read the html report and update the content
                      let fileData = fs.readFileSync(
                        `${outputDir}/${reportFileName}`,
                        { encoding: "utf8", flag: "r" }
                      );
                      // replace 2nd occurance
                      let t = 0;
                      fileData = fileData.replace(
                        /AXE Accessibility Results/g,
                        (match) =>
                          ++t === 2
                            ? `AXE Accessibility Results <h1>Page Accessibility Score <span class="badge badge-primary">${a11yScore}</span></h1>`
                            : match
                      );
                      fs.writeFileSync(`${outputDir}/${reportFileName}`, fileData);
                      const a11yIssueMsg = A11Y_AXE_CLI_OUTPUT_TEXT.A11Y_ISSUE_DETECTED;
                      console.log(
                        chalk.bgRedBright(`✘ ${a11yIssueMsg}`)
                      );
                      //csvRowInfo.ReportUrl = `${PROJECT_DOMAIN}${reportPathForBrowser}/${reportFileName}`;
                      csvRowInfo.ReportUrl = `${API_VIEW_HTML_REPORT}${reportPathForBrowser}/${reportFileName}`;
                      csvRowInfo.Message = a11yIssueMsg;
                      csvRowInfo.ReportFilePath = `${process.cwd()}/${outputDir.replace('./','')}/${reportFileName}`;
                      //socket.emit('a11yIssueMsg', a11yIssueMsg);
                      count++;
                    } else {
                      const a11ySuccessMsg = A11Y_AXE_CLI_OUTPUT_TEXT.NO_A11Y_ISSUE_DETECTED;
                      console.log(
                        chalk.bgGreenBright(
                          `✔ ${a11ySuccessMsg}}`
                        )
                      );
                      csvRowInfo.Message = a11ySuccessMsg;
                    }
                  }
                  await driver.quit();
                });
            });
            debugIt && console.log('csvRowInfo =======', csvRowInfo)
          } catch (exp) {
            console.log(
              chalk.redBright(`✘ ${A11Y_AXE_CLI_OUTPUT_TEXT.INVALID_URL}`)
            );
            csvRowInfo.URL = file;
            csvRowInfo.Message = A11Y_AXE_CLI_OUTPUT_TEXT.INVALID_URL;
            csvJsonArray.push(csvRowInfo);
            await sleep(150);
            socket.emit('a11yRowResults', csvRowInfo);
            continue;
          }
        } else {
          await sleep(150);
          console.log(
            chalk.dim.blackBright(A11Y_AXE_CLI_OUTPUT_TEXT.FOR_URL),
            chalk.bgBlueBright(file)
          );
          console.log(
            chalk.redBright(`✘ ${A11Y_AXE_CLI_OUTPUT_TEXT.INVALID_URL}`)
          );
          csvRowInfo.URL = file;
          csvRowInfo.Message = A11Y_AXE_CLI_OUTPUT_TEXT.INVALID_URL;
        }
        csvJsonArray.push(csvRowInfo);
        await sleep(150);
        socket.emit('a11yRowResults', csvRowInfo);
      }
      debugIt && console.log('csvJsonArray=======', csvJsonArray)
      if (csvJsonArray.length > 0) {
        const csvData = await json2csv(csvJsonArray);
        debugIt && console.log('csvData======', csvData);
        if (csvData) {
          fs.writeFileSync(csvFilePath, csvData);
          //socket.emit('a11yCsvReportMsg', `<a href="${PROJECT_DOMAIN}${reportPathForBrowser}/${csvFileName}" target="_blank">Export as CSV</a>`);
          socket.emit('a11yCsvReportMsg', `<a href="${API_EXPORT_AS_CSV}${csvFileName}" target="_blank">${A11Y_EXPORT_AS_CSV_TEXT}</a>`);
          console.log(
            chalk.bgGreenBright(
              `${A11Y_AXE_CLI_OUTPUT_TEXT.CSV_FILE_LOCATION_INFO} ${csvFilePath.replace('./','')}`
            )
          );
        }
      }
    } else {
      console.log(
        chalk.redBright(A11Y_AXE_CLI_OUTPUT_TEXT.INVALID_FILE_OR_PATH_FOR_SCAN)
      );
      socket.emit('errorMsg', A11Y_AXE_CLI_OUTPUT_TEXT.INVALID_FILE_OR_PATH_FOR_SCAN);
    }
  } catch (e) {
    console.log(chalk.redBright("Exception: ", e.message));
    socket.emit('errorMsg', e.message);
  }
  //})();
};
export default AxeCmdCallBack;
