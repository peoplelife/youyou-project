export function verifyPhone(phoneNum) {
    let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!phoneReg.test(phoneNum)) {
        return false
    }
    return true
}
export function verifyCodes(code) {
    if (code.length === 4) {
        return true
    }
    return false
}