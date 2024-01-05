import Game from "inquirer";
import * as _ from "lodash";

let callCount = 0;

export class BaseService {
  public instance: null | ReturnType<typeof this.getInstance> = null;

  constructor() {
    callCount += 1;
    console.log(`[BaseService.ts] Call Count : ${callCount}`);

    if (!this.instance) {
      this.instance = this.getInstance();
    }
  }

  private getInstance() {
    console.log(`[BaseService.ts] getInstance End`);

    return {
      Game: Game.prompt,
      fsLodash: _,
    };
  }
}
