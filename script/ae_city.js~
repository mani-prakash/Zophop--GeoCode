var AC_city;
function line_map(name,URL) {
	this.name = name;
	this.url = URL;
}
function AC_CITY1(city,doc_type,lat_a,lon_a,lat_b,lon_b,last_updated,state) {
	this.city = city;
	this.doc_type = doc_type;
	this.lat_a = lat_a;
	this.lon_a = lon_a;
	this.lat_b = lat_b;
	this.lon_b = lon_b; 
	this.MOT=[];
	this.line_map=[];
	this.last_updated = last_updated;
	this.state = state;
}
function C_add_city() {
	var spaces = "&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	var str="<div>";
	str+="";
str +="<p>City </p> : <input type='text' id='AC_city_name'/><br><br>";
str +="<div id='menu'><label>Set Bounds</label><br>";
str +="<label>lat A </label>: <input type='text' id='AC_lat_a' class='fld60'/>";
str +=spaces+"<label>lon A </label>    : <input type='text' id='AC_lon_a' class='fld60'/><br>";
str +="<label>lat B </label>: <input type='text' id='AC_lat_b' class='fld60'/>";
str +=spaces+"<label>lon B </label>    : <input type='text' id='AC_lon_b' class='fld60'/><br></div>";
str +="<label>MOT </label><br><div id='AC_MOT' ></div><br></div>";
	return str;
}
function AC_add_city() {
	var cti = new AC_CITY1('Enter_City_Name',null,18.9750,72.9258,19.0750,72.8258,null,0);
	cti.MOT = [];
	cti.line_map = [];	
	AC_city = cti;
	document.getElementById('city_heading').innerHTML = "<button class='btn btn-info' style='float:right' onclick='AC_server_Submit()' >Submit</button></div>";
	AC_setMenu();
	setBounds_rectangle(18.9750,72.9258,19.0750,72.8258);
}
function A_edit_additional() {
	var str = "<div>";
	str +="<label>Last Updated </label> : <input type='text' id='AC_last_up' readonly/><br>";
	str +="<label>URL </label><br> <textarea id='AC_URL' rows=4 cols=30/></textarea><br></div>";
	return str;
}
function edit_city() {
	var str="<div id='city_menu1'>";//onkeyup='load_CityList(this.value)'
	str+="<input type='text' id='citySearch' list='AC_citylist' onkeypress='cityFld_KeyPress(event)' onkeyup='load_CityList(this.value)' placeholder='Enter City'/><datalist id='AC_citylist'></datalist>";
	str+="&nbsp;<button class='btn btn-info' style='float:right' onclick='AC_server_Submit()' >Submit</button></div>";
	return str;
}
function AC_buttons() {
	var str = "<button>Apply</button>&nbsp";
	str+="<button>Get Bounds</button>&nbsp";
	return str;
}
var map1;
function loadMap1() {
//	alert("sdf");
	 var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(18.9750, 72.8258)
  };
  map1 = new google.maps.Map(document.getElementById('map1'),mapOptions);


  //rectangle.setMap(map1);

  // Add an event listener on the rectangle.
  //google.maps.event.addListener(rectangle, 'bounds_changed', showNewRect);

  // Define an info window on the map.
  infoWindow = new google.maps.InfoWindow();
}
function setBounds_rectangle(lat_a,lon_a,lat_b,lon_b) {
	console.log("dsf");	
	//alert(lat_a+":"+lon_a+":"+lat_b+":"+lon_b);	
	var bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(lat_a, lon_a),
      new google.maps.LatLng(lat_b, lon_b)
  );
	 rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: true,
    draggable: true
  });
  /*google.maps.event.addListener(mrk, 'dragend', function (evt) {
  	alert("edited");
  });*/
	rectangle.setMap(map1);
	google.maps.event.addListener(rectangle, 'bounds_changed', showNewRect);
}
var rectangle;
var infoWindow;

// Show the new coordinates for the rectangle in an info window.

/** @this {google.maps.Rectangle} */
function showNewRect(event) {
  var ne = rectangle.getBounds().getNorthEast();
  var sw = rectangle.getBounds().getSouthWest();

  var contentString = '<b>Rectangle moved.</b><br>' +
      'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
      'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

  // Set the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(ne);

  infoWindow.open(map1);
  document.getElementById('AC_lat_a').value = ne.lat();
  document.getElementById('AC_lon_a').value = ne.lng();
  document.getElementById('AC_lat_b').value = sw.lat();
  document.getElementById('AC_lon_b').value = sw.lng();
}
	function cityFld_KeyPress(e) {
	if(e.which == 10 || e.which == 13) {
	var val = $("#citySearch").val();
	document.getElementById('citySearch').value='';	
	//$("#citySearch").val("");
	callServer_City(val);
}
}
function arrange_City(ct) {
	if (ct.lon_a<ct.lon_b) {
			var temp = ct.lon_b;
			ct.lon_b = ct.lon_a;
			ct.lon_a = temp;	
	}
	if (ct.lat_a<ct.lat_b) {
			var temp = ct.lat_b;
			ct.lat_b = ct.lat_a;
			ct.lat_a = temp;	
	}
	var cti = new AC_CITY1(ct.city,ct.doc_type,ct.lat_a,ct.lon_a,ct.lat_b,ct.lon_b,ct.last_updated,ct.city);
	cti.MOT = ct.MOT;
	lt = [];
	for (i=0;i<ct.line_map.length;i++) {
		lt.push(new line_map(ct.line_map[i].name,ct.line_map[i].url));	
	}
	cti.line_map = lt;
	console.log(JSON.stringify(cti));
	AC_city = ct;
	AC_setMenu();
}
function AC_set_chks(){
	var chks = "<div id='AC_MOT_CHK' >";
	for (i=0;i<AC_city.MOT.length;i++) {
		chks +="<input type='checkbox' name='AC_MOT' value="+AC_city.MOT[i]+" checked><p class='chk_data'>&nbsp;"+AC_city.MOT[i]+"</p>";
		if (i%2!=0&&i!=0&&i!=AC_city.MOT.length-1) {
			chks+="<br>";	
		}	 	
	}
	if (AC_city.MOT.length==0) {
		chks +="<input type='checkbox' name='AC_MOT' value='BUS' ><p class='chk_data'>&nbsp;BUS</p>";
		chks +="<input type='checkbox' name='AC_MOT' value='METRO'><p class='chk_data'>&nbsp;METRO</p>";
		chks+="<br>";
		chks +="<input type='checkbox' name='AC_MOT' value='TRAIN'><p class='chk_data'>&nbsp;TRAIN</p>";
		chks +="<input type='checkbox' name='AC_MOT' value='MONORAIL><p class='chk_data'>&nbsp;MONORAIL</p>";		
		chks+="<br>";	
	}
	chks+="</div>";
	return chks;
}
function AC_set_line_map() {
	var chks="<div id='line_map_list' style='height:120px; overflow:scroll;'>";
	for (i=0;i<AC_city.line_map.length;i++) {
		var k = "line_mapC"+i;
		var t = AC_city.line_map[i];
	chks+="<div id="+k+" class='line_mapC'><input type='checkbox' name='line_map' id='chk' value="+i+"style='float:right;'>";
	chks+="<p id='nm'>"+t.name+"</p><p id='url' contenteditable=true>"+t.url+"</p></div>";	
	}
	chks+="</div>";
	return chks;
}
function AC_edit_bounds() {
	rectangle.setMap(null);
	//alert()
	rectangle = null;
	var lt_a = parseFloat(document.getElementById('AC_lat_a').value);
	var ln_a = parseFloat(document.getElementById('AC_lon_a').value);
	var lt_b = parseFloat(document.getElementById('AC_lat_b').value);
	var ln_b = parseFloat(document.getElementById('AC_lon_b').value);	
	//alert(lt_a+":"+ln_a+":"+lt_b+":"+ln_b);		
	setBounds_rectangle(lt_a,ln_a,lt_b,ln_b);
}
function AC_setMenu()
{
	var spaces = "&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	var str="<div>";
	str+="";
	str +="<br>City &nbsp; <input type='text' id='AC_city_name' value="+AC_city.city+"><br><br>";
	str +="<div id='menu'><label>Set Bounds</label><br>";
	str +="lat A <input type='text' id='AC_lat_a' class='fld60' onblur='AC_edit_bounds()' value="+AC_city.lat_a+">";
	str +=spaces+"<label>lon A </label>    : <input type='text' id='AC_lon_a' class='fld60' onblur='AC_edit_bounds()' value="+AC_city.lon_a+"><br>";
	str +="<label>lat B </label>: <input type='text' id='AC_lat_b' class='fld60' onblur='AC_edit_bounds()' value="+AC_city.lat_b+">";
	str +=spaces+"<label>lon B </label>    : <input type='text' id='AC_lon_b' class='fld60' onblur='AC_edit_bounds()' value="+AC_city.lon_b+"><br></div>";
	str +="<label>MOT </label><br>";
	str+=AC_set_chks();
	str+="<button style='border-radius:10px;' onclick='add_MOT()'>+</button>&nbsp;";//<button class='s_btn' style='width:40px' onclick='add_MOTCHK(1)'>
	str+="<div id='addChk' style='display:none'><input type='text' id='new_chk'><img src='pic/add1.png' onclick='add_MOTCHK(1)' class='btn_IMG'>";
	str+="<img src='pic/cancel1.png' onclick='add_MOTCHK(0)' class='btn_IMG'></div><br>";
	str+="<label>LINE MAPS</label>&nbsp;&nbsp;<img src='pic/cancel1.png' class='btn_IMG' onclick='remove_line_map()'><br>";	
	str+=AC_set_line_map();
	str+="<img src='pic/down.png' class='btn_IMG' id='img_add_link' onclick='show_link_make_add(this)'>";
	str+="<div id='link_make_add' style='display:none'>Key :<input type='text' id='line_map_new_name' ><br><br> Value&nbsp; :<input type=text id='line_map_new_url'>";
	str+= "<button class='s_btn' onclick='add_line_map()'>+</button></div>"	
	str +="<br></div>";
	
	var pic = document.getElementById('city_data');
	pic.innerHTML = str;
	//map1.setCenter({lat: AC_city.lat_a, lng: AC_city.lon_a});	
	setBounds_rectangle(AC_city.lat_a,AC_city.lon_a,AC_city.lat_b,AC_city.lon_b);
	//return str;
}
function show_link_make_add(ig) {
	ig.src='pic/up.png';
	ig.onclick=function(){hide_link_make_add(this)};
	document.getElementById('link_make_add').style.display='block';
}
function hide_link_make_add(ig) {
	ig.src='pic/down.png';
	ig.onclick=function(){show_link_make_add(this)};
	document.getElementById('link_make_add').style.display='none';
}
function add_line_map() {
	var l_m = document.getElementById('line_map_list');
	var tl = document.getElementById('line_map_new_name').value;
	var url = document.getElementById('line_map_new_url').value;
	document.getElementById('line_map_new_name').value = '';
	document.getElementById('line_map_new_url').value = '';	
	var lt = l_m.childNodes;
	var k = "line_mapC"+lt.length;
	var chks='';
	chks+="<div id="+k+" class='line_mapC'><input type='checkbox' name='line_map' id='chk' value="+lt.length+"style='float:right;'>";
	chks+="<p id='nm'>"+tl+"</p><p id='url' contenteditable=true>"+url+"</p></div>";
	l_m.innerHTML +=chks; 	
}
function remove_line_map() {
	var l_m = document.getElementById('line_map_list');
	var lt = l_m.childNodes;
	var slt = [];	
	for (i=0;i<lt.length;i++) {
		var e = lt[i];		
		var ch = e.getElementsByTagName('input')[0];		
		if (ch.checked) {
			slt.push(e);			
		}		
	}
	for (i=0;i<slt.length;i++) {
		l_m.removeChild(slt[i]);		
	}	
}
function AC_server_Submit() {
	var ct = AC_city; 
	ct.city = document.getElementById('AC_city_name').value;
	ct.lat_a = parseFloat(document.getElementById('AC_lat_a').value);
	ct.lon_a = parseFloat(document.getElementById('AC_lon_a').value);	
	ct.lat_b = parseFloat(document.getElementById('AC_lat_b').value);
	ct.lon_b = parseFloat(document.getElementById('AC_lon_b').value);
	//var temp = [];
	AC_city.MOT = [];	
	var checkedValue = null; 
	var inputElements = document.getElementsByName('AC_MOT');
	for(i=0; i<inputElements.length; i++){
      if(inputElements[i].checked){
           AC_city.MOT.push(inputElements[i].value);
      }
}
	AC_city.line_map = [];
	var inputElements = document.getElementById('line_map_list').childNodes;
	for(i=0; i<inputElements.length; i++){
      	var e = inputElements[i].childNodes;
			var nm,url;      	
      	for (j=0;j<e.length;j++) {
				  if (e[j].id=='nm') {
						nm = e[j].innerHTML; 				  
				  }
				  if (e[j].id=='url') {
						url = e[j].innerHTML; 				  
				  }    	
      	}
      	
      	//alert(nm+" : "+url);
         AC_city.line_map.push(new line_map(nm,url));
} 
	//console.log(JSON.stringify(AC_city));	
	callServerCityAC_Submit(JSON.stringify(AC_city));
	//console.log("---"+JSON.stringify(AC_city));	
}	

function add_MOT()
{
	var d = document.getElementById('addChk');
	d.style.display='inline-block';
}
function add_MOTCHK(ind) {
	var d = document.getElementById('addChk');
	var new_MOT = document.getElementById('new_chk').value;
	if (ind==0) {
		d.style.display='none';
	return;	
	}
	if (new_MOT==""||new_MOT==NaN||typeof new_MOT=='undefined') {
	alert("enter data properly");	
	return;	
	}	
	var chks = document.getElementById('AC_MOT_CHK');
	if (AC_city.MOT.length%2==0) {
		chks.innerHTML+='<br>';
	}
	chks.innerHTML+="<input type='checkbox' name='AC_MOT' value="+new_MOT+" checked><p class='chk_data'>&nbsp;"+new_MOT+"</p>";
	AC_city.MOT.push(new_MOT);
	d.style.display='none';
}
function AC_DEL_line_mark()
{
	var d = document.getElementById('line_map_list').childNodes;
	for (i=0;i<d.length;i++) {
				var de= d.getElementsByTagName('input');
		/*if () {
					
		}	*/
	}
}
function city_clean() {
	document.getElementById('city_heading').innerHTML='';
	document.getElementById('city_data').innerHTML='';
	document.getElementById('addChk').innerHTML='';
	map1= null;
	//document.getElementById('map1').innerHTML='';
	AC_city = null;
	rectangle = null;
}

   