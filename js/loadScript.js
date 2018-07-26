function includesJs(){
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
   //Hide the result div;
    let result=document.getElementById("zoom"),
        result.classList.add("hide");
}else{
    page.addBox();
}
};
document.addEventListener('DOMContentLoaded', includesJs);