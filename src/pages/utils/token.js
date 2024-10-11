const TOKENKEY="token_key"
const USERINFO="user_info"
function _setToken(token){
    localStorage.setItem(TOKENKEY,token)
}
function getToken(){
    return localStorage.getItem(TOKENKEY)
}
function removeToken(){
    localStorage.removeItem(TOKENKEY)
}
function _setUSERToken(token){
    localStorage.setItem(USERINFO,token)
}
function getUSERToken(){
    return localStorage.getItem(USERINFO)
}
function removeUSERToken(){
    localStorage.removeItem(USERINFO)
}
export{
    _setToken,
    getToken,
    removeToken,
    _setUSERToken,
    getUSERToken,
    removeUSERToken
}