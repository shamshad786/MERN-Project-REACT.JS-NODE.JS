export const initialState = null;

export const reducer = (state, action)=>{ // ye reducer 2 parameter leta hai 'state, action' basically hum action se dispatch ki value ke 'type' ko get karte hai aur 'dispatch' se 'state' apne aap values le leta hai 
        if(action.type === "USER"){
            return action.payload; // yaha dispatch ke ander payload bhi define hota uske value ko yaha return kiya jo bhi true/false hoga
        }
        return state; // dispatch ke values update hote hi state apne aap values get kar leta hai aur usko yaha return kar diya taki hum 'state' ko use kar sake
}