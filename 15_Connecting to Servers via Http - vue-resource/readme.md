# Connecting to Servers via Http - Using vue-resource

**Single Page Application**'s purpose is to **stay on one single page**.
Connecting to Server via AJAX - meaning on the background, behind the scenes.

## Accessing Http via vue-resource - Setup

Since you can mix normal JS with VueJS, you can use any of your favorite AJAX libraries:

* jQuery AJAX
* other AJAX library

### vue-resource

#### Install
To install via npm, in the project roor folder:
* (--save): production dependency
```
_> npm install --save vue-resource
```

At the **main.js**:
```
import VueResource from 'vue-resource';

Vue.use(VueResource);
```

### Creating an Application and Setting Up a Server(Firebase)

#### What is Firebase?
Firebase is a service you can use as the backend for your native app and your web app. 

It has DB functionality, it has authentication functionality and much more..

##### Firebase Setup
* Go to Google [Firebase console](https://console.firebase.google.com/?pli=1)

* Create a project

* Set up a Database
	* At the top **Database** select **Realtime Database** from dropdown 
	* Rules for testing
```
  "rules": {
    ".read": true,
    ".write": true
  }
```
* Now that vue.resource is installed, at every Vue Instance the **$http method** is available

### Simple Post to Firebase
We appending new data to the existing one, we don't overwriting it. That's why each resource has a unique identifier. Otherwise there is no way to securely retrieve it in the future

```
<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
				<h1>Http</h1>
				<div class="form-group">
					<label>Username</label>
					<input type="text" class="form-control" v-model="user.username">
				</div>
				<div class="form-group">
					<label>Main</label>
					<input type="text" class="form-control" v-model="user.email">
				</div>
				<button class="btn btn-primary" @click="submit">Submit</button>
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
				}
			}
		},
		methods: {
			submit(){
				this.$http.post('https://vuejs-http-b2402.firebaseio.com/data.json', this.user)
						.then(response => {
							console.log(response)
						}, error => {
							console.log(error);
						});
			}
		}
	}
</script>
```
### Simple Get from Firebase


#### json method
vue-resource gives us helpful methods we can use.

The **json method**, extracts the body of the response and converts it into a JS object which we may use (otherwise we get a string and we would manually have to parse it into a JS object)

**response.json()** also gives us back a promise

#### Example
```
	<button class="btn btn-primary" @click="fetchData">Get Data</button>
	<br><br>
	<ul class="list-group">
		<li class="list-group-item" v-for="u in users">{{ u.username }} - {{ u.email }}</li>
	</ul>

script

	methods

	fetchData(){
		this.$http.get('https://vuejs-http-b2402.firebaseio.com/data.json')
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
```

### Configuring vue-resource Globally
In order to set up the link once

In **main.js** set up the root url, which is the main url you are going to use:
```
Vue.http.options.root = 'https://vuejs-http-b2402.firebaseio.com/data.json';
```

In the app, set an empty string

## Intercepting

### Requests
vue-resource allow us to set up such interceptors, which are executed uppon each request or response very easily.

**Example** in main.js:

```
Vue.http.options.root = 'https://vuejs-http-b2402.firebaseio.com/data.json';
Vue.http.interceptors.push((request, next) => {
	console.log(request);
	if(request.method == 'POST'){
		request.method = 'PUT';
	}
	next();
});
```

On Firebase the difference between **PUT** and **POST** is that 

* POST creates new resources (that's why we need the unique identifier), 
* while PUT always overrides the old data

### Response

Example of overriding the response function of vue-resource with interceptors:
```
Vue.http.interceptors.push((request, next) => {
	console.log(request);
	if(request.method == 'POST'){
		request.method = 'PUT';
	}
	next(response => {
		response.json = () => {return {messages: response.body} }
	});
});
```

## Where the "resource" in vue-resource Comes From
vue-resource allows us to set up our "own" resources, which are kind of nice mappings of common tasks to http requests. 
e.g.: a **save** method on your data and then that would automatically execute the POST request

Set up some flexible pieces of functions we can then reuse in our application. 

**main.js**: The root url changed to
```
Vue.http.options.root = 'https://vuejs-http-b2402.firebaseio.com/';
```

save is the vue-resource default method for POST request

```
script

methods
			submit(){
				// this.$http.post('data.json', this.user)
				// 		.then(response => {
				// 			console.log(response)
				// 		}, error => {
				// 			console.log(error);
				// 		});
				this.resource.save({}, this.user);
			},

		created(){

			this.resource = this.$resource('data.json');
		}
```

## Creating Custom Resources

Highest degreee of flexibility without having to hardcode everything over and over again, if you reuse the same resource twice.

```
			submit(){
				this.resource.saveAlt(this.user);
			},

		created(){
			const customActions = {
				saveAlt: {method: 'POST', url: 'alternative.json'}
			};
			this.resource = this.$resource('data.json', {}, customActions);
		}
```

## Understanding Template URLs
To make data.json have a dynamic name we can use url templates



```
<input type="text" class="form-control" v-model="node">


data(){
	return {
		node: 'data'
	}
},


methods

			fetchData(){
				// this.$http.get('data.json')
				// 		.then(response => {
				// 			return response.json()
				// 			console.log(data);
				// 		})
				// 		.then(data => {
				// 			const resultArray = [];
				// 			for(let key in data){
				// 				resultArray.push(data[key]);
				// 			}
				// 			this.users = resultArray;
				// 		});
				this.resource.getData({node: this.node})
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



		created(){
			const customActions = {
				saveAlt: {method: 'POST', url: 'alternative.json'},
				getData: {method: 'GET'}
			};
			this.resource = this.$resource('{node}.json', {}, customActions);
		}

```



