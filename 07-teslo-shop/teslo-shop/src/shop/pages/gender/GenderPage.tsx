import { CustomPagination } from '@/components/customs/CustomPagination'
import { products } from '@/mocks/products.mock'
import { CustomJumbotron } from '@/shop/components/custom-jumbotron/CustomJumbotron'
import { ProductsGrid } from '@/shop/components/products-grid/ProductsGrid'
import { useParams } from 'react-router'


export const GenderPage = () => {

    const { gender } = useParams();

    const genderLabel = () => {

        const genders: Record<string, string> = {
            'men': 'Hombres',
            'women': 'Mujeres',
            'kid': 'Niños',
            'all': 'Todos',
        }

        return genders[gender || 'all'];
    }

    return (
        <>

            <CustomJumbotron
                title={`Productos para ${genderLabel()}`}
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
