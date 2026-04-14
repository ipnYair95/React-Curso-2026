import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import React from 'react'
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumps } from '@/components/custom/CustomBreadcrumps';

const SearchPage = () => {
    return (
        <>

            <CustomJumbotron title='Búsqueda de superheroes' description="Descubre, explora y administra superheroes y villanos" />

            <CustomBreadcrumps currentPage="Buscador de superheroes" breadcrumbs={[
                {
                    label: 'Super Heroes',
                    to: '/heroes'
                },
                {
                    label: 'Search',
                    to: '/heroes/search'
                },
                {
                    label: 'Filters',
                    to: '/heroes/search/filters'
                }
            ]} />

            <HeroStats />

            {/* Filter and search */}
            <SearchControls />

        </>
    )
}

export default SearchPage;