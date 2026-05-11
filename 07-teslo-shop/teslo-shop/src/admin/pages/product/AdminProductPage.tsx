// https://github.com/Klerith/bolt-product-editor
import { Navigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/customs/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';

 
export const AdminProductPage = () => {

    const { id } = useParams();

    const { data: product, isLoading, isError, mutation } = useProduct(id || '');

    const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto';

    const productSubtitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.';

    const handleSubmit = async (productLike: Partial<Product>) => {

        await mutation.mutateAsync(productLike);

    };

    if (isError) {
        return <Navigate to='/admin/products' />
    }

    if (isLoading) {
        return <CustomFullScreenLoading />
    }

    if (!product) {
        return <Navigate to='/admin/products' />
    }

    return (
        <ProductForm
            isPending={mutation.isPending}
            product={product}
            title={productTitle}
            subTitle={productSubtitle}
            onSubmit={handleSubmit}
        />
    );
};