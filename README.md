texture-atlas-js
================

Simple Texture Atlas Builder Class




- INSTRUCTIONS

1.) Create new TextureAtlasBuilder:
       (ex.)    var builder = new TextureAtlasBuilder(1024,1024,64)

       In this example, I created a new texture that is 1024 pixels x 1024 pixels, made of cells that are 64 pixels by 64 pixels

   2.) Load Images:
       (ex.)   builder.loadImage('my_image_url.png', 1, 1, 1, 1);

       In this example, I loaded an image at the location of cell [1, 1] (64px, 64px), with a size of 1 x 1 cells.

       (Note.) If you want the x and y to map directly to the pixel [x,y] , set the cell size to 1 pixel

   3.) Finish:
       (ex.)   builder.finish( function(url) {
                  ...
                  document.getElementById('image').src = url;
              });

       Finish, waits for all images to finish loading, gets the url of your new texture atlas, and calls the supplied function.




