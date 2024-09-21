import { cbConfirmationKeys } from "@/config";

export const sexDictionary = {
  0: "Не указан",
  1: "Женский",
  2: "Мужской",
} as const;

export const groupDictionary: Record<keyof typeof cbConfirmationKeys, string> =
  {
    214492387: "Тестовое сообщество",
    2895664: "Научный Иммортализм и Трансгуманизм",
    118918081: "АПС",
  };

export type TGroupId = keyof typeof cbConfirmationKeys;
