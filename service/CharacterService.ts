import { makeCharacterId, makeNewCharacterName } from "../util/generateUtil";
import { Job } from "../interface/character";

export class Character {
  name: string;
  id?: string;
  level?: number;
  job?: Job;

  constructor({ name }: Character) {
    this.name = name ? name : makeNewCharacterName();
    this.id = makeCharacterId();
    this.level = 0;
    this.job = "Nube";
  }

  public levelUp(): void | false {
    if (!this.level) return false;

    this.level += 1;
  }
}

export class CharacterService {
  public CharacterRepo: Character[];

  constructor(CharacterRepo: Character[]) {
    this.CharacterRepo = CharacterRepo;
  }

  /**
   * 전체 캐릭터 목록 조회 메소드
   * @example const CharacterList = new CharacterService(CharacterRepo).getCharacterList()
   */
  getCharacterList(): string[] {
    let arrAllCharacter: string[] = [];

    for (let i = 0; i < this.CharacterRepo.length; i++) {
      const Character = this.CharacterRepo[i];
      arrAllCharacter.push(Character.name);
    }

    return arrAllCharacter;
  }

  /**
   * 단일 캐릭터 조회 메소드
   * @example const Character = new CharacterService(CharacterRepo).getSingleCharacter(CharacterId)
   */
  selectSingleCharacterData(CharacterId: string): Character {
    const allCharacterData = this.CharacterRepo;

    const targetCharacterData = allCharacterData.find(
      (Character) => Character.id === CharacterId
    );

    if (!targetCharacterData) {
      throw new Error(`CharacterId not found. : ${targetCharacterData}`);
    }

    return targetCharacterData;
  }

  /**
   * 캐릭터 생성 메소드
   * @param arrCharacterData
   * @example
   *    const CharacterService = new CharacterService(CharacterRepo)
   *    const addCharacterResult = CharacterService.addCharacter([CharacterData])
   *    console.log(addCharacterResult) // true | false
   * @returns true | false
   */
  addCharacter(arrCharacterData: Character[]): boolean {
    let arrNewCharacter: Character[] = [];

    // Make Process
    try {
      console.log(`[debug] [CharacterService.ts] [addCharacter] Process Start`);

      for (let i = 0; i < arrCharacterData.length; i++) {
        const newCharacter = new Character(arrCharacterData[i]);
        console.log(
          `[debug] [CharacterService.ts] [addCharacter] [Make Process] New Character
          : ${JSON.stringify(newCharacter)}`
        );

        arrNewCharacter.push(newCharacter);
      }
    } catch (error: any) {
      console.error(`Error on [Make Process] : ${error.message}`);
      return false;
    }

    // Push Process
    try {
      this.CharacterRepo.push(...arrNewCharacter);
      console.log(
        `[debug] [CharacterService.ts] [addCharacter] Repeat Count : ${arrNewCharacter.length}`
      );
    } catch (error: any) {
      console.error(`Error on [Push Process] : ${error.message}`);
      return false;
    }

    console.log(`[result] [CharacterService.ts] [addCharacter] Process End`);
    return true;
  }
}
