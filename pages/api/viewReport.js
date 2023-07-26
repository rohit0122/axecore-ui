
import fs from 'fs';

export default async function handler(req, res) {
    const htmlReportFolder = req.query.htmlReportPath;
    const reportFolderPath = `${process.cwd()}/public/${htmlReportFolder}`;

    if (!fs.existsSync(reportFolderPath)) {
        res.status(404).send('invalid path');
    }
    res.setHeader('Content-Type', 'application/html');
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.write(await fs.readFileSync(reportFolderPath, "utf-8"));
    res.end();

}