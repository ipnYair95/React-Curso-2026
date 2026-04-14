import type { CSSProperties } from "react";
import { ItemCounter } from "./shooping-cart/ItemCounter";

const firstName = 'Yair';
const lastName = 'Marin';

const favoriteGames = ['Kingdom Hearts', 'Super Smash Bros', 'Final Fantasy'];
const isActive = true;

const address = {
    zipCode: 12345,
    country: 'Colombia'
};

const myStyles: CSSProperties = {
    backgroundColor: isActive ? 'green' : 'red',
    borderRadius: '5px',
    padding: '10px'
}

interface ItemInCart{
    productName: string;
    quantity: number;
}

const itemsInCart: ItemInCart[] = [
    
    {
        productName: 'Nintendo Switch 2',
        quantity: 1
    },

    {
        productName: 'Console',
        quantity: 2
    },

    {
        productName: 'Super Smash Bros',
        quantity: 3
    },

]

export const FirstStepsApp = () => {

    return (
        <div data-testid="firstStepsApp">
            <h1 data-testid="firstNameId">{firstName}</h1>
            <h3>{lastName}</h3>
            <h1>{isActive ? 'Activo' : 'Inactivo'}</h1>
            <h4>{favoriteGames.join(', ')}</h4>


            <p style={myStyles} >
                {JSON.stringify(address)}
            </p>

            <h1>Carrito de compras</h1>
            
            {
                itemsInCart.map(item => (
                    <ItemCounter key={item.productName} name={item.productName} quantity={item.quantity} />
                ))
            }

        </div>
    )
}
