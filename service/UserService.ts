import { makeUserId, makeNewUserName } from "../util/generateUtil";

export type Job = "Nube" | "Warrior" | "Wizard";

export class User {
  id?: string;
  name?: string;
  age?: number;
  job?: Job;

  constructor({ id, name, age, job }: User) {
    this.id = id ? id : makeUserId();
    this.name = name ? name : makeNewUserName();
    this.age = age ? age : NaN;
    this.job = job ? job : "Nube";
  }
}

export class UserService {
  public userRepo: User[];

  constructor(userRepo: User[]) {
    this.userRepo = userRepo;
  }

  /**
   * 전체 유저 조회 메소드
   * @example const userList = new UserService(userRepo).getUserList()
   */
  getUserList(): User[] {
    return this.userRepo;
  }

  /**
   * 단일 유저 조회 메소드
   * @example const user = new UserService(userRepo).getSingleUser(userId)
   */
  selectSingleUserData(userId: string): User {
    const allUserData = this.getUserList();

    const targetUserData = allUserData.find((user) => user.id === userId);

    if (!targetUserData) {
      throw new Error(`UserId not found. : ${targetUserData}`);
    }

    return targetUserData;
  }

  /**
   * 유저 생성 메소드
   * @param arrUserData
   * @example
   *    const userService = new UserService(userRepo)
   *    const addUserResult = userService.addUser([userData])
   *    console.log(addUserResult) // true | false
   * @returns true | false
   */
  addUser(arrUserData: User[]): boolean {
    let arrNewUser: User[] = [];

    // Make Process
    try {
      console.log(`[debug] [UserService.ts] [addUser] Process Start`);

      for (let i = 0; i < arrUserData.length; i++) {
        const newUser = new User(arrUserData[i]);
        console.log(
          `[debug] [UserService.ts] [addUser] [Make Process] New User : ${JSON.stringify(
            newUser
          )}`
        );

        arrNewUser.push(newUser);
      }
    } catch (error: any) {
      throw new Error(`Error on [Make Process] : ${error.message}`);
    }

    // Push Process
    try {
      this.userRepo.push(...arrNewUser);
      console.log(
        `[debug] [UserService.ts] [addUser] Repeat Count : ${arrNewUser.length}`
      );
    } catch (error: any) {
      throw new Error(`Error on [Push Process] : ${error.message}`);
    }

    console.log(`[result] [UserService.ts] [addUser] Process End`);
    return true;
  }
}
