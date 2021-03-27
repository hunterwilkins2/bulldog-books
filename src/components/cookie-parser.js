function getCookie(name) {
    var pattern = RegExp(name + '=.[^;]*')
    var matched = document.cookie.match(pattern)
    if(matched){
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return undefined
}

function deleteCookie( name, path, domain ) {
    if( getCookie( name ) ) {
        document.cookie = name + '=' +
        ((path) ? ';path='+path:'')+
        ((domain)?';domain='+domain:'') +
        ';expires=Thu, 01 Jan 1970 00:00:01 GMT'
    }
}

module.exports = { getCookie, deleteCookie }
