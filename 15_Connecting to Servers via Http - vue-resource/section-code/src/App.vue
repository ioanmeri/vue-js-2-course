<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
				<h1>Http</h1>
				<h2>Sending a Post Request</h2>
				<div class="form-group">
					<label>Username</label>
					<input type="text" class="form-control" v-model="user.username">
				</div>
				<div class="form-group">
					<label>Main</label>
					<input type="text" class="form-control" v-model="user.email">
				</div>
				<button class="btn btn-primary" @click="submit">Submit</button>
				<hr>
				<h2>Sending a Get Request</h2>
				<button class="btn btn-primary" @click="fetchData">Get Data</button>
				<br><br>
				<ul class="list-group">
					<li class="list-group-item" v-for="u in users">{{ u.username }} - {{ u.email }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				user: {
					username: '',
					email: ''
				},
				users: []
			}
		},
		methods: {
			submit(){
				this.$http.post('', this.user)
						.then(response => {
							console.log(response)
						}, error => {
							console.log(error);
						});
			},
			fetchData(){
				this.$http.get('')
						.then(response => {
							return response.json()
							console.log(data);
						})
						.then(data => {
							const resultArray = [];
							for(let key in data){
								resultArray.push(data[key]);
							}
							this.users = resultArray;
						});
			}
		}
	}
</script>

<style>
</style>
