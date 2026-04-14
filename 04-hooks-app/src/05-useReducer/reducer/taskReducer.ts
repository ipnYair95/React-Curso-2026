import * as z from "zod";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskState {
    todos: Todo[];
    length: number;
    completed: number;
    pending: number
}

export type TaskAction =
    | { type: 'ADD_TODO', payload: string }
    | { type: 'TOGGLE_TODO', payload: number }
    | { type: 'DELETE_TODO', payload: number }


const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean()
})

const TaskStateSchema = z.object({
    todos: z.array(TodoSchema),
    length: z.number(),
    completed: z.number(),
    pending: z.number()
})


export const getTaskInitialState = (): TaskState => {

    const localStorageTasks = localStorage.getItem('tasks');

    if (!localStorageTasks) {
        return {
            todos: [],
            length: 0,
            completed: 0,
            pending: 0
        }
    }

    const result = TaskStateSchema.safeParse(JSON.parse(localStorageTasks));

    if (result.error) {
        console.error(result.error);
        return {
            todos: [],
            length: 0,
            completed: 0,
            pending: 0
        }
    }

    return result.data;

};

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {

    switch (action.type) {
        case 'ADD_TODO': {

            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false
            };

            return {
                ...state,
                length: state.todos.length + 1,
                pending: state.pending + 1,
                todos: [...state.todos, newTodo]
            };
        }

        case 'TOGGLE_TODO': {

            const updatedTodos = state.todos.map((todo) => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            })

            return {
                ...state,
                completed: updatedTodos.filter((todo) => todo.completed).length,
                pending: updatedTodos.filter((todo) => !todo.completed).length,
                todos: updatedTodos
            }

        }

        case 'DELETE_TODO': {

            const updatedTodos = state.todos.filter((todo) => todo.id !== action.payload);

            return {
                ...state,
                length: state.length - 1,
                pending: updatedTodos.filter((todo) => !todo.completed).length,
                completed: updatedTodos.filter((todo) => todo.completed).length,
                todos: updatedTodos
            }

        }

        default:
            return state;

    }

}