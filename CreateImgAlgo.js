 function mod(img) {
    var out = new SimpleImage(img.getWidth(), img.getHeight());
    for (var p of img.values()) {
        var x = p.getX();
        var y = p.getY();
        var opix = out.getPixel(x, y);
        if (Math.random() > 0.5) {
            opix = getpixnearby(img, x, y, 5);
        }
        out.setPixel(x, y, opix);
    }
    return out;
}
//get pixel values around a particular pixel and set its value after adding a delta value to produce broken glass effect
function getpixnearby(img, x, y, d) {

    var dx = (Math.random() * d) - (d / 10);
    var dy = (Math.random() * d) - (d / 10);
    var nx = x + dx;
    var ny = y + dy;
    if (nx >= img.getWidth()) nx = img.getWidth() - 1;
    if (ny >= img.getHeight()) ny = img.getHeight() - 1;

    if (nx < 0) nx = 0;
    if (ny < 0) ny = 0;
    return img.getPixel(nx, ny);
}

function setopix(inpix1, inpix2, opix) {
    if (((inpix1.getRed() === 0) && (inpix1.getGreen() === 0) && (inpix1.getBlue() === 0)) || ((inpix2.getRed() === 0) && (inpix2.getGreen() === 0) && (inpix2.getBlue() === 0))) {
        opix.setRed(0);
        opix.setGreen(0);
        opix.setBlue(0);
    } else {
        opix.setRed(inpix1.getRed());
        opix.setGreen(inpix1.getGreen());
        opix.setBlue(inpix1.getBlue());
    }
    return opix;
}
//function to combine images to get a image with two black triangles 
function combine(in1, in2) {
    var out = new SimpleImage(in1.getWidth(), in1.getHeight());
    for (var p of in1.values()) {
        var x = p.getX();
        var y = p.getY();
        var pix = in2.getPixel(x, y);
        var opix = out.getPixel(x, y);
        opix = setopix(p, pix, opix);
    }
    return out;
}
//function to draw archimedean spiral
function drawspiral(img) {
    var w = img.getWidth();
    var h = img.getHeight();
    var a = 1;
    var b = 4;
    var cx = Math.floor(w / 2) - 1;
    var cy = Math.floor(h / 2) - 1;

    var pix = img.getPixel(cx, cy);
    pix.setRed(255);
    pix.setGreen(0);
    pix.setBlue(0);
    for (var i = 0; i < 720; i = i + 0.0001) {
        var angle = 0.1 * i;
        x = cx + (a + b * angle) * Math.cos(angle);
        //print(x);
        y = cy + (a + b * angle) * Math.sin(angle);
        //print(y);
        if (x >= w || y >= h) break;
        pix = img.getPixel(x, y);
        pix.setRed(255);
        pix.setGreen(0);
        pix.setBlue(0);

    }
    return (img);
}

var img = new SimpleImage("300", "300");
var img1 = new SimpleImage("300", "300");
var w = img.getWidth();
var h = img.getHeight();

for (var pixel of img.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var p = img1.getPixel(x, y);
    // the following produces right side black triangle
    if (w - x < y) {
        pixel.setRed(x);
        pixel.setGreen(x);
        pixel.setBlue(x);
    } else if (x > y) {
        pixel.setRed(x);
        pixel.setGreen(x);
        pixel.setBlue(x);
    }
    // the following produces left side black triangle
    if (y > x) {
        p.setRed(x);
        p.setGreen(x);
        p.setBlue(x);
    } else if (w - x >= y) {
        p.setRed(x);
        p.setGreen(x);
        p.setBlue(x);
    }
}
img = combine(img, img1);
img = mod(img);
img = drawspiral(img);
print(img);
  