# Second Course Project - Wonderful Quotes

## Intro

### Built An SPA where user can add up to 10 quotes. 

* There is a progress bar that shows the **Quotes Added** (e.g 7/10)
* There is a form where User can add a Quote
* All added quotes are displayed under the form
* Functionality to Click on a Quote to delete it 



## Procedure
* Set Up Project
* Think About Components Structure: App.vue
```
	<app-header></app-header>
	<app-new-quote></app-new-quote>
	<app-quote-grid></app-quote-grid>
```


* **App** Component
	* has the data property: quotes
	* passes the quotes at the grid with **props**

* QuoteGrid Component
	* loop through all quotes
	* ``` <app-quote v-for="quote in quotes">{{ quote }}</app-quote>```
	* passes each quote with slot

* Quote Component
	* Quote should have a ```<slot>``` for the content
	* The holder of that content, decides how it should look like

* NewQuote
	* Add Form with textarea and v-model quote & submit button
	* add createNew method at button with **@click.prevent**
	* emits added quote
		* ```
		methods: {
			createNew(){
				this.$emit('quoteAdded', this.quote);
				this.quote = '';
			}
		} 
		```
		* App Component Recieves the emmited event
			* ```<app-new-quote @quoteAdded="newQuote"></app-new-quote> ```


## Delete Quote

### How do I know which quote is clicked?

In the **QuoteGrid** add event listener:
```
<app-quote v-for="quote in quotes" @click.native="">{{ quote }}</app-quote>
```
**@click.native="deleteQuote**

Even though that happened on the html code off that component, treat it like I clicked on app-quote

* Allows me to click on a component
* Will treat clicks on template as clicks on the component



## Procedure

* Delete a Quote at QuoteGrid click
```
<app-quote v-for="(quote, index) in quotes" @click.native="deleteQuote(index)">{{ quote }}</app-quote>
...

		methods: {
			deleteQuote(index){
				this.$emit('quoteDeleted', index);
			}
		}
```

