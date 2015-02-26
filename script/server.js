//var ip = "192.168.0.117:8080";
//var ip = "192.168.1.113:8080";
var ip = "54.169.211.59:8080";
//var ip="10.42.0.17:8080";
function getStops(MOD,flag) {
	Dstps = [];	 
	console.log("MOD is:"+MOD);
	 $.ajax({url:"http://"+ip+"/scheduler/"+city.city+"/stops/"+MOD+"?data=asd",xhrFields:{withCredentials:false},success:function(result){
	var r = preParse(result);
	//var res	= 	'{"total_rows":3577,"rows":[ {"id":"MUMBAI_S_1","key":"1","value":{"stop_id":"1","stop_city":"MUMBAI","lon":72.813933,"stop_code":null,"alias":["Kala Vidyalaya Malvani"],"station_type":"BUS","doc_type":"stop","last_updated":"Mon, Feb 2, 2015 02:49:52 PM GMT","stop_name":"Kala Vidyalaya Malvani","feed_id":null,"lat":19.181627}} ] }';
   // $("#data").html(" data :"+obj);
	console.log("getting stps:"+result.length);
	//console.log(result);
	//$("#tbl").html(r);	
	//var r = result;
	console.log('stops result');
	var obj = JSON.parse(r);
	console.log('stops result1');
	console.log(r.length);
	console.log("Total_Rows = "+obj.total_rows);
	var cnt = obj.rows.length;
	for (i=0;i<cnt;i++) {
		Dstps.push(obj.rows[i].value);	
	}
	console.log(Dstps.length);
	if (flag==1) {
		for (i=0;i<scity1.length;i++) {
			scity1[i].setMap(null);		
		}
		checkChange();	
	}	
	    //$("#data").html(" data :"+obj.rows[0].value.stop_city);
  }});
}
function getCities() {
	$.ajax({url:"http://"+ip+"/scheduler/cities",xhrFields:{withCredentials:false},success:function(result){
		//var r = preParse(result);
	var r=result;	
	r = r.split(',');
	var M_list = [];
	for (i=0;i<r.length;i++) {
			M_list.push(r[i]);
	}
	var select = document.getElementById('city');
	select.innerHTML = "";
	var ot = document.createElement('option');
	var I = 	"<option value='None'>Select City</option>";
	ot.value = 'None';
	ot.innerHTML = 'Select City';
	select.appendChild(ot);
	for (var i = 0; i<M_list.length; i++){
    	var opt = document.createElement('option');
    		opt.value = M_list[i];
    		opt.innerHTML = M_list[i];
    		select.appendChild(opt);
	}
	}});
}
function getRouteList(val) {
	$.ajax({url:"http://"+ip+"/scheduler/"+city.city+"/routes/autocomplete?data="+val,xhrFields:{withCredentials:false},success:function(result){
	console.log("route list :");	
	var sel = document.getElementById('routesList');
	sel.innerHTML = "";	
	var ot = result.split("<br>");
	console.log(ot.length);
	for(i=0;i<ot.length;i++)
	{
		var opt = document.createElement('option');
		var dt = ot[i].split(",");		
		opt.value = ot[i];
		//opt.innerHTML="Name:"+dt[1]+"\n Start:"+dt[2]+"\n"+dt[3]+"<hr>";
		opt.innerHTML = ot[i];		
		sel.appendChild(opt);
		}
  }});
}
function checkroute(nm,f_nm) {
		$.ajax({url:"http://"+ip+"/scheduler/"+city.city+"/routes/check?name="+nm+"&firstName="+f_nm,xhrFields:{withCredentials:false},success:function(result){
		route_id=result;
		if (route_id=="null") {
			 alert("is null:"+route_id);	
		}
		else {	   
	  		alert("not null:"+route_id);
	  }
	   
//	var r = preParse(result);
	//	var obj = JSON.parse(sr);
	  //  $("#data").html(" data :"+obj.rows[0].value.stop_city);
  }});
}

function routeSubmit() {
	//var rt = new route(null,routeNM,lst[1].stop_name,lst[lst.length-1].stop_name,city);
	SRoute.stop_sequence=[];
	if (route_id!="null") {
		SRoute.route_id=route_id;	
	}	
	for (i=1;i<lst.length;i++) {	
	if (lst[i].lat==null||lst[i].lon==null) {
		alert('Stop No :'+i+' is null');		
		return;		
	}	
	SRoute.stop_sequence.push(lst[i]);
	}
	SRoute.first_stop=lst[1].stop_name;
	SRoute.last_stop=lst[lst.length-1].stop_name;
	 var d = JSON.stringify(SRoute);
	//console.log(d);	
	SeverRouteSubmit(SRoute);
}
function SeverRouteSubmit(rt) {
	var dt = JSON.stringify(rt);	
	var link = "http://"+ip+"/scheduler/"+city.city+"/routes/update";
	console.log(dt);	
	$.ajax({type:"POST",url:link,data:dt,xhrFields:{withCredentials:false},success:function(result){
	var r = preParse(result);
	alert(r);
	clean();
  }});
}
//----function written to parse received data before Json parse	
function preParse(result) {
	var r ='';	
	var t = true;	
	for (i=0;i<result.length;i++) {
		if (result.charAt(i)=='<'&&t) {
			t=false;		
		}
		else if(!t&&result.charAt(i)=='>')
		{
		t=true;		
		}
		else if(t)
		{
			r=r+result.charAt(i);
		}  		
  	}
  	r = r.split("&quot;").join('"');
  	return r;
}	
//==================================================
function citySelected() {
		//city/
}
function getRoute(val) {
	var vl = val.split(',');
	var v = vl[0];
	$.ajax({url:"http://"+ip+"/scheduler/"+city.city+"/routes/"+'296',xhrFields:{withCredentials:false},success:function(result){	
		var r = preParse(result);
		var obj = JSON.parse(r);
		vi = obj.rows[0].value;
		//alert(JSON.stringify(vi));	
		console.log(city.city);
		var etr = new route(vi.route_id,vi.first_name,vi.last_stop,vi.city);
	etr.route_name= name;
	etr.last_updated= vi.last_updated;
	etr.agency_id= vi.agency_id;
	etr.agency_name= vi.agency_name;
	etr.has_frequency_trips= vi.has_frequency_trips;
	etr.stop_sequence=vi.stop_sequence;
	if (vi.polylines!=null&&typeof vi.polylines != 'undefined'&& vi.polylines!=NaN) {
			etr.polylines=vi.polylines;
	}
	//alert(JSON.stringify(etr));
	loadRoute(etr); 
  }});
  
}
function getStopsList(stp) {
		$.ajax({url:"http://"+ip+"/scheduler/"+city.city+"/stops/autocomplete?data="+stp,xhrFields:{withCredentials:false},success:function(result){	
	var sel = document.getElementById('stopsList');
	sel.innerHTML = "";
	var ot = result.split(",");
	console.log(ot.length);
	for(i=0;i<ot.length;i++)
	{
		var opt =document.createElement('option');
		opt.value = ot[i];
		opt.innerHTML = ot[i];			
		sel.appendChild(opt);
		}
		console.log("child :"+sel.childNodes.length);
  }});
}
function getModes(city1) {
	$.ajax({url:"http://"+ip+"/scheduler/"+city1+"/MOT?data=x",xhrFields:{withCredentials:false},success:function(result){	
	var c = preParse(result);
	c = JSON.parse(c);  	
	city = c;
	console.log('city data :'+JSON.stringify(city));
	console.log('city data :'+city.city);	
	var r =c.MOT;
	//r = r.split(',');
	var M_list = [];
	for (i=0;i<r.length;i++) {
			M_list.push(r[i]);
	}
	//var M_list = r.split(",");	
	//var select = $("#MOD");
	var select = document.getElementById('MOD');
	select.innerHTML = "";
	var ot = document.createElement('option');
	var I = 	"<option value='None'>None</option>";
	ot.value = 'None';
	ot.innerHTML = 'Select MOD';
	select.appendChild(ot);
	for (var i = 0; i<M_list.length; i++){
    	var opt = document.createElement('option');
    		opt.value = M_list[i];
    		opt.innerHTML = M_list[i];
    		select.appendChild(opt);
	}	
  }});
}
function getStop(val) {
		var v = null;		
		$.ajax({url:"http://"+ip+"/scheduler/"+city+"/stops/"+val,xhrFields:{withCredentials:false},success:function(result){	
		var r = preParse(result);
		var obj = JSON.parse(r);
		v = obj.rows[0].value;	
		Edit_Stop(v);
  }});
}
function getAddress(lat,lng) {
	var lt = lat+","+lng; 
	$.ajax({url:"http://maps.googleapis.com/maps/api/geocode/json?latlng="+lt+"&sensor=true",xhrFields:{withCredentials:false},success:function(result){	
		var r = result;
		var obj = r.results[0].address_components[0];
		var ob = JSON.stringify(obj);
		console.log(ob);		
		
  }});
}
function submitStop(stp)
{
	var dt = JSON.stringify(stp);
	var link = "http://"+ip+"/scheduler/"+city.city+"//update";
	$.ajax({type:"POST",url:link,data:dt,xhrFields:{withCredentials:false},success:function(result){
	var r = preParse(result);
	alert(r);
	clean();
 	}});	
}
function load_overServer() {
	/*var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", 'a_city.html', false);
                xmlhttp.send();
                //return xmlhttp.responseText;
		$('#picmax').html(xmlhttp.responseText);	
		$( "#picmax" ).load( "a_city.html", function() {
});
  alert( "Load was performed." );*/
  document.getElementById("picmax").innerHTML='<object type="type/html" data="a_city.html" ></object>';
}
function load_CityList(val) {
	$.ajax({url:"http://"+ip+"/scheduler/cities/autocomplete?data="+val,xhrFields:{withCredentials:false},success:function(result){	
	var sel = document.getElementById('AC_citylist');
	sel.innerHTML = "";
	var ot = result.split(",");
	console.log(ot.length);
	for(i=0;i<ot.length;i++)
	{
		var opt =document.createElement('option');
		opt.value = ot[i];
		opt.innerHTML = ot[i];			
		sel.appendChild(opt);
		}
		console.log("child :"+sel.childNodes.length);
  }});		
}
function callServer_City(val) {
		//var link = '';
		$.ajax({url:"http://"+ip+"/scheduler/"+val,xhrFields:{withCredentials:false},success:function(result){	
	var r = preParse(result);	
	r = JSON.parse(r);
	//var ct = new AC_city();
	r = r.rows[0].value;
	console.log(JSON.stringify(r));	
	arrange_City(r);	
	//alert(result);
  }});
}
function callServer_addCity(val) {
		//var link = '';
		$.ajax({url:"http://"+ip+":8080/scheduler/"+val,xhrFields:{withCredentials:false},success:function(result){	
	var r = preParse(result);	
	r = JSON.parse(r);
	//var ct = new AC_city();
	r = r.rows[0].value;	
	//arrange_City(r);	
  }});
}
function callServerCityAC_Submit(dt) {
	$.ajax({type:"POST",url:"http://"+ip+"/scheduler/add_city",data:dt,xhrFields:{withCredentials:false},success:function(result){	
	alert(result);	
	//var r = preParse(result);	
	//r = JSON.parse(r);
	//var ct = new AC_city();
	//r = r.rows[0].value;	
	//arrange_City(r);	
  }});
}
