#Project has a new home: https://github.com/yoDopamine



Dopamine
========

__Come back later, really!!__

#Changelog

__Version 0.2.0__
 - Fully refactored directory structure
 - Working r.js compressor
 - More helpers in SCSS
 - Added dp_vendor('bootstrap-css')

__Version 0.1.0__
 - Grunt integration
 - Prettify html output with grunt-prettify
 - Separated source and build files
 - Solved ugly html output from jade
 - removed framework's main file Dopamine.js

__Version 0.0.3__
 - Introduced Dopamine Jade snippets
 - Added PIE beta 2.0
 - Added demo content to stylus files
 - Moved dp global variable definition from jade files to app.js
 - Can start with `npm start`

__Version 0.0.2__
 - Added template specific variables to layouts
 - Added basic error reporting for Jade in html output
 - Added favicon markup @ header
 - Added class support for subpages' body element

#TODO
 - Add example module: Menu with active states
 - Add language definitions
 - Add parameter: vendor script's path
 - Add parameter: support IE true/false
 - inbuilt Nib support for Jade
 - Add SASS support

# Resources, inspiration
- http://jade-lang.com/reference/
- https://github.com/h5bp/html5-boilerplate/blob/master/index.html
- http://demo.pattern-lab.info/

---------------------------------------

# Dopamine Documentation

## Dopamine Jade Snippets

#### Document
* [dp_doc](#dp_doc)

#### Head

* [dp_head_meta_charset](#dp_head_meta_charset)
* [dp_head_meta_chromeframe](#dp_head_meta_chromeframe)
* [dp_head_title](#dp_head_title)
* [dp_head_meta_keywords](#dp_head_meta_keywords)
* [dp_head_meta_description](#dp_head_meta_description)
* [dp_head_meta_viewport](#dp_head_meta_viewport)
* [dp_head_favicon](#dp_head_favicon)
* [dp_head_author](#dp_head_author)
* dph_alternate
* dph_canonical
* dph_next
* dph_pingback
* dph_prefetch
* dph_rss

#### Snippets - Inline

* [dpsn_oldies](#dpsn_oldies)
* [dpsn_google_analytics](#dpsn_google_analytics)
* dpsn_google_site_verification
* dpsn_anchor
* dpsn_ES5-shim
	`<!--[if lt IE 9]><script type="text/javascript" src="http://www.rga.com/wp-content/themes/rga/library/js/libs/es5-shim.min.js"></script><![endif]-->`
* dpsn_html_ul - mimic ul > li with given js array `dpsn_html_ul(['List item 1', 'List item 2', ...])`

#### Vendor

* [dp_vendor](#dp_vendor)

---------------------------------------

## Dopamine Jade Snippets

### Document
<a name="dp_doc" />
#### dp_doc( _type [,_lang])

__Arguments__

* `_type` - optional, defaults to `html5` currently supports only HTML5 output
* `_lang` - optional, defaults to `en-US`

##### Examples
```html
+dp_doc()
+dp_doc('html5', 'en-US')

// Compiles to:
<html lang="en-US">
```
```html
+dp_doc('html5-modernizr', 'hu-HU')

// Compiles to:
<!DOCTYPE html><!--[if lt IE 7]><html lang="hu-HU" prefix="og: http://ogp.me/ns#" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html lang="hu-HU" prefix="og: http://ogp.me/ns#" class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html lang="hu-HU" prefix="og: http://ogp.me/ns#" class="no-js lt-ie9" data-placeholder-focus="false"><![endif]-->
<!--[if gt IE 8]><!--> <html lang="hu-HU" prefix="og: http://ogp.me/ns#" class="no-js"><!--<![endif]-->

```

```html
+dp_doc('html5-modernizr-noie')

// Compiles to:
<!DOCTYPE html>
<html lang="en-US" class="no-js">
```

---------------------------------------

### Head

<a name="dp_head_meta_charset" />
#### dp_head_meta_charset([_charset])

__Arguments__

* `_charset` - optional, defaults to `utf-8`
	currently supports only HTML5 output

##### Examples
```html
+dp_head_meta_charset()
+dp_head_meta_charset('utf-8')

// Compiles to:
<meta charset="utf-8"/>
```
---------------------------------------

<a name="dp_head_meta_chromeframe" />
#### dp_head_meta_chromeframe()

__Arguments__

* `none`

##### Examples
```html
+dp_head_meta_charset()
+dp_head_meta_charset('utf-8')

// Compiles to:
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
```
---------------------------------------


<a name="dp_head_title" />
#### dp_head_title(_page_title [, _suffix])

__Arguments__

* `_page_title` - string
* `_suffix` - common suffix (not very sophisticated, but usable)

##### Examples
```html
+dp_head_title("Home")

// Compiles to:
<title>Home</title>
```
```html
+dp_head_title("Home", "Dopamine")

// Compiles to:
<title>Home | Dopamine</title>
```

---------------------------------------

<a name="dp_head_meta_description" />
#### dp_head_meta_description(_content)

__Arguments__

* `_content` - string, containing the description of the page, can be effective with `dp.page.description`

##### Examples
```html
+dp_head_meta_description("This is the awesome description of the page")

// Compiles to:
<meta name="description" content="This is the awesome description of the page"/>
```
```html
+dp_head_meta_description(dp.page.description)

// Compiles to:
<meta name="description" content="VALUE_OF_dp.page.description"/>
```
---------------------------------------


<a name="dp_head_meta_keywords" />
#### dp_head_meta_keywords(_cvs)

__Arguments__

* `_csv` - string, containing the keywords of the page, can be effective with `dp.page.keywords`

##### Examples
```html
+dp_head_meta_keywords("dopamine,sitebuild,jade,stylus")

// Compiles to:
<meta name="keywords" content="dopamine,sitebuild,jade,stylus"/>
```
```html
+dp_head_meta_description(dp.page.keywords)

// Compiles to:
<meta name="keywords" content="VALUE_OF_dp.page.keywords"/>
```
---------------------------------------


<a name="dp_head_meta_viewport" />
#### dp_head_meta_viewport(_page_title [, _suffix])

__Arguments__

* `none` - needs to be extended

##### Examples
```html
+dp_head_meta_viewport()

// Compiles to:
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
```
---------------------------------------

<a name="dp_head_favicon" />
#### dp_head_favicon(_type, _url [, opt1])

__Arguments__

* `_type` - mantadory, currently supported:
	* ico
	* apple-touch-icon-precomposed
	* ms-application

* `_url` - mandatory, path to favicon file
* `_opt1` - optional, can be a HEX color code for ms-application or value of `sizes` when generating apple-touch-icon-precomposed output *(see examples below)*

##### Examples
```html
+dp_head_favicon('ico','images/favicons/favicon.ico')

// Compiles to:
<link rel="shortcut icon" href="images/favicons/favicon.ico" type="image/x-icon"/>
```
```html
+dp_head_favicon('apple-touch-icon-precomposed','images/favicons/apple-touch-icon.png', '152x152')

// Compiles to:
<link rel="apple-touch-icon-precomposed" href="images/favicons/apple-touch-icon.png" sizes="152x152"/>
```
```html
+dp_head_favicon('ms-application','images/favicons/apple-touch-icon.png', '#FFFFFF')

// Compiles to:
<meta name="msapplication-TileColor" content="#FFFFFF"/>
<meta name="msapplication-TileImage" content="images/favicons/apple-touch-icon.png"/>

```
---------------------------------------

<a name="dp_head_author" />
#### dp_head_author(_page_title [, _suffix])

__Arguments__

* `none` - needs to be extended to auto-generate humans.txt file based on project parameters

##### Examples
```html
+dp_head_author()

// Compiles to:
<link type="text/plain" rel="author" href="humans.txt" />
```
---------------------------------------


### Snippets - Inline

<a name="dpsn_oldies" />
#### dpsn_oldies([_lt, _message, _class])

__Arguments__

* `_lt` - Defaults to: `8`, input value for `<!--[if lt IE 8]>`
	* 7
	* 8
	* 9
* `_message` - Defaults to: `You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.`
* `_class` - Defaults to: `m-dopamine m-dopamine-oldies`

##### Examples
```html
+dpsn_oldies()

// Compiles to:
<!--[if lt IE 8]>
    <p class="m-dopamine m-dopamine-oldies">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
```

```html
+dpsn_oldies(9, 'No good man!', 'my-oldies-warning-classname')

// Compiles to:
<!--[if lt IE 9]>
    <p class="my-oldies-warning-classname">No good man!</p>
<![endif]-->
```
---------------------------------------





### Vendor

<a name="dp_vendor" />
#### dp_vendor(_framework [, _version])

__Arguments__

* `_framework` - alias from the following list
	* modernizr
	* jquery
	* html5shiv
* `_version` - optional only takes effect on some cases
 *  1.10 - at jquery

##### Examples
```html
+dp_vendor('modernizr')

// Compiles to:
<script src="js/vendor/modernizr.min.js"></script>
```

```html
+dp_vendor('jquery', '2.x')

// Compiles to:
<script src="js/vendor/jquery/2.x/jquery.min.js"></script>
```
---------------------------------------



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/zsitro/dopamine/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

