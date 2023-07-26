export const debugIt = false;

export const PROJECT_DOMAIN = process.env.NEXT_PUBLIC_PROJECT_DOMAIN;
export const SOCKET_CONNECT_DOMAIN = process.env.NEXT_PUBLIC_SOCKET_CONNECT_DOMAIN;

export const API_DOMAIN = PROJECT_DOMAIN + 'api/';
export const HTML_REPORT_DOMAIN_URL = PROJECT_DOMAIN + 'artifacts';
export const CSV_REPORT_DOMAIN_URL = PROJECT_DOMAIN + 'csvReports';
export const REPORT_FILE_PATH = PROJECT_DOMAIN;

export const API_GET_ALL_CSV_REPORTS = API_DOMAIN + 'getAllCsvReports';
export const API_GET_CSV_RESULTS = API_DOMAIN + 'getCsvResults?csvFileName=';
export const API_A11Y_EXECUTE_SCAN = API_DOMAIN + 'executeScan';
export const API_SOCKET_SERVER = API_DOMAIN + 'socket';
export const API_DOWNLOAD_REPORT_AS_ZIP = API_DOMAIN + 'downloadAsZip?csvFileName=';
export const API_DOWNLOAD_REPORT_AS_ZIP2 = API_DOMAIN + 'downloadAsZip2?csvFileName=';
export const API_EXPORT_AS_CSV = API_DOMAIN + 'exportAsCsv?csvFileName=';
export const API_VIEW_HTML_REPORT = API_DOMAIN + 'viewReport?htmlReportPath=';

export const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

export const splitAndRemoveSpace = (str) => {
    const trimmedItems = str.split(",").map(function (item) {
        return item.trim();
    });
    //return trimmedItems.filter(item=>item.length>0);
    return trimmedItems.filter((item, index) => index === trimmedItems.indexOf(item) && item.length > 0)
};

export const filterInvalidUrlOrFiles = (inputArray) => {
    let newInputArray = inputArray.filter((file) => {
        return isValidUrl(file) ? file : (file.endsWith('.html') ? file : false);
    });
    debugIt && ('newInput Array', newInputArray)
    return newInputArray;
}

export const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}