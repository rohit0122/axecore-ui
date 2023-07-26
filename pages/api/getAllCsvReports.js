import { glob } from "glob";
import { PROJECT_DOMAIN } from "../../common/constants";
export default async function handler(req, res) {
    const csvFolderPath = `./public/artifacts/`;
    const csvFiles = await glob(csvFolderPath + "**/*.csv", { withFileTypes: true, stat: true });
    const sortedCsvFiles = csvFiles.sort((a, b) =>  b.mtime - a.mtime).map(p => (p.fullpath()).replace(process.cwd()+'/public/',''));
    //res.status(200).json({ csvReports: sortedCsvFiles })
    let arrangeInGroups = {};
    for(let file of sortedCsvFiles){
        let csvFileName = (file.substring((file.lastIndexOf('/') !== -1 ? file.lastIndexOf('/') : file.lastIndexOf('\\') ) + 1));
        let httpFileUrl = PROJECT_DOMAIN+file;
        let fileGroup = csvFileName.split('_');
        if(!arrangeInGroups[fileGroup[0]]){
            arrangeInGroups[fileGroup[0]] = [];
        }
        arrangeInGroups[fileGroup[0]].push({fileGroup: fileGroup[0], csvFileName, httpFileUrl});
    }

    res.status(200).json({ csvReports: arrangeInGroups })
}
