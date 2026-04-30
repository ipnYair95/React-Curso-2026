import { CustomPagination } from '@/components/customs/CustomPagination'
import { CustomJumbotron } from '@/shop/components/custom-jumbotron/CustomJumbotron'
import { ProductsGrid } from '@/shop/components/products-grid/ProductsGrid'
import { useProducts } from '@/shop/hooks/useProducts'

export const HomePage = () => {

    const { data } = useProducts();

    return (
        <>

            <CustomJumbotron
                title='Todos los productos'
            />

            <ProductsGrid
                products={data?.products ?? []}
            />

            <CustomPagination
                totalPages={data?.pages ?? 0}
            />


        </>
    )
}
