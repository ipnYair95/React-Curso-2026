import type { IHero } from "./get-heroes.response";

export interface ISummaryInformationResponse {
    totalHeroes:   number;
    strongestHero: IHero;
    smartestHero:  IHero;
    heroCount:     number;
    villainCount:  number;
}
