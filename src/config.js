process.env.PORT = process.env.PORT || 3000;
let urlDB
if (process.env.NODE_ENV === 'local'){
	urlDB = 'mongodb://localhost:27017/m';
}
else {
	urlDB ='mongodb+srv://m:lmAE3312@cluster.f2usi.mongodb.net/m?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB