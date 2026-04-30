import { CustomPagination } from '@/components/customs/CustomPagination'
import { products } from '@/mocks/products.mock'
import { CustomJumbotron } from '@/shop/components/custom-jumbotron/CustomJumbotron'
import { ProductsGrid } from '@/shop/components/products-grid/ProductsGrid'

export const HomePage = () => {
    return (
        <>

            <CustomJumbotron
                title='Todos los productos'
            />

            <ProductsGrid
                products={products}
            />

            <CustomPagination
                totalPages={7}
            />


        </>
    )
}
