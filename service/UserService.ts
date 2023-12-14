import { makeUserId, makeUserName } from "../util/generateUtil";

export type Job = "Nube" | "Warrior" | "Wizard";

export class User {
  id?: string;
  name?: string;
  age?: number;
  job?: Job;

  constructor({ id, name, age, job }: User) {
    this.id = id ? id : makeUserId();
    this.name = name ? name : makeUserName();
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
   * @example new UserService(userRepo).addUser([userData])
   */
  addUser(arrUserData: User[]) {
    try {
      switch (arrUserData.length === 1) {
        // 단건 생성
        case true:
          {
            const newUser = new User(arrUserData[0]);
            this.userRepo.push(newUser);
          }
          break;

        // 다건 생성
        case false:
          {
            for (let i = 0; i < arrUserData.length; i++) {
              const newUser = new User(arrUserData[i]);
              this.userRepo.push(newUser);
            }
          }
          break;
      }
    } catch (error: any) {
      throw new Error(`Error on addUser Process : ${error.message}`);
    }
  }
}
