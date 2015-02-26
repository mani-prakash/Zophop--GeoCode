    var map;
    var city = "None";
	var MOD = "None";
	//==Lists for stops in the Route files=======    
    var lst = [];
    var lst1 = []; 
   //===========================================
   var scity = [];
   var scity1 = [];
   var file_fault = false;
	//===========================================
	var N_marks = [];
	var P_state = 1;	    
   var Fstate = 0;
    var city_stops = [];
    var radius = 75; 
    var route_id = null; 
    //=============================================
    var SRoute = null;
    function mark(lat,log,stop_name,state)
    {
	this.stop_id=null;
	this.stop_city=city.city;	
	this.lon = log;
	this.stop_code =null;
	this.alias=[];
	this.alias.push(stop_name);
	this.station_type=MOD;
	this.stop_name=stop_name;
	this.feed_id=null;
	this.lat = lat;
	this.state = state;
	}
	function mark1(lat,log,title,state) {
		this.mrk = new mark1(lat,log,title);
		this.state = state;	
	}
var Dstps =[]; 
var BusStop_service;
//-------------------------------Server call functions------------------

//=============================================================
function route(id,name,f_st,l_st,city) {
	this.route_id= id;
	this.route_name= name;
	this.first_stop= f_st;
	this.last_stop= l_st;
	this.city= city;
	this.last_updated= null;
	this.agency_id= null;
	this.agency_name= null;
	this.has_frequency_trips= null;
	this.stop_sequence=[];
	this.total_length=0.0;
	this.polylines='NO DATA';
}
    $(document).ready(function(){
      map = new GMaps({
        el: '#map',
       lat: -28.732,
       lng: -67.181,
		zoom : 3
      });
	  map.setContextMenu({
		control: 'map',
		options: [{
			title: 'Add marker',
			name: 'add_marker',
			action: function(e) {
			console.log(e.latLng.lat());
				//newMarker(e);
				if (P_state==2) {
					alert('this Option is not available in this page');				
				}
				else {
					searchedMarker(e.latLng.lat(), e.latLng.lng());
				}
			}
		},
		{
			title: 'BusStops',
			name: 'BusStops',
			action: function(e) {
			console.log(e.latLng.lat());
				//newMarker(e);
				show_busStops(e.latLng);
			}
		},
		{
			title: 'Delete Stops',
			name: 'Delete Stops',
			action: function(e) {
			console.log(e.latLng.lat());
				//newMarker(e);
				Delete_busStops();
			}
		}]
	});
	BusStop_service = new google.maps.places.PlacesService(map.map);
      $('#geocoding_form').submit(function(e){
        e.preventDefault();
        GMaps.geocode({
          address: $('#address').val().trim(),
          callback: function(results, status){
            if(status=='OK'){
              var latlng = results[0].geometry.location;
              console.log("asd :"+JSON.stringify(results[0]));
          		Searched_Stops(results,status);				              
              map.setCenter(latlng.lat(), latlng.lng());	
            }
            else {
					alert('Sorry no results :'+status);            
            }
          }
        });
      });
      /* var input = (
      document.getElementById('address'));
  map.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);*/
  var inp =  document.getElementById("map-search");
map.map.controls[google.maps.ControlPosition.TOP_LEFT].push(inp);      
      $("#address").geocomplete();
      //loadCity();
      getCities();
      direction = new google.maps.DirectionsService();
		    
    });
 var direction;
var center;
var flightPlanCoordinates = [];
function Searched_Stops(results) {
	for (var i = 0; i < results.length; i++) {
    	var m = createMarkerS_Stops(results[i]);
    	m.setMap(map.map);
      b_stops.push(m);
    }
}
function createMarkerS_Stops(place)
{
	var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    position: place.geometry.location,
    icon:'pic/bus1.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindowBs.setContent(place.address_components[0].long_name);
    infowindowBs.open(map.map, this);
  });
  return marker;
}
function Delete_busStops()
{
	for (i=0;i<b_stops.length;i++) {
			b_stops[i].setMap(null);
	}
	b_stops = [];
}
function routes(origin,waypts,destination)
{
	this.origin=origin;
	this.destination=destination;
	this.waypoints=waypts;
	this.optimizeWaypoints= true;
   this.travelMode= google.maps.DirectionsTravelMode.DRIVING;
   this.provideRouteAlternatives=true;
}
var wp=[];
var Dir_val = false;
var time = null;
var Dir_index = 0;
var b_stops=[];
function initialize_Route() {

}
function show_busStops(pos)
{
		var request={
    location: pos,
    radius: '200',
    types: ['bus_station']
  };	
  //'store','bus_station','library','subway_station','taxi_stand','train_station'
  console.log('service');	
  
		BusStop_service.nearbySearch(request, disp_busStops);	
}
function disp_busStops(results,status) {
	console.log('service got');	
	if (status == google.maps.places.PlacesServiceStatus.OK) {
	console.log('service got success :'+results.length);    
    for (var i = 0; i < results.length; i++) {
    	var m = createMarkerBS(results[i]);
    	m.setMap(map.map);
      b_stops.push(m);
    }
    }
    else {
		alert('Cannot search bus stops Beacuse :'+status);    
    }
}
function createMarkerBS(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
	 title:place.name,    
    position: place.geometry.location,
    icon:'pic/bus1.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindowBs.setContent(place.name);
    infowindowBs.open(map.map, this);
  });
  return marker;
}
var infowindowBs = new google.maps.InfoWindow();
var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  };
function DirectionServices() {
	Dir_val = true;
	wp = [];
	flightPath = [];	
	fpk = [];
	var t_cnt = 1;	
	var cnt =1;
	designpolyline();
	console.log("direction services");
	while (cnt<lst.length)
	{
			var way = [];
			var ct = cnt+8;
			var origin=new google.maps.LatLng(lst[cnt].lat,lst[cnt].lon);
			cnt++;					
			while (cnt<ct&&cnt<lst.length)
			{
				way.push({location:new google.maps.LatLng(lst[cnt].lat,lst[cnt].lon),stopover: false});
				cnt++;
			}
			var destination;
			if (cnt==lst.length) {
				destination=new google.maps.LatLng(lst[cnt-1].lat,lst[cnt-1].lon);			
			}
			else {
			destination=new google.maps.LatLng(lst[cnt].lat,lst[cnt].lon);
			}			
			wp.push(new routes(origin,way,destination));
	}
	//time = setInterval(createPolyline,1000);
console.log("interval set");
GTDirect();
}
function dir_object(pnt,ind) {
	this.pts = 	pnt;
	this.index = ind;
}
function contains_a(ar,e) {
	for (i=0;i<ar.length;i++) {
		if (ar[i]==e) {
			return true;
		}	
	}
	return false;
}
function GTDirect() {
	console.log("direction calls");
	flightPlanCoordinates = [];
	var r_no = [];
	console.log("wp length :"+wp.length);
	for (i=0;i<wp.length;i++) {
		console.log("origine :"+wp[i].origin);
		var request = {
                    origin: wp[i].origin,
                    destination: wp[i].destination,
                    waypoints:wp[i].waypoints,
                    optimizeWaypoints: true,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING,
                    provideRouteAlternatives:true
                };
			direction.route(request, function (response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
				console.log("gotDirections");
				var route = response.routes[0];
				var pl = route["overview_path"];
				var flightCoordinates = [];
							for(i=0;i<pl.length;i++)
							{
								flightCoordinates.push(new google.maps.LatLng(pl[i]['k'], pl[i]['D']));
								}
								//var k = new dir_object(flightCoordinates,i);
								console.log(JSON.stringify(response));								
								var or = response.nc.origin;
								for (j=0;j<wp.length;j++) {
									var loc = new google.maps.LatLng(or.k,or.D);
										if (getDistance1(wp[j].origin,loc)==0) {
											fpk[j]=flightCoordinates;
										//	c_poly(flightCoordinates);												
										}		
								}
								/*if (!(contains_a(r_no,i))) {
									fpk.push(flightCoordinates);									
									c_poly(flightCoordinates);		
								}*/																
								console.log("index in request :"+i);
			}
			else
			{
				console.log("cannot get directions :"+status);
				}
		});
	}
}
var flightPath = [];
function c_poly(fp) {
	var flightP = new google.maps.Polyline({
    path: fp,
    icons:des_poly,
    geodesic: true,
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  //fpk.push(fp);
	//clearInterval(time);
  flightP.setMap(map.map);
  	flightPath.push(flightP);
}
function GetDP() {
	fpk = [];
	flightPathClean();
	DirectionServices();
	time = setInterval(RouteDone,2000);	
	GTDirect();
}
function flightPathClean()
{
	for (i=0;i<flightPath.length;i++) {
		flightPath[i].setMap(null);	
	}
	flightPath = null;
}
function RouteDone() {
	console.log("good");
	if (wp.length<=fpk.length) {
			clearInterval(time);
			for (i=0;i<fpk.length;i++) {
				c_poly(fpk[i]);
			}			
			addRouteDirections();			
			time=null;
	}
}
function addRouteDirections() {
			var temp = [];			
			for (i=0;i<fpk.length;i++) {
						var r = fpk[i];
						for (j=0;j<r.length;j++) {
								temp.push(r[j]);					
						}
			}			
			SRoute.polylines = temp;
			SRoute.total_length=cal_PolyLine(fpk);
			alert("in route :"+SRoute.total_length);			
}
function getDirections()
{50
	console.log("getDirections");
	var waypoints = [];
	var i=1;
		var origin1 = new google.maps.LatLng(lst[1].lat,lst[1].lon);
		var destination1 = new google.maps.LatLng(lst[lst.length-1].lat,lst[lst.length-1].lon)
	var request = {
                    origin: origin1,
                    destination: destination1,
                    waypoints:waypoints1,
                    optimizeWaypoints: true,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING,
                    provideRouteAlternatives:true
                };
                console.log("gotDirections1");
	direction.route(request, function (response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
				console.log("gotDirections");
				var route = response.routes[0];
				var pl = route["overview_path"];
				flightPlanCoordinates = [];
												var flightCoordinates = [];
							for(i=0;i<pl.length;i++)
							{
								flightCoordinates.push(new google.maps.LatLng(pl[i]['k'], pl[i]['D']));
								}
								//fpk.push(flightCoordinates);
				//createPolyline();
							
			}
			else
			{
				console.log("cannot get directions :"+status);
				}
		});
	}
	var k_p = 0;
	var fpk = [];
function createPolyline()
{
	console.log("In PolyLine");
if (wp.length==fpk.length) {
	console.log("Poly line created");	
	fpk.sort(function(a, b){return a.index-b.index});	
	flightPlanCoordinates = [];
	for (i=0;i<fpk.length;i++) {
		var fr = fpk[i].pts;
		console.log("in poly line :"+fpk[i].index);		
		for (j=0;j<fr.length;j++) {
			flightPlanCoordinates.push(fr[j]);
		}	
	}
	console.log(JSON.stringify(flightPlanCoordinates));
	var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  };
	console.log(flightPlanCoordinates[k_p]);	
	console.log("create Polyline");
	var flightPath = new google.maps.Polyline({
	 icons: [{
      icon: lineSymbol,
      offset: '100%'
    }],    
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
	clearInterval(time);
  flightPath.setMap(map.map);	
  cal_PolyLine();
	}	
}
//var total_dist = 0.0;	
function cal_PolyLine(fpk) {
	var td = 0.0;
	console.log('total length :'+fpk.length);
	for (j=0;j<fpk.length;j++) {	
	var ft = fpk[j];	
	for (i=0;i<ft.length-1;i++) {
		td+=getDistance1(ft[i],ft[i+1]) ;
	}
	}
	return td;
}
var des_poly;
function designpolyline() {
	var ics = [];
	for (i=1;i<101;i=i+3) {
		ics.push({'icon':lineSymbol,'offset':i+'%'});	
	}
	des_poly=ics;
}	
function load()
{    	
	console.log("In the load function");	
	var got = false;
	for(i=1;i<lst.length;i++)
	{
		if (lst[i].state!=2&&!got) {
			center = new google.maps.LatLng(lst[i].lat, lst[i].lon); 					
					got=true;
		}
		addMarker(i);	
	}
	if (file_fault) {
			center = new google.maps.LatLng(city.lat_a, city.lon_a);
	}
	setTable();
}
function sortNumber(a,b) {
    return a - b;
}
function alertdel() {
	
   var swp = "<input type='text' style='width:30px' class='tFld' id='swap1'/>&nbsp<button class='btn btn-primary' style='font-weight: bold;' onclick='swapIndex()'> Swap</button>&nbsp<input type='text' class='tFld' style='width:30px' id='swap2'/><button onclick='alertdel()' style='height:30px; width:30px; float:right'><img src='delete.png' style='height:20px; width:20px;'/></button><br>"; 
	//$("#swapbts").html(swp);	
	$("#submenu").html($("#submenu").html()+"<div id='delMark'><input type='text' class='tFld' id='delButton'/><button onclick='deldone(1)'>Delete</button><button onclick='deldone(0)'>Cancel</button></div>");
}
function loadMenu3()
{
	var menu3 = document.getElementById('submenu');
	//menu3.innerHTML = '<div id="swapdel" style="display: inline-block;"></div>';
	var rd = '<div id="menu3opts" style="margin-left:20px"><input type="radio" name="type_opts" value="swap">Swap</input>';
   rd+='&nbsp&nbsp&nbsp<input type="radio" name="type_opts" value="delete">Delete</input>';
	rd+='&nbsp&nbsp<button onclick="applySwapDel()" class="btn btn-warning">Apply</button>';
	rd+='&nbsp<button onclick="GetDP()" style="float:right" class="btn btn-info">Route</button></div>';
	var sd = '<div id="swapdel" style="display:inline-block; margin-left:20px;"></div>';   
   menu3.innerHTML = rd+sd;
}
function applySwapDel() {
	var swpdelc = document.getElementById('swapdel').childNodes;
	var mn = document.getElementsByName('type_opts');	
	var ch = 'none';	
	console.log(mn.length);
	for (i=0;i<mn.length;i++) {
		if (mn[i].checked) {
				ch = mn[i].value;	
		}	
	}
	console.log('val :'+ch);
	var chckd = getCheck_list();
	if (ch=='swap') {
		if (chckd.length==2) {		
			swapIndex(chckd[0],chckd[1]);	
		}
		else {
			alert('Mr Smart to swap we need exactly two elements');		
		}
	}
	else if(ch=='delete')
	{
		if (chckd.length==1) {		
		deldone1(chckd[0]); 
		}
		else {
			alert('Please select one Item');		
		}				
	}
	else {
		alert("Plese select a radio buton again");
	}
}
function floatMacting(ind) {
	
	var e = parseFloat(ind);		
	if (e!= NaN) {
		if (ind.match('[0-9]+.[0-9]+$')) {
			console.log('its true');			
			return true;
			}
	}
	console.log('its false');
	return false; 
}
function deldone1(ind) {
	if (ind<lst.length) {
		if (lst1[ind]!=null&&typeof lst1[ind]!= 'undefined'&&lst[ind].state!=2) {
					console.log("its working del");					
					removeMarker1(ind);
		}
		else {
			console.log("its working ");	
				lst.splice(ind,1);
				lst1.splice(ind,1);
				for (i=1;i<lst1.length;i++) {
						if (lst[i].state!=2&&lst1[i].details.M_id>ind) {
							lst1[i].details.M_id=i;
							lst1[i].setIcon(make_link(i,lst1[i].details.state));							
						}				
				}	
		}	
	setTable();	
	}		
}
function getCheck_list() {
			var dt = document.getElementById('data_tbl').childNodes;
			var indx = [];
			for (i=0;i<dt.length;i++) {
				et = dt[i].getElementsByTagName('input')[0];
				if (et.checked) {
					var id = et.id.replace('data_ck_','');
						indx.push(parseInt(id));			
				}		
			}
			console.log('indx :'+indx.length);
	return indx;
}
function setTable() {
	var tble = "<div align='left' style='overflow:scroll; max-height:420px; width:100%;' class='dt'; id='data_tbl'>";
	
	for(i=1;i<lst.length;i++)
	{
		var id = "data_"+i;
		var ck = "<div id='"+id+"'>";		
		if (typeof lst[i]=='undefined') {
				ck+='undefined';		
		}
		else {
		ck+="<input type='checkbox' id='data_ck_"+i+"'>";		
		ck+="<label onclick='showLatLng("+i+",this)'";
		if (lst[i].state==2) {
			ck+=" style='color:red'";		
		}		
		ck+=">"+i+".</label>&nbsp;<p style='display:inline-block;' onblur='edit_Data("+i+",0,this)' contenteditable=true>"+lst[i].stop_name+"</p>";
		ck+="<div style='display:none' id='Sdata_"+i+"'><label>lat:</label><p id='Sdata_"+i+"_lat' class='chk_data1' onblur='edit_Data("+i+",1,this)' contenteditable=true>"+lst[i].lat+"</p><br><label>lon:</label><p id='Sdata_"+i+"_lon' onblur='edit_Data("+i+",2,this)' class='chk_data1' contenteditable=true>"+lst[i].lon+"</p></div>";		
		}
		ck+="</div>";
		tble+=ck;
	}
tble+="</div>";
console.log();
$("#tbl").html(tble);
}
function showLatLng(ind,th) {
	th.onclick = function () {hideLatLng(ind,this)};
	var ds = document.getElementById("Sdata_"+ind);
	ds.style.display='block';
	map.map.setCenter({lat: lst[ind].lat, lng: lst[ind].lon});
	map.map.setZoom(16);
}
function hideLatLng(ind,th) {
	th.onclick = function () {showLatLng(ind,this)};
	var ds = document.getElementById("Sdata_"+ind);
	ds.style.display='none';
}
function edit_Data(ind,wht,val) {
	var mar = lst[ind];
	var mar1 = lst1[ind];		
	if (wht==0) {
		var M_nm = preParse(val.innerHTML);
		val.innerHTML = M_nm;		
		mar.stop_name= M_nm;		
		lst[ind].stop_name =M_nm;  		
		if (mar.state!=2) {		
		mar1.setTitle(M_nm);
		//setInfo(mar1);	
	}	
	}
	else if(wht==1||wht==2){
	try {	
		if (wht==1) {
			if (!floatMacting(val.innerHTML)) {
				val.innerHTML = mar.lat; 					
			}
			mar.lat = parseFloat(val.innerHTML);
		}
		else {
			if (!floatMacting(val.innerHTML)) {
				val.innerHTML = mar.lon; 					
			}
			mar.lon = parseFloat(val.innerHTML);					
		}
		console.log(mar.lat+"long :"+mar.lon);
		mar1.setPosition(new google.maps.LatLng(mar.lat,mar.lon));
		console.log('good1');		
		}
		catch (err) {
					alert('your data is fault');
		}	
	}
}
function reflect_Data(ind) {
	document.getElementById('Sdata_'+ind+'_lat').innerHTML=lst[ind].lat;
	document.getElementById('Sdata_'+ind+'_lon').innerHTML=lst[ind].lon;
}
// function to set events to the markers
function evts() {
console.log("events are initializing");
//alert("we are in events");
	var mrks = lst1;
	for (i=1;i<mrks.length;i++) {
		if (lst[i].state!=2) {		
		var mrk = mrks[i];
		google.maps.event.addListener(mrk, 'dragend', function (evt) {
				//alert(i);    			
    			var it = this.details.M_id;
    			console.log("draged :"+this.getTitle());
				var pos = this.getPosition();
				    			
    			console.log("its "+pos.lat());
				lst[it].lat = pos.lat(); 
				lst[it].lon = pos.lng();
				if (lst[it].state==3) {
					make_markerNew(it);				
				}
				this.details.bound.setMap(null);
				this.details.bound=trace(it,radius);
			   
				change();				
				reflect_Data(it);						 
		}); 	
	}
	}
}
function new_delMarker(i) {
	N_marks[i].setMap(null);
	N_marks.splice(i,1);
}
function searchedMarker(lat,log) {
	//alert("search");
	lti = lat;
	lng = log;
	var myLatlng = new google.maps.LatLng(lti,lng);
	
	var marker = new google.maps.Marker({
    position: myLatlng,
    map: map.map,
    title:"new area",
	 icon:"http://www.iarp.it/img/icon-gmaps.png",					
});
mrk = marker;
N_marks.push(mrk);
if (P_state!=2) 
{
	var info = "<div id='newData' size='height:100px; width:80px;' >Sequence No:<input type='text' style='width:40px' id='new_seq'/>Description: <input type='text' id='new_desc'/> <button onclick='create("+(N_marks.length-1)+","+lti+","+lng+")'>Click Me!</button><button onclick='new_delMarker("+(N_marks.length-1)+")'>Delete</button></div>";
}
else {
	getAddress(lti,lng);
	var info = "";//getAddress(lti,lng);
} 
var infowindow = new google.maps.InfoWindow({
      content: info
  });
google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map.map,marker);
  });	
	
}
function removeRouteMarkers()
{
	mrks = map.markers;
	alert("came to function :"+mrks.length);	
	lt = [];
	ct = 0;
	for (i=0;i<mrks.length;i++) {	
		if(mrks[i].details.state == 0)
		{	
			ct++;
		}
		else {
			mrks[i].setMap(null);
			lt.push(i);	
		}		
		}
		alert("count :"+ct);
	for (i=0;i<lt;i++) {
			mrks.splice(lt[i], 1);		
		}
}
//function used to make link for marker icon based on seq no provided
function make_link(seq,state)
{
	//https://chart.googleapis.com/chart?chst=d_map_pin_letter_withshadow&chld=A|FF0000|0000FF
	//var link = "https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=ski|bb|"+seq+"|FFFF23|000000";
	colors = "99FF66";
	if (state==2) {
		colors = "336699";	
	}
	var link = "https://chart.googleapis.com/chart?chst=d_map_spin&chld=0.9|0|"+colors+"|12|_|"+seq;	
	//var link="http://google-maps-icons.googlecode.com/files/red"+seq+;
	return link;
}
//function to load values in the table

$('#nw_mrk').submit(function(e){
	e.preventDefault();
	//create(e);
});
//used when a new marker edited
function create(m,lti,lgi)
{
	var seq = parseInt(document.getElementById('new_seq').value);
	var nm = document.getElementById('new_desc').value;	
	var lt = lst.length;
	if(seq==NaN||typeof seq == 'undefined'||seq<1||seq>lt)
	{
		console.log("sequence number is not correct");
		return;	
	}
	N_marks[m].setMap(null);
	N_marks.splice(m,1);
	var temp = new mark(lti,lgi,nm,1);
	lst.splice(seq,0,temp);
	lst1.splice(seq,0,null);
	for (i=1;i<lst1.length;i++) {
		var mrk = lst1[i];		
		if (typeof mrk != 'undefined'&&mrk!=null&&mrk.details.M_id>=seq) {
			mrk.details.M_id+=1;
			mrk.setIcon(make_link(mrk.details.M_id,mrk.details.state));			
		}
	}
	var mk = addMarker(seq);	
	dragEvent(mk);	
	change();
	setTable();
		
	if (seq<lst.length-1) {
		console.log('next del');
		if (lst[seq+1].stop_name==lst[seq].stop_name&&lst[seq+1].state==2) {
						console.log('next del');						
						deldone1(seq+1);
		}		
	}
}
function dragEvent(mrk) {
	google.maps.event.addListener(mrk, 'dragend', function (evt) {
    			var it = this.details.M_id;
				var pos = this.getPosition();
				console.log("single drag :"+this.getTitle());				    			
    			console.log("its "+pos.lat());
				lst[it].lat = pos.lat(); 
				lst[it].lon = pos.lng();
				if (lst[it].state==3) {
					make_markerNew(it);				
				}
				this.details.bound.setMap(null);
				this.details.bound=trace(it,radius);
				change();				
				reflect_Data(it);						 
		});
}
function swapIndex(ind1,ind2) {
		if (ind1<lst.length&&ind2<lst.length&&ind1>0&&ind2>0&&lst[ind1].state!=2&&lst[ind2].state!=2) {
				var temp = lst[ind1];
				lst[ind1] = lst[ind2];
				lst[ind2] = temp;
				temp = lst1[ind1];
				lst1[ind1] = lst1[ind2];
				lst1[ind2] = temp;
				lst1[ind1].details.M_id = ind1;
				lst1[ind2].details.M_id = ind2;
				console.log(ind1+":"+lst1[ind1].getTitle()+':'+ind2+":"+lst1[ind2].getTitle());
				lst1[ind1].setIcon(make_link(ind1,lst1[ind1].details.state));
				lst1[ind2].setIcon(make_link(ind2,lst1[ind2].details.state));
				var m1=-1,m2=-1;		
				setTable();	
				change();
		}
		else {
			console.log("entered numbers are not valid");		
		}		
}
function addMarker(seq)
{
if (lst[seq].state!=2) 
{	
	var myLatlng = new google.maps.LatLng(lst[seq].lat,lst[seq].lon);
	 
	
	var marker = new google.maps.Marker({
    position: myLatlng,
    map: map.map,
    title:lst[seq].stop_name,
				icon:make_link(seq,lst[seq].state),
				draggable: true,				
				details: {
					state:1,
					M_id:seq,
					bound:trace(seq,radius),
					oPos:null					
					},	
});

var ln = lst1.length;
	infowindow = new google.maps.InfoWindow({
      content: '<p>'+lst[seq].stop_name+'</p><button onclick="removeMarker1('+seq+')">Delete</button>'
  });
google.maps.event.addListener(marker, 'click', function() {   
	 infowindow.setContent('<p>'+marker.details.M_id+'.'+marker.getTitle()+'</p><button onclick="removeMarker1('+marker.details.M_id+')">Delete</button>');   
    infowindow.open(map.map,marker);
  });
  lst1[seq] = (marker);
	return marker;
}
}
var infowindow = new google.maps.InfoWindow();
//get marker address from map.markers
function getData() {
	mrks = map.markers;
	for (i=0;i<mrks.length;i++) {
		if (typeof mrks[i].details != "undefined" && mrks[i].details.state==1) {
			lst1.push(mrks[i]);		
		}
		else {
				scity1.push(mrks[i]);	
		}
		/*else if(typeof mrks[i].details != "undefined" && mrks[i].details.state==0){
					
		}*/		
	}
	alert(mrks.length);
	alert("length the getData:"+lst1.length);		
}
function getBounds(N,W,Et,S) {
	console.log('bounds :'+N+':'+W+':'+Et+':'+S+':');
	var strictBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(N, W), 
    new google.maps.LatLng(S, Et)
);
myRt = [new google.maps.LatLng(N,W),new google.maps.LatLng(N,Et),
			new google.maps.LatLng(S,Et),new google.maps.LatLng(S,W)];
var flightPath=new google.maps.Polygon({
  path:myRt,
  strokeColor:"#0000FF",
  strokeOpacity:0.8,
  fillOpacity:0.4,
  fillColor:"#0000FF"
  });
   //strokeWeight:2,
  flightPath.setMap(map.map);
/*var strictBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(85, -180),           // top left corner of map
    new google.maps.LatLng(-85, 180)            // bottom right corner
);*/
return flightPath;
}
function trace(seq,rad) {
	var radius = new google.maps.Circle({
	center : new google.maps.LatLng(lst[seq].lat,lst[seq].lon),
	radius : rad,
	strokeColor:"#0000FF",
	fillOpacity : 0.1,
	strokeOpacity : 0.4,
	fillColor:"#0000FF"
	});
	radius.setMap(map.map);
	return radius;
}
function change() {
	var th = false;
	var cnt =0;	
	Notification_NotesClean();	
	//$("#Noc_List").html("");
	for (i=1;i<lst1.length;i++) {
		var mar = lst1[i];
		if (lst[i].state==1) {
			//console.log("dg");
		var bound = mar.details.bound.getBounds();
		var ind = -1;		
			dt = 200.0;
		for (j=0;j<scity1.length;j++) {
			//alert("type in 2:");
			if (bound.contains(scity1[j].getPosition())) {
				cnt+=1;
				var dist = getDistance(mar.getPosition().lat(),mar.getPosition().lng(),scity1[j].getPosition().lat(),scity1[j].getPosition().lng());			
			//console.log(mar.details.M_id+" : "+dist);			
				if(dist<dt)
				{
					dt = dist;
			//		alert(mar.details.M_id+" : "+dist);
					ind = j;			
				}			
			}
		}
		//alert(mar.details.M_id+" final dt: "+dt);
		if (dt==0.0) {
				data_change(i,ind);
			}
			if (dt>0&&dt<200) {
				th = true;
				//mar.details.state = 4;
				var ind1 = ind;
				var ind2 = i;
				//alert("i value is working:"+i);
				dvid = "note"+mar.details.M_id;
			//	alert("make div:"+dvid);
					chk = "<input type='checkbox' id='N_chk"+mar.details.M_id+"'/>";
				$("#Noc_List").html("<div id="+dvid+">"+chk+"Merge :"+mar.title+"("+mar.details.M_id+") and "+scity1[ind].details.stop_name+
				"<br><button onclick='chMark("+ind2+","+ind1+",1)' id='N_B_Y_"+mar.details.M_id+"' class='s_btn1'>yes</button>&nbsp;<button class='s_btn1' onclick='chMark("+ind2+","+ind1+",0)' id='N_B_N_"+mar.details.M_id+"'>NO</button><hr></div>"+$("#Noc_List").html());
			}
			}
	}
	check_NotificationBar();
	
}
function getNotification(mar)
{
	
	}
function changeCheckBox(chk) {
	var b_val = chk.checked;	
	var notes = document.getElementById("Noc_List");
	var c = notes.childNodes;	
	for (i=0;i<c.length;i++) {	
				if (c[i].id.match("note[0-9]*"))
				{
				var c_id = c[i].id;
				var ch = c_id.replace("note","N_chk");
				var ck = document.getElementById(ch);
				ck.checked=b_val;					
				}					
			}
}
function removeCheckedNotification(val) {
		var ele = document.getElementById("Noc_List");
	var c = ele.childNodes;
	var itms = [];
	for (i=0;i<c.length;i++) {
		if (c[i].id.match("note[0-9]*")) {
			var c_id = c[i].id;
			var ch = c_id.replace("note","N_chk");
			var ck = document.getElementById(ch);				
			if (ck.checked) {			
				itms.push(c_id.replace("note","").trim());
			}
		}
	}
	var b_val= 'N';	
	if (val==1) {
		b_val = 'Y';
	}
	var b_list = [];
	console.log(itms.length);
	for (i=0;i<itms.length;i++) {
		b_list.push(document.getElementById("N_B_"+b_val+"_"+itms[i]));
	}
	for (j=0;j<b_list.length;j++) {		
		b_list[j].click();
	}
	document.getElementById("totalChk").checked=false;
	check_NotificationBar();
}
function getDistance(lat1,lon1,lat2,lon2) {
	//alert(a);	
	var R = 6371; // km
	var p1 = lat1*(Math.PI/180); //Math.PI
	var p2 = lat2*(Math.PI/180);
	var d1 = (lat2-lat1)*(Math.PI/180);
	var d2 = (lon2-lon1)*(Math.PI/180);
	//alert("math value  :"+Math.PI);
	//alert(p1+" : "+p2+" : "+d1+" : "+d2);
var a = Math.sin(d1/2) * Math.sin(d1/2) +
        Math.cos(p1) * Math.cos(p2) *
        Math.sin(d2/2) * Math.sin(d2/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;
return d*1000;
}
function getDistance1(loc1,loc2) {
	//alert(a);	
	var lat1 = loc1.lat();
	var lon1 = loc1.lng();
	var lat2 = loc2.lat();
	var lon2 = loc2.lng();
	var R = 6371; // km
	var p1 = lat1*(Math.PI/180); //Math.PI
	var p2 = lat2*(Math.PI/180);
	var d1 = (lat2-lat1)*(Math.PI/180);
	var d2 = (lon2-lon1)*(Math.PI/180);
	//alert("math value  :"+Math.PI);
	//alert(p1+" : "+p2+" : "+d1+" : "+d2);
var a = Math.sin(d1/2) * Math.sin(d1/2) +
        Math.cos(p1) * Math.cos(p2) *
        Math.sin(d2/2) * Math.sin(d2/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;
return d*1000;
}
function chMark(i,ind,st) {
	
	var mar = lst1[i];
	console.log("length is "+lst1.length);
	mar.details.state = 3;
	lst[mar.details.M_id].state = 3;	
	if (st==1) {	
		mar.setPosition(scity1[ind].getPosition());
		var id = mar.details.M_id;		
		lst[id].lat=scity1[ind].getPosition().lat();
		lst[id].lon=scity1[ind].getPosition().lng();
		lst[id].state = 3;
		data_change(i,ind);			
		setTable();
	}
	divd = "note"+lst1[i].details.M_id;
	console.log(divd);	
	removeNotification(divd);
	check_NotificationBar();
	}
function removeNotification(divd) {
	var ele = document.getElementById("Noc_List");
	var c = ele.childNodes;
	var el = null;
	for (i=0;i<c.length;i++) {
		if (c[i].id==divd) {		
		el = c[i];
		//c[i].innerHTML = "";				
		//ele.removeChild(c[i]);
		}
	}
	if(el!=null)
	{
		ele.removeChild(el);
		}
}
function removeNotifications() {
	var ele = document.getElementById("Noc_List");
	var c = ele.childNodes;
	var itms = [];
	for (i=0;i<c.length;i++) {
		if (c[i].id.match("note[0-9]*")) {				
			itms.push(c[i]);
			
		}
	}
	for(i=0;i<itms.length;i++)
	{
		ele.removeChild(itms[i]);
		console.log(itms.length);
		console.log('removed');
		}
	ele.innerHTML = '';
}
function make_markerNew(ind) {
			var mar = lst1[ind];
					var Mi = ind;			   
				mar.details.state = 1;
				var Mi = mar.details.M_id;				
				lst[Mi].stop_id=null;
				lst[Mi].stop_city=cityM.stop_city;	
				lst[Mi].stop_code = null;
				lst[Mi].alias = [];
				lst[Mi].alias.push(lst[Mi].stop_name);				
				//lst[Mi].station_type=cityM.station_type;
				lst[Mi].stop_name=cityM.stop_name;
				lst[Mi].feed_id=null;
				lst[Mi].state = 1;
}
function data_change(ind1,ind2) {
				var mar = lst1[ind1];			   
			   cityM = scity1[ind2].details;
				mar.details.state = 3;
				var Mi = mar.details.M_id;				
				lst[Mi].stop_id=cityM.stop_id;
				lst[Mi].stop_city=cityM.stop_city;	
				lst[Mi].stop_code = cityM.stop_code;
				lst[Mi].alias = cityM.alias;
				if (!contains_a(lst[Mi].alias,lst[Mi].stop_name)) {
					lst[Mi].alias.push(lst[Mi].stop_name);				
				}
				lst[Mi].station_type=cityM.station_type;
				lst[Mi].stop_name=cityM.stop_name;
				lst[Mi].feed_id=cityM.feed_id;
				lst[Mi].state = 3;
				//alert("good :"+lst[Mi]);
}				

function stops_Near(i) {
	var mar = lst1[i];
	if (mar.details.state==1) {
		var ind = -1;		
		var bound = mar.details.bound.getBounds();
		dt = 200;		
		for (j=0;j<scity1.length;j++) {
			//alert("type in 2:");
			if (bound.contains(scity1[j].getPosition())) {
				var dist = getDistance(mar.getPosition().lat(),mar.getPosition().lng(),scity1[j].getPosition().lat(),scity1[j].getPosition().lng());			
			//console.log(mar.details.M_id+" : "+dist);
			//alert(mar.details.M_id+" bound works: "+dist);			
				if(dist<dt)
				{
					dt=dist;
					ind = j;			
				}			
			}
		}
		if (dt==0.0) {
				data_change(i,ind);				
			}
			if (dt>0.0&&dt<200) {
				NOC_Show_messege(1);
				var ind1 = ind;
				var ind2 = i;
				//mar.details.state = 4;
				//alert("i value is :"+i);
				dvid = "note"+mar.details.M_id;
				chk = "<input type='checkbox' id='N_chk"+mar.details.M_id+"'/>";
				chk = "<input type='checkbox' id='N_chk"+mar.details.M_id+"'/>";
				$("#Noc_List").html($("#Noc_List").html()+"<div id="+dvid+">"+chk+"Merge :"+mar.title+"("+mar.details.M_id+") and "+scity1[ind].details.stop_name+
				"<br><button onclick='chMark("+ind2+","+ind1+",1)' id='N_B_Y_"+mar.details.M_id+"' class='s_btn1'>yes</button>&nbsp;<button class='s_btn1' onclick='chMark("+ind2+","+ind1+",0)' id='N_B_N_"+mar.details.M_id+"'>NO</button><hr></div>");
			}}		
}
function setBounds(rad) {
	removeNotifications();
	for (i=1;i<lst1.length;i++) {
		if (typeof lst1[i]!='undefined'&&lst1[i]!=null) {
		lst1[i].details.bound.setMap(null);
		lst1[i].details.bound=trace(lst1[i].details.M_id,rad);		
		stops_Near(i);
	}
	}
	check_NotificationBar();
	//change();	
}
function clean() {
	if (P_state==1||P_state==3) {
		file_fault = false;
	document.getElementById('submenu').innerHTML = "";
	try {	
	for (i=1;i<lst1.length;i++) {
		if (typeof lst1[i] !='undefined') {
		lst1[i].setMap(null);
		lst1[i].details.bound.setMap(null);
		}
		else {
			console.log('adsf');		
		}
	}
	}
	catch (err) {
		console.log('error in cleaning :'+err);	
	}
	for (i=0;i<scity1.length;i++) {
		scity1[i].setMap(null);
		//lst1[i].details.bound.setMap(null);
	}
	for (i=0;i<N_marks;i++) {
		N_marks[i].setMap(null);
	}
	N_marks = [];	
	lst1=[];
	lst=[];
	scity1=[];
	SRoute = null;
	if (flightPath.length>0||flightPath!=null) {
	for (i=0;i<flightPath.length;i++) {
		var flightP = flightPath[i];		
		flightP.setMap(null);
		}
		flightPath=[];
		fpk = [];
		}
	}
	if (P_state==2) {
			the_Stop = null;
			if (typeof the_Stop1 !='undefined'&&the_Stop1!=null) {
				the_Stop1.setMap(null);
			}
			the_Stop1 = null;
	}
	if (P_state==3) {
			
	}
	$("#Noc_List").html("");
	$("#tbl").html("");
	$("#swapbts").html("");
}
function removeMarker1(ind) {
	if(!confirm('Press yes to Delete'))
	{
		console.log('pressed No');
		return;	
	}
	console.log("deleting :"+ind);
	lst1[ind].details.bound.setMap(null);
	lst.splice(ind,1); 		
	lst1[ind].setMap(null);
	lst1.splice(ind,1);
	for (i=1;i<lst1.length;i++) {
		if (lst[i].state!=2&&lst1[i].details.M_id>ind) {
					lst1[i].details.M_id=i;
					console.log(i);
					//lst1[i].setIcon(make_link(lst1[i].details.M_id,lst1[i].details.state));
					lst1[i].setIcon(make_link(i,lst1[i].details.state));
		}
	}
	setTable();	
	change();
}
//============================================================
function checkChange()
{
   var N=Number.MIN_VALUE,W=Number.MAX_VALUE,Et=Number.MIN_VALUE,S=Number.MAX_VALUE;
	//alert("type is  :"+lst.length);	
	for (i=1;i<lst.length;i++) {
		if(lst[i].state!=2)
		{			
			if (lst[i].lat>N) {
				N=	lst[i].lat;
			}
			if (lst[i].lat<S) {
				S=	lst[i].lat;
			}
			if (lst[i].lon<W) {
				W=	lst[i].lon;
			}
			if (lst[i].lon>Et) {
				Et=	lst[i].lon;
			}
		}
	}
	//alert("North west:"+N+" "+W);
	//alert("South East:"+S+" "+Et); 
	var ext = 0.006;
	var path;	
		path = getBounds(N+ext,W-ext,Et+ext,S-ext);
	var strictB = path.getBounds();
	console.log('StrictB :'+JSON.stringify(path.getBounds()));
	selectStops(strictB);
	path.setMap(null);
	//trace();	
}
function selectStops(strictB) {
		scity1=[];
		//alert("looping :");
		console.log('city stops :'+Dstps.length);
			if (file_fault) {
					for (i=0;i<Dstps.length;i++) {
					addMarkerN(i);	
			}
			}
			else {
				for (i=0;i<Dstps.length;i++) {
				if (strictB.contains(new google.maps.LatLng(Dstps[i].lat, Dstps[i].lon))){
					//alert("select looping :"+i);
					addMarkerN(i);
					//console.log('working select stops');
					
				}
			}
			}
			//console.log('working select stops');
			//console.log(JSON.stringify(scity1));
			/*var dt = "";
			for (i=0;i<scity1.length;i++) {
				dt +=JSON.stringify(scity1[i].details);
			}
			alert(dt);*/
	}
function addMarkerN(seq) {

	 var myLatlng = new google.maps.LatLng(Dstps[seq].lat,Dstps[seq].lon);
	 var infowindow = new google.maps.InfoWindow({
      content: '<p>'+Dstps[seq].stop_name+'</p>'
  });
	
	var marker = new google.maps.Marker({
    position: myLatlng,
    map: map.map,
    title:Dstps[seq].stop_name,
				icon:"pic/teal_dot.png",				
				details: {
					stop_name:Dstps[seq].stop_name,					
					state:0,
					alias:Dstps[seq].alias,
					stop_id:Dstps[seq].stop_id,
					stop_city:Dstps[seq].stop_city,
					stop_code: Dstps[seq].stop_code,
					alias:Dstps[seq].alias,
					station_type:Dstps[seq].station_type,
					doc_type:Dstps[seq].doc_type,
					last_updated:Dstps[seq].last_updated,
               stop_name:Dstps[seq].stop_name,
				  feed_id:Dstps[seq].feed_id					
					},	
});
scity1.push(marker);
google.maps.event.addListener(marker, 'click', function() {
	infowindowBs.setContent('<p>'+Dstps[seq].stop_name+'</p>');
    infowindowBs.open(map.map, marker);
  //  infowindow.open(map.map,marker);
  });				
}
//=======================================================================
function place_Submenu() {	
	var str = '<input type="text" name="chance" id="rangeVal" class="text" value="75" readonly style="width:30px"><input id="ex1" type="range" id="chanceSlider" class="vHorizon" min="1" max="99" step="1" style=\'width:300px\' value=\'75\' onchange="chg()"/>';
}
var the_Stop;
var the_Stop1 = null;
function Edit_Stop(stp) {
	Fstate = 1;
	if (the_Stop1!=null) {
			the_Stop1.setMap(null);
	}
	the_Stop=new mark(stp.lat,stp.lon,stp.stop_name,0);		   
				the_Stop.stop_id=stp.stop_id;
				the_Stop.stop_city=stp.stop_city;	
				the_Stop.stop_code = stp.stop_code;
				the_Stop.alias = stp.alias;
				//the_Stop.alias.push(lst[Mi].stop_name);
				the_Stop.station_type=stp.station_type;
				the_Stop.stop_name=stp.stop_name;
				the_Stop.feed_id=stp.feed_id;
				the_Stop.state=0;
				setStopData();
				the_Stop1 = addMarkerObj(the_Stop);
				google.maps.event.addListener(the_Stop1, 'dragend', function (evt) {
				//alert(i);    			
    			//var it = this.details.M_id;
				var pos = this.getPosition();
				    			
    			console.log("its "+pos.lat());
				the_Stop.lat = pos.lat(); 
				the_Stop.lon = pos.lng();
				console.log(the_Stop.lat+" : "+the_Stop.lon);
				//$("#stop_lat").val(the_Stop.lat);
				//$("#stop_lon").val(the_Stop.lon);
				document.getElementById("stop_lat").innerHTML =the_Stop.lat;
				document.getElementById("stop_lon").innerHTML =the_Stop.lon; 					 
		}); 	
}
function addMarkerObj(mar) {
	var myLatlng = new google.maps.LatLng(mar.lat,mar.lon);
	var marker = new google.maps.Marker({
    position: myLatlng,
    map: map.map,
    title:mar.stop_name,
				icon:make_link(1,mar.state),
				draggable: true,				
				details: {
					state:mar.state,					
					},	
});
var infowindow = new google.maps.InfoWindow({
      content: '<p>'+mar.stop_name+'</p>' });
      
google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map.map,marker);
  });
	return marker;
}
function setStopData() {
	var str = "<div id='Stop_data' style='background-color:#e7e7e7'><br>";
		str+="<label>Stop Name</label>:&nbsp<p id='stop_name' class='s_p' contenteditable=true>"+the_Stop.stop_name+"</p><br>";
		str+="<label>Stop Code</label>:&nbsp<p id='stop_code' class='s_p' contenteditable=true>"+the_Stop.stop_code+"</p><br>";
		str+="<label>Station Type</label>:&nbsp<p id='station_type' class='s_p' contenteditable=true>"+the_Stop.station_type+"</p><br>";
		str+="<label>City</label>:&nbsp<p id='stop_city' class='s_p' contenteditable=true>"+the_Stop.stop_city+"</p><br>";
		str+="<label>Feed ID</label>:&nbsp<p id='feed_id' class='s_p' contenteditable=true>"+the_Stop.feed_id+"</p><br>";
		str+="<label>Lat</label>:&nbsp<p id='stop_lat' class='s_p' contenteditable=true>"+the_Stop.lat+"</p><br>";
		str+="<label>Lon</label>:&nbsp<p id='stop_lon' class='s_p' contenteditable=true>"+the_Stop.lon+"</p><br>";
		str+="<button onclick='stop_apply()'>Apply Changes</button></div>";	
	$("#tbl").html(str);
}
function stop_apply() {
				//svar d = document.getElementById('stop_name');
				//alert("sadf :"+typeof d.innerHTML);
				the_Stop.stop_name=document.getElementById('stop_name').innerHTML;//$("#stop_name").html(); 
				the_Stop.stop_city=document.getElementById("stop_city").innerHTML; 
				the_Stop.stop_code = document.getElementById("stop_code").innerHTML; 
				the_Stop.lat = parseFloat($("#stop_lat").html());
				the_Stop.lon = parseFloat($("#stop_lon").html());
				the_Stop.station_type=$("#station_type").html();
				the_Stop.feed_id=$("#feed_id").html();
				the_Stop1.setPosition(new google.maps.LatLng(the_Stop.lat, the_Stop.lon));
}
function loadRoute(e) {
	console.log(city.city);
	var lt = e.stop_sequence;
	SRoute = e;
	console.log(JSON.stringify(SRoute));
	//c_poly(SRoute.polylines);
	for (i=0;i<lt.length;i++) {
		var m = lt[i];	
		var mrk = new mark(m.lat,m.lon,1);	
		cp_Marker(mrk,m);
		lst.push(mrk);	
	}
	Fstate=1;
	loadMenu3();
	checkChange();
	load();
	change();
	evts();
}
function cp_Marker(mrk,from) {
	mrk.stop_id=from.stop_id;
	mrk.stop_city=from.stop_city;	
	mrk.stop_code =from.stop_code;
	mrk.alias=from.alias;
	mrk.station_type=from.station_type;
	mrk.stop_name=from.stop_name;
	mrk.feed_id=from.stop_name;	
}
function Notification_NotesClean()
{
	console.log("cleaning Notifications");
	var nt = document.getElementById('Noc_List');
	var ch = nt.childNodes;	
	var te = [];	
	for (i=0;i<ch.length;i++) {
		if (ch[i].id.match('note[0-9]*')) {
					te.push(ch[i]);
		}
			
	}
	for (i=0;i<te.length;i++) {
		nt.removeChild(te[i]);
	}
}