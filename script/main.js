(function(){
  var theImages = document.querySelectorAll('.image-holder'),
      theHeading = document.querySelector('.heading'),
      theSubhead = document.querySelector('.main-copy h2'),
      theSeasonText = document.querySelector('.main-copy p'),
      appliedClass;

      //I want to change all the content on the page
      function changeElements(){
        //debugger; //this is a special term that stops code execution(in every function we do this will be the first thing)
        let subImages = document.querySelector('.subImagesContainer');
        let objectIndex = dynamicContent[this.id];

        //remove dubplicated images
        while(subImages.firstChild){
          subImages.removeChild(subImages.firstChild);
        }

        //add the images to the bottom of the page
        objectIndex.images.forEach(function(images, index) {
          //create an image element
          let newSubImg = document.createElement('img');
          //add a css class to it
          newSubImg.classList.add('thumb');
          //set the src
          newSubImg.src = "images/" + objectIndex.images[index];


          newSubImg.dataset.index = index;

          //add an event handler to trigger a lightbox
          newSubImg.addEventListener('click', function() {popLightbox(index, objectIndex);}, false);

          //add it to the page
          subImages.appendChild(newSubImg);

        });


        //remove the colours we applied on the last click
        theSubhead.classList.remove(appliedClass);
        theHeading.classList.remove(appliedClass);

        //change the text using the values of the properties in the object
        theSubhead.firstChild.nodeValue = objectIndex.headline;
        theSeasonText.firstChild.nodeValue = objectIndex.text;

        theSubhead.classList.add(this.id);
        theHeading.classList.add(this.id);


        appliedClass =  this.id;
}


    theImages.forEach(function(image, index){
      //add an event handler to each image
      image.addEventListener('click', changeElements, false);
    });

//trigger the lightbox
 function popLightbox(currentIndex, currentObject){
   //debugger;
   //move the window to the top every time we click - quick fix
   window.scrollTo(0,0);
   document.body.style.overflow = "hidden";

//trigger the lightbox overlay so that we can see it!
   let lightbox = document.querySelector('.lightbox');
   let lightboxImg = lightbox.querySelector('img');
   let lightboxDesc = lightbox.querySelector('p');
   let lightboxClose = document.querySelector('.close-lightbox');
  //  let Larrow = lightbox.querySelector('.leftArrow');
  //  let Rarrow = lightbox.querySelector('.rightArrow');
   let lightboxTitle = lightbox.querySelector('h1');

  lightbox.style.display = 'block';
  lightboxImg.src = "images/" + currentObject.images[currentIndex];
  lightboxDesc.innerHTML = currentObject.imageDescription[currentIndex];
  lightboxTitle.innerHTML = currentObject.imageTitle[currentIndex];

  // Larrow.addEventListener('click', prevPic, false);
  // Rarrow.addEventListener('click', nextPic, false);
  lightboxClose.addEventListener('click', closeLightbox, false);

  // function prevPic(){
// console.log('hello');
// debugger;

//
// }
//
// function nextPic(){
// console.log('hello');
// debugger;

// }

  function closeLightbox(){
    //reset everything, close the lightbox
    //debugger;

    lightbox.style.display = 'none'; //turns lightbox off
    document.body.style.overflow = "auto";//turns scrolling back on
    lightbox.querySelector('img').src = "";//resets image
    lightbox.querySelector('p').innerHTML = ""; //resets desc
    lightbox.querySelector('h1').innerHTML = "";//resets title

  }

 }

// document.querySelector('#spring').click(); one way to get it to load properly
changeElements.call(document.querySelector('#spring'));

})();
