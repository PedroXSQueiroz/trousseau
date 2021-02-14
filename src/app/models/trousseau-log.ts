import { TrousseauStatus } from "../contants/trousseau-status";
import Log from "./log";

export default class TrousseauLog extends Log
{
    private _status: TrousseauStatus

    get status():TrousseauStatus
    {
        return this._status;
    }

    set status(status:TrousseauStatus)
    {
        this._status = status;
    }
}