export default function repositoriesReducer(state = {
    repositories: []
}, action) {
    if (action.type === "FETCH_REPOS") {
        return {...state, repositories: action.payload};
    }
    return state;
};