var data = function () {
    const STORAGE_AUTH_KEY = 'SPECIAL-AUTHENTICATION-KEY';
        //Materials

    function getMaterials() {
        var promise = new Promise(function (resolve, reject) {
            $.ajax({
                url: 'api/materials',
                method: 'GET',
                contentType: 'application/json',
                headers: {
                    'x-auth-key': localStorage.getItem(STORAGE_AUTH_KEY)
                },
                success: function(res){
                    resolve(res);
                },
                error: function(err){
                    reject(err);
                }
            });
        });
        return promise;
    }
      function materialsAdd(material) {
        var promise = new Promise(function(resolve, reject){
            var url = 'api/materials/add';
            $.ajax(url, {
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(material),
                headers: {
                    'x-auth-key': localStorage.getItem(STORAGE_AUTH_KEY)
                },
                success: function(res){
                    console.log(res);
                    resolve(res);
                },
                error: function(err){
                    reject(err);
                }
            });
        });
        return promise;
    }  

function materialById(id) {
    return new Promise((resolve, reject) => {
      $.getJSON(`api/materials/${id}`)
        .done(resolve)
        .fail(reject);
    });   
  }
  //Users
    function register(user) {
        var promise = new Promise(function (resolve, reject) {
            var url = 'api/users';
            var reqUser = {
                username: user.username,
                passHash: CryptoJS.SHA1(user.password).toString()
            };

            $.ajax(url, {
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(reqUser),
                success: function(res){
                    resolve(res);
                },
                error: function(err){
                    reject(err);
                }
            });
        });
        return promise;
    }
    function login(user) {
        var promise = new Promise(function (resolve, reject) {
            var url = 'api/users/auth';
            var reqUser = {
                username: user.username,
                passHash: CryptoJS.SHA1(user.password).toString()
            };


            $.ajax(url, {
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(reqUser),
                success: function(res){
                    localStorage.setItem(STORAGE_AUTH_KEY, res.result.authKey);
                    resolve(res);
                },
                error: function(err){
                    reject(err);
                }
            });
        });
        return promise;
    }
        function logout() {
            return Promise.resolve()
            .then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("authKey");
            });
           
        }
        //Profiles
    function getProfiles() {
        var promise = new Promise(function (resolve, reject) {
            $.ajax({
                url: 'api/profiles',
                method: 'GET',
                contentType: 'application/json',
                headers: {
                    'x-auth-key': localStorage.getItem(STORAGE_AUTH_KEY)
                },
                success: function(res){
                    console.log(res);
                    resolve(res);
                },
                error: function(err){
                    reject(err);
                }
            });
        });
        return promise;
    }
    function profileByUsername() {
    return new Promise((resolve, reject) => {
      $.getJSON(`api/profiles/${username}`)
        .done(resolve)
        .fail(reject);
    });   
  }

  return {
      materials: {
         add: materialsAdd,
         get: getMaterials,
         getById: materialById
      },
        users: {
            register: register,
            login: login,
            logout: logout
        },
        profiles:{
            all: getProfiles,
            get: profileByUsername
        }
  }  
}();