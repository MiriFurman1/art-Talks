const BASE_URL = 'http://localhost:5000/api';

export const fetchTodos = async () => {
    try {
        const response = await fetch(`${BASE_URL}/todos`);
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e);
    }

};

export const createTodo = async (todo) => {
    const response = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    const data = await response.json();
    return data;
};

export const updateTodo = async (id, todo) => {

    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    const data = await response.json();
    return data;
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
};