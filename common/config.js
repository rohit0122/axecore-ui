
/**
 * If you want to run in bulk, if `findHtmlFromHere` is set, config will run on that path.
 * Set to FALSE if you want to run for selected files.
 */
export const findHtmlFromHere = false;//'/Users/rohit.shrivastava/Documents/Projects/AARP/Repos/uxdia/ui.apps/src/main/content/jcr_root/apps/uxdia/';

/**
 * Add files and folders that you want to exclude from accessibility test run.
 */
export const ignoreFileAndFolders = [
    'node_modules',
    'example.html'
];

/**
 * Variable `findHtmlFromHere` has priority, if you want to use script for selected file, set `findHtmlFromHere` to false.
 */
export const filesToVerify = [
    'https://www.aarp.org/',
    //'/Users/rohit.shrivastava/Desktop/test-file.html',
    //'/Users/rohit.shrivastava/Desktop/test-file2.html',
    'https://www.aarp.org/money/',
    //'https://www.aarp.org/rewards/',
    //'https://www.aarp.org/home-family/your-home/info-2021/candy-quiz.html',
    /*'https://www.aarp.org/health/conditions-treatments/info-07-2012/hip-replacement-quiz.html',
    'https://www.aarp.org/rewards/discover/',*/
];

/**
 * Rules to ignore
 */
export const disableRules = [
   /* 'document-title',
    'html-has-lang',
    'landmark-one-main',
    'page-has-heading-one',
    'region',
    'duplicate-id'*/
];


















    /*'https://www.aarp.org/',
    'https://www.aarp.org/money/',
    'https://www.aarp.org/health/healthy-living/info-2018/prescription-pill-bottle-drug-safety.html',
    'https://www.aarp.org/entertainment/celebrities/info-2017/famous-birthdays-november-photo.html?intcmp=AE-HP-TREND3-FD#slide1',
    'https://www.aarp.org/search/?q=&c=everywhere',
    'https://www.aarp.org/travel/',
    'https://blog.aarp.org/',
    'https://videos.aarp.org/',
    'https://states.aarp.org/',
    'https://www.thegirlfriend.com/' // issue
    'https://www.thegirlfriend.com/work/3-ways-millennial-proof-job',
    'https://www.sistersletter.com/',// issue
    'https://www.sistersletter.com/we-time/its-time-to-get-rid-of-toxic-friendships',
    'https://www.aarpethel.com/', // issue
    'https://www.aarp.org/work/careers/',
    'https://www.aarp.org/work/small-business/finding-mentors/',
    'https://www.aarp.org/work/social-security/',
    'https://www.aarp.org/retirement/social-security/questions-answers/benefits/',
    'https://www.aarp.org/retirement/social-security/questions-answers/social-security-full-retirement-age/'*/
    //'/Users/rohit.shrivastava/Desktop/test-file.html',
    /*'/Users/rohit.shrivastava/Documents/Projects/AARP/Repos/uxdia/ui.apps/src/main/content/jcr_root/apps/uxdia/components/content/quizcontentfragment/quizcontentfragment.html',
    '/Users/rohit.shrivastava/Documents/Projects/AARP/Repos/uxdia/ui.apps/src/main/content/jcr_root/apps/uxdia/components/content/quizcontentfragment/element.html'
    */