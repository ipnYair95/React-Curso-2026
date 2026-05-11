import { AdminTitle } from '@/admin/components/AdminTitle'
import { CustomFullScreenLoading } from '@/components/customs/CustomFullScreenLoading'
import { CustomPagination } from '@/components/customs/CustomPagination'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { currencyFormatter } from '@/lib/currentcy-formatter'
import { useProducts } from '@/shop/hooks/useProducts'
import { PencilIcon, PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

export const AdminProductsPage = () => {

    const { data, isLoading } = useProducts();

    if (isLoading) {
        return <CustomFullScreenLoading />
    }


    return (
        <>

            <div className='flex justify-between items-center'>

                <AdminTitle
                    title='Productos'
                    subTitle='Listado de productos'
                />

                <div className='flex justify-end mb-10 gap-4'>

                    <Link to="/admin/products/new">
                        <Button className='mb-10'>
                            <PlusIcon />
                            Nuevo producto
                        </Button>
                    </Link>

                </div>

            </div>

            <Table className='bg-white p-10 shadow-xs border border-gray-200 mb-10'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead >Precio</TableHead>
                        <TableHead >Categoría</TableHead>
                        <TableHead >Inventario</TableHead>
                        <TableHead >Tallas</TableHead>
                        <TableHead className='text-right' >Acciones</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        data?.products.map(product => (
                            <TableRow>
                                <TableCell>
                                    <img src={product.images[0]} alt="producto" className='w-24 h-24 rounded object-cover' />
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin/products/${product.id}`} className="hover:underline">
                                        {product.title}
                                    </Link>
                                </TableCell>
                                <TableCell>{currencyFormatter(product.price)}</TableCell>
                                <TableCell>{product.gender}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.sizes.join(', ')}</TableCell>
                                <TableCell className='text-right'>
                                    <Link to={`/admin/products/${product.id}`}>
                                        <PencilIcon className='w-4 h-4 text-blue-500' />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>

            <CustomPagination totalPages={data?.pages || 0} />

        </>
    )
}
