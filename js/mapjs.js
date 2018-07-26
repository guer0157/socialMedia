let page={
    //Make lens element;
    lens:document.createElement("div"),
    //get image
    img:document.getElementById("map_img"),
    //get result div
    result:document.getElementById("zoom"),
    // set zoom distance
    magnification:3,

    init: function(ev){
        //remove the hide class from result div;
        page.result.classList.remove("hide");
        //add the show class to result div;
        page.result.classList.add("show");
        //set class attribute to lens div.
        page.lens.setAttribute("class","img-zoom-lens");
        //append the lens div before the image div inside the "img-zoom-container"
        page.img.parentElement.insertBefore(page.lens, page.img);
        //calculate magnification of zoomed image using ratio of zoomed width / lens width
        page.magnification=page.result.offsetWidth/page.lens.offsetWidth;
        //add the background image to the result div by getting the ".img-zoom-container" 'src' attribute;
        page.result.style.backgroundImage=`url('${page.img.src}')`;
        //zoom in by using the magnification amount
        page.result.style.backgroundSize=(page.img.width*page.magnification)+'px '+(page.img.height*page.magnification)+'px';
        //call moveLens function pass event (ev).
        page.moveLens(ev);
    },
    addBox: function(){
        //create event listern on mouse move;
        document.addEventListener("mousemove",page.init);

    },
    moveLens: function(ev){
        //prevent any actions that might happend on mouse move by default.
        ev.preventDefault();
        // get variables of cursos position relative to complete webpage
        let cursosPos={};
        cursosPos.x = ev.pageX;
        cursosPos.y = ev.pageY;

        // get bounding rectangles of map_img, document body and lens
        let mapRect = page.img.getBoundingClientRect();
        let bodyRect = document.body.getBoundingClientRect();
        let lensRect = page.lens.getBoundingClientRect();
        // calculate for top-left map pixel relative to viewport
        let mapPos = {};
        mapPos.x = mapRect.left - bodyRect.left;
        mapPos.y = mapRect.top - bodyRect.top;

        // define lens' original postition object
        let lensPos = {};
        lensPos.x = 0;
        lensPos.y = 0;
        // set default color for lens when unhovered
        page.lens.style.borderColor = "var(--color-neutral)";

        // if cursor position is inside map's <img> tag
        if ((cursosPos.x >= mapPos.x) && (cursosPos.x <= mapPos.x + mapRect.width) &&
            (cursosPos.y >= mapPos.y) && (cursosPos.y <= mapPos.y + mapRect.height))
        {
            // show zoomed map
            if (page.result.classList.contains("hide")) {
                page.result.classList.add("show");
                page.result.classList.remove("hide");
            }

            // calculate the position of the middle point of lens relative to cursor position
            lensPos.x = cursosPos.x-mapPos.x - (lensRect.width/2);
            lensPos.y = cursosPos.y-mapPos.y - (lensRect.height/2);
            // set darker color to lens for better visibility
            page.lens.style.borderColor = "rgb(41, 41, 41)";

            // move the visible section of the zoomed image as the lens' position
            // multiplied by the magnification
            page.result.style.backgroundPositionX = -(lensPos.x)*page.magnification + "px";
            page.result.style.backgroundPositionY = -(lensPos.y)*page.magnification + "px";
        }
        // in case the cursor is placed outside the map's <img> tag
        else
        {
            // hide zoomed in view
            if (page.result.classList.contains("show")){
                page.result.classList.add("hide");
                page.result.classList.remove("show");
            }
        }
        // set the lens' position
        page.lens.style.left = lensPos.x + "px";
        page.lens.style.top = lensPos.y + "px";
    }
}