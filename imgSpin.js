var imgSpin = function (whereToID, imageURL, frameHeight, frameStart, speed) {
console.log("imgSpin");

    var totalFrames = 0,
        mdown = false,
        el = document.createElement("div"),
        elControl = document.createElement("div"),
        posXori = undefined;
    var img = new Image;

    img.onload = function () {

        totalFrames = this.height / frameHeight;
        0 > frameStart && (frameStart = 0);
        frameStart > totalFrames && (frameStart = totalFrames);
        
        var bgp = function () {
            el.style.backgroundPosition = "0px " + (totalFrames * -frameStart) + "px";
        };
        bgp();
        elControl.addEventListener("mousedown", function (event) {
            event.preventDefault();
            mdown = true;
            posXori = event.pageX;
        }, false);
        elControl.addEventListener("mouseup", function (event) {
            mdown = false;
        }, false);
        elControl.addEventListener("mouseleave", function (event) {
            mdown = false;
        }, false);
        elControl.addEventListener("mousemove", function (event) {
            if (mdown) {
                var moveto = parseInt((event.pageX - posXori) / speed);
                moveto >= 1 && (posXori = event.pageX,
                frameStart--, -1 == frameStart && (frameStart = frameHeight - 1),
                bgp());

                moveto <= -1 && (posXori = event.pageX,
                frameStart++,
                frameStart == frameHeight && (frameStart = 0),
                bgp());
            }
        }, false);
        el.style.position = 'absolute';
        elControl.style.position = el.style.position;
        elControl.style.opacity = 0;
        el.style.backgroundImage = "url('" + img.src + "')";
        el.style.width = img.width + "px";
        elControl.style.width = el.style.width;
        el.style.height = totalFrames + "px";
        elControl.style.height = el.style.height;

        el.appendChild(elControl);
        document.body.insertBefore(el, document.getElementById(whereToID));

    }
    img.src = imageURL;
};
//imgSpin('putItHere', '//demo.rickyh.co.uk/rotate360/rotate360.jpg', 72, 10, 10);
