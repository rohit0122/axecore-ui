export const A11Y_PAGE_TITLE = { HOME: 'A11Y Tool UI - Set Configuration', RUN_SCAN: 'A11Y Tool UI - Run Scan', SCAN_RESULTS: 'A11Y Tool UI - Scan Results' };
export const A11Y_TAB_TITLE = { CONFIG_FORM: 'Configurations', RUN_SCAN: 'Run Scan', SCAN_RESULTS: 'Scan Results' }

export const A11Y_WELCOME_HEADING = 'Welcome to Accessibility validation tool';
export const A11Y_WELCOME_DESCRIPTION = 'This tool empowers team leaders to validate and ensure that there are no accessibility issues present at the time of sprint deliverables. Thereby enabling the development team to deliver more accessible pages to end users every time.';

export const A11Y_CONFIG_FORM = {
    HEADER_TITLE: 'A11Y configuration',
    SUCCESS_MSG: 'Configuration saved successfully. Run Scan from the next tab to check compliance',
    SAVE_BUTTON: 'Save Configuration',
    FIELD_USE_REGEX: {
        TITLE: 'Validate HTML files by Regex',
        SUB_INFO: '',
        DEFAULT_VALUE: false,
        PLACE_HOLDER: ''
    },
    FIELD_IGNORE_FILES_FOLDERS: {
        TITLE: 'Files and folders to exclude from above absolute path',
        SUB_INFO: '(comma separated)',
        DEFAULT_VALUE: 'node_modules, example.html',
        PLACE_HOLDER: 'node_modules, example.html'
    },
    FIELD_FILES_TO_VERIFY: {
        TITLE: 'HTML file(s) or URL(s) to validate',
        SUB_INFO: '(comma separated)',
        DEFAULT_VALUE: 'https://www.aarp.org/,/Users/Desktop/test-file.html',
        PLACE_HOLDER: 'https://www.aarp.org/,/Users/Desktop/test-file.html'
    },
    FIELD_DISABLE_RULES: {
        TITLE: 'Disable deque rule',
        SUB_INFO: 'WCAG 2.0 Rules',
        DEFAULT_VALUE: 'document-title, html-has-lang, landmark-one-main, page-has-heading-one, region, duplicate-id',
        PLACE_HOLDER: 'document-title, html-has-lang, landmark-one-main, page-has-heading-one, region, duplicate-id'
    },
    FIELD_FOLDER_PATH_TO_VERIFY: {
        TITLE: 'Absolute Path to folder ',
        SUB_INFO: '(HTML files to be scanned in the path including subfolders)',
        DEFAULT_VALUE: '/Documents/Projects/AARP/Repos/uxdia/ui.apps/src/main/content/jcr_root/apps/uxdia/',
        PLACE_HOLDER: '/Documents/Projects/AARP/Repos/uxdia/ui.apps/src/main/content/jcr_root/apps/uxdia/'
    },
};
export const A11Y_START_SCAN_MSG ='Start accessibility scan';
export const A11Y_SCAN_RESULTS_MSG = 'Accessibility results are available now.';
export const A11Y_SCAN_RESULTS_CSV_MSG = 'Scan Results are available as downloadable CSV files';
export const A11Y_OPEN_RESULTS_TBL_MSG = 'open results table for';

export const A11Y_EXPORT_AS_CSV_TEXT = 'Export as CSV';
export const A11Y_DOWNLOAD_AS_ZIP_TEXT = 'Download as Zip';

export const A11Y_SCAN_RESULTS_TBL = {
    TH_TEXT: {
        PAGE_URL: 'Page/URL',
        SCORE: 'A11Y Score',
        DETAIL_REPORT:'A11Y detailed report',
        MESSAGE: 'Message'
    },
    NO_RESULTS_TEXT: 'Currently nothing to display. Run Scan to see the results'
};

export const A11Y_AXE_CLI_OUTPUT_TEXT = {
    TOOL_STARTED: 'Accessibility Validation tool started.',
    FOR_URL: '\nExecuting for url = \n',
    CALCUALTED_SCORE: 'A11y score calculated as ',
    A11Y_ISSUE_DETECTED: 'Accessibility issue(s) detected.',
    NO_A11Y_ISSUE_DETECTED: 'No issue detected, all looks good.',
    INVALID_URL: 'Invalid file/url.',
    CSV_FILE_LOCATION_INFO: '✔ CSV file has been generated at location: ',
    INVALID_FILE_OR_PATH_FOR_SCAN: 'Unable to find any file to execute scan, set the correct path.'

}