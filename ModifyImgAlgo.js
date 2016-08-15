function gaussBlur (scl, tcl, w, h, r) {
   var rs = Math.ceil(r * 2.57);     
   for(var i=0; i < h ; i++)
       for(var j=0; j < w; j++) {
           var val = 0, wsum = 0;
           for(var iy = i-rs; iy < i+rs+1; iy++)
               for(var ix = j-rs; ix < j+rs+1; ix++) {
                   var x = Math.min(w-1, Math.max(0, ix));
                    var y = Math.min(h-1, Math.max(0, iy));
                    var dsq = (ix-j)*(ix-j)+(iy-i)*(iy-i);
                    var wght = Math.exp( -dsq / (2*r*r) ) / (Math.PI*2*r*r);
                    val += scl[y*w+x] * wght;  wsum += wght;
                }
            tcl[i*w+j] = Math.round(val/wsum);            
        }
}

var input = new SimpleImage("myImage-colorbox.png");
print(input);
var output = new SimpleImage(input.getWidth(),input.getHeight());
var prod = input.getWidth()*input.getHeight();
var inr = new Array(prod);
var ing = new Array(prod);
var inb = new Array(prod);
var or = new Array(prod);
var og = new Array(prod);
var ob = new Array(prod);
var i = 0;
for (var p of input.values()){
    inr[i]= p.getRed();
    ing[i]= p.getGreen();
    inb[i]= p.getBlue();
    i++;
    if(i >= prod) break;
}
var w = input.getWidth();
var h= input.getHeight();
gaussBlur (inr, or, w, h, 10);
gaussBlur (ing, og, w, h, 10);
gaussBlur (inb, ob, w, h, 10);
i=0;
for (var p of input.values()){
    var x= p.getX();
    var y= p.getY();
    var o = output.getPixel(x,y);
    o.setRed(or[i]);
    o.setGreen(og[i]);
    o.setBlue(ob[i]);
    i++;
    if(i >= prod) break;
}
print(output);