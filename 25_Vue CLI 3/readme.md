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
