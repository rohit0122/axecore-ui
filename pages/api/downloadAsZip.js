
import { zip } from 'zip-a-folder';
import fs from 'fs';
import { PROJECT_DOMAIN, debugIt } from '../../common/constants';

export default async function handler(req, res) {
    const csvFileGetFolder = req.query.csvFileName;
    const reportFolderPath = `${process.cwd()}/public/artifacts`;
    const reportZipPath = `${process.cwd()}/public/zipper`;
    const outputDir = `${reportZipPath}/reports.zip`;
    if (csvFileGetFolder) {
        if (!fs.existsSync(reportZipPath)) {
            fs.mkdirSync(reportZipPath, { recursive: true });
        }
        fs.mkdirSync(reportZipPath, { recursive: true });

        const splitFolderName = ((csvFileGetFolder).replace('.csv', '')).split('_');
        debugIt && console.log('splitFolderName', splitFolderName);
        const inputDir = `${reportFolderPath}/${splitFolderName[0]}/${splitFolderName[1]}/`;
        debugIt && console.log('inputDir', inputDir)
        debugIt && console.log('outputDir', outputDir)
        await zip(inputDir, outputDir)
    }
    //res.status(200).json({ zipToDownload: `${PROJECT_DOMAIN}zipper/reports.zip` })
    res.status(200).json({ zipToDownload: `${outputDir}` })

}