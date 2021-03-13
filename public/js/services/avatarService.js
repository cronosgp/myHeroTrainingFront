angular.module('myHeroTraining').factory('avatarService', function ($http) {

    var carregarAvatar = function (id) {
        var jwt = localStorage.getItem('Bearer');

        $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
        return $http.get('https://mhtrainingback.herokuapp.com/perfil/avatar/id', {
            params: {
                id: id
            },
        });
    };

    var arrayBufferToBase64= function(buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[ i ]) ;
            }
            return window.btoa(binary);
    }

    return {
        carregarAvatar: carregarAvatar,
        arrayBufferToBase64: arrayBufferToBase64
    };
})