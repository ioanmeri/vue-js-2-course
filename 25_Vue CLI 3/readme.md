# Vue CLI 3

To create a new Vue Project:

```
vue create project-name
```

Options:

Use Preset or Custom Config?

In Custom Config you can:

* Add Plugins
  * PWA
  * ESLint
  * ...
* Save as new Preset

## Creating a Project

### Install vue cli 3

```
npm install -g @vue/cli
```

Note: You can't run vue init anymore (at least with some change or addition)



### Create a Project

```
vue create vue-cli-new
```

Choose plugin options from cli. You can save as a preset. If you want to delete a preset you can remove it from .vuerc file. 

## Analyzing the Created Project

### Package.json

The vue-cli does use webpack under the hood. It basically hides it away in the package.json/devDependencies/@vue/cli-service.

**browsersList**:

Allows you to set up which browsers you wanna support with your project. 

Important for tools like the autoprifixer. The same for babel.


### public/manifest.json

Provides metadata about your app which can be read by the browser to make installable in the home screen.


## Using Plugins

Plugins have to follow a certain naming pattern

**vue-cli-plugin-**plugin-name

Official Plugins

* [Vuetify](https://github.com/vuetifyjs/vuetify)

For official plugins you can add them by just type:

```
_> vue add vuetify
```

This will:

* install it
* set it up 
* run through prompts

Quit and restart server after installing plugins


## CSS Pre-Processors

Install necessary packages 

```
npm install --save sass-loader node-sass
```

Troubleshooting on node-sass installation:
```
sudo npm install --save-dev  --unsafe-perm node-sass
```


Then in components:
```
<style scoped lang="scss">

h3 {
  margin: 40px 0 0;

  span {
    color: red;
  }
}
```


## Enviroment Variables

in app root folder, create a file:

> Important: You need to name them VUE_APP_YOURVAR for it to be available in your client side - Vue code.

1.

**.env**

It will be automatically picked up by the CLI and I can store values that I use in my project. 

**Key-value pairs**

2. 
```
VUE_APP_URL=https://dev.api.com
```

You can use it in computed properties, watchers, vuex store and anywhere in the entire project. It's injected everywhere.

3.
```
<script>
export default {
  data () {
    return {
      url: process.env.VUE_APP_URL
    }
  },
</script>
```

4.
I need to **restart my dev server** for it to pick up that .env file and take it into account in it's configuration.

### Env Modes

Global configurations automatically managed, handled and set by the Vue-CLI

* Development
  * .env.developemt will be used during development
* Test
  * .env.test
* Production
  * .env.production will be used for production builds (npm run build)


