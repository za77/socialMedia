
var response = 0;

 app.directive('imageModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.imageModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);





app.controller("previewController", function($scope,$rootScope,$http) 
{

// tinymce.init({selector:'#wysiwyg_tinymce'});
	
    ///////////////////////////////////////////
      // return lat long of given map Locatoin
  

	// show preloader
	
var text_max1 = 30;
  $('#textarea_feedback').html(text_max1 + ' characters remaining');

    $('#desc').keyup(function() {
    
    var text_length = $('#desc').val().length;
    var text_remaining = text_max1 - text_length;

    $('#textarea_feedback').html(text_remaining + ' characters remaining');
  })  
    
$rootScope.s3Url = "https://s3.eu-central-1.amazonaws.com/s3-aseema-web/";

	 if(localStorage.previewId)
	 {
	 	$scope.preid=localStorage.previewId;
	 	$http.get('api/preview/'+$scope.preid)
	 	.success(function(data){

 		  if($rootScope.Localmodal)
            $rootScope.Localmodal.hide();
    		
 			$scope.conts=data.data.content;
	 		
	 		
            $('#lat').val(data.data.lat);
            $('#lng').val(data.data.lng);
	 		$scope.predata=data.data;
	 		$rootScope.lat=data.data.lat;
	 		$rootScope.lng=data.data.lng;

	 		if(localStorage.map)
	 		{
	 		//maps($scope.predata.lat,$scope.predata.lng);
	 		}

	 	
	 
	 		$('.cont').append(data.data.content);

	 		

            $("#wysiwyg_tinymce").val(data.data.content);
	 		
	 		$('.editimage').attr('src',$rootScope.s3Url+data.data.image);

	 		$scope.eserviceName=data.data.serviceName;
	 		$scope.edescription=data.data.description;
	 		$scope.esdate=data.data.startDate;
	 		$scope.eedate=data.data.endDate;
	 		$scope.eprice=data.data.price;
	 		$scope.ecountry=data.data.country;
	 		$scope.eperson=data.data.contactPerson;
	 		$scope.econtact=data.data.contact;
	 		$scope.adsid=data.data.adsId;
	 		$scope.eaddress=data.data.location;
	 		
	 		// hide preloader


	 		$('#radio_demo_inline_1').attr('checked', true);
	 		$('#radio_demo_inline_1'+data.data.serviceCategoryId).attr('checked', true);


			
	 		if(data.data.visible==1)
	 		{	
	 			$scope.classified=data.data.visible;
	 		}
	 		else
	 		{
	 			$scope.inapp=data.data.visible;
	 		}
	 		initMap($rootScope.lat,$rootScope.lng);
	 		
	 	})
	 	.error(function(){
	 		  if($rootScope.Localmodal)
            $rootScope.Localmodal.hide();
	 	});


	

	 }
	 else
	 {
	 	window.location.href="/index1#/addpost";
	 }

	 $http.get('api/adCategory').success(function(data)
    {
        
        $scope.adCat = data;
        
        if($rootScope.Localmodal)
            $rootScope.Localmodal.hide();
    });


	 $scope.editAdd=function(id)
	 {
 		/*$scope.Localmodal = UIkit.modal.blockUI('<div class=\'uk-text-center\'>loading...<br/><img class=\'uk-margin-top\' src=\'/public/assets/img/spinners/spinner.gif\' alt=\'\'>');
		setTimeout(function(){$scope.Localmodal.hide();},2500);
	 	localStorage.removeItem('map');
	 	$scope.preid=localStorage.previewId;
	 	$http.get('api/preview/'+$scope.preid).success(function(data){
	 		$scope.conts=data.data.content;
	 		//$('#wysiwyg_ckeditor').html(data.data.content);
	 		alert(data.data.content);
	 		tinyMCE.activeEditor.setContent(data.data.content);
	 		$('#input-file-a').append('api/public'+data.data.image);

	 	});*/
	 	$rootScope.Localmodal = UIkit.modal.blockUI('<div class=\'uk-text-center\'>loading...<br/><img class=\'uk-margin-top\' src=\'/public/assets/img/spinners/spinner.gif\' alt=\'\'>');
    	setTimeout(function(){document.location.href="/index1#/editAdd";},1);
	 	//window.location="/index1#/editAdd";
	 	

	 }

	 $scope.update=function()
	 {
	 	id = $scope.adsid;
	 	$rootScope.Localmodal = UIkit.modal.blockUI('<div class=\'uk-text-center\'>loading...<br/><img class=\'uk-margin-top\' src=\'/public/assets/img/spinners/spinner.gif\' alt=\'\'>');
	
	 	  var address = document.getElementById('eaddress').value;
    
		    geocoder = new google.maps.Geocoder();
		    if (geocoder) {

		        geocoder.geocode({
		            'address': address
		        }, 
        function (results, status) 
			        {
			            if (status == google.maps.GeocoderStatus.OK) 
			            {
			                result = results[0];
			                
			                 $scope.lats = result.geometry.location.lat();
			                 $scope.lngs  = result.geometry.location.lng();
			                
			            }
				 	localStorage.setItem("map",1);

				 	 var iframe = $('#wysiwyg_tinymce_ifr');
            		var editorContent = $('#tinymce[data-id="wysiwyg_tinymce"]', iframe.contents()).html();
            		//alert(editorContent);
            		//throw new Error("Something went badly wrong!");

				 	$scope.eeditor = editorContent;
					$scope.evisible= $('.visible:checked').val();
					$scope.ecategory =$('.category:checked').val();
					$scope.eosdate=$('#uk_dp_start').val();
					 $scope.eoedate=$('#uk_dp_end').val();
					$scope.ecountry=$('.country').val();


					  if($scope.ecategory == undefined)
			        {
			              UIkit.modal.alert('Choose Service Category Type');
			              $rootScope.Localmodal.hide();
			              throw new Error("Choose Service Category Type");

			        }


					  if( $scope.eosdate == null || $scope.eoedate == null || $scope.ecountry == null|| 
			        $scope.eserviceName == null || $scope.edescription==null || $scope.eeditor == null)
			           {
			       
			             $(".edit").each(function() {
			             if ($.trim($(this).val()) == '') {
			                isValid = false;
			                $(this).css({
			                     "border-bottom": "1px solid red",
			                    "background": ""
			                });
			            }
			             });
			          
			          }
			         else{
			          $scope.einssid=localStorage.users;

			            $(".edit").css({
			                    "border-bottom": "",
			                    "background": ""
			                });

			            var file=$scope.myFile;
			        var fd = new FormData();
			        fd.append('file', file);
			        fd.append('eeditor', $scope.eeditor);
			        fd.append('evisible', $scope.evisible);
			    		fd.append('eserviceName',$scope.eserviceName);
						fd.append('edescription',$scope.edescription);
						fd.append('ecategory',$scope.ecategory);
						fd.append('eosdate',$scope.eosdate);
						fd.append('eoedate',$scope.eoedate);
						fd.append('eprice',$scope.eprice);
						fd.append('ecountry',$scope.ecountry);
						fd.append('adsId',$scope.adsid);
						fd.append('econtact',$scope.econtact);
						fd.append('eperson',$scope.eperson);
						fd.append('location',address);
						fd.append('lat',$scope.lats);
						fd.append('lng',$scope.lngs);

			    	
			        $http.post('api/updateAds', fd, {
			            transformRequest: angular.identity,
			            headers: {'Content-Type': undefined}
			        })
			        .success(function(data){

			        	
			       setTimeout(function(){
			       	window.location.href="#/preview";}, 100);
			         
			        })
			        .error(function(){
			        	
			        	setTimeout(function(){$rootScope.Localmodal.hide();},1000);
			        });



	 }
	});
		    }
	}

	$scope.submitAdd=function(id)
	{
		localStorage.removeItem('map');
			var data=$.param({
				adsId:id
		});

		var config = {
                headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
            }

		$http.post('api/submitAds',data,config).success(function(data){
			localStorage.removeItem('previewId');

			    UIkit.modal.blockUI('Advertisement is added Suceessfully!'); 
			    
			    if(localStorage.roles==10)
		        {
		             window.location.href ="#/fitnessAdmin/myads";
		        }
		        else
		        {
		        	window.location.href="#/myads";
		        }

			 setTimeout(location.reload.bind(location), 500);
			
		});

	}

	/*function maps(lat=0,lng =0)
 		{
	 		var myLatLng = new google.maps.LatLng(lat, lng),
		        myOptions = {
		            zoom: 5,
		            center: myLatLng,
		            mapTypeId: google.maps.MapTypeId.ROADMAP
		        },
		        map = new google.maps.Map(document.getElementById('mapCanvas'), myOptions),
		        marker = new google.maps.Marker({
		            position: myLatLng,
		            map: map
		        });

		    marker.setMap(map);
		}
 		function map(lat=0,lng =0)
 		{
	 		
          var latLng = new google.maps.LatLng(lat, lng);
          var map = new google.maps.Map(document.getElementById('mapCanvas'), {
            zoom: 8,
            center: latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });

          var marker = new google.maps.Marker({
            position: latLng,
            title: 'Point A',
            map: map,
            draggable: true
          });
          
          // Update current position info.
          updateMarkerPosition(latLng);
          geocodePosition(latLng);
          
          // Add dragging event listeners.
          google.maps.event.addListener(marker, 'dragstart', function() {
            
          });
              
          google.maps.event.addListener(marker, 'drag', function() {
            
            updateMarkerPosition(marker.getPosition());
          });
          
          google.maps.event.addListener(marker, 'dragend', function() {
            
            geocodePosition(marker.getPosition());
          });
          
          google.maps.event.addListener(map, 'click', function(e) {
            updateMarkerPosition(e.latLng);
            geocodePosition(marker.getPosition());
            marker.setPosition(e.latLng);
          });
		}*/
		
	function initMap(lat,lng) {

	
	var myLatLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
  var map = new google.maps.Map(document.getElementById('mapCanvas'), {
    center: {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    },
    zoom: 13
  });
  var input =(document.getElementById('eaddress'));

  

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var geocoder = new google.maps.Geocoder;
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    //anchorPoint: new google.maps.Point(0, -29),
    draggable: true
  });

 

    autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    console.log(place);
    if (!place.geometry) 
    {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) 
    {
         map.fitBounds(place.geometry.viewport);
    } else 
    {
          map.setCenter(place.geometry.location);
          map.setZoom(17); // Why 17? Because it looks good.
    }
    

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);


   

google.maps.event.addListener(marker, 'dragend', function(e) 
{
    $('#lat').val(e.latLng.lat());
    $('#lng').val(e.latLng.lng());
    //marker.setAnimation(google.maps.Animation.BOUNCE);
    getAddressPlace(e.latLng.lat(),e.latLng.lng());

});

google.maps.event.addListener(map, 'click', function(e) {

    marker.setVisible(true);
    marker.setPosition(e.latLng);
/* if (marker.getAnimation() !== null) 
{
    marker.setAnimation(null);
  } else 
  {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }*/
});




    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

 
autocomplete.setTypes([]);
    function getAddressPlace(lat,lng)
    {
      
    var location  = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));    // turn coordinates into an object          
    geocoder.geocode({'latLng': location}, function (results, status) {
    if(status == google.maps.GeocoderStatus.OK) {           // if geocode success
    var add=results[0].formatted_address; 
    console.log(results[0].formatted_address); 
    $("#eaddress").val(add);
    infowindow.setContent('<div><strong>' + add + '</strong><br>');
    infowindow.open(map, marker);

        }
    });
}
}




});