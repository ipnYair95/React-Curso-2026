import { AdminTitle } from '@/admin/components/AdminTitle'
import { CustomPagination } from '@/components/customs/CustomPagination'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

export const AdminProductsPage = () => {
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
                        <TableHead className="w-25">ID</TableHead>
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
                    <TableRow>
                        <TableCell className="font-medium">1</TableCell>
                        <TableCell>
                            <img src="https://placehold.co/250x250" alt="producto" className='w-24 h-24 rounded object-cover' />
                        </TableCell>
                        <TableCell>Producto</TableCell>
                        <TableCell>$19.99</TableCell>
                        <TableCell>Categoria</TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>S, M, L, XL</TableCell>
                        <TableCell className='text-right'>
                            <Link to={`/admin/products/slug`}>
                                Editar
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <CustomPagination totalPages={10} />

        </>
    )
}
