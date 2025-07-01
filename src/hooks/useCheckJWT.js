import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUser,setLogin } from "../components/store/slicers/userSlicer";
import { useSelector } from "react-redux";
const useCheckJWT = () => {
    let token = localStorage.getItem('jwtToken');
    const dispatch = useDispatch();
    const {isLogined} = useSelector(state=> state.user)
    if (!isLogined && token) {
        const decoded = jwtDecode(token);
        console.log('я вызывался');
        dispatch(getUser(decoded.username));
        dispatch(setLogin())
        return {
            username: decoded.username,
            isLogined: true,
        }
    }
    else return {isLogined: false};
}

export default useCheckJWT;