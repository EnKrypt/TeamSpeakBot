module.exports=function(context){
	if (context.args[0]=='+'){
		context.ex.stdin.write('\x5d');
	}
	else if (context.args[0]=='-'){
		context.ex.stdin.write('\x5b');
	}
	else{
		throw new Error('Invalid parameters for speed control');
	}
}