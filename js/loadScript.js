function includesJs(){
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
 console.log("script disabled");   
}else{
    page.addBox();
}
};
document.addEventListener('DOMContentLoaded', includesJs);