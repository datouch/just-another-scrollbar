just-another-scrollbar
======================

Just another scrollbar using jQuery, jQuery UI and Mousewheel plugin  
It's lightweight you can try a demo by download the files  
  
[Demo](http://datouch.github.com/just-another-scrollbar/)
  
Tested on Chrome, Firefox

How to use
==========
First include all required libraries

```
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/jquery.mousewheel.js" ></script>
<script type="text/javascript" src="js/just-another-scrollbar.js"></script>
<link rel="stylesheet" type="text/css" href="css/just-another-scrollbar.css" />
```
And we have to make sure target markup structure looks this way
```
<div class='target jas-relative' >
  <div class='container jas-container' >
    <div class='content jas-content' >
    ... Your content goes here ...
    </div>
  </div>
</div>
```
Make sure you give some width to .target, .content in CSS
```
.target {
  height: 300px;
  width: 200px;
}

.content {
  width: 200px;
  margin: 0 auto;
}
```
  
We now ready to use this in your JavaScript!
```
$(document).ready(function(){
  $('.target').just_another_scrollbar();
});
```
Our focal point is this line
```
$('.target').just_another_scrollbar();
```

Events
======
There are 3 events available for us to utilize
* hittop
* hitbottom
* scrolling
  
So if you want to alert when scroll hits the top of content you have to do something like this  
```
$('.target').bind('hittop', function(){
  alert("Hey! let hit the bottom");
});
```
we can do the same another 2 events just change *hittop* to any event name you want to capture  

Caution
=======
If content going to contain any image, fixed size should be assigned because if we don't scrollbar height will be incorrectly calculated  
Here an example of how to fix this issue:
```
<img src="..." style="height: 100px; width: 100px;" />
```