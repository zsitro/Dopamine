Dopamine
========

Come back later, really!!

#Changelog

__Version 0.0.3__
 - Introduced Dopamine snippets
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
 - Wiki: how to switch to tabs indentation in generated output ( https://github.com/visionmedia/jade/pull/1231 )

# Resources, inspiration
- http://jade-lang.com/reference/
- https://github.com/h5bp/html5-boilerplate/blob/master/index.html
- http://demo.pattern-lab.info/


## Dopamine Documentation

### Dopamine Jade Snippets

#### Head

* [dp_head_meta_charset](#dp_head_meta_charset)
* [dp_head_meta_chromeframe](#dp_head_meta_chromeframe)
* [dp_head_meta_description](#dp_head_meta_description)
* [dp_head_meta_viewport](#dp_head_meta_viewport)
* [dp_head_favicon](#dp_head_favicon)

#### Vendor

* [dp_vendor](#dp_vendor)


## Dopamine Jade Snippets

### Head

#### dp_head_meta_charset([_charset])
<a name="dp_head_meta_charset" />

__Arguments__

* _charset - optional, defaults to `utf-8`
	currently supports only HTML5 output

##### Examples
```html
+dp_head_meta_charset()
+dp_head_meta_charset('utf-8')

// Compiles to:
<meta charset="utf-8"/>
```

#### dp_head_meta_chromeframe()
<a name="dp_head_meta_chromeframe" />

__Arguments__

* none

##### Examples
```html
+dp_head_meta_charset()
+dp_head_meta_charset('utf-8')

// Compiles to:
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
```


#### dp_head_meta_description(_content)
<a name="dp_head_meta_description" />

__Arguments__

* _content - string, containing the description of the page, can be effective with `This is the awesome description of the page`

##### Examples
```html
+dp_head_meta_description("This is the awesome description of the page")

// Compiles to:
<meta name="description" content=""/>
```
```html
+dp_head_meta_description(dp.page.description)

// Compiles to:
<meta name="description" content="VALUE_OF_dp.page.description"/>
```

#### dp_head_title(_page_title [, _suffix])
<a name="dp_head_title" />

__Arguments__

* _page_title - string
* _suffix - common suffix (not very sophisticated, but usable)

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


#### dp_head_meta_viewport(_page_title [, _suffix])
<a name="dp_head_meta_viewport" />

__Arguments__

* none - needs to be extended

##### Examples
```html
+dp_head_meta_viewport()

// Compiles to:
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
```

#### dp_head_favicon(_type, _url [, opt1])
<a name="dp_head_favicon" />

__Arguments__

* _type - mantadory, currently supported:
	* ico
	* apple-touch-icon-precomposed
	* ms-application

* _url - mandatory, path to favicon file
* _opt1 - optional, can be a HEX color code for ms-application or value of `sizes` when generating apple-touch-icon-precomposed output *(see examples below)*

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




### Vendor

#### dp_vendor(_framework [, _version])
<a name="dp_vendor" />

__Arguments__

* _framework - alias from the following list
	* modernizr
	* jquery
	* html5shiv
* _version - optional only takes effect on some cases
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

