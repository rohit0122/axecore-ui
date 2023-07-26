
import fs from 'fs';
import { debugIt } from '../../common/constants';

export default async function handler(req, res) {
    const csvFileGetFolder = req.query.csvFileName;
    const reportFolderPath = `${process.cwd()}/public/artifacts`;
    if (csvFileGetFolder) {
        const splitFolderName = ((csvFileGetFolder).replace('.csv', '')).split('_');
        debugIt && console.log('splitFolderName', splitFolderName);
        const csvFilePath = `${reportFolderPath}/${splitFolderName[0]}/${splitFolderName[1]}/${csvFileGetFolder}`;
        debugIt && console.log('csvFilePath', csvFilePath);
        if(!fs.existsSync(csvFilePath)){
            res.status(404).send('invalid path');
        }
        res.setHeader('Content-Type', 'application/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${csvFileGetFolder}`);
        fs.createReadStream(csvFilePath).pipe(res);
    }

}