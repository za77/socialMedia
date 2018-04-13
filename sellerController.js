
	app.directive('loading', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="loader"></div>',
      link: function(scope, element, attr) {
        scope.$watch('loading', function(val) {
          if (val)
            $(element).show();
          else
            $(element).hide();
        });
      }
    }
  })



 app.controller("sellerController", function($scope,$rootScope,$http) {

$rootScope.s3Url = "https://s3.eu-central-1.amazonaws.com/s3-aseema-web/";

$http.get('api/adCategory').success(function(data)
    {
        
        $scope.adCat = data;
        

    });


 	$rootScope.addpostlink=function()
 	{

 		 $scope.loading = true;
 	}

 	var idss=localStorage.users;
 	var dummy="";


 		$http.get('api/sellerName/'+idss).success(function (data){
 			$rootScope.names=data.data;
              });


 	$http.get('api/searchAds/'+idss).success(function (data){
 		$scope.viewads=data.data.data;
          var arr =[];

               for(var i=1;i<=data.data.last_page;i++)
               {
                  arr.push(i); 
               }
               $scope.myadsArr = arr;
               $scope.type = 1;

              });

  $scope.paginating = function (id,type)
  {
    if(type == 1)
    {
       $http.get('api/searchAds/'+localStorage.users+'?page='+id).success(function(data){
                $scope.viewads = data.data.data;

          });
    }
    else if(type == 2)
    {
      $http.get('api/searchAds/'+localStorage.users+'/'+id+'?page='+id).success(function(data){
                $scope.viewads = data.data.data;

          });

    }
  }

  

  $scope.TagSearch=function(id)
    {
        
        $http.get('api/searchAds/'+localStorage.users+'/'+id).success(function(data){
       $scope.viewads=data.data.data; 
    

       var arrs= [];
      
        for(var i=1;i<=data.data.last_page;i++)
        {
           arrs.push(i);
        }

        $scope.myadsArr=arrs;
        $scope.type=2;

     });

    }


 	$scope.reades=function(){

 		var idss=localStorage.users;
 		$http.get('api/searchAds/'+idss+'/'+$scope.dropValue).success(function (data){
 		$scope.viewads=data.data;

              });
 	}



 	$scope.viewsad=function(id)
	{
    $scope.Localmodal = UIkit.modal.blockUI('<div class=\'uk-text-center\'>loading...<br/><img class=\'uk-margin-top\' src=\'/public/assets/img/spinners/spinner.gif\' alt=\'\'>');
    setTimeout(function(){$scope.Localmodal.hide();},1000);
		localStorage.setItem('previewId',id);
    localStorage.setItem('map',1);
		window.location.href="/index1#/preview";
	}

		$http.get('api/approvedservice/'+idss).success(function (data){
 			$scope.appservice=data.data;
              });

	   $scope.filters=function(id)
  {
      $scope.filtersId=id;
  }

  $scope.addpost = function()
  {
    $rootScope.Localmodal = UIkit.modal.blockUI('<div class=\'uk-text-center\'>loading...<br/><img class=\'uk-margin-top\' src=\'/public/assets/img/spinners/spinner.gif\' alt=\'\'>');

    setTimeout(function(){document.location.href="#/addpost";},1);
    
  }
	


 });

