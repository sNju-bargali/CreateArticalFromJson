var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var myObj = JSON.parse(this.responseText);
    console.log('getting data', myObj);

    var getSlots=myObj.slots;

    var filterData=getSlots.filter((value) => {
        return value.elements.length !== 0;
    })

    var filterArticalData=filterData[0].elements[0];

    var getBodyContents=filterArticalData.body.split(' ');
    var replaceBodyContent;

    var getStoryImages=filterArticalData.storyimages;

      getStoryImages.forEach((value)=>{
        replaceBodyContent = getBodyContents.map((item) => {
          if(item == '<p>[IMAGE]</p>'){
            // var li = document.createElement('div');
            // var image = document.createElement('img');
            // image.setAttribute('src',value.originalimageurl);
            // li.appendChild(image);
            return '<div><img src=' + value.originalimageurl +'></div>';
          }else{
            return item;
          }
        })
    })

    var replaceBodyContentWithImage=replaceBodyContent.join(' ');

    document.getElementById('heading').innerHTML=filterArticalData.originalheadline;
    document.getElementById('subHeading').innerHTML=filterArticalData.deck;
    document.getElementById('body').innerHTML=replaceBodyContentWithImage;

    var getFirstStoryImage=getStoryImages[0].originalimageurl;
    var getFirstStoryCaption=getStoryImages[0].description;

    document.getElementById('image').src=getFirstStoryImage;
    document.getElementById('imgCaption').innerHTML=getFirstStoryCaption;
  }
};
xmlhttp.open("GET", "https://www.cbc.ca/json/brexit-negotiations-foreign-secretary-jeremy-hunt-1.5000210", true);
xmlhttp.send();




//using jQuery

// $(document).ready(function(){
//   $.ajax({
//     type: "GET",
//     url: "https://www.cbc.ca/json/brexit-negotiations-foreign-secretary-jeremy-hunt-1.5000210", 
//     success: function(data) {
//     console.log(data);

//     var getSlots=data.slots;

//     var filterData=getSlots.filter((value) => {
//         return value.elements.length !== 0;
//     })

//     var filterArticalData=filterData[0].elements[0];

//     var getBodyContents=filterArticalData.body.split(' ');
//     var replaceBodyContent;

//     var getStoryImages=filterArticalData.storyimages;

//       getStoryImages.forEach((value)=>{
//         replaceBodyContent = getBodyContents.map((item) => {
//           if(item == '<p>[IMAGE]</p>'){
//             return '<div><img src=' + value.originalimageurl +'></div>';
//           }else{
//             return item;
//           }
//         })
//     })

//     var replaceBodyContentWithImage=replaceBodyContent.join(' ');

//     $('#heading').html(filterArticalData.originalheadline);
//     $('#subHeading').html(filterArticalData.deck);
//     $('#body').html(replaceBodyContentWithImage);

//     var getFirstStoryImage=getStoryImages[0].originalimageurl;
//     var getFirstStoryCaption=getStoryImages[0].description;
    
//     $('#image').attr('src',getFirstStoryImage);
//     $('#imgCaption').html(getFirstStoryCaption);

//   },
//     error:function(err){
//       console.log(err);
//     }
//   });
// });

