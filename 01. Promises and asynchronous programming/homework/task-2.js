(function() {
    var div = document.getElementById('popup');
    
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            div.style.display = "block";
            resolve(div);
        }, 2000);
    });
    function wait(time, pr1) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(pr1);
            }, time);
        });
    }
    function fadeout(pr1) {
        pr1.style.display = "none";
    }
    function redirect() {
        window.location="https://telerikacademy.com";
    }
    promise
        .then((pr1) => wait(2000, pr1))
        .then(fadeout)
        .then(redirect)
        .catch(function(error) {
            console.log(error);
        });
}());