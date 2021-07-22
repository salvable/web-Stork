export default class regularExpressionUtil{
    static checkId(id){
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
        const specialCharacters = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi

        if(id.length >=5 && id.length <= 20 && !(korean.test(id)) && id.search(/\s/) === -1 && !(specialCharacters.test(id))){
            return false
        }else{
            return true
        }
    }

    static checkPw(password){
        if(password.length >= 8 && password.length <= 20){
            return false
        }else{
            return true
        }
    }

    static checkEmail(email){
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(email); // 형식에 맞는 경우 true 리턴
    }
}

