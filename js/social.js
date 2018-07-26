let app={
    init: function(){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            console.log("No map script loaded");
}else
{
    
}
    }
}
document.addEventListener("DOMContentLoaded",app.init);