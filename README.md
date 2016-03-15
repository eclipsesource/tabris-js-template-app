# Tabris.js example / starter apps <img src="https://cloud.githubusercontent.com/assets/3126207/13706805/53a625ee-e7af-11e5-8784-cfe48c6e0970.png" width="50"/>

 
[*Tabris.js*](https://tabrisjs.com) is an amazing way to create native mobile apps in the new age. It combines native platform widgets – performance plus look & feel, with the simplicity, elegance, and power of a single JavaScript codebase for iOS, Android and Windows 10 (coming soon). It is the only native platform UI, javascript runtime framework that lets you use Cordova plugins to tap into the device capabilities.

Moreover, Tabris.js also offers some unique advantages to developers, like a cloud build service and developer apps for iOS and Android. This means you can develop iOS apps without owning a Mac or installing Xcode (but need an iPhone / iPad). Likewise, you can develop Android apps without downloading Android studio and the Android SDKs (but need an Android phone / tablet).

# About

This repo serves as a starter / example for Tabris.js applications. 
The same UI can accept different datasources and configurations, this repo has 7 apps in 1 codebase:

*  rss,
*  rss_showcase,
*  shop,
*  shop_showcase,
*  shop_fashion,
*  wordpress_pets,
*  wordpress_eclipsesource,

Expect many updates and improvements soon!

The examples apps work in phones and tablets - both for iOS and Android. The example visuals are with and iPhone 6s and a 10" Android tablet:

<p>
  <h3>RSS Example:</h3>
  <img src="https://cloud.githubusercontent.com/assets/3126207/13744360/f4933fae-e9ef-11e5-8ba4-08ce0a3295da.gif" height="450"/>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <img src="https://cloud.githubusercontent.com/assets/3126207/13744727/57867340-e9f2-11e5-95f7-fc8075509e6e.gif" height="450"/>
  
  
  <br/><br/><br/><br/>
  
  <h2>Ecommerce Example:</h3>
  <img src="https://cloud.githubusercontent.com/assets/3126207/13705259/b9d0849c-e7a8-11e5-9d35-bd7743fd02fc.gif" height="450"/>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <img src="https://cloud.githubusercontent.com/assets/3126207/13710436/29f065a8-e7c2-11e5-9ece-f57242378ebe.gif" height="450"/>
  
  
</p>

# Setup
Seting up is really easy (you just need node installed):

```shell
$ git clone git@github.com:eclipsesource/tabris-js-template-app.git
$ cd tabris-js-rss-example
$ npm install
$ npm install -g http-server
$ http-server
```

Then, connect to your code from the Tabris.js Developer App ([*Play Store*](https://play.google.com/store/apps/details?id=com.eclipsesource.tabris.js) / [*App Store*](https://itunes.apple.com/us/app/tabris.js/id939600018?ls=1&mt=8)).


# Contribute
Add Some fancy behaviour like:
* Localstorage for favorites
* Sharing with cordova plugin
* More cool services

For any questions ping me: shai@eclipsesource.com

# Thanks

- [Carlos Lopez - For the initial rss idea and codebase](https://github.com/carloslopez1990/tabrisjs-rss-reader-example)
