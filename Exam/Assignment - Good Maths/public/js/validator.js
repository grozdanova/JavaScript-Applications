class Validator {
    static validateUser(user) {
        var re = /^[a-zA-Z._]{6,30}$/;
        if (!(re.test(user))) {
           return false;
        }

        return true;
    }

    static validatePassword(password) {
        var re = /^[A-Za-z]\w{6,30}$/;
        if (!(re.test(password))) {
            return false;
        }
        return true;
    }
}