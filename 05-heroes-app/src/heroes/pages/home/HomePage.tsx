import { Heart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { use, useMemo } from "react"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumps } from "@/components/custom/CustomBreadcrumps"
import { useSearchParams } from "react-router"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"

export const HomePage = () => {

    const { favoriteCount, favorites } = use(FavoriteHeroContext);

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
                        <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={() => onHandleTab('favorites', 'all')}>
                            <Heart className="h-4 w-4" />
                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger value="heroes" onClick={() => onHandleTab('heroes', 'hero')}>Heroes ({summary?.heroCount})</TabsTrigger>
                        <TabsTrigger value="villains" onClick={() => onHandleTab('villains', 'villain')}>Villains ({summary?.villainCount})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>

                    <TabsContent value="favorites">
                        <HeroGrid heroes={favorites ?? []} />
                    </TabsContent>

                    <TabsContent value="heroes">
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>

                    <TabsContent value="villains">
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>

                </Tabs>

                {/* Pagination */}
                {
                    selectedTab !== 'favorites' && <CustomPagination totalPages={heroesResponse?.pages || 1} />
                }
            </>
        </>
    )
}
