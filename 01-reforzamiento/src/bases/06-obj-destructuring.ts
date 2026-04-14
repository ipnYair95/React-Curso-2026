interface IHero {
    name: string;
    age: number;
    key: string;
    rank?: string;
}

const person: IHero = {
    name: 'Yair',
    age: 20,
    key: '123'
}

const useContext = ({
    name,
    age,
    key,
    rank
}: IHero) => {

    return {
        keyName: key,
        user: {
            name,
            age
        },
        rank
    }

}

const { keyName, user: { name, age }, rank = 'No rank' } = useContext(person);

console.log({
    keyName,
    name,
    age,
    rank
});
