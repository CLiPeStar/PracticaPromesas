export class Request {

    constructor(private _sql: string, private _searchParams) {
    }


    get sql(): string {
        return this._sql;
    }

    get searchParams(): [] {
        return this._searchParams;
    }


}
