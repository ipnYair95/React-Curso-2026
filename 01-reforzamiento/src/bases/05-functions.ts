function greet(name: string): string {
    return `Hello ${name}`;
}

const greet2 = (name: string) => `Hello ${name}`;

const message = greet('Yair');
const message2 = greet2('Yair');

console.log(message);
console.log(message2);


function getUser() {
    return {
        uid: 'ABC123',
        username: 'Yair'
    }
}

const getUser2 = () => ({
    uid: 'ABC123',
    username: 'Yair'
});

const user = getUser();
const user2 = getUser2();

console.log(user)
console.log(user2)

const myNumbers: number[] = [1, 2, 3, 4, 5];

myNumbers.forEach(console.log)