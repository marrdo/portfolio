const initialState = {
    value: 0
};

export default function exampleReducer(state = initialState, action) {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, value: state.value + 1 };
        case "DECREMENT":
            return { ...state, value: state.value - 1 };
        default:
            return state;
    }
}