// wait 5.8 seconds to switch to main pic
var img_pre = document.getElementById("temp");
img_pre.src = "giphy.gif";

setTimeout(function() {
    var img = document.getElementById("temp");
    img.id = "me";
    img.src = "profile.jpg";
    img.style.opacity = "1";
    var arrow = document.getElementById("arrow");
    setTimeout(function() {
        arrow.style.display = "flex";
    }, 1000);
}, 5800);

// remove the old pic after 5300ms (give it 500ms to be gone, so 5800ms total)
setTimeout(function() {
    var img = document.getElementById("temp");
    img.style.opacity = "0";
}, 5300);

// listen for click to unroll list
var coll = document.getElementsByClassName("collapsible");
for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

var colors = new Array(
    [255, 247, 224],
    [225, 255, 224],
    [249, 224, 255],
    [255, 224, 224],
    [224, 240, 255],
    [238, 224, 255]
);

var step = 0;
//color table indices for: current color left next color left current color right next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.02;

function updateGradient() {
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    document.getElementById("gradient").style.background =
        "-webkit-gradient(linear, left top, right top, from(" +
        color1 +
        "), to(" +
        color2 +
        "))";

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices do not pick the same as the current one
        colorIndices[1] =
            (colorIndices[1] +
                Math.floor(1 + Math.random() * (colors.length - 1))) %
            colors.length;
        colorIndices[3] =
            (colorIndices[3] +
                Math.floor(1 + Math.random() * (colors.length - 1))) %
            colors.length;
    }
}

// setInterval(updateGradient, 100);
