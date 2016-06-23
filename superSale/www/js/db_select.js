var db;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
 db = window.openDatabase("oferta", "1.0", "SuperSale", 200000);
 db.transaction(readUsuario, transaction_error);
}

function readUsuario(tx)
{
	tx.executeSql ('SELECT * FROM ofertas', [], addLista_Table, transaction_error); 
}


function addLista_Table(tx, results) {
	//console.log(results);
	
	var totalcontactos = results.rows.length;
	
	var tabla = document.getElementById("tabla_datos");
		
	
		for (var i=0; i<totalcontactos; i++) {
			var cont_prin = document.createElement("div");
			cont_prin.className = "thumbnail";
			var fila = document.createElement("div");
			fila.className = "caption";
			
			var columna1 = document.createElement("h3");
			columna1.className ="text-center";
			var columna2 = document.createElement("h4");
			columna2.className ="text-center";
			var columna3 = document.createElement("p");
			columna3.className ="text-center";
			
			var columna4 = document.createElement("p");
			columna4.className ="text-center";
			
			var boton_ver = document.createElement("button");
			boton_ver.id = "boton_ver";
			boton_ver.title = "Anclar a mi Pizarra";
			var span_ver = document.createElement("span");
			
			boton_ver.className ="btn  btn-group-xs btn-warning";
			span_ver.className ="glyphicon glyphicon-pushpin";
			
			var imagen = document.createElement("img");
			
				
			//imagen.src = "C:/Users/DahyannaH/Desktop/superSale/www/img/aceite.jpg";
			imagen.src = results.rows[i].url_img;
			cont_prin.appendChild(imagen);
			
			
			
			columna1.innerHTML = "$ "+results.rows[i].precio_oferta;				
			fila.appendChild(columna1);
			
			
			
			columna2.innerHTML = results.rows[i].descrip_oferta;
			fila.appendChild(columna2);
			
			
				
			columna3.innerHTML = results.rows[i].supermercado_oferta;
			fila.appendChild(columna3);
			
			columna4.innerHTML = "Válida desde "+results.rows[i].fecha_inicio + " Hasta "+ results.rows[i].fecha_fin;
			fila.appendChild(columna4);
			
			fila.appendChild(boton_ver);
			boton_ver.appendChild(span_ver);
			
			fila.appendChild(document.createElement('br'));
			
		cont_prin.appendChild(fila);	
		tabla.appendChild(cont_prin);	
				
			
		}   
       
}

function agregaroferta(tx)
	{
		//db = window.openDatabase("CrearUsuario", "1.0", "SuperSale", 200000);
		var descripcion = document.getElementById("descripcion").value;
		var precio_normal = document.getElementById("precio_normal").value;
		var precio_oferta = document.getElementById("precio_oferta").value;
		var fecha_inicio = document.getElementById("date_ini").value;
		var fecha_fin = document.getElementById("date_fin").value;
		var supermerdado = document.getElementById("super_").value;
		var url_imgen = document.getElementById("img_oferta").value;
		var id_usuario = "Gato";	
		console.log(descripcion+', '+precio_normal+', '+precio_oferta+', '+fecha_inicio+', '+fecha_fin+', '+supermerdado+', '+url_imgen+', '+id_usuario);
		tx.executeSql("insert into ofertas(descrip_oferta, supermercado_oferta, precio_base, precio_oferta, fecha_inicio, fecha_fin, url_img, id_usuario) values ('"+descripcion+"', '"+supermerdado+"', "+precio_normal+","+precio_oferta+",'"+fecha_inicio+"','"+fecha_fin+"','"+url_imgen+"','"+id_usuario+"')"); 	
	}
 
function transaction_error(tx, error) {
 alert("Database Error: " + error);
}
 
function getlogin_success(){
	alert("Problemas al crear la Base de datos");
}
/* function exito (){
	alert("la base se creo");
} */