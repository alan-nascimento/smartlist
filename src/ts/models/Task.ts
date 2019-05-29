export class Task {

  constructor(
// tslint:disable-next-line: variable-name
    readonly _id: string,
    readonly description: string,
    readonly priority: string,
    readonly date: Date,
    ) {}
}
