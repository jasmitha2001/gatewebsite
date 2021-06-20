var express = require('express')
var mongojs=require('mongojs');
var app = express()

app.use(express.static('public'))
//app.set('view engine', 'ejs');

var cstring="mongodb+srv://jasmitha333:jasi333@cluster0.k1evk.mongodb.net/jasmitha?retryWrites=true&w=majority";
var db=mongojs(cstring,['users'])

//MongoDB ConnectionString Example : mongodb://username:password@cluster0-shard-00-00-0hsgx.mongodb.net:27017/databaseName?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin

app.get('/', function(req,res){
	res.sendFile(__dirname+'/public/index.html')
})

app.get('/login', function(req,res){
	res.sendFile(__dirname+'/public/login.html')	
})

app.get('/branch', function(req,res){
	res.sendFile(__dirname+'/public/branches.html')	
})

app.get('/computer', function(req,res){
	res.sendFile(__dirname+'/public/cse.html')	
})

app.get('/electronics', function(req,res){
	res.sendFile(__dirname+'/public/ece.html')	
})

app.get('/mech', function(req,res){
	res.sendFile(__dirname+'/public/mechanical.html')	
})

app.get('/chemi', function(req,res){
	res.sendFile(__dirname+'/public/chemical.html')	
})

app.get('/civ', function(req,res){
	res.sendFile(__dirname+'/public/civil.html')	
})

app.get('/medical', function(req,res){
	res.sendFile(__dirname+'/public/biomedical.html')	
})

app.get('/home', function(req,res){
	res.sendFile(__dirname+'/public/homepage.html')	
})

app.get('/about', function(req,res){
	res.sendFile(__dirname+'/public/about.html')	
})

app.get('/contact', function(req,res){
	res.sendFile(__dirname+'/public/contact.html')	
})

app.get('/help', function(req,res){
	res.sendFile(__dirname+'/public/help.html')	
})



app.get('/signupSubmit', function(req,res){
	
	var da = {
		Name:req.query.na,
		Email:req.query.em,
		Pass:req.query.ps,
		Phone:req.query.ph
	}

	db.users.find({Email:req.query.em}, function(err,data){
		if(err){
			res.send('something went wrong')
		}
		else{
			if(data.length>0){
				res.send("Email id already exists")
			}else{
				db.users.insert(da,function(err,data){
					if(err){
						res.send("something went wrong")
					}
					else{
						res.sendFile(__dirname+'/public/login.html')	
					}
				})
			}
		}
	})
})

app.get('/loginSubmit', function(req,res){
	var d = {
		Email: req.query.em,
		Pass: req.query.ps
	}

	db.users.find(d, function(err,docs){
		if (err) { 
			res.send('something went wrong')
		}
		/*else{
			if(data.length>0){
				console.log(data)
				db.users.find({}, function(err,dat){
					if(err){
						res.send('something went wrong')
					}
					else{
						console.log(dat)
						res.render('das', {res:data, use: dat})
					}
				})	
			}*/
			if(docs.length>0){
				res.sendFile(__dirname+'/public/homepage.html');
			}
			else{
				res.send('username & password is wrong')
			}
	})

})

/*app.get('/dash', function(req,res){
	
})

app.get('/profile/:username', function(req,res){
	db.users.find({Email:req.params.username}, function(err,data){
		if(err) { 
			res.send('something went wrong')
		}
		else{
			res.render('das', { use: data})
		}
	})

})


// app.get('/sendmessage/:msg/:chatId', function(req,res){
// 	api.sendmessage({
// 		text:req.params.msg

// 	})
// })*/

app.listen('3000', function(){
   console.log("started")
})
