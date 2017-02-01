let $ = require('jquery');
let fetchOption = {
	headers:{
		'Content-Type': 'application/json'
	},
	mode: 'cors'
};
$('form').on('submit',function(e){
	e.preventDefault();
	let types = $('input[type=text]').val().replace(/\s/g,'');
	types = types.split(',');
	console.log(types);

	//箭头函数  如果只是一个参数的话，就可以不用括号
	// getTypesCall 获得一个有promise组成的数组
	let getTypesCall = types.map((elem) => {
		// fetch  可以配置fetchOption
		// fetch 返回的是promise
		return fetch(`http://pokeapi.co/api/v2/type/${elem}/`,fetchOption)
	})
	// console.log(getTypesCall); 
	//Promise.all([promise1,promise2]);

	/*Promise.all(getTypesCall)
		.then((data)=>{
			// data 是promise对象组成的数组
			data = data.map( singleData => singleData.json());
			Promise.all(data)
				.then(res=>{
					console.log(res)
				})
		});
	*/
	getPromiseData(getTypesCall)
		.then((result)=>{
			console.log(result);
			getDoubleDamagePokemon(result)
		})
})

function getDoubleDamagePokemon (pokemonTypes){
	// array.prototype.map 返回的是数组
	// array.protorype.reduce 依次传入数组的单元，返回租后的结果
	pokemonTypes = pokemonTypes.map(types=>{
		return types.damage_relations.double_damage_from;
	})
	.reduce((a,b)=>[...a,...b],[]);   // 将两个数组合并到一个数组中；
	console.log(pokemonTypes)
}


function getPromiseData(promisesArray){
	return new Promise((resolve,reject)=>{
		Promise.all(promisesArray)
		.then(res=>{
			return res.map(type=>type.json());
		})
		.then(res=>{
			Promise.all(res)
				.then(resolve)
		})
		.catch(reject);
	})
}