import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumps } from '@/components/custom/CustomBreadcrumps';
import { useSearchHero } from '@/heroes/hooks/useSearchHero';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { useSearchParams } from 'react-router'; 

const SearchPage = () => {

    const [searchParams] = useSearchParams(); 

    const { data: heroes } = useSearchHero({
        name: searchParams.get('name') || '',
        strength: searchParams.get('strength') || '',
    });

    return (
        <>

            <CustomJumbotron title='Búsqueda de superheroes' description="Descubre, explora y administra superheroes y villanos" />

            <CustomBreadcrumps currentPage="Buscador de superheroes" breadcrumbs={[]} />

            <HeroStats />

            {/* Filter and search */}
            <SearchControls />

            <HeroGrid heroes={heroes || []} />

        </>
    )
}

export default SearchPage;