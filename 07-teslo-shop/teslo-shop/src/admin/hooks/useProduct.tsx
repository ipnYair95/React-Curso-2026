import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action ";
import { createUpdateProductAction } from "../actions/create-update-product.action";
import { toast } from "sonner";
import { useNavigate } from "react-router";


export const useProduct = (id: string) => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const query = useQuery({
        queryKey: ['product', {
            id
        }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product) => {

            queryClient.invalidateQueries({
                queryKey: ['products']
            });

            queryClient.invalidateQueries({
                queryKey: ['products', {
                    id: product.id
                }]
            })

            queryClient.setQueryData(['product', {
                id: product.id
            }], product);

            toast.success('Producto guardado correctamente');
            navigate(`/admin/products/${product.id}`);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Error al guardar el producto');
        }
    });

    return {
        ...query,
        mutation
    }

}
