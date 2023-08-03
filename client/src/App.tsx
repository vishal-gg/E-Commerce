import { useReducer } from "react";

interface actionType {
    type: string;
    payload: string;
}

interface stateType {
    name: string;
    age: number;
    mood: string;
}

const initialState = {
    name: 'ajit',
    age: 21, 
    mood: 'horny'
}

const reducer = (state:stateType, action:actionType) => {
    
 switch (action.type) {
   case 'change_name':
     return { ...state, name: state.name = action.payload };
   case 'change_age':
     return { ...state, age: state.age = 22 };
   case 'change_mood':
     return { ...state, mood: state.mood = 'happy' };
   default:
     return state;
 }
 
}

const App = () =>  {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <div>
            <h1 className="text-red-400">name: {state.name}</h1>
            <h1>age: {state.age}</h1>
            <h1>mood: {state.mood}</h1>
            <button onClick={()=> dispatch({type: 'change_name', payload: 'vishal'})}>name</button>
            <button onClick={()=> dispatch({type: 'change_age', payload: ''})}>age</button>
            <button onClick={()=> dispatch({type: 'change_mood', payload: ''})}>mood</button>
        </div>
    )
}

export default App;