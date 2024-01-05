import { BaseService } from "./BaseService";
import { User, DefaultReturn } from "../interface/public";

export class UserService extends BaseService {
  public isUser: boolean;
  public UserDB: User[];

  constructor(isUser: boolean, UserDB: User[]) {
    super();

    this.isUser = isUser;
    this.UserDB = UserDB;
  }

  async login(): Promise<DefaultReturn> {
    switch (this.isUser) {
      case true: {
        const { id } = await this.instance!.Game({
          name: "id",
          message: "Please write your id",
          type: "input",
        });

        const { pw } = await this.instance!.Game({
          name: "pw",
          message: "Please write your pw",
          type: "password",
        });

        return { success: false, data: {} };
      }

      case false: {
        const { isSignUp } = await this.instance!.Game({
          name: "isSignUp",
          message: "Would you like to sign up?",
          type: "list",
          choices: [
            { name: "Yes", value: true },
            { name: "No", value: false },
          ],
        });

        if (isSignUp) {
          const signUpResult = await this.signup();
          return signUpResult;
        } else {
          console.log("The fantasy world will wait for you! 🔮");
          return { success: false, data: {} };
        }
      }
    }
  }

  async signup(): Promise<DefaultReturn> {
    const _UserDB = this.instance!.fsLodash.cloneDeep(this.UserDB);

    function validateUserId(id: string) {
      const isEmpty = id ? true : false;
      if (!isEmpty) {
        console.error("⚠️  this id is empty, please input new id");
        return false;
      }

      let isExist: number | boolean = _UserDB.findIndex(
        (user) => user.id === id
      );
      isExist = isExist === -1 ? true : false;

      if (!isExist) {
        console.error("⚠️  this id already exists, please input new id");
        return false;
      }

      return true;
    }

    let isIdValidate = false;
    let id = "";

    while (!isIdValidate) {
      id = await this.instance!.Game({
        name: "id",
        message: "Please write id you want to use",
        type: "input",
      }).then((result) => {
        return result.id;
      });

      isIdValidate = validateUserId(id);
    }

    const { pw } = await this.instance!.Game({
      name: "pw",
      message: "Please write password you want to use",
      type: "password",
    });

    const { name } = await this.instance!.Game({
      name: "name",
      message: "Please write name you want to use",
      type: "input",
    });

    try {
      this.UserDB.push({
        id,
        pw,
        name,
      });
    } catch (error: any) {
      console.error(error.message);
      return {
        success: false,
        data: {},
        error: { code: "A001", message: "insert" },
      };
    }

    console.log(`Welcome to the world of [Fantasy Story]!, ${name}`);
    return {
      success: true,
      data: {
        userId: id,
      },
    };
  }
}
