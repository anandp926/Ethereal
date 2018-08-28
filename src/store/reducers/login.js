/**
 * Created by rozer on 8/16/2018.
 */
import * as actionType from '../actions/action-type'

const initialState = {
    session: !!sessionStorage.jwt
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.LOGIN:
            return{
                session: !!sessionStorage.jwt,
            }
        case actionType.LOGOUT:
            return{
                session: !!sessionStorage.jwt
            }
        default:
            return state
    }
}

export default reducer;
