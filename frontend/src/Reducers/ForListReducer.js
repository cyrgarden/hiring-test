//This JS file is used by Table et Sidebar components
//It allows Table.tsx to get the value of a "country_button" from Sidebar.tsx

const INITIAL_STATE = {
    city : "All cities", //By default, value = "All cities"

}


function ForListReducer(state= INITIAL_STATE, action){
    //Did a switch in case we need to add more actions in the future
    switch(action.type){
        case 'GET': {
            return{
                ...state,
                city : action.city,
            }
        }
    }

    return state;
}


export default ForListReducer;