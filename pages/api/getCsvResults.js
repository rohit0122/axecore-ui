import fs from "fs";
import { csv2json } from 'json-2-csv';
export default async function handler(req, res) {
    const csvFolderPath = `./public/artifacts/`;
    const csvFileToRead = req.query.csvFileName;
    const splitFolderName = ((csvFileToRead).replace('.csv','')).split('_');
    //console.log('splitFolderName', splitFolderName)
    const csvFileData = fs.readFileSync(
        `${csvFolderPath}/${splitFolderName[0]}/${splitFolderName[1]}/${csvFileToRead}`,
        { encoding: "utf8", flag: "r" }
    );

    const csvFileResults = await csv2json(csvFileData);
    res.status(200).json({ csvResultsAsJson: csvFileResults })
}
