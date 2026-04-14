const characterNames = ['Goku', 'Vegeta', 'Trunks'];

const [, p2, p3] = characterNames;

console.log({
    p2
})


const returmsArrayFn = () => {
    return ['ABC', 123] as const;
}

const [letters, numbers] = returmsArrayFn();



console.log(letters + 100)

// use state

const useState = <T>(value: T) => {
    return [value, (param: T) => console.log(param)] as const;
}

const [name, setName] = useState<string>('Yair');

console.log(name)

setName('Yair 2')

console.log(name)