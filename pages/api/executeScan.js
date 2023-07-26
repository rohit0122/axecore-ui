import { debugIt } from "../../common/constants";
import AxeCmdCallBack from "../../components/AxeCmd";
import AxeCmdPuppeteer from "../../components/AxeCmdPuppeteer";

export default async function handler(req, res) {
  //debugIt && ('req   ', req.body)
  //await AxeCmdCallBack(req)
  await AxeCmdPuppeteer(req);
  res.status(200).json({ name: 'John Doe' })
}
