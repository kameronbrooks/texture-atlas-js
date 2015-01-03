/*
*   Simple Texture Atlas Builder
*   Author: Kameron Brooks
*   Date: 1/3/15
*
*
 */

/*
*   - INSTRUCTIONS
*
*   1.) Create new TextureAtlasBuilder:
*       (ex.)    var builder = new TextureAtlasBuilder(1024,1024,64)
*
*       In this example, I created a new texture that is 1024 pixels x 1024 pixels, made of cells that are 64 pixels by 64 pixels
*
*   2.) Load Images:
*       (ex.)   builder.loadImage('my_image_url.png', 1, 1, 1, 1);
*
*       In this example, I loaded an image at the location of cell [1, 1] (64px, 64px), with a width of 1 x 1 cells.
*
*       (Note.) If you want the x and y to map directly to the pixel [x,y] , set the cell size to 1 pixel
*
*   3.) Finish:
*       (ex.)   builder.finish( function(url) {
 *                  ...
 *                  document.getElementById('image').src = url;
 *              });
*
*       Finish, waits for all images to finish loading, gets the url of your new texture atlas, and calls the supplied function.
*
*

*/
function TextureAtlasBuilder(width, height,cellPixelSize) {
	this._atlasCanvas = document.createElement('canvas');
	this._atlasCanvas.width = width;
	this._atlasCanvas.height = height;
	this._atlasContext = this._atlasCanvas.getContext('2d');
	this._loading = false;
	this._cellSize = 1;
	if(cellPixelSize) {
		this._cellSize = cellPixelSize;
	}
    console.log('new Atlas w='+this._atlasCanvas.width+" h= "+this._atlasCanvas.height+" cell="+this._cellSize);
}
TextureAtlasBuilder.prototype.loadImage = function(imageURL,x,y,width,height) {
	var image = new Image();
	var self = this;
    var w;
    var h;
	image.src = imageURL;
	this._loading = true;
	image.onload = function () {

        if(width) {
            w = width * self._cellSize;
        } else {
            w = image.width;
        }
        if(height) {
            h = height * self._cellSize;
        } else {
            h = (image.height / image.width) * w;
        }
		self._atlasContext.drawImage(image, x * self._cellSize, y * self._cellSize, w, h);
		self._loading = false;
			
	}
}
TextureAtlasBuilder.prototype.finish = function(onFinish) {

    var self = this;
    var call = function() {
        return self.finish(onFinish);
    }
	if(!this._loading) {

		var url = self._atlasCanvas.toDataURL();
		if(onFinish) {
			onFinish(url);
		}
		return url;
	} else {
        
		setTimeout(call,200);
	}
		
}
