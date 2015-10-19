var nav = new Array("home");
var path = "";
var production=1;

var htmlItem = '<div class="item cat" id="cat-{id}">'+
		'<div class="bt">'+
			'<div class="nom"><div class="txt">{nombre}</div></div>'+
		'</div>'+
	'</div>';

var data;

$(document).ready(function(){

	if(production==1) 
		path="http://picnic.pe/clientes/datum/";
	else
		path="http://localhost/datum/";

	ini_datos();
	

	$("#nav .back").on("tap",function(){
		$("#"+nav.pop()).hide();
		$("#"+nav[nav.length-1]).show();
		if(nav.length==1) $(this).hide();
	})

	$("#home .btempezar").on("tap",function(){
		$("#home").hide();
		$("#menu").show();
		$("#nav .back").show();
		nav.push("menu");
	});
	$("#menu .item.cat").on("tap",function(){
		$("#menu").hide();
		$("#categoria").show();
		nav.push("categoria");
	});
})
function ini_datos(){
	alert(1);
	$.ajax({
		crossDomain: true,
		url:ruta("api/data.json"),
		dataType:'json',
		success:function(response){
			alert("ok");
		},
		error:function(request,b,c){
			alert("error");
			
		      alert("Error request status text: " + request.statusText);
		      alert("Error request status: " + request.status);
		      alert("Error request response text: " + request.responseText);
		      alert("Error response header: " + request.getAllResponseHeaders());
		}
	}).done(function(res){
		data = res.data;
		cargar_categorias();
	});
}

function cargar_categorias(){

	var div = $(".seccion#menu");

	var preHTML = div.html();
	div.empty();
	$.each(data,function(key,val){
		var html = htmlItem;
			html = html.replace("{nombre}",val.nombre);
			html = html.replace("{id}",val.id);
		div.append(html);
		$("#cat-"+val.id+" .bt").css("background-image","url("+ruta("files/"+val.icono)+")");
	});
	div.append(preHTML);
}

function ruta(str){
	return path+str;
}