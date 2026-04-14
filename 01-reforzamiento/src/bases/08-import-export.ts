import { heroes, Owner, type IHero } from "./data/heroes.data"

const getHeroById = (id: number): IHero | undefined => {

    const hero = heroes.find(h => h.id === id);

    return hero;

}

console.log(getHeroById(1))

const getHeroesByOwner = (owner: Owner): IHero[] => {

    return heroes.filter(h => h.owner === owner);

}

console.log(getHeroesByOwner(Owner.DC))