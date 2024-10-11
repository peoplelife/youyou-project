import { getToken } from './token'
import { Navigate } from 'react-router-dom'
function AuthRoute({children}){
    const token=getToken()
    if(token){
        return<>{children}</>
    }else{
        return <Navigate to={'/login'} replace/>
    }
}
export default AuthRoute