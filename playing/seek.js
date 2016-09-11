module.exports=function(context){
	if (context.args[0]=='+'){
		context.ex.stdin.write('\x67');
	}
	else if (context.args[0]=='-'){
		context.ex.stdin.write('\x61');
	}
	else{
		throw new Error('Invalid parameters for seek control');
	}
}