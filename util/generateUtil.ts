import { v4 as uuid } from "uuid";

/**
 * 유저 pk 생성 메소드
 * @example
 * import { makeUserId } from '../util/generateUtil'
 * const randomUserId = makeUserId()
 * @returns uid_7f3eb0be5d454c2488f07a2068a7f2e3
 */
export const makeCharacterId = (): string => {
  return `cid_${uuid().replace(/-/g, "")}`;
};

/**
 * 유저의 최초 이름 생성 메소드
 * @example
 * import { makeUserName } from '../util/generateUtil'
 * const randomUserName = makeUserName()
 * @returns user_5dd3ac39
 */
export const makeNewCharacterName = (): string => {
  return `nube_${uuid().replace(/-/g, "").substring(0, 8)}`;
};
