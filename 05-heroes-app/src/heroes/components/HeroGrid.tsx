import type { IHero } from '../interfaces/get-heroes.response'
import { HeroGridCard } from './HeroGridCard'

interface IProps {
    heroes: IHero[];
}

export const HeroGrid = ({ heroes = [] }: IProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">

            {
                heroes.map((hero) => (
                    <HeroGridCard key={hero.id} hero={hero} />
                ))
            }

        </div>
    )
}
