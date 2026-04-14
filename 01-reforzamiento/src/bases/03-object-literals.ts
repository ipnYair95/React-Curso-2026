interface IPerson {
    firstName: string;
    lastName: string;
    age: number;
    address: IAddress;
}

interface IAddress{
    country: string;
    city: string
}

const spiderman: IPerson = {
    firstName: 'Peter',
    lastName: 'Parker',
    age: 20,
    address: {
        country: 'USA',
        city: 'New York'
    }
}

console.log(spiderman)