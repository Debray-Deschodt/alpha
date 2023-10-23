export interface AnimalInterface {
    name : string;
    sex: boolean;
}

export interface AdjectiveInterface {
    adjM: string;
    adjF: string;
}

export interface NicknameInterface {
    animals: AnimalInterface[];
    adjectives: AdjectiveInterface[];
}