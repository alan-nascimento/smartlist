import { Equal } from '../helpers/index';

export class Task implements Equal<Task> {

  constructor(
// tslint:disable-next-line: variable-name
    readonly _id: string,
    readonly description: string,
    readonly priority: string,
    readonly date: Date,
  ) {}

  isEqual(task: Task): boolean {
    return this._id === task._id;
  }
}
