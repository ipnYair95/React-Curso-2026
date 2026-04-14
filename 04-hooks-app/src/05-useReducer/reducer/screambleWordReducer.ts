export interface ScrambleWordsState {

    words: string[]
    currentWord: string
    guess: string
    isGameOver: boolean
    maxAllowErrors: number
    scrambledWord: string
    points: number
    errorCounter: number
    skipCounter: number
    maxSkips: number
    totalWords: number

}

const GAME_WORDS = [
    'REACT',
    'JAVASCRIPT',
    'TYPESCRIPT',
    'HTML',
    'ANGULAR',
    'SOLID',
    'NODE',
    'VUEJS',
    'SVELTE',
    'EXPRESS',
    'MONGODB',
    'POSTGRES',
    'DOCKER',
    'KUBERNETES',
    'WEBPACK',
    'VITE',
    'TAILWIND',
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
    return word
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
};

export type ScrambleWordsAction =
    | { type: 'SET_GUESS', payload: string }
    | { type: 'CHECK_ANSWER' }
    | { type: 'SKIP_WORD' }
    | { type: 'RESET_GAME', payload: ScrambleWordsState }

export const getInitialState = (): ScrambleWordsState => {

    const shuffledWords = shuffleArray([...GAME_WORDS]);

    return {
        words: shuffledWords,
        currentWord: shuffledWords[0],
        guess: '',
        isGameOver: false,
        maxAllowErrors: 3,
        scrambledWord: scrambleWord(shuffledWords[0]),
        points: 0,
        errorCounter: 0,
        skipCounter: 0,
        maxSkips: 3,
        totalWords: shuffledWords.length
    };

}

export const scrambleWordReducer = (state: ScrambleWordsState, action: ScrambleWordsAction): ScrambleWordsState => {

    switch (action.type) {

        case 'SET_GUESS': {

            return {
                ...state,
                guess: action.payload?.trim()?.toUpperCase()
            }

        }

        case 'CHECK_ANSWER': {

            if (state.currentWord === state.guess) {

                const newWords = state.words.slice(1);

                return {
                    ...state,
                    words: newWords,
                    points: state.points + 1,
                    currentWord: newWords[0],
                    scrambledWord: scrambleWord(newWords[0]),
                    guess: ''
                }
            }


            return {
                ...state,
                errorCounter: state.errorCounter + 1,
                isGameOver: state.errorCounter >= state.maxAllowErrors,
                guess: ''
            }

        }

        case 'SKIP_WORD': {

            if(state.skipCounter >= state.maxSkips) {
                return state;
            }

            const updatedWords = state.words.filter(word => word !== state.currentWord);

            return {
                ...state,
                skipCounter: state.skipCounter + 1,
                words: updatedWords,
                currentWord: updatedWords[0],
                scrambledWord: scrambleWord(updatedWords[0]),
                guess: ''
            }
        }

        case 'RESET_GAME': {
         
            return action.payload;

        }

        default:
            return state;
    }

}