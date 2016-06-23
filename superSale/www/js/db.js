var db;
var result;
function abrirbd()
{	
	try{
		if(window.openDatabase)
		{
			var nomb = 'oferta';
			var version = '1.0';
			var mostrar = 'SuperSale';
			var max = '200000';
			db = openDatabase(nomb,version,mostrar,max);
			console.log("bd abierta");
		}
	}
	catch(e){
		alert(e);
	}
}
function ejecutasql($query,callback)
{
	try
	{
		if(window.openDatabase)
		{
			db.transaction(function(tx)
			{
				tx.executeSql($query,[],function(tx,result)
				{
					console.log(""+$query);
					if(typeof(callback) == "function")
					{
						callback(result);
					}
					else
					{
						if(callback != undefined)
						{
							eval(callback+"(result)");
						}
					}
				}
				,function(tx,error)
				{
					alert(error);
				});
				console.log(""+$query);
			});
			return result;
		}
	}catch(e)
	{
		alert(e);
	}
}
function creartabla()
{
	//var sql = 'drop table oferta';
	//ejecutasql(sql);
	var sql2 = 'CREATE TABLE oferta (nombre varchar(20),precio varchar(20),marca varchar(20),supermercado varchar(20),detalle varchar(20))';
	ejecutasql(sql2);
}

function insertar()
{
	var descripcion = document.getElementById("descripcion").value;
	var precio_normal = document.getElementById("precio_normal").value;
	var precio_oferta = document.getElementById("precio_oferta").value;
	var fecha_inicio = document.getElementById("date_ini").value;
	var fecha_fin = document.getElementById("date_fin").value;
	var supermerdado = document.getElementById("super_").value;
	var url_imgen = document.getElementById("img_oferta").value;
	var id_usuario = "Gato";
	var sql = 'insert into ofertas(descrip_oferta, supermercado_oferta, precio_base, precio_oferta, fecha_inicio, fecha_fin, url_img, id_usuario) values ("'+descripcion+'", "'+supermerdado+'", '+precio_normal+','+precio_oferta+',"'+fecha_inicio+'","'+fecha_fin+'","'+url_imgen+'","'+id_usuario+'")'; 	
	console.log(sql);
	ejecutasql(sql);
}

function printoferta(tx, results) 
{
	var sql = 'select nombre, precio, marca, supermercado,detalle from usuario';
	var totalofertas = results.rows.length; 
	console.log("Total ofertas: " + totalofertas); 
	for (var i=0; i<total; i++)
	{
		console.log(" Nombre = " +results.rows.item(i).nombre + " Precio = " + results.rows.item(i).precio + " Marca = "+results.rows.item(i).marca + " Supermercado = "+results.rows.item(i).supermercado+" Detalle = "+results.rows.item(i).detalle);
	}
	function transaction_error(tx, error) 
	{
		alert("Database Error: " + error);
	}
}