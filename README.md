# Ionic Beers

**Ionic Beers** is a tutorial of the [Beer Tutorials](http://www.beer-tutorials.org) series.
In this tutorial we will create a simple app that queries a beer catalog and displays a list of beers.

## Getting Started

Install [NodeJS](https://nodejs.org/) and then using the node package manager (npm), install ionic.

```
npm install -g ionic
```

After installing ionic, create a new project called `ionic-beers`.

```
ionic start ionic-beers blank
```

Navigate to the project directory and add the mobile development platform.

```
ionic platform add android
```

Run the application on the Android emulator.

```
ionic emulate android
```

Run the application on desktop browser
```
ionic serve --lab
```


> Note: To run the application in the Android emulator, you need to have the Android SDK
> installed and configured on your computer.
> The easiest way to do it is to install [Android Studio](http://developer.android.com/tools/studio/index.html)
> for your platform.
>
> If you find issues while initializing the app, read carefully [these instructions](http://ionicframework.com/docs/getting-help/)

![Initial app](../img/2015-12-04-initial-app.png)


## Project Structure


    .
    └── ionic-beers
        ├── www
        │   ├── css
        │   │   └── style.css
        │   ├── img
        │   │   └── ionic.png
        │   ├── js  
        │   │   └── app.js
        │   ├── lib
        │   │   └── ionic
        │   │       └── ...
        │   └── index.html
        ├── hooks
        │   ├── after_prepare
        │   │   └── ...
        │   └── README.md
        ├── resources
        │   ├── android
        │   │   └── ...
        │   ├── ios
        │   │   └── ...
        │   ├── icon.png
        │   └── splash.png
        ├── scss
        │   └── ionic.app.scss
        ├── package.json
        ├── bower.json
        ├── config.xml
        ├── gulpfile.js
        ├── ionic.project
        └── platforms
            ├── android
            └── ios    


Inside  the project folder there are 4 sub-folders: `hooks`, `scss`, `platforms` and `www`. The application source code resides in the `www` folder. Application code is written using AngularJS and Javascript.

Inside the `www` folder is a file called `index.html` which has the default application code. Finally `app.js` contains the code to start the application with the defined modules.


## Designing the app

Let's start by removing unused lines in application. Open `index.html` and look at the default code. Remove lines between the `body` tags. The `body` tag has an attribute called `ng-app` which references the application.

This project will use a *[navigation view](http://ionicframework.com/docs/api/directive/ionNavView/)* to design our app.

Inside the body tag add the navigation view.


```
<ion-nav-view></ion-nav-view>
```

Create a new directory in the `www` directory named `templates`. In this new directory, create a new file named `menu.html`. In this file, you would use a *ion-menu* directive. Open `menu.html` and add lines


```
<ion-side-menus>
  <ion-side-menu-content>
    <ion-nav-bar class="bar-dark">
      <ion-nav-back-button></ion-nav-back-button>

      <ion-nav-buttons side="left">
        <button class="button button-icon button-clear ion-navicon" menu-toggle="left"></button>
      </ion-nav-buttons>
    </ion-nav-bar>
  </ion-side-menu-content>

  <ion-side-menu side="left">
    <ion-header-bar class="bar-dark">
      <h1 class="title">Menu</h1>
    </ion-header-bar>
  </ion-side-menu>
</ion-side-menus>
```


Create a new file in `templates`directory named `home.html`. Open `home.html` and add lines

```
<ion-view view-title="Ionic Beers">
	<ion-content class="padding">
		Welcome!
	</ion-content>
</ion-view>
```

Create new file in `templates` directory called `listBeers.html`

```
<ion-view view-title="Ionic Beer Gallery">
	<ion-content class="padding">
		<ul>
	      <li>
	        <span>Affligem Blond</span>
	        <p>
	          Affligem Blonde, the classic clear blonde abbey ale, with a gentle roundness and 6.8% alcohol.
	          Low on bitterness, it is eminently drinkable.
	        </p>
	      </li>
	      <li>
	        <span>Affligem Tripel</span>
	        <p>
	          The king of the abbey beers. It is amber-gold and pours with a deep head and original aroma,
	          delivering a complex, full bodied flavour. Pure enjoyment! Secondary fermentation in the bottle.
	        </p>
	      </li>
	    </ul>

		<p>Total number of beers: 2</p>
  </ion-content>
</ion-view>
```


Open `app.js` to define routes

```
.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('eventmenu', {
      url: '/event',
      abstract: 'true',
      templateUrl: 'templates/menu.html'
    })
    .state('eventmenu.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html'
          }
        }
    })
    .state('eventmenu.beers', {
        url: '/beers',
        views: {
          'menuContent': {
            templateUrl: 'templates/listBeers.html'
          }
        }
    });

    $urlRouterProvider.otherwise('/event/home');
})
```

Save changes and run the app. It should look something like the below.


## Fetching data from Beer catalog


Create new file `js` directory called `controllers.js`

```
angular.module('ionicbeers')

.controller('BeersCtrl', ['$scope', function($scope) {
    $scope.beers = [
      {
        "alcohol": 8.5,
        "name": "Affligem Tripel",
        "description": "The king of the abbey beers. It is amber-gold and pours with a deep head and original aroma, delivering a complex, full bodied flavour. Pure enjoyment! Secondary fermentation in the bottle."
      },
      {
        "alcohol": 9.2,
        "name": "Rochefort 8",
        "description": "A dry but rich flavoured beer with complex fruity and spicy flavours."
      },
      {
        "alcohol": 7,
        "name": "Chimay Rouge",
        "description": "This Trappist beer possesses a beautiful coppery colour that makes it particularly attractive. Topped with a creamy head, it gives off a slight fruity apricot smell from the fermentation. The aroma felt in the mouth is a balance confirming the fruit nuances revealed to the sense of smell. This traditional Belgian beer is best savoured at cellar temperature "
      }
    ];
  }])
  ```

This controller defines a list of beers returned to the Angular scope.

Open `index.html` file and add line

```
<script src="js/controllers.js"></script>
```

Open `listBeers.html` and replace lines between `ion-content` tag with those lines

```
<ul class="list">
    <li ng-repeat="beer in beers">
      <span>{{beer.name}}</span>
      <p>{{beer.description}}</p>
    </li>
</ul>

<p>Total number of beers: {{beers.length}}</p>
```

## Translate labels

Now the application needs to be translated for users all around the world. For this, add `angular-translate` library with this command and update bower configuration

```
bower install angular-translate-loader-static-files --save
```

Open `app.js` file and add lines after `$urlRouterProvider`

```
// Translate labels / title / menus
$translateProvider.useSanitizeValueStrategy('escape');
$translateProvider.useStaticFilesLoader({
    prefix: 'languages/',
    suffix:'.json'
});
$translateProvider
.registerAvailableLanguageKeys(['en','fr'], {
    'en_US': 'en',
    'en_UK': 'en',
    'fr_FR': 'fr',
    'fr_BE': 'fr'
})
.determinePreferredLanguage();

$translateProvider.use();
```

Open `index.html` and add lines to link script

```
<script src="lib/angular-translate/angular-translate.js"></script>
<script src="lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
```

Create new files that contain translated labels in a new directory `languages`, for example `en.json`

```
{
	"menu" : "Menu",
	"home" : "Home",
	"beersList" : "List of beers",
	"beerGallery" : "Ionic Beer Gallery",
	"beersNumbers" : "Total number of beers",
	"content" : "Welcome!",
	"ionicBeers" : "Ionic Beers"
}
```

Update `home.html` file to translate labels

```
{{'content' | translate}}
```

Change all labels in `*.html` files to translate labels


## Order and search in list



## Binding data to the UI

Once the data is in the `beersList` array, bind it to the UI. For displaying the data, create a `ListView` in `main-page.xml`, underneath the existing `Button` element.


```
<ListView>
    <ListView.itemTemplate>
      <StackLayout orientation="vertical">
        <Label id="name" class="beerName" />
        <Label id="description" textWrap="true" />
      </StackLayout>
    </ListView.itemTemplate>
</ListView>
```


Bind the `beersList` array to the list view:


```
<ListView items="{{ beerList }}">
<ListView.itemTemplate>
  <StackLayout orientation="vertical">
    <Label id="name" text="{{ name }}" class="beerName" />
    <Label id="description" text="{{ description }}" textWrap="true" />
  </StackLayout>
</ListView.itemTemplate>
</ListView>
```

To make our list more user friendly, we also add some CSS to `app.css`:


```
.beerName {
  font-size: 20;
}
```

For the `beersList` array to be available across the view, set the `beersList` array in the observable module. Do this by importing an observable module and using it to create an observable object.


```
var observableModule = require("data/observable");
var pageData = new observableModule.Observable();
```

In the `pageLoaded` function, set the images array to the observable module and add the observable module to the page context.


```
function pageLoaded(args) {
    var page = args.object;
    pageData.set("images", images);
    page.bindingContext = pageData;
}
```

## Getting the beers pics

We can also extract the image URL from the received JSON :


```
var beer = {
  name: r[i].name,
  description: r[i].description,
  alcohol: r[i].alcohol,
  img: "http://beertutorials.github.io/website/"+r[i].img
}
```

And then we add the image to the `ListView.itemTemplate`:


```
<ListView.itemTemplate>
  <StackLayout orientation="horizontal">
    <Image width="100px" height="100px" src="{{img}}" />
    <StackLayout orientation="vertical">
      <Label id="name" text="{{ name }}" class="beerName" />
      <Label id="description" text="{{ description }}" textWrap="true" />
    </StackLayout>
  </StackLayout>
</ListView.itemTemplate>
```

![After adding pics](../img/2015-12-01-beers-with-pics.png)


## Let's forget the Button

Let's call for the beer list without button. We are going to use application's lifecycle method `onLaunch`
on `app.js`:


```
application.on(application.launchEvent, function (args) {
   var mainPage = require("./main-page");
   mainPage.beers();
})
```

Now you can delete the `Buttom` from `main-page.xml`.


## And how about the ActionBar title?

To have access to the `ActionBar` with the application title, you only need to explicitly declare it in `main-page.xml`:

```
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded">
  <Page.actionBar>
    <ActionBar title="NativeScript Beers" android.icon="res://ic_test"/>
  </Page.actionBar>
```


![After adding pics](../img/2015-12-01-beers-with-pics-no-button.png)
