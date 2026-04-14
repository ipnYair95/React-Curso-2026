import { Heart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useMemo } from "react"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumps } from "@/components/custom/CustomBreadcrumps"
import { useSearchParams } from "react-router"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"

export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();


    const activeTab = searchParams.get('tab') || 'all';

    const page = searchParams.get('page') || '1';

    const limit = searchParams.get('limit') || '6';

    const category = searchParams.get('category') || 'all';

    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

    const { data: summary } = useHeroSummary();


    const onHandleTab = (tab: 'all' | 'favorites' | 'heroes' | 'villains', category: 'all' | 'hero' | 'villain') => {

        setSearchParams((prevParams) => {

            prevParams.set('tab', tab);
            prevParams.set('category', category);
            prevParams.set('page', '1');

            return prevParams;

        });

    }

    const selectedTab = useMemo(() => {

        const validTabs = ['all', 'favorites', 'heroes', 'villains'];

        return validTabs.includes(activeTab) ? activeTab : 'all';

    }, [activeTab]);

    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron title='Universo de superheroes' description="Descubre, explora y administra superheroes y villanos" />

                <CustomBreadcrumps currentPage="Super Heroes" />

                {/* Stats Dashboard */}
                <HeroStats />

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">

                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all" onClick={() => onHandleTab('all', 'all')}>All Characters ({summary?.totalHeroes})</TabsTrigger>
                        <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={() => onHandleTab('favorites')}>
                            <Heart className="h-4 w-4" />
                            Favorites (3)
                        </TabsTrigger>
                        <TabsTrigger value="heroes" onClick={() => onHandleTab('heroes', 'hero')}>Heroes ({summary?.heroCount})</TabsTrigger>
                        <TabsTrigger value="villains" onClick={() => onHandleTab('villains', 'villain')}>Villains ({summary?.villainCount})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <h1>Todos los personajes</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />

                    </TabsContent>

                    <TabsContent value="favorites">
                        <h1>Personajes favoritos</h1>
                        {/* <HeroGrid heroes={heroesResponse?.heroes ?? []} /> */}
                    </TabsContent>

                    <TabsContent value="heroes">
                        <h1>Heroes</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>

                    <TabsContent value="villains">
                        <h1>Villains</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>

                </Tabs>

                {/* Pagination */}
                <CustomPagination totalPages={heroesResponse?.pages || 1} />
            </>
        </>
    )
}
