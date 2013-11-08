var GMCU = {};
/**
 * @author Kevin O'Neill
 */

/* Enums declaration */
GMCU.BrowserType = {
	CHROME: "Chrome",
	FIREFOX: "Firefox",
	IE10: "MSIE 10",
	IE9: "MSIE 9",
	IE8: "MSIE 8",
	IE7: "MSIE 7"
};


/* Class declaration */
GMCU.BrowserManager = {

	/* Attributes */
	brw_instance: undefined,

	/* Methods */
	init: function() {
		this.brw_instance = this.instanceFactory();
	},

	getInstance: function() {
		return this.brw_instance;
	},

	instanceFactory: function() {
		var browser = GMCU.UserAgentManager.getBrowser();
		var version = GMCU.UserAgentManager.getBrowserVersion();

		switch (browser) {
			case (GMCU.BrowserType.CHROME + " " + version):
				instance = new GMCU.Chrome();
				break;
			case (GMCU.BrowserType.FIREFOX + " " + version):
				instance = new GMCU.Firefox();
				break;
			case (GMCU.BrowserType.IE10):
				instance = new GMCU.IE10();
				break;
			case (GMCU.BrowserType.IE9):
				instance = new GMCU.IE9();
				break;
			case (GMCU.BrowserType.IE8):
				instance = new GMCU.IE8();
				break;
			case (GMCU.BrowserType.IE7):
				instance = new GMCU.IE7();
				break;
			default:
				instance = new GMCU.CUBrowser();
		}
		return instance;
	}
};/**
 * @author Kevin O'Neill
 */

GMCU.CUBrowser = function() {

	this.superProperty = true;

	this.init = function() {
		this.initMutationFunctions()
	 	//common init statements
	};

	this.attachToLoadEvent = function(slow_load) {
		if (!!window["MutationObserver"]) {
			if (GMCU.canBeginCU()) {
				GMCU.logPageLoad();
				GMCU.beginCunlockUnit();
			} else {
				this.createMutationObserver();
			}
		} else {
			GMCU.DomHandler.attachEvent("readystatechange", document, GMCU.cunlockLoader);
		}
	};

	this.attachEvent = function(event, dom_element, callback) {
		if (dom_element.addEventListener) {
        	dom_element.addEventListener(event, callback, false);
        }
	};

	this.attachLoadEvent = function(dom_element, callback){
		if (dom_element.addEventListener) {
        	dom_element.addEventListener("load", callback, false);
        }
	};

	this.removeEvent = function(event, dom_element, callback) {
		if( dom_element.removeEventListener) {
			dom_element.removeEventListener(event, callback, false);
		}
	};

	this.setStyleSheetProperties = function(style, text) {
		var textnode = document.createTextNode(text);
        style.appendChild(textnode);
	};

	this.togglePlayerWrapper = function() {
		//nothing to do
	};

	this.applyAltActionStyle = function(main_div) {
		main_div.style.display = "table-cell";
		main_div.style.verticalAlign = "middle";
	};

	this.applyLeaveBehindButtonStyle = function(button) {
		button.style.marginLeft = "6px";
	};

	this.applyLeaveBehindSponsorStyle = function(leaveBehindSponsor) {
		leaveBehindSponsor.style.left = "0px";
	};

	this.applyBrandBoxTextStyle = function(text_box, text_box_container) {
		text_box.style.display = "table-cell";
		text_box.style.verticalAlign = "middle";
	};

	this.applyBrandBoxLogoStyle = function(logo_container, img_container, image) {
		logo_container.style.display = "table-cell";
		logo_container.style.verticalAlign = "middle";
	};

	this.applyBrandBoxTextSpecialStyle = function(text_element) {
		//nothing to do
	};

	this.setSurveyDimensions = function(survey_wrapper,width){
		survey_wrapper.style.minHeight = "380px";
		survey_wrapper.style.width = width + "px";
	};

	this.createMutationObserver = function () {
		GMCU.observer = new MutationObserver(GMCU.observePageMutations);
		GMCU.observer["observe"](document, {
			"childList": true,
			"subtree": true,
			"attributes": false,
			"characterData": false
		});
	};

	this.initMutationFunctions = function () {
		GMCU.canBeginCU = function () {
			if (GMCU.initUnitExecuted) return false;
			var selector, index;

			if (cunlock_config["markup_active"] === 1) {
				selector = "." + GMCU.Cunlock.markup_main_content;
				index = 0;
			} else if (cunlock_config["markup_active"] === 0) {
				selector = cunlock_config["main_content"]["selector"];
				index = cunlock_config["main_content"]["index"];
			}
			var cuDiv = GMCU.DomHandler.$(selector);
			if (!cuDiv) return false;
			if (!!cuDiv && !cuDiv[index]) return false;
			return true;
		};

		GMCU.observePageMutations = function (mutations) {
			if(GMCU.initUnitExecuted) return;
			if (GMCU.canBeginCU()) {
				GMCU.observer["disconnect"]();
				GMCU.logPageLoad();
				GMCU.beginCunlockUnit();
			}
		};
	};
};/**
 * @author Kevin O'Neill
 */

GMCU.IECommon = function() {

	GMCU.CUBrowser.apply(this, arguments);
	this.parent = new GMCU.CUBrowser();

	this.init = function() {
		this.parent.init();
		// additional statements
	};

	this.attachToLoadEvent = function(slow_load) {
		if (!slow_load)
			this.parent.attachToLoadEvent(slow_load);
		else
			window.onload = new function() {
				GMCU.logPageLoad();
				GMCU.beginCunlockUnit();
			};
	};

	this.setStyleSheetProperties = function(style, text) {
		style.styleSheet.cssText = text;
	};
};/**
 * @author Kevin O'Neill
 */

GMCU.IELowerVersion = function() {
	
	GMCU.IECommon.apply(this, arguments);
	this.parent = new GMCU.IECommon();
	
	this.init = function() {
		this.parent.init();
		// additional statements
	};
	
	this.setupHTML5Tags = function() {
		var tags = ("abbr,article,aside,audio,canvas,datalist,details,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video,figcaption,summary").split(',');
		for (var i = 0; i < tags.length; i++) {
    		document.createElement(tags[i]);
		}		
	};	
	
	this.attachLoadEvent = function(dom_element, callback){
		if (dom_element.attachEvent) {
			dom_element.onreadystatechange = function(){
				if ( (!this.readyState ||
            	this.readyState === "loaded" || this.readyState === "complete") ) {
        			callback();
    			}	
       		}; 
       	}	  	
	};
	
	this.attachEvent = function(event, dom_element, callback) {
    	if (dom_element.attachEvent) {
			dom_element.attachEvent('on' + event , callback);
        }		
	};	
	
	this.removeEvent = function(event, dom_element, callback) {
		if (dom_element.detachEvent) {
	    	dom_element.detachEvent('on' + event , callback);
	    }
	};
	
	this.setSurveyDimensions = function(survey_wrapper,width){
		width += 20;
		survey_wrapper.style.minHeight = "380px";
		survey_wrapper.style.width = width + "px";
	};
		
};/**
 * @author Kevin O'Neill
 */

GMCU.IE7 = function() {
	
	GMCU.IELowerVersion.apply(this, arguments);
	this.parent = new GMCU.IELowerVersion();
	
	this.init = function() {
		this.parent.init();		
		this.setupHTML5Tags();
	};
	
	this.togglePlayerWrapper = function(value) {
		var element = GMCU.DomHandler.$("#" + GMCU.Cunlock.getContentPanel());
		if ( typeof element != 'undefined' && element)
			element.style.display = value;
	};
	
	this.applyAltActionStyle = function(main_div) {
		main_div.style.styleFloat = "left";
		main_div.style.cssFloat = "left";	
	};
	
	this.applyLeaveBehindButtonStyle = function(button) {
		button.style.marginLeft = "0px";
	};	

	this.applyLeaveBehindSponsorStyle = function(leaveBehindSponsor) {
		leaveBehindSponsor.style.left = "8px";
	};		
	
	this.applyBrandBoxTextStyle = function(text_box, text_box_container) {
		text_box.style.styleFloat = "left";
		text_box.style.cssFloat = "left";
		text_box.style.marginTop = "7px";
		text_box.style.height = "40px";
		
		text_box_container.style.position = "relative";
		text_box_container.style.top = "25%";
	};	
	
	this.applyBrandBoxLogoStyle = function(logo_container, img_container, image) {
		logo_container.style.styleFloat = "left";
		logo_container.style.cssFloat = "left";
		logo_container.style.marginTop = "7px";
		logo_container.style.height = "35px";	
		
		img_container.style.position = "relative";
        img_container.style.top = "25%";	
        
       	image.style.height = "35px";
    	image.style.width = "auto";
	};
	
	this.applyBrandBoxTextSpecialStyle = function(text_element) {
		text_element.style.display = "block";
		text_element.parentNode.style.height = "55px";
		text_element.style.marginTop = "0px";	
		text_element.style.top = "0px";
		text_element.style.height = "55px";
	}; 

};/**
 * @author Kevin O'Neill
 */

GMCU.IE8 = function() {
	
	GMCU.IELowerVersion.apply(this, arguments);
	this.parent = new GMCU.IELowerVersion();
	
	this.init = function() {
		this.parent.init();		
		this.setupHTML5Tags();
	};

};/**
 * @author Kevin O'Neill
 */

GMCU.IE9 = function() {
	
	GMCU.IECommon.apply(this, arguments);
	this.parent = new GMCU.IECommon();
	
	this.init = function() {
		this.parent.init();		
	};
};/**
 * @author Kevin O'Neill
 */

GMCU.IE10 = function() {
	
	GMCU.IECommon.apply(this, arguments);
	this.parent = new GMCU.IECommon();
	
	this.init = function() {
		this.parent.init();		
	};
};/**
 * @author Kevin O'Neill
 */

GMCU.Chrome = function() {
	
	GMCU.CUBrowser.apply(this, arguments);
	this.parent = new GMCU.CUBrowser();
	
	this.init = function () {
		this.parent.init();
		// additional statements
	};
};/**
 * @author Kevin O'Neill
 */

GMCU.Firefox = function() {
	
	GMCU.CUBrowser.apply(this, arguments);
	this.parent = new GMCU.CUBrowser();
	
	this.init = function () {
		this.parent.init();
		// additional statements
	};
};GMCU.DeviceManager = {

  instance: undefined,
  player_instance: undefined,

  init: function() {
    this.instance = this.instanceFactory();
    this.player_instance = this.playerFactory();
    this.instance.setDeviceStyle(this.getDevice());
  },

  getInstance: function() {
    return this.instance;
  },

  getPlayer: function() {
    return this.player_instance;
  },

  instanceFactory: function() {
    var device = this.getDevice();
    switch (device) {
      case ("iPhone5"):
      case ("iPad"):
      case ("iPhone3Inch"):
        return new GMCU.iOSDevice();
      case ("Desktop"):
        return new GMCU.DesktopDevice();
      default:
        return new GMCU.DesktopDevice();
    }
  },

  playerFactory: function() {
    var device = this.getDevice();
    switch (device) {
      case ("iPhone5"):
      case ("iPhone3Inch"):
      case ("iPad"):
        return new GMCU.MobilePlayer(cunlock_config.ad_url);
      case ("Desktop"):
        return new GMCU.DesktopPlayer(cunlock_config.ad_url);
      default:
        return new GMCU.DesktopPlayer(cunlock_config.ad_url);
    }
  },


  isiPad: function() {
    //all ipad devices with a 4:3 screen
    if (GMCU.UserAgentManager.iPad()) {
      return true;
    }
  },


  is3inchiPhone: function() {
    //iphone and ipod touch devices with a 3.5" screen
    if (GMCU.UserAgentManager.iPhone()) {
      if (this.isiPhone5()) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  },

  isiPhone5: function() {
    //iphone 5 or ipod touch devices with a 4" display
    var iPhone5 = false,
        setw, seth, amul;

    h = window.innerHeight;
    w = window.innerWidth;

    if (h > w) {
      seth = h;
      setw = w;
    } else {
      seth = w;
      setw = h;
    }

    amul = seth / setw;

    //debug section
    //iphone 5 portrait fixed320 = 1.30...
    //iphone 5 portrait amul = 1.3875
    //iphone 5 landscape amul = 2.7307
    if (window.orientation === 0 && amul > 1.33) {
      iPhone5 = true;
    }
    if (window.orientation === 90 && amul > 2.0) {
      iPhone5 = true;
    }
    if (window.orientation === -90 && amul > 2.0) {
      iPhone5 = true;
    }
    if (window.orientation === 180 && amul > 1.33) {
      iPhone5 = true;
    }
    return iPhone5;
  },


  getDevice: function() {
    if (this.isiPhone5()) {
      return "iPhone5";
    } else if (this.isiPad()) {
      return "iPad";
    } else if (this.is3inchiPhone()) {
      return "iPhone3Inch";
    } else {
      return "Desktop";
    }
  }
};GMCU.Device = function () {
  this.superProperty = true;
  this.layout = undefined;

  this.init = function () {
    return;
  };

  this.loadAsync = function () {
    return;
  };

  this.getLayout = function(){
	return this.layout;
  };

  this.setDeviceStyle = function () {
    return;
  };

  this.setExecutionStyle = function () {
    this.cuLite = cunlock_config["cu_lite"];

    GMCU.isCULite = function () {
      return cunlock_config["cu_lite"];
    };

    GMCU.placement = function () {
      return cunlock_config["placement"];
    };

    GMCU.isOverlay = function  () {
      return cunlock_config.cu_lite || (cunlock_config.placement === 2);
    };
  };
  this.enableScrolling = function () {
    return true;
  };

  this.enableZooming = function () {
    return true;
  };
};
GMCU.DesktopDevice = function() {

  GMCU.Device.apply(this, arguments);
  this.parent = new GMCU.Device();
  this.init = function() {
    this.parent.init();
  };

  this.attachLoadEvents = function() {
    this.setExecutionStyle();
    this.attachLoadFunctions();
    if (!GMCU.isOverlay()) {
      GMCU.BrowserManager.getInstance().attachToLoadEvent(cunlock_config.slow_load);
    }
    return;
  };

  this.backupLoader = function() {
    GMCU.backupLoader();
    return;
  };

  this.load = function() {

    if (GMCU.isOverlay()) {
      this.layout = new GMCU.DesktopOverlayLayout(GMCU.Cunlock.params);
    } else {
      this.layout = new GMCU.DesktopLayout(GMCU.Cunlock.params);
    }
    this.layout.hideContent();
    if (!GMCU.RefreshThreshold.isEnabled()) {
      GMCU.DeviceManager.getPlayer().loadPlayer();
    }
  };

  this.loadAsync = function () {
    if (GMCU.isOverlay()) GMCU.beginCunlockUnit();
    return;
  };

  this.orientationChange = function () {
    if (GMCU.isCULite()) this.setStyles();
    return;
  };


  this.addStyleSheets = function () {
    return GMCU.DesktopOverlayStyles.addStyleSheets();
  };

  this.attachLoadFunctions = function() {
    GMCU.beginCunlockUnit = function() {
      if (!GMCU.initUnitExecuted) {
        if (typeof geoip_country_code == 'function') {
          GMCU.initUnitExecuted = true;
          GMCU.Cunlock.init(cunlock_config);
        } else {
          setTimeout("GMCU.beginCunlockUnit()", 100);
        }
      }
    };

    GMCU.cunlockLoader = function() {
      if (document.readyState === "complete") {
        GMCU.DomHandler.removeEvent("readystatechange", document, GMCU.cunlockLoader);
        GMCU.beginCunlockUnit();
      }
    };

    GMCU.backupLoader = function() {
      if (document.readyState === "complete" && !GMCU.initUnitExecuted) {
        GMCU.Logger.log("Backup used");
        GMCU.beginCunlockUnit();
      }
    };

    GMCU.logPageLoad = function() {
      GMCU.Logger.setValueAndLog('cuPageLoadedAt', Date.now());
    };
  };
};
GMCU.iOSDevice = function() {

	GMCU.Device.apply(this, arguments);
	this.parent = new GMCU.Device();
	this.deviceStyle = null;
	this.init = function() {
		window.addEventListener("orientationchange", this.orientationChange, false);
		this.parent.init();
	};

	this.attachLoadEvents = function() {
		return;
	};

	this.backupLoader = function() {
		return;
	};

	this.orientationChange = function() {
		setTimeout(GMCU.changeStylesByOrientation,200);
	};

	this.load = function() {
		this.layout = new GMCU.OverlayLayout(GMCU.Cunlock.params);
		GMCU.DeviceManager.getPlayer().loadPlayer();
		GMCU.Logger.log("hidewithmobile()");
		this.layout.hideContent();
	};

	this.isPortrait = function() {
		switch (window.orientation) {
			case 0:
			case 180:
				return true;
			case 90:
			case -90:
				return false;
			default :
				return false;
		}
	};

	this.loadAsync = function() {
		if(GMCU.UserAgentManager.isExcludedMobileBrowser()) {
			GMCU.EventTrigger.shootEvent({
			'event': 'excludedBrowser',
			'message': 'Mobile Browser Detected :: ' + GMCU.UserAgentManager.getBrowser()
			});
			return;
		}
		GMCU.DeviceManager.getInstance().hideAddressBar();
		GMCU.DeviceManager.getInstance().disableScrolling();
		GMCU.DeviceManager.getInstance().disableZooming();
		GMCU.Cunlock.initWithMobile(cunlock_config);
		return;
	};

	this.hideAddressBar = function() {
		if (window.pageYOffset <= 1)
			window.scrollTo(window.pageXOffset, 1);
	};

	this.disableScrolling = function() {
		this.addEventListener(document.body, "touchmove", this.preventScrolling);
	};

	this.enableScrolling = function() {
		this.removeEventListener(document.body, "touchmove", this.preventScrolling);
	};

	this.preventScrolling = function(e) {
		e.preventDefault();
		GMCU.DeviceManager.getInstance().hideAddressBar();
	};

	this.disableZooming = function() {
		this.addEventListener(document.body, "touchmove", this.preventZooming);
	};

	this.enableZooming = function() {
		this.removeEventListener(document.body, "touchmove", this.preventZooming);
	};

	this.preventZooming = function(e) {
		if (e.touches.length == 2)
			e.preventDefault();
	};

	this.addEventListener = function(obj, evType, fn) {
		if (obj.addEventListener) {
			obj.addEventListener(evType, fn, false);
			return true;
		} else if (obj.attachEvent) {
			var r = obj.attachEvent("on" + evType, fn);
			return r;
		} else {
			return false;
		}
	};

	this.removeEventListener = function(obj, evType, fn) {
		if (obj.removeEventListener) {
			obj.removeEventListener(evType, fn, false);
			return true;
		} else if (obj.detachEvent) {
			var r = obj.detachEvent("on" + evType, fn);
			return r;
		} else {
			return false;
		}
	};

	this.setDeviceStyle = function(device) {
		switch (device) {
			case ("iPhone5"):
				this.deviceStyle = GMCU.iPhone5Styles;
				break;
			case ("iPhone3Inch") :
				this.deviceStyle = GMCU.iPhone3InchStyles;
				break;
			case ("iPad") :
				this.deviceStyle = GMCU.iPadStyles;
				break;
			default :
				this.deviceStyle = GMCU.iPhone3InchStyles;
				break;
		}
		return;
	};

	this.getDeviceStyle = function() {
		return this.deviceStyle;
	};

	this.addStyleSheets = function () {
		GMCU.MobileOverlayStyles.addStyleSheets();
	};
};

GMCU.changeStylesByOrientation = function(){
	var device_instance = GMCU.DeviceManager.getInstance();
	if (device_instance.isPortrait()) {
		device_instance.getDeviceStyle().setPortrait();
	} else {
		device_instance.getDeviceStyle().setLandscape();
	}
};

/*** Defining a console if console object not defined ***/
if (!window.console) {
	
	var console = {
		d: '',
		
		init : function() {
			console.d = document.createElement('div');
			document.body.appendChild(console.d);
			var a = document.createElement('a');
			a.href = 'javascript:console.hide()';
			a.innerHTML = 'close';
			console.d.appendChild(a);
			var a = document.createElement('a');
			a.href = 'javascript:console.clear();';
			a.innerHTML = 'clear';
			console.d.appendChild(a);
			var id = 'gmCompatibilityConsole';
			if (!document.getElementById(id)) {
				console.d.id = id;
			}
			console.hide();
		},
		hide : function() {
			console.d.style.display = 'none';
		},
		show : function() {
			console.d.style.display = 'block';
		},
		log : function(o) {
			console.d.innerHTML += '<br/>' + o;
			//console.show();
		},
		clear : function() {
			console.d.parentNode.removeChild(console.d);
			console.init();
			//console.show();
		},
		
		addLoadEvent : function(func) {
			var oldonload = window.onload;
			if ( typeof window.onload != 'function') {
				window.onload = func;
			} else {
				window.onload = function() {
					if (oldonload) {
						oldonload();
					}
					func();
				}
			};
		}
	};
	console.addLoadEvent(console.init);
}

GMCU.DomHandler = {

	insertAfter : function(newElement, targetElement) {
		// target is what you want it to go after. Look for this elements
		// parent.
		var parent = targetElement.parentNode;
		// if the parents lastchild is the targetElement...
		if (parent.lastchild == targetElement) {
			// add the newElement after the target element.
			parent.appendChild(newElement);
		} else {
			// else the target has siblings, insert the new element between the
			// target and it's next sibling.
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	},
	
	/**
	 * Obtains elements by class name
	 */
	getElementsByClassName : function(className, tag, elm) {
		if (document.getElementsByClassName) {
			getElementsByClassName = function(className, tag, elm) {
				elm = elm || document;
				var elements = elm.getElementsByClassName(className), nodeName = (tag) ? new RegExp(
						"\\b" + tag + "\\b", "i")
						: null, returnElements = [], current;
				for ( var i = 0, il = elements.length; i < il; i += 1) {
					current = elements[i];
					if (!nodeName || nodeName.test(current.nodeName)) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		} else if (document.evaluate) {
			getElementsByClassName = function(className, tag, elm) {
				tag = tag || "*";
				elm = elm || document;
				var classes = className.split(" "), classesToCheck = "", xhtmlNamespace = "http://www.w3.org/1999/xhtml", namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace
						: null, returnElements = [], elements, node;
				for ( var j = 0, jl = classes.length; j < jl; j += 1) {
					classesToCheck += "[contains(concat(' ', @class, ' '), ' "
							+ classes[j] + " ')]";
				}
				try {
					elements = document.evaluate(".//" + tag + classesToCheck,
							elm, namespaceResolver, 0, null);
				} catch (e) {
					elements = document.evaluate(".//" + tag + classesToCheck,
							elm, null, 0, null);
				}
				while ((node = elements.iterateNext())) {
					returnElements.push(node);
				}
				return returnElements;
			};
		} else {
			getElementsByClassName = function(className, tag, elm) {
				tag = tag || "*";
				elm = elm || document;
				var classes = className.split(" "), classesToCheck = [], elements = (tag === "*" && elm.all) ? elm.all
						: elm.getElementsByTagName(tag), current, returnElements = [], match;
				for ( var k = 0, kl = classes.length; k < kl; k += 1) {
					classesToCheck.push(new RegExp("(^|\\s)" + classes[k]
							+ "(\\s|$)"));
				}
				for ( var l = 0, ll = elements.length; l < ll; l += 1) {
					current = elements[l];
					match = false;
					for ( var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
						match = classesToCheck[m].test(current.className);
						if (!match) {
							break;
						}
					}
					if (match) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		}
		return getElementsByClassName(className, tag, elm);
	},
	
	/**
	 * Select elements by selector (class, id or tag name) Example:
	 * this.$('.class-name'), this.$('#id') or this.$('body')
	 */
	$ : function(selector, node) {

		var type = selector.substring(0, 1);
		if (type == '#' || type == '.')
			selector = selector.substring(1);

		if (node == null)
			node = document;

		if (type == '#')// If id, return 1 single element
			return document.getElementById(selector);
		else if (type == '.')// IF class, return an array
		{
			var className = selector.split(".");
			className = className[0];
			return GMCU.DomHandler.getElementsByClassName(className);
		} else
			// If tag, return an array
			return node.getElementsByTagName(selector);
	},

	/**
	 * Return if an element has a class named as cls
	 */
	hasClass : function(element, cls) {
		var r = new RegExp('\\b' + cls + '\\b');
		return r.test(element.className);
	},
	
	/**
	 *  Returns # or . depending on the type of the selector
	 *  @param String selector
	 */
	
	getType : function(selector) {
		var type = selector.substring(0, 1);
		if (type == '#' || type == '.')
			selector = selector.substring(1);
		return type;
	},
	
	/**
	 * Removes all the textNode elements from a NodeList 
 	 * @param NodeList items
	 */
	cleanArray : function(items) {
		if (typeof items != 'undefined' && items.length > 0) {
			var parent = items[0].parentNode;
			var cunlocktag;
			for ( var i = 0; i < items.length; i++) {
				if (items[i].nodeType == 3) {
					cunlocktag = document.createElement("cunlocktag");
					cunlocktag.innerHTML = GMCU.Utils.trim(GMCU.Utils.stripTags(items[i].data));
					parent.insertBefore(cunlocktag, items[i]);
					parent.removeChild(cunlocktag.nextSibling);
				}
				else 
					if (items[i].nodeType == 8 ) {
						parent.removeChild(items[i]);
						i--;					
					}
			}
			return items;
		}
		return [];
	},
		
	/**
	 * Add link tag to head
	 */
	addCSS : function(url) {

		var head = GMCU.DomHandler.$('head')[0];
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.media = 'all';
		link.href = url;
		head.appendChild(link);
	},
	/**
	 * Add a script tag 
	 */
	addJS: function (url) {
	  var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url; 
		document.getElementsByTagName('head')[0].appendChild(script);
	},
	/*
	 * Attach the callback to the dom_element parameter
	 * when event is fired.
	 */
	attachEvent: function(event,dom_element,callback) {		
		GMCU.BrowserManager.getInstance().attachEvent(event, dom_element, callback);
	},
	/*
	 * Removes a callback attached to dom_element
	 * when event is fired
	 */
	removeEvent: function(event,dom_element,callback) {
		GMCU.BrowserManager.getInstance().removeEvent(event, dom_element, callback);
	},
	
	createIframe: function(url){
		var iframe = document.createElement("iframe");
		iframe.src = url;
		return iframe;
	},
		
	/*
	 * Returns a DOM element with a temporary
	 * stylesheet which has the styles to move the
	 * body to the left
	 */
    makeStyleSheet: function(css_code){
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        var text = css_code;
        
        GMCU.BrowserManager.getInstance().setStyleSheetProperties(style, text);

        document.getElementsByTagName("body")[0].appendChild(style);
    },
    
    scrollElement: function(page_element){
    	if(page_element){
    		var positionX = 0,         
        	positionY = 0;    
        	positionX += page_element.offsetLeft;        
       	 	positionY += page_element.offsetTop;        
        	pageElement = page_element.offsetParent;        
        	window.scrollTo(positionX, positionY);    	
    	}
    }
};


Date = window.Date || {};
Date.now = Date.now || function () {
  return (new Date().getTime());
};

GMCU.Logger = {

  'timeTaken' : {
    'events': {},
    'functions' : {}
  },

  'cuScriptLoadedAt': null,

  'cuPageLoadedAt' : null,

  'cuLockedAt' : null,

  'cuBeforeInit' : null,

  'message' : {
    'cuScriptLoadedAt': 'before modules init and script load ',
    'cuPageLoadedAt': 'script load and page load: ',
    'pageDidLock': 'script load and content locked: ',
    'freeViewAllowed': 'script load and free view event: ',
    'templateConfigWarning': 'script load and template config warning: ',
    'adsLoadFailure' : 'script load and ad load failure: '
  },

  logVerboseResult: function(name, start, end) {
    if(!cunlock_config.enable_logging.verbose) return;
    var timeElasped = (start - (GMCU.Logger.cuScriptLoadedAt || GMCU.Logger.cuBeforeInit)).toString();
    GMCU.Logger.timeTaken.functions[name] = (start - end);
    console.log(name +
      '\nTime Elapsed: ' + timeElasped +
      '\n Execution Time: ' + (end - start).toString()
    );
    return;
  },

  setValueAndLog: function (key, timestamp) {
    if(cunlock_config.enable_logging.on && !!GMCU.Logger.message[key]) {
      var result = (timestamp - (GMCU.Logger.cuScriptLoadedAt || GMCU.Logger.cuBeforeInit));
      GMCU.Logger.timeTaken.events[key] = result;
      console.log('Time (in ms) between CU ' + GMCU.Logger.message[key]  + result);
    }
    GMCU.Logger[key] = timestamp;
    return;
  },

  enableOtherLogs: function () {
    return !(cunlock_config.enable_logging.on || cunlock_config.enable_logging.verbose);
  },

  log: function (msg) {
    if (GMCU.Logger.enableOtherLogs())
      console.log(msg);
    return;
  }
};

GMCU.UserAgentManager = {
	user_agent : '',
	exclude_browsers : [],
	browsers_map : [],
	versionSearchString: [],
	browser : '',
	version : '',
	device : '',
	OS : '',
	dataBrowser : [{string: navigator.userAgent,subString: "Chrome",identity: "Chrome"},
				   {string: navigator.userAgent,subString: "OmniWeb",versionSearch: "OmniWeb/",identity: "OmniWeb"},
				   {string: navigator.vendor,subString: "Apple",identity: "Safari",versionSearch: "Version"	},
				   {prop: window.opera,	identity: "Opera",	versionSearch: "Version"},
				   {string: navigator.vendor,subString: "iCab",identity: "iCab"},
				   {string: navigator.vendor,subString: "KDE",identity: "Konqueror"},
				   {string: navigator.userAgent,subString: "Firefox",identity: "Firefox"},
				   {string: navigator.vendor,subString: "Camino",identity: "Camino"},
				   {string: navigator.userAgent,subString: "Netscape",identity: "Netscape"},
				   {string: navigator.userAgent,subString: "MSIE",identity: "MSIE",versionSearch: "MSIE"},
				   {string: navigator.userAgent,subString: "Gecko",	identity: "Mozilla",versionSearch: "rv"	},
				   {string: navigator.userAgent,subString: "Mozilla",identity: "Netscape",versionSearch: "Mozilla"}
				],
	dataOS : [{string: navigator.platform,	subString: "Win",identity: "Windows"},
			  {string: navigator.platform,subString: "Mac",identity: "Mac"},
			  {string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
			  {string: navigator.platform,subString: "Linux",identity: "Linux"}
			 ],

	init :function() {
		GMCU.UserAgentManager.browsers_map['IE6'] = 'MSIE 6';
		GMCU.UserAgentManager.browsers_map['IE7'] = 'MSIE 7';
		GMCU.UserAgentManager.browsers_map['IE8'] = 'MSIE 8';
		GMCU.UserAgentManager.browsers_map['IE9'] = 'MSIE 9';
		GMCU.UserAgentManager.browsers_map['IE10'] = 'MSIE 10';
		GMCU.UserAgentManager.browsers_map['Chrome'] = 'Chrome';
		GMCU.UserAgentManager.browsers_map['Firefox'] = 'Firefox' ;
		GMCU.UserAgentManager.browsers_map['Opera'] = 'Opera' ;
		GMCU.UserAgentManager.browsers_map['Safari'] = 'Safari' ;
		GMCU.UserAgentManager.browser = GMCU.UserAgentManager.searchString(GMCU.UserAgentManager.dataBrowser) || "An unknown browser";
		GMCU.UserAgentManager.version = GMCU.UserAgentManager.searchVersion(navigator.userAgent)|| GMCU.UserAgentManager.searchVersion(navigator.appVersion) || "an unknown version";
		GMCU.UserAgentManager.OS = GMCU.UserAgentManager.searchString(GMCU.UserAgentManager.dataOS) || "an unknown OS";
		GMCU.UserAgentManager.user_agent = navigator.userAgent;
		GMCU.UserAgentManager.device = 'Desktop';
	},

	getOS: function(){
		return GMCU.UserAgentManager.OS;
	},

	getBrowser: function(){
		return GMCU.UserAgentManager.browser + " " + GMCU.UserAgentManager.version;
	},

	getBrowserType: function() {
		return GMCU.UserAgentManager.browser;
	},

	getBrowserVersion: function() {
		return GMCU.UserAgentManager.version;
	},

	isIE: function(){
		if( GMCU.UserAgentManager.browser == "MSIE")
			return true;
		else
			return false;
	},

	isExcludedBrowser: function(){

		for( var i = 0; i < GMCU.UserAgentManager.exclude_browsers.length; i++ ){
			var regex = new RegExp(GMCU.UserAgentManager.exclude_browsers[i], 'i');
			if (GMCU.UserAgentManager.getBrowser().match(regex)) {
				return true;
			}
		}
		return false;
	},

  isExcludedMobileBrowser: function() {
    return (GMCU.UserAgentManager.browser !== "Safari" || GMCU.UserAgentManager.version < 5);
  },

	setExcludeBrowsers: function(exclude_browsers){
		GMCU.UserAgentManager.exclude_browsers = new Array();
		for( var i = 0; i < exclude_browsers.length; i++ ){
			GMCU.UserAgentManager.exclude_browsers.push(GMCU.UserAgentManager.browsers_map[exclude_browsers[i]]);
		}
	},

	Android: function() {
		if (navigator.userAgent.match(/Android/i)){
			GMCU.UserAgentManager.device = "Android";
			return true;
		}
        return false;
    },

    BlackBerry: function() {
        if (navigator.userAgent.match(/BlackBerry/i) ||
        	navigator.userAgent.match(/BB10/i) ||
        	navigator.userAgent.match(/RIM/i)){
        	GMCU.UserAgentManager.device = "BlackBerry";
			return true;
        }
        return false;
    },

    iPad: function() {
        if(navigator.userAgent.match(/iPad/i)){
        	GMCU.UserAgentManager.user_agent = "Safari";
			return true;
        }
        return false;
    },


    iPhone: function() {
        if(navigator.userAgent.match(/iPhone/i)){
            GMCU.UserAgentManager.user_agent = "Safari";
            return true;
        }
        return false;
    },



    Windows: function() {
        if(navigator.userAgent.match(/IEMobile/i)){
        	GMCU.UserAgentManager.device = "IEMobile";
			return true;
        }
        return false;
    },

    OtherMobile: function(){
    	if (navigator.userAgent.match(/EudoraWeb/i) || navigator.userAgent.match(/Fennec/i)
    	|| navigator.userAgent.match(/Minimo/i) ||  navigator.userAgent.match(/POLARIS/i)
    	|| navigator.userAgent.match(/Kindle/i) || navigator.userAgent.match(/nook browser/i)
    	|| navigator.userAgent.match(/hp-tablet/i) || navigator.userAgent.match(/Silk/i)
    	|| navigator.userAgent.match(/Opera Mini/i)){
        	GMCU.UserAgentManager.device = "Other Mobile";
			return true;
        }
        return false;
    },

    getUserAgent: function(){
    	return GMCU.UserAgentManager.user_agent;
    },

    getDevice: function() {
    	return GMCU.UserAgentManager.device;
    },

    isMobileDevice: function() {
        return (GMCU.UserAgentManager.Android() || GMCU.UserAgentManager.BlackBerry()
        		|| GMCU.UserAgentManager.iPhone() || GMCU.UserAgentManager.iPad() || GMCU.UserAgentManager.Windows() || GMCU.UserAgentManager.OtherMobile());
    },

   searchString: function (data) {
		for (var i=0 ; i < data.length ; i++){
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			GMCU.UserAgentManager.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(	GMCU.UserAgentManager.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring( index + GMCU.UserAgentManager.versionSearchString.length+1));
	}
};


GMCU.JSONP = (function(){
	var counter = 0, head, query, key, window = this;
	function load(url) {
		var script = document.createElement('script'),
		done = false;
		script.src = url;
		script.async = false;
		script.onload = script.onreadystatechange = function() {
			if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
				done = true;
				script.onload = script.onreadystatechange = null;
				if ( script && script.parentNode ) {
					script.parentNode.removeChild( script );
				}
			}
		};
		var body = document.getElementsByTagName('body')[0];
		body.appendChild( script );
	}

	function jsonp(url, params, callback) {
		query = "?";
		params = params || {};
		for ( key in params ) {
			if ( params.hasOwnProperty(key) ) {
				query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
			}
		}
		var jsonp = "json" + (++counter);
		window[ jsonp ] = function(data){
		try {
				callback(data);
				delete window[ jsonp ];
			} catch (e) {
				GMCU.Logger.log(e);
			}
			window[ jsonp ] = null;
		};
 		GMCU.Logger.log(url);
 		if( params.clean_url )
 			load(url +  "?callback=" + jsonp);
 		else
			load(url +  "&callback=" + jsonp);
		//load(url);
		//load(url + query + (callbackName || "callback") + "=" + jsonp);
		return jsonp;
	}
	return {
		get:jsonp
	};
}());
(function () {
  var modules = {
    'AudienceListener': {
      'loadLotameScript': true,
      'processAudiences' : true,
      'getAlternativeTag': true
    },
    'BrandBox' : {
      'renderText' : true
    },
    'cunlock' : {
      'init' : true,
      'trackInitialInfo' : true,
      'contentShouldBeLocked' : true
    },
    'DomHandler' : {
      '$' : true
    },
    'EventHandler' : {
      'attachEvent' : true,
      'dispatchEvent' : true
    },
    'EventTrigger' : {
      'shootEvent' : true
    },
    'Comscore' : {
      'executeComscore' : true
    },
    'LeaveBehindBanner' : {
      'render' : true
    },
    'playerFactory' : {
      'loadPlayer' : true
    },
    'Rules' : {
      'processRules':true
    },
    'SessionLogic' : {
      'getValue' : true,
      'updateValue' : true
    },
    'SkipAd' : {
      'getValue' : true,
      'updateValue' : true
    },
    'GMSmartSource' : {
      'loadRules' : true
    },
    'UnitLayout' : {
      'buildUnit' : true
    },
    'UserAgentManager' : {
      'init' : true
    }
  };

  var loggerWrapper = function (obj, objName) {
    for (var prop in obj) {
      if(obj.hasOwnProperty(prop) && typeof obj[prop] === 'function' && !!modules[objName][prop]) {
        var oldFunction = obj[prop];

        obj[prop] = (function (oldFunction, objName, p) {
          return function () {
            var start = Date.now();
            var returnValue = oldFunction.apply(this, arguments);
            GMCU.Logger.logVerboseResult((objName + p).toString(), start, Date.now());
            return returnValue;
          };
        }(obj[prop], objName, prop));
      }
    }
  };

  for (var key in modules) {
    if(modules.hasOwnProperty(key) && typeof GMCU[key] === 'object') {
      loggerWrapper(GMCU[key], key);
    }
  }
})();
GMCU.Utils = {

	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	/**
	 * Creates a timestamp string
	 */
	getTimeStamp : function() {
		var date = new Date();
		// return date.getFullYear() + date.getMonth() + date.getDate() +
		// date.getHours() + date.getMinutes() + date.getSeconds();
		return date.getTime();
	},

	/**
	 * Creates the param string attached to an event
	 */
	getParamString : function(t_p, param_arr) {

		var param_str = "?";
		for (key in t_p) {
			param_str += key + "=" + t_p[key] + "&";
		}
		for (key in param_arr) {
			param_str += key + "=" + param_arr[key] + "&";
		}
		// Last parameter is a timestamp, that the request is made,
		// preventing the browser from getting the gif from the cache
		param_str += "timestamp=" + GMCU.Utils.getTimeStamp();
		return param_str;
	},

	/**
	 * Generate a sessionID string
	 */
	generateSessionID : function() {

		var s = [], itoh = '0123456789ABCDEF';
		// Make array of random hex digits. The UUID only has 32 digits in it,
		// but we
		// allocate an extra items to make room for the '-'s we'll be inserting.
		for (var i = 0; i < 36; i++)
			s[i] = Math.floor(Math.random() * 0x10);
		// Conform to RFC-4122, section 4.4
		s[14] = 4;
		// Set 4 high bits of time_high field to version
		s[19] = (s[19] & 0x3) | 0x8;
		// Specify 2 high bits of clock sequence
		// Convert to hex chars
		for (var i = 0; i < 36; i++)
			s[i] = itoh[s[i]];

		// Insert '-'s
		s[8] = s[13] = s[18] = s[23] = '-';
		return s.join('');
	},

	/**
	 * Extracts base URL
	 */
	extractUrl : function(url) {
		//return url.replace(/^.*\/\/(www\.)?(.*?)\/.*/, '$2').toLowerCase();
		return url.replace(/^.*\/\/(www\.)?(.*?)(\/|\&).*/, '$2').toLowerCase();
	},

	stripTags: function(str){
		return str.replace(/(<([^>]+)>)/ig,"");
	},

	trim : function(str) {
		return str.replace(/^\s+|\s+$/g, '');
	},

	shootPixel : function(pixel_url) {
		var img = new Image();
		img.src = pixel_url;
	},

	aspectRatioDivisor: function(width,height){
	    if ( width == 0 || height == 0)
        	return Math.max( width,height);

     	var result = width % height;

   		if ( result != 0)
   			 return this.aspectRatioDivisor(height, result);
        else
        	return height;

	},

	getAspectRatioHeigth: function(width,width_dim,height_dim){
		var heigth = Math.round((width/width_dim) * height_dim);
		return heigth;
	},

	getNumber : function(a) {
		if (typeof a != "number")
			return a.split("px")[0];
		return a;
	},

	encode64 : function (input) {
	    var output = "";
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0;

	    input = GMCU.Utils._utf8_encode(input);

	    while (i < input.length) {

	        chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);

	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;

	        if (isNaN(chr2)) {
	            enc3 = enc4 = 64;
	        } else if (isNaN(chr3)) {
	            enc4 = 64;
	        }

	        output = output +
	        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
	        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

	    }

	    return output;
	},

	_utf8_encode : function (string) {
	    string = string.replace(/\r\n/g,"\n");
	    var utftext = "";

	    for (var n = 0; n < string.length; n++) {

	        var c = string.charCodeAt(n);

	        if (c < 128) {
	            utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	            utftext += String.fromCharCode((c >> 6) | 192);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	            utftext += String.fromCharCode((c >> 12) | 224);
	            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }

	    }

	    return utftext;
	},

	decode64 : function (input) {
	    var output = "";
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var i = 0;

	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	    while (i < input.length) {

	        enc1 = this._keyStr.indexOf(input.charAt(i++));
	        enc2 = this._keyStr.indexOf(input.charAt(i++));
	        enc3 = this._keyStr.indexOf(input.charAt(i++));
	        enc4 = this._keyStr.indexOf(input.charAt(i++));

	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;

	        output = output + String.fromCharCode(chr1);

	        if (enc3 != 64) {
	            output = output + String.fromCharCode(chr2);
	        }
	        if (enc4 != 64) {
	            output = output + String.fromCharCode(chr3);
	        }

	    }

	    output = GMCU.Utils._utf8_decode(output);

	    return output;

	},

	_utf8_decode : function (utftext) {
	    var string = "";
	    var i = 0;
	    var c = c1 = c2 = 0;

	    while ( i < utftext.length ) {

	        c = utftext.charCodeAt(i);

	        if (c < 128) {
	            string += String.fromCharCode(c);
	            i++;
	        }
	        else if((c > 191) && (c < 224)) {
	            c2 = utftext.charCodeAt(i+1);
	            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	            i += 2;
	        }
	        else {
	            c2 = utftext.charCodeAt(i+1);
	            c3 = utftext.charCodeAt(i+2);
	            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	            i += 3;
	        }

	    }

	    return string;
	},

	addUnicornParams: function (url, params) {
		var queryString;
		if (url.indexOf("?") === url.length)
			queryString = ""
		else
			queryString = "?"
		for(var key in params) {
			if (params.hasOwnProperty(key)) {
				queryString += ("&" + key + "=" + params[key]);
			}
		}
		return (url + queryString)
	},

	addAdtechParams: function (url, params) {
		var queryString = "";
		for (var key in params) {
			if (params.hasOwnProperty(key)) {
				queryString += ";KV" + key + "=" + params[key]
			}
		}
		return (url + queryString);
	},

	trimString : function (str, maxChars) {
		if (str.length <= maxChars) return str;
		return (str.substring(0, maxChars));
	}
};

GMCU.TextResizer = {

	css: function(el, prop){
        return window.getComputedStyle ? getComputedStyle(el).getPropertyValue(prop) : el.currentStyle[prop];
   },
   
   addEvent: function(el, type, fn){
        if (el.addEventListener)
            el.addEventListener(type, fn, false);
        else
            el.attachEvent('on'+type, fn);
    },
	
	fitText: function (el, kompressor){
        var settings = {'minFontSize' : -1/0,'maxFontSize' : 1/0};
        if (el.length)
        	for(var i=0; i<el.length; i++)
            	this._fit(el[i],kompressor,settings);
        else
            this._fit(el,kompressor,settings);
        return el;
    },
    
    _fit: function(el, kompressor,settings){
    	var compressor = kompressor || 1;
        this._resizer(el, kompressor,settings);
    },
    _resizer: function (el,compressor, settings){
    	el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
    }
	
};
//TweenLite
/*!
 * VERSION: beta 1.10.3
 * DATE: 2013-09-02
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
(function(window) {

    "use strict";
    var _globals = window.GreenSockGlobals || window,
        _namespace = function(ns) {
            var a = ns.split("."),
                p = _globals, i;
            for (i = 0; i < a.length; i++) {
                p[a[i]] = p = p[a[i]] || {};
            }
            return p;
        },
        gs = _namespace("GMCU.com.greensock"),
        _slice = [].slice,
        _emptyFunc = function() {},
        a, i, p, _ticker, _tickerActive,
        _defLookup = {},

        /**
         * @constructor
         * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
         * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
         * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
         * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
         *
         * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
         * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
         * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
         * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
         * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
         * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
         * sandbox the banner one like:
         *
         * <script>
         *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
         * </script>
         * <script src="js/greensock/v1.7/TweenMax.js"></script>
         * <script>
         *     window.GreenSockGlobals = null; //reset it back to null so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
         * </script>
         * <script src="js/greensock/v1.6/TweenMax.js"></script>
         * <script>
         *     gs.TweenLite.to(...); //would use v1.7
         *     TweenLite.to(...); //would use v1.6
         * </script>
         *
         * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
         * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
         * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
         * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
         */
            Definition = function(ns, dependencies, func, global) {
            this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
            _defLookup[ns] = this;
            this.gsClass = null;
            this.func = func;
            var _classes = [];
            this.check = function(init) {
                var i = dependencies.length,
                    missing = i,
                    cur, a, n, cl;
                while (--i > -1) {
                    if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
                        _classes[i] = cur.gsClass;
                        missing--;
                    } else if (init) {
                        cur.sc.push(this);
                    }
                }
                if (missing === 0 && func) {
                    a = ("GMCU.com.greensock." + ns).split(".");
                    n = a.pop();
                    cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

                    //exports to multiple environments
                    if (false/*global*/) {
                        _globals[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
                        if (typeof(define) === "function" && define.amd){ //AMD
                            define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").join("/"), [], function() { return cl; });
                        } else if (typeof(module) !== "undefined" && module.exports){ //node
                            module.exports = cl;
                        }
                    }
                    for (i = 0; i < this.sc.length; i++) {
                        this.sc[i].check();
                    }
                }
            };
            this.check(true);
        },

    //used to create Definition instances (which basically registers a class that has dependencies).
        _gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
            return new Definition(ns, dependencies, func, global);
        },

    //a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
        _class = gs._class = function(ns, func, global) {
            func = func || function() {};
            _gsDefine(ns, [], function(){ return func; }, global);
            return func;
        };

    _gsDefine.globals = _globals;



    /*
     * ----------------------------------------------------------------
     * Ease
     * ----------------------------------------------------------------
     */
    var _baseParams = [0, 0, 1, 1],
        _blankArray = [],
        Ease = _class("easing.Ease", function(func, extraParams, type, power) {
            this._func = func;
            this._type = type || 0;
            this._power = power || 0;
            this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
        }, true),
        _easeMap = Ease.map = {},
        _easeReg = Ease.register = function(ease, names, types, create) {
            var na = names.split(","),
                i = na.length,
                ta = (types || "easeIn,easeOut,easeInOut").split(","),
                e, name, j, type;
            while (--i > -1) {
                name = na[i];
                e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
                j = ta.length;
                while (--j > -1) {
                    type = ta[j];
                    _easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
                }
            }
        };

    p = Ease.prototype;
    p._calcEnd = false;
    p.getRatio = function(p) {
        if (this._func) {
            this._params[0] = p;
            return this._func.apply(null, this._params);
        }
        var t = this._type,
            pw = this._power,
            r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
        if (pw === 1) {
            r *= r;
        } else if (pw === 2) {
            r *= r * r;
        } else if (pw === 3) {
            r *= r * r * r;
        } else if (pw === 4) {
            r *= r * r * r * r;
        }
        return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
    };

    //create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
    a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
    i = a.length;
    while (--i > -1) {
        p = a[i]+",Power"+i;
        _easeReg(new Ease(null,null,1,i), p, "easeOut", true);
        _easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
        _easeReg(new Ease(null,null,3,i), p, "easeInOut");
    }
    _easeMap.linear = gs.easing.Linear.easeIn;
    _easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


    /*
     * ----------------------------------------------------------------
     * EventDispatcher
     * ----------------------------------------------------------------
     */
    var EventDispatcher = _class("events.EventDispatcher", function(target) {
        this._listeners = {};
        this._eventTarget = target || this;
    });
    p = EventDispatcher.prototype;

    p.addEventListener = function(type, callback, scope, useParam, priority) {
        priority = priority || 0;
        var list = this._listeners[type],
            index = 0,
            listener, i;
        if (list == null) {
            this._listeners[type] = list = [];
        }
        i = list.length;
        while (--i > -1) {
            listener = list[i];
            if (listener.c === callback && listener.s === scope) {
                list.splice(i, 1);
            } else if (index === 0 && listener.pr < priority) {
                index = i + 1;
            }
        }
        list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
        if (this === _ticker && !_tickerActive) {
            _ticker.wake();
        }
    };

    p.removeEventListener = function(type, callback) {
        var list = this._listeners[type], i;
        if (list) {
            i = list.length;
            while (--i > -1) {
                if (list[i].c === callback) {
                    list.splice(i, 1);
                    return;
                }
            }
        }
    };

    p.dispatchEvent = function(type) {
        var list = this._listeners[type],
            i, t, listener;
        if (list) {
            i = list.length;
            t = this._eventTarget;
            while (--i > -1) {
                listener = list[i];
                if (listener.up) {
                    listener.c.call(listener.s || t, {type:type, target:t});
                } else {
                    listener.c.call(listener.s || t);
                }
            }
        }
    };


    /*
     * ----------------------------------------------------------------
     * Ticker
     * ----------------------------------------------------------------
     */
    var _reqAnimFrame = window.requestAnimationFrame,
        _cancelAnimFrame = window.cancelAnimationFrame,
        _getTime = Date.now || function() {return new Date().getTime();},
        _lastUpdate = _getTime();

    //now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
    a = ["ms","moz","webkit","o"];
    i = a.length;
    while (--i > -1 && !_reqAnimFrame) {
        _reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
        _cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
    }

    _class("Ticker", function(fps, useRAF) {
        var _self = this,
            _startTime = _getTime(),
            _useRAF = (useRAF !== false && _reqAnimFrame),
            _fps, _req, _id, _gap, _nextTime,
            _tick = function(manual) {
                _lastUpdate = _getTime();
                _self.time = (_lastUpdate - _startTime) / 1000;
                var overlap = _self.time - _nextTime,
                    dispatch;
                if (!_fps || overlap > 0 || manual === true) {
                    _self.frame++;
                    _nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
                    dispatch = true;
                }
                if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
                    _id = _req(_tick);
                }
                if (dispatch) {
                    _self.dispatchEvent("tick");
                }
            };

        EventDispatcher.call(_self);
        _self.time = _self.frame = 0;
        _self.tick = function() {
            _tick(true);
        };

        _self.sleep = function() {
            if (_id == null) {
                return;
            }
            if (!_useRAF || !_cancelAnimFrame) {
                clearTimeout(_id);
            } else {
                _cancelAnimFrame(_id);
            }
            _req = _emptyFunc;
            _id = null;
            if (_self === _ticker) {
                _tickerActive = false;
            }
        };

        _self.wake = function() {
            if (_id !== null) {
                _self.sleep();
            }
            _req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
            if (_self === _ticker) {
                _tickerActive = true;
            }
            _tick(2);
        };

        _self.fps = function(value) {
            if (!arguments.length) {
                return _fps;
            }
            _fps = value;
            _gap = 1 / (_fps || 60);
            _nextTime = this.time + _gap;
            _self.wake();
        };

        _self.useRAF = function(value) {
            if (!arguments.length) {
                return _useRAF;
            }
            _self.sleep();
            _useRAF = value;
            _self.fps(_fps);
        };
        _self.fps(fps);

        //a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
        setTimeout(function() {
            if (_useRAF && (!_id || _self.frame < 5)) {
                _self.useRAF(false);
            }
        }, 1500);
    });

    p = gs.Ticker.prototype = new gs.events.EventDispatcher();
    p.constructor = gs.Ticker;


    /*
     * ----------------------------------------------------------------
     * Animation
     * ----------------------------------------------------------------
     */
    var Animation = _class("core.Animation", function(duration, vars) {
        this.vars = vars = vars || {};
        this._duration = this._totalDuration = duration || 0;
        this._delay = Number(vars.delay) || 0;
        this._timeScale = 1;
        this._active = (vars.immediateRender === true);
        this.data = vars.data;
        this._reversed = (vars.reversed === true);

        if (!_rootTimeline) {
            return;
        }
        if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
            _ticker.wake();
        }

        var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
        tl.add(this, tl._time);

        if (this.vars.paused) {
            this.paused(true);
        }
    });

    _ticker = Animation.ticker = new gs.Ticker();
    p = Animation.prototype;
    p._dirty = p._gc = p._initted = p._paused = false;
    p._totalTime = p._time = 0;
    p._rawPrevTime = -1;
    p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
    p._paused = false;


    //some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
    var _checkTimeout = function() {
        if (_getTime() - _lastUpdate > 2000) {
            _ticker.wake();
        }
        setTimeout(_checkTimeout, 2000);
    };
    _checkTimeout();


    p.play = function(from, suppressEvents) {
        if (arguments.length) {
            this.seek(from, suppressEvents);
        }
        return this.reversed(false).paused(false);
    };

    p.pause = function(atTime, suppressEvents) {
        if (arguments.length) {
            this.seek(atTime, suppressEvents);
        }
        return this.paused(true);
    };

    p.resume = function(from, suppressEvents) {
        if (arguments.length) {
            this.seek(from, suppressEvents);
        }
        return this.paused(false);
    };

    p.seek = function(time, suppressEvents) {
        return this.totalTime(Number(time), suppressEvents !== false);
    };

    p.restart = function(includeDelay, suppressEvents) {
        return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
    };

    p.reverse = function(from, suppressEvents) {
        if (arguments.length) {
            this.seek((from || this.totalDuration()), suppressEvents);
        }
        return this.reversed(true).paused(false);
    };

    p.render = function(time, suppressEvents, force) {
        //stub - we override this method in subclasses.
    };

    p.invalidate = function() {
        return this;
    };

    p._enabled = function (enabled, ignoreTimeline) {
        if (!_tickerActive) {
            _ticker.wake();
        }
        this._gc = !enabled;
        this._active = (enabled && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration);
        if (ignoreTimeline !== true) {
            if (enabled && !this.timeline) {
                this._timeline.add(this, this._startTime - this._delay);
            } else if (!enabled && this.timeline) {
                this._timeline._remove(this, true);
            }
        }
        return false;
    };


    p._kill = function(vars, target) {
        return this._enabled(false, false);
    };

    p.kill = function(vars, target) {
        this._kill(vars, target);
        return this;
    };

    p._uncache = function(includeSelf) {
        var tween = includeSelf ? this : this.timeline;
        while (tween) {
            tween._dirty = true;
            tween = tween.timeline;
        }
        return this;
    };

    p._swapSelfInParams = function(params) {
        var i = params.length,
            copy = params.concat();
        while (--i > -1) {
            if (params[i] === "{self}") {
                copy[i] = this;
            }
        }
        return copy;
    };

//----Animation getters/setters --------------------------------------------------------

    p.eventCallback = function(type, callback, params, scope) {
        if ((type || "").substr(0,2) === "on") {
            var v = this.vars;
            if (arguments.length === 1) {
                return v[type];
            }
            if (callback == null) {
                delete v[type];
            } else {
                v[type] = callback;
                v[type + "Params"] = ((params instanceof Array) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
                v[type + "Scope"] = scope;
            }
            if (type === "onUpdate") {
                this._onUpdate = callback;
            }
        }
        return this;
    };

    p.delay = function(value) {
        if (!arguments.length) {
            return this._delay;
        }
        if (this._timeline.smoothChildTiming) {
            this.startTime( this._startTime + value - this._delay );
        }
        this._delay = value;
        return this;
    };

    p.duration = function(value) {
        if (!arguments.length) {
            this._dirty = false;
            return this._duration;
        }
        this._duration = this._totalDuration = value;
        this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
        if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
            this.totalTime(this._totalTime * (value / this._duration), true);
        }
        return this;
    };

    p.totalDuration = function(value) {
        this._dirty = false;
        return (!arguments.length) ? this._totalDuration : this.duration(value);
    };

    p.time = function(value, suppressEvents) {
        if (!arguments.length) {
            return this._time;
        }
        if (this._dirty) {
            this.totalDuration();
        }
        return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
    };

    p.totalTime = function(time, suppressEvents, uncapped) {
        if (!_tickerActive) {
            _ticker.wake();
        }
        if (!arguments.length) {
            return this._totalTime;
        }
        if (this._timeline) {
            if (time < 0 && !uncapped) {
                time += this.totalDuration();
            }
            if (this._timeline.smoothChildTiming) {
                if (this._dirty) {
                    this.totalDuration();
                }
                var totalDuration = this._totalDuration,
                    tl = this._timeline;
                if (time > totalDuration && !uncapped) {
                    time = totalDuration;
                }
                this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
                if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
                    this._uncache(false);
                }
                //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
                if (tl._timeline) {
                    while (tl._timeline) {
                        if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
                            tl.totalTime(tl._totalTime, true);
                        }
                        tl = tl._timeline;
                    }
                }
            }
            if (this._gc) {
                this._enabled(true, false);
            }
            if (this._totalTime !== time) {
                this.render(time, suppressEvents, false);
            }
        }
        return this;
    };

    p.startTime = function(value) {
        if (!arguments.length) {
            return this._startTime;
        }
        if (value !== this._startTime) {
            this._startTime = value;
            if (this.timeline) if (this.timeline._sortChildren) {
                this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
            }
        }
        return this;
    };

    p.timeScale = function(value) {
        if (!arguments.length) {
            return this._timeScale;
        }
        value = value || 0.000001; //can't allow zero because it'll throw the math off
        if (this._timeline && this._timeline.smoothChildTiming) {
            var pauseTime = this._pauseTime,
                t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
            this._startTime = t - ((t - this._startTime) * this._timeScale / value);
        }
        this._timeScale = value;
        return this._uncache(false);
    };

    p.reversed = function(value) {
        if (!arguments.length) {
            return this._reversed;
        }
        if (value != this._reversed) {
            this._reversed = value;
            this.totalTime(this._totalTime, true);
        }
        return this;
    };

    p.paused = function(value) {
        if (!arguments.length) {
            return this._paused;
        }
        if (value != this._paused) if (this._timeline) {
            if (!_tickerActive && !value) {
                _ticker.wake();
            }
            var tl = this._timeline,
                raw = tl.rawTime(),
                elapsed = raw - this._pauseTime;
            if (!value && tl.smoothChildTiming) {
                this._startTime += elapsed;
                this._uncache(false);
            }
            this._pauseTime = value ? raw : null;
            this._paused = value;
            this._active = (!value && this._totalTime > 0 && this._totalTime < this._totalDuration);
            if (!value && elapsed !== 0 && this._duration !== 0) {
                this.render((tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale), true, true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
            }
        }
        if (this._gc && !value) {
            this._enabled(true, false);
        }
        return this;
    };


    /*
     * ----------------------------------------------------------------
     * SimpleTimeline
     * ----------------------------------------------------------------
     */
    var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
        Animation.call(this, 0, vars);
        this.autoRemoveChildren = this.smoothChildTiming = true;
    });

    p = SimpleTimeline.prototype = new Animation();
    p.constructor = SimpleTimeline;
    p.kill()._gc = false;
    p._first = p._last = null;
    p._sortChildren = false;

    p.add = p.insert = function(child, position, align, stagger) {
        var prevTween, st;
        child._startTime = Number(position || 0) + child._delay;
        if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
            child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
        }
        if (child.timeline) {
            child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
        }
        child.timeline = child._timeline = this;
        if (child._gc) {
            child._enabled(true, true);
        }
        prevTween = this._last;
        if (this._sortChildren) {
            st = child._startTime;
            while (prevTween && prevTween._startTime > st) {
                prevTween = prevTween._prev;
            }
        }
        if (prevTween) {
            child._next = prevTween._next;
            prevTween._next = child;
        } else {
            child._next = this._first;
            this._first = child;
        }
        if (child._next) {
            child._next._prev = child;
        } else {
            this._last = child;
        }
        child._prev = prevTween;
        if (this._timeline) {
            this._uncache(true);
        }
        return this;
    };

    p._remove = function(tween, skipDisable) {
        if (tween.timeline === this) {
            if (!skipDisable) {
                tween._enabled(false, true);
            }
            tween.timeline = null;

            if (tween._prev) {
                tween._prev._next = tween._next;
            } else if (this._first === tween) {
                this._first = tween._next;
            }
            if (tween._next) {
                tween._next._prev = tween._prev;
            } else if (this._last === tween) {
                this._last = tween._prev;
            }

            if (this._timeline) {
                this._uncache(true);
            }
        }
        return this;
    };

    p.render = function(time, suppressEvents, force) {
        var tween = this._first,
            next;
        this._totalTime = this._time = this._rawPrevTime = time;
        while (tween) {
            next = tween._next; //record it here because the value could change after rendering...
            if (tween._active || (time >= tween._startTime && !tween._paused)) {
                if (!tween._reversed) {
                    tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
                } else {
                    tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
                }
            }
            tween = next;
        }
    };

    p.rawTime = function() {
        if (!_tickerActive) {
            _ticker.wake();
        }
        return this._totalTime;
    };


    /*
     * ----------------------------------------------------------------
     * TweenLite
     * ----------------------------------------------------------------
     */
    var TweenLite = _class("TweenLite", function(target, duration, vars) {
            Animation.call(this, duration, vars);
            this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

            if (target == null) {
                throw "Cannot tween a null target.";
            }

            this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

            var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
                overwrite = this.vars.overwrite,
                i, targ, targets;

            this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

            if ((isSelector || target instanceof Array) && typeof(target[0]) !== "number") {
                this._targets = targets = _slice.call(target, 0);
                this._propLookup = [];
                this._siblings = [];
                for (i = 0; i < targets.length; i++) {
                    targ = targets[i];
                    if (!targ) {
                        targets.splice(i--, 1);
                        continue;
                    } else if (typeof(targ) === "string") {
                        targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
                        if (typeof(targ) === "string") {
                            targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
                        }
                        continue;
                    } else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
                        targets.splice(i--, 1);
                        this._targets = targets = targets.concat(_slice.call(targ, 0));
                        continue;
                    }
                    this._siblings[i] = _register(targ, this, false);
                    if (overwrite === 1) if (this._siblings[i].length > 1) {
                        _applyOverwrite(targ, this, null, 1, this._siblings[i]);
                    }
                }

            } else {
                this._propLookup = {};
                this._siblings = _register(target, this, false);
                if (overwrite === 1) if (this._siblings.length > 1) {
                    _applyOverwrite(target, this, null, 1, this._siblings);
                }
            }
            if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
                this.render(-this._delay, false, true);
            }
        }, true),
        _isSelector = function(v) {
            return (v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
        },
        _autoCSS = function(vars, target) {
            var css = {},
                p;
            for (p in vars) {
                if (!_reservedProps[p] && (!(p in target) || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
                    css[p] = vars[p];
                    delete vars[p];
                }
            }
            vars.css = css;
        };

    p = TweenLite.prototype = new Animation();
    p.constructor = TweenLite;
    p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

    p.ratio = 0;
    p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
    p._notifyPluginsOfEnabled = false;

    TweenLite.version = "1.10.3";
    TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
    TweenLite.defaultOverwrite = "auto";
    TweenLite.ticker = _ticker;
    TweenLite.autoSleep = true;
    TweenLite.selector = window.$ || window.jQuery || function(e) { if (window.$) { TweenLite.selector = window.$; return window.$(e); } return window.document ? window.document.getElementById((e.charAt(0) === "#") ? e.substr(1) : e) : e; };

    var _internals = TweenLite._internals = {}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
        _plugins = TweenLite._plugins = {},
        _tweenLookup = TweenLite._tweenLookup = {},
        _tweenLookupNum = 0,
        _reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1},
        _overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
        _rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
        _rootTimeline = Animation._rootTimeline = new SimpleTimeline();

    _rootTimeline._startTime = _ticker.time;
    _rootFramesTimeline._startTime = _ticker.frame;
    _rootTimeline._active = _rootFramesTimeline._active = true;

    Animation._updateRoot = function() {
        _rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
        _rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
        if (!(_ticker.frame % 120)) { //dump garbage every 120 frames...
            var i, a, p;
            for (p in _tweenLookup) {
                a = _tweenLookup[p].tweens;
                i = a.length;
                while (--i > -1) {
                    if (a[i]._gc) {
                        a.splice(i, 1);
                    }
                }
                if (a.length === 0) {
                    delete _tweenLookup[p];
                }
            }
            //if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
            p = _rootTimeline._first;
            if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
                while (p && p._paused) {
                    p = p._next;
                }
                if (!p) {
                    _ticker.sleep();
                }
            }
        }
    };

    _ticker.addEventListener("tick", Animation._updateRoot);

    var _register = function(target, tween, scrub) {
            var id = target._gsTweenID, a, i;
            if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
                _tweenLookup[id] = {target:target, tweens:[]};
            }
            if (tween) {
                a = _tweenLookup[id].tweens;
                a[(i = a.length)] = tween;
                if (scrub) {
                    while (--i > -1) {
                        if (a[i] === tween) {
                            a.splice(i, 1);
                        }
                    }
                }
            }
            return _tweenLookup[id].tweens;
        },

        _applyOverwrite = function(target, tween, props, mode, siblings) {
            var i, changed, curTween, l;
            if (mode === 1 || mode >= 4) {
                l = siblings.length;
                for (i = 0; i < l; i++) {
                    if ((curTween = siblings[i]) !== tween) {
                        if (!curTween._gc) if (curTween._enabled(false, false)) {
                            changed = true;
                        }
                    } else if (mode === 5) {
                        break;
                    }
                }
                return changed;
            }
            //NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
            var startTime = tween._startTime + 0.0000000001,
                overlaps = [],
                oCount = 0,
                zeroDur = (tween._duration === 0),
                globalStart;
            i = siblings.length;
            while (--i > -1) {
                if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
                    //ignore
                } else if (curTween._timeline !== tween._timeline) {
                    globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
                    if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
                        overlaps[oCount++] = curTween;
                    }
                } else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale + 0.0000000001 > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
                    overlaps[oCount++] = curTween;
                }
            }

            i = oCount;
            while (--i > -1) {
                curTween = overlaps[i];
                if (mode === 2) if (curTween._kill(props, target)) {
                    changed = true;
                }
                if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
                    if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
                        changed = true;
                    }
                }
            }
            return changed;
        },

        _checkOverlap = function(tween, reference, zeroDur) {
            var tl = tween._timeline,
                ts = tl._timeScale,
                t = tween._startTime,
                min = 0.0000000001; //we use this to protect from rounding errors.
            while (tl._timeline) {
                t += tl._startTime;
                ts *= tl._timeScale;
                if (tl._paused) {
                    return -100;
                }
                tl = tl._timeline;
            }
            t /= ts;
            return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * min)) ? min : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + min) ? 0 : t - reference - min;
        };


//---- TweenLite instance methods -----------------------------------------------------------------------------

    p._init = function() {
        var v = this.vars,
            op = this._overwrittenProps,
            dur = this._duration,
            immediate = v.immediateRender,
            ease = v.ease,
            i, initPlugins, pt, p;
        if (v.startAt) {
            if (this._startAt) {
                this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
            }
            v.startAt.overwrite = 0;
            v.startAt.immediateRender = true;
            this._startAt = TweenLite.to(this.target, 0, v.startAt);
            if (immediate) {
                if (this._time > 0) {
                    this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
                } else if (dur !== 0) {
                    return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
                }
            }
        } else if (v.runBackwards && v.immediateRender && dur !== 0) {
            //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
            if (this._startAt) {
                this._startAt.render(-1, true);
                this._startAt = null;
            } else if (this._time === 0) {
                pt = {};
                for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
                    if (!_reservedProps[p] || p === "autoCSS") {
                        pt[p] = v[p];
                    }
                }
                pt.overwrite = 0;
                this._startAt = TweenLite.to(this.target, 0, pt);
                return;
            }
        }
        if (!ease) {
            this._ease = TweenLite.defaultEase;
        } else if (ease instanceof Ease) {
            this._ease = (v.easeParams instanceof Array) ? ease.config.apply(ease, v.easeParams) : ease;
        } else {
            this._ease = (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
        }
        this._easeType = this._ease._type;
        this._easePower = this._ease._power;
        this._firstPT = null;

        if (this._targets) {
            i = this._targets.length;
            while (--i > -1) {
                if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null)) ) {
                    initPlugins = true;
                }
            }
        } else {
            initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op);
        }

        if (initPlugins) {
            TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
        }
        if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
            this._enabled(false, false);
        }
        if (v.runBackwards) {
            pt = this._firstPT;
            while (pt) {
                pt.s += pt.c;
                pt.c = -pt.c;
                pt = pt._next;
            }
        }
        this._onUpdate = v.onUpdate;
        this._initted = true;
    };

    p._initProps = function(target, propLookup, siblings, overwrittenProps) {
        var p, i, initPlugins, plugin, a, pt, v;
        if (target == null) {
            return false;
        }
        if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
            _autoCSS(this.vars, target);
        }
        for (p in this.vars) {
            v = this.vars[p];
            if (_reservedProps[p]) {
                if (v instanceof Array) if (v.join("").indexOf("{self}") !== -1) {
                    this.vars[p] = v = this._swapSelfInParams(v, this);
                }

            } else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this)) {

                //t - target 		[object]
                //p - property 		[string]
                //s - start			[number]
                //c - change		[number]
                //f - isFunction	[boolean]
                //n - name			[string]
                //pg - isPlugin 	[boolean]
                //pr - priority		[number]
                this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:true, n:p, pg:true, pr:plugin._priority};
                i = plugin._overwriteProps.length;
                while (--i > -1) {
                    propLookup[plugin._overwriteProps[i]] = this._firstPT;
                }
                if (plugin._priority || plugin._onInitAllProps) {
                    initPlugins = true;
                }
                if (plugin._onDisable || plugin._onEnable) {
                    this._notifyPluginsOfEnabled = true;
                }

            } else {
                this._firstPT = propLookup[p] = pt = {_next:this._firstPT, t:target, p:p, f:(typeof(target[p]) === "function"), n:p, pg:false, pr:0};
                pt.s = (!pt.f) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
                pt.c = (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : (Number(v) - pt.s) || 0;
            }
            if (pt) if (pt._next) {
                pt._next._prev = pt;
            }
        }

        if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
            return this._initProps(target, propLookup, siblings, overwrittenProps);
        }
        if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
            this._kill(propLookup, target);
            return this._initProps(target, propLookup, siblings, overwrittenProps);
        }
        return initPlugins;
    };

    p.render = function(time, suppressEvents, force) {
        var prevTime = this._time,
            isComplete, callback, pt;
        if (time >= this._duration) {
            this._totalTime = this._time = this._duration;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
            if (!this._reversed) {
                isComplete = true;
                callback = "onComplete";
            }
            if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
                if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) {
                    force = true;
                    if (this._rawPrevTime > 0) {
                        callback = "onReverseComplete";
                        if (suppressEvents) {
                            time = -1; //when a callback is placed at the VERY beginning of a timeline and it repeats (or if timeline.seek(0) is called), events are normally suppressed during those behaviors (repeat or seek()) and without adjusting the _rawPrevTime back slightly, the onComplete wouldn't get called on the next render. This only applies to zero-duration tweens/callbacks of course.
                        }
                    }
                }
                this._rawPrevTime = time;
            }

        } else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
            this._totalTime = this._time = 0;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
            if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
                callback = "onReverseComplete";
                isComplete = this._reversed;
            }
            if (time < 0) {
                this._active = false;
                if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
                    if (this._rawPrevTime >= 0) {
                        force = true;
                    }
                    this._rawPrevTime = time;
                }
            } else if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
                force = true;
            }

        } else {
            this._totalTime = this._time = time;

            if (this._easeType) {
                var r = time / this._duration, type = this._easeType, pow = this._easePower;
                if (type === 1 || (type === 3 && r >= 0.5)) {
                    r = 1 - r;
                }
                if (type === 3) {
                    r *= 2;
                }
                if (pow === 1) {
                    r *= r;
                } else if (pow === 2) {
                    r *= r * r;
                } else if (pow === 3) {
                    r *= r * r * r;
                } else if (pow === 4) {
                    r *= r * r * r * r;
                }

                if (type === 1) {
                    this.ratio = 1 - r;
                } else if (type === 2) {
                    this.ratio = r;
                } else if (time / this._duration < 0.5) {
                    this.ratio = r / 2;
                } else {
                    this.ratio = 1 - (r / 2);
                }

            } else {
                this.ratio = this._ease.getRatio(time / this._duration);
            }

        }

        if (this._time === prevTime && !force) {
            return;
        } else if (!this._initted) {
            this._init();
            if (!this._initted) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly.
                return;
            }
            //_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
            if (this._time && !isComplete) {
                this.ratio = this._ease.getRatio(this._time / this._duration);
            } else if (isComplete && this._ease._calcEnd) {
                this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
            }
        }

        if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
            this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
        }

        if (prevTime === 0) {
            if (this._startAt) {
                if (time >= 0) {
                    this._startAt.render(time, suppressEvents, force);
                } else if (!callback) {
                    callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
                }
            }
            if (this.vars.onStart) if (this._time !== 0 || this._duration === 0) if (!suppressEvents) {
                this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
            }
        }

        pt = this._firstPT;
        while (pt) {
            if (pt.f) {
                pt.t[pt.p](pt.c * this.ratio + pt.s);
            } else {
                pt.t[pt.p] = pt.c * this.ratio + pt.s;
            }
            pt = pt._next;
        }

        if (this._onUpdate) {
            if (time < 0) if (this._startAt) {
                this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
            }
            if (!suppressEvents) {
                this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
            }
        }

        if (callback) if (!this._gc) { //check _gc because there's a chance that kill() could be called in an onUpdate
            if (time < 0 && this._startAt && !this._onUpdate) {
                this._startAt.render(time, suppressEvents, force);
            }
            if (isComplete) {
                if (this._timeline.autoRemoveChildren) {
                    this._enabled(false, false);
                }
                this._active = false;
            }
            if (!suppressEvents && this.vars[callback]) {
                this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
            }
        }

    };

    p._kill = function(vars, target) {
        if (vars === "all") {
            vars = null;
        }
        if (vars == null) if (target == null || target === this.target) {
            return this._enabled(false, false);
        }
        target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
        var i, overwrittenProps, p, pt, propLookup, changed, killProps, record;
        if ((target instanceof Array || _isSelector(target)) && typeof(target[0]) !== "number") {
            i = target.length;
            while (--i > -1) {
                if (this._kill(vars, target[i])) {
                    changed = true;
                }
            }
        } else {
            if (this._targets) {
                i = this._targets.length;
                while (--i > -1) {
                    if (target === this._targets[i]) {
                        propLookup = this._propLookup[i] || {};
                        this._overwrittenProps = this._overwrittenProps || [];
                        overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
                        break;
                    }
                }
            } else if (target !== this.target) {
                return false;
            } else {
                propLookup = this._propLookup;
                overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
            }

            if (propLookup) {
                killProps = vars || propLookup;
                record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (vars == null || vars._tempKill !== true)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
                for (p in killProps) {
                    if ((pt = propLookup[p])) {
                        if (pt.pg && pt.t._kill(killProps)) {
                            changed = true; //some plugins need to be notified so they can perform cleanup tasks first
                        }
                        if (!pt.pg || pt.t._overwriteProps.length === 0) {
                            if (pt._prev) {
                                pt._prev._next = pt._next;
                            } else if (pt === this._firstPT) {
                                this._firstPT = pt._next;
                            }
                            if (pt._next) {
                                pt._next._prev = pt._prev;
                            }
                            pt._next = pt._prev = null;
                        }
                        delete propLookup[p];
                    }
                    if (record) {
                        overwrittenProps[p] = 1;
                    }
                }
                if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
                    this._enabled(false, false);
                }
            }
        }
        return changed;
    };

    p.invalidate = function() {
        if (this._notifyPluginsOfEnabled) {
            TweenLite._onPluginEvent("_onDisable", this);
        }
        this._firstPT = null;
        this._overwrittenProps = null;
        this._onUpdate = null;
        this._startAt = null;
        this._initted = this._active = this._notifyPluginsOfEnabled = false;
        this._propLookup = (this._targets) ? {} : [];
        return this;
    };

    p._enabled = function(enabled, ignoreTimeline) {
        if (!_tickerActive) {
            _ticker.wake();
        }
        if (enabled && this._gc) {
            var targets = this._targets,
                i;
            if (targets) {
                i = targets.length;
                while (--i > -1) {
                    this._siblings[i] = _register(targets[i], this, true);
                }
            } else {
                this._siblings = _register(this.target, this, true);
            }
        }
        Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
        if (this._notifyPluginsOfEnabled) if (this._firstPT) {
            return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
        }
        return false;
    };


//----TweenLite static methods -----------------------------------------------------

    TweenLite.to = function(target, duration, vars) {
        return new TweenLite(target, duration, vars);
    };

    TweenLite.from = function(target, duration, vars) {
        vars.runBackwards = true;
        vars.immediateRender = (vars.immediateRender != false);
        return new TweenLite(target, duration, vars);
    };

    TweenLite.fromTo = function(target, duration, fromVars, toVars) {
        toVars.startAt = fromVars;
        toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
        return new TweenLite(target, duration, toVars);
    };

    TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
        return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, useFrames:useFrames, overwrite:0});
    };

    TweenLite.set = function(target, vars) {
        return new TweenLite(target, 0, vars);
    };

    TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, vars) {
        var a = TweenLite.getTweensOf(target),
            i = a.length;
        while (--i > -1) {
            a[i]._kill(vars, target);
        }
    };

    TweenLite.getTweensOf = function(target) {
        if (target == null) { return []; }
        target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
        var i, a, j, t;
        if ((target instanceof Array || _isSelector(target)) && typeof(target[0]) !== "number") {
            i = target.length;
            a = [];
            while (--i > -1) {
                a = a.concat(TweenLite.getTweensOf(target[i]));
            }
            i = a.length;
            //now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
            while (--i > -1) {
                t = a[i];
                j = i;
                while (--j > -1) {
                    if (t === a[j]) {
                        a.splice(i, 1);
                    }
                }
            }
        } else {
            a = _register(target).concat();
            i = a.length;
            while (--i > -1) {
                if (a[i]._gc) {
                    a.splice(i, 1);
                }
            }
        }
        return a;
    };



    /*
     * ----------------------------------------------------------------
     * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another <script> call before loading plugins which is easy to forget)
     * ----------------------------------------------------------------
     */
    var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
        this._overwriteProps = (props || "").split(",");
        this._propName = this._overwriteProps[0];
        this._priority = priority || 0;
        this._super = TweenPlugin.prototype;
    }, true);

    p = TweenPlugin.prototype;
    TweenPlugin.version = "1.10.1";
    TweenPlugin.API = 2;
    p._firstPT = null;

    p._addTween = function(target, prop, start, end, overwriteProp, round) {
        var c, pt;
        if (end != null && (c = (typeof(end) === "number" || end.charAt(1) !== "=") ? Number(end) - start : parseInt(end.charAt(0) + "1", 10) * Number(end.substr(2)))) {
            this._firstPT = pt = {_next:this._firstPT, t:target, p:prop, s:start, c:c, f:(typeof(target[prop]) === "function"), n:overwriteProp || prop, r:round};
            if (pt._next) {
                pt._next._prev = pt;
            }
            return pt;
        }
    };

    p.setRatio = function(v) {
        var pt = this._firstPT,
            min = 0.000001,
            val;
        while (pt) {
            val = pt.c * v + pt.s;
            if (pt.r) {
                val = (val + ((val > 0) ? 0.5 : -0.5)) | 0; //about 4x faster than Math.round()
            } else if (val < min) if (val > -min) { //prevents issues with converting very small numbers to strings in the browser
                val = 0;
            }
            if (pt.f) {
                pt.t[pt.p](val);
            } else {
                pt.t[pt.p] = val;
            }
            pt = pt._next;
        }
    };

    p._kill = function(lookup) {
        var a = this._overwriteProps,
            pt = this._firstPT,
            i;
        if (lookup[this._propName] != null) {
            this._overwriteProps = [];
        } else {
            i = a.length;
            while (--i > -1) {
                if (lookup[a[i]] != null) {
                    a.splice(i, 1);
                }
            }
        }
        while (pt) {
            if (lookup[pt.n] != null) {
                if (pt._next) {
                    pt._next._prev = pt._prev;
                }
                if (pt._prev) {
                    pt._prev._next = pt._next;
                    pt._prev = null;
                } else if (this._firstPT === pt) {
                    this._firstPT = pt._next;
                }
            }
            pt = pt._next;
        }
        return false;
    };

    p._roundProps = function(lookup, value) {
        var pt = this._firstPT;
        while (pt) {
            if (lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ])) { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
                pt.r = value;
            }
            pt = pt._next;
        }
    };

    TweenLite._onPluginEvent = function(type, tween) {
        var pt = tween._firstPT,
            changed, pt2, first, last, next;
        if (type === "_onInitAllProps") {
            //sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
            while (pt) {
                next = pt._next;
                pt2 = first;
                while (pt2 && pt2.pr > pt.pr) {
                    pt2 = pt2._next;
                }
                if ((pt._prev = pt2 ? pt2._prev : last)) {
                    pt._prev._next = pt;
                } else {
                    first = pt;
                }
                if ((pt._next = pt2)) {
                    pt2._prev = pt;
                } else {
                    last = pt;
                }
                pt = next;
            }
            pt = tween._firstPT = first;
        }
        while (pt) {
            if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
                changed = true;
            }
            pt = pt._next;
        }
        return changed;
    };

    TweenPlugin.activate = function(plugins) {
        var i = plugins.length;
        while (--i > -1) {
            if (plugins[i].API === TweenPlugin.API) {
                _plugins[(new plugins[i]())._propName] = plugins[i];
            }
        }
        return true;
    };

    //provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
    _gsDefine.plugin = function(config) {
        if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
        var propName = config.propName,
            priority = config.priority || 0,
            overwriteProps = config.overwriteProps,
            map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_roundProps", initAll:"_onInitAllProps"},
            Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
                function() {
                    TweenPlugin.call(this, propName, priority);
                    this._overwriteProps = overwriteProps || [];
                }, (config.global === true)),
            p = Plugin.prototype = new TweenPlugin(propName),
            prop;
        p.constructor = Plugin;
        Plugin.API = config.API;
        for (prop in map) {
            if (typeof(config[prop]) === "function") {
                p[map[prop]] = config[prop];
            }
        }
        Plugin.version = config.version;
        TweenPlugin.activate([Plugin]);
        return Plugin;
    };


    //now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
    a = window._gsQueue;
    if (a) {
        for (i = 0; i < a.length; i++) {
            a[i]();
        }
        for (p in _defLookup) {
            if (!_defLookup[p].func) {
                window.console.log("GSAP encountered missing dependency: GMCU.com.greensock." + p);
            }
        }
    }

    _tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})(window);




















//Begin CSS Plugin


/*!
 * VERSION: beta 1.10.3
 * DATE: 2013-09-02
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue || (window._gsQueue = [])).push( function() {

    "use strict";

    window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin","TweenLite"], function(TweenPlugin, TweenLite) {

        /** @constructor **/
        var CSSPlugin = function() {
                TweenPlugin.call(this, "css");
                this._overwriteProps.length = 0;
                this.setRatio = CSSPlugin.prototype.setRatio; //speed optimization (avoid prototype lookup on this "hot" method)
            },
            _hasPriority, //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
            _suffixMap, //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
            _cs, //computed style (we store this in a shared variable to conserve memory and make minification tighter
            _overwriteProps, //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
            _specialProps = {},
            p = CSSPlugin.prototype = new TweenPlugin("css");

        p.constructor = CSSPlugin;
        CSSPlugin.version = "1.10.3";
        CSSPlugin.API = 2;
        CSSPlugin.defaultTransformPerspective = 0;
        p = "px"; //we'll reuse the "p" variable to keep file size down
        CSSPlugin.suffixMap = {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p};


        var _numExp = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
            _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            _valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
        //_clrNumExp = /(?:\b(?:(?:rgb|rgba|hsl|hsla)\(.+?\))|\B#.+?\b)/, //only finds rgb(), rgba(), hsl(), hsla() and # (hexadecimal) values but NOT color names like red, blue, etc.
        //_tinyNumExp = /\b\d+?e\-\d+?\b/g, //finds super small numbers in a string like 1e-20. could be used in matrix3d() to fish out invalid numbers and replace them with 0. After performing speed tests, however, we discovered it was slightly faster to just cut the numbers at 5 decimal places with a particular algorithm.
            _NaNExp = /[^\d\-\.]/g,
            _suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
            _opacityExp = /opacity *= *([^)]*)/,
            _opacityValExp = /opacity:([^;]*)/,
            _alphaFilterExp = /alpha\(opacity *=.+?\)/i,
            _rgbhslExp = /^(rgb|hsl)/,
            _capsExp = /([A-Z])/g,
            _camelExp = /-([a-z])/gi,
            _urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
            _camelFunc = function(s, g) { return g.toUpperCase(); },
            _horizExp = /(?:Left|Right|Width)/i,
            _ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            _ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            _commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, //finds any commas that are not within parenthesis
            _DEG2RAD = Math.PI / 180,
            _RAD2DEG = 180 / Math.PI,
            _forcePT = {},
            _doc = document,
            _tempDiv = _doc.createElement("div"),
            _tempImg = _doc.createElement("img"),
            _internals = CSSPlugin._internals = {_specialProps:_specialProps}, //provides a hook to a few internal methods that we need to access from inside other plugins
            _agent = navigator.userAgent,
            _autoRound,
            _reqSafariFix, //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).

            _isSafari,
            _isFirefox, //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
            _isSafariLT6, //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
            _ieVers,
            _supportsOpacity = (function() { //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
                var i = _agent.indexOf("Android"),
                    d = _doc.createElement("div"), a;

                _isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || Number(_agent.substr(i+8, 1)) > 3));
                _isSafariLT6 = (_isSafari && (Number(_agent.substr(_agent.indexOf("Version/")+8, 1)) < 6));
                _isFirefox = (_agent.indexOf("Firefox") !== -1);

                (/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent);
                _ieVers = parseFloat( RegExp.$1 );

                d.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
                a = d.getElementsByTagName("a")[0];
                return a ? /^0.55/.test(a.style.opacity) : false;
            }()),
            _getIEOpacity = function(v) {
                return (_opacityExp.test( ((typeof(v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
            },
            _log = function(s) {//for logging messages, but in a way that won't throw errors in old versions of IE.
                if (window.console) {
                    console.log(s);
                }
            },
            _prefixCSS = "", //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
            _prefix = "", //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".

        //@private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
            _checkPropPrefix = function(p, e) {
                e = e || _tempDiv;
                var s = e.style,
                    a, i;
                if (s[p] !== undefined) {
                    return p;
                }
                p = p.charAt(0).toUpperCase() + p.substr(1);
                a = ["O","Moz","ms","Ms","Webkit"];
                i = 5;
                while (--i > -1 && s[a[i]+p] === undefined) { }
                if (i >= 0) {
                    _prefix = (i === 3) ? "ms" : a[i];
                    _prefixCSS = "-" + _prefix.toLowerCase() + "-";
                    return _prefix + p;
                }
                return null;
            },

            _getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function() {},

            /**
             * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
             * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
             *
             * @param {!Object} t Target element whose style property you want to query
             * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
             * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
             * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
             * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
             * @return {?string} The current property value
             */
                _getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
                var rv;
                if (!_supportsOpacity) if (p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
                    return _getIEOpacity(t);
                }
                if (!calc && t.style[p]) {
                    rv = t.style[p];
                } else if ((cs = cs || _getComputedStyle(t, null))) {
                    t = cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
                    rv = (t || cs.length) ? t : cs[p]; //Opera behaves VERY strangely - length is usually 0 and cs[p] is the only way to get accurate results EXCEPT when checking for -o-transform which only works with cs.getPropertyValue()!
                } else if (t.currentStyle) {
                    rv = t.currentStyle[p];
                }
                return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv;
            },

            /**
             * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
             * @param {!Object} t Target element
             * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
             * @param {!number} v Value
             * @param {string=} sfx Suffix (like "px" or "%" or "em")
             * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
             * @return {number} value in pixels
             */
                _convertToPixels = function(t, p, v, sfx, recurse) {
                if (sfx === "px" || !sfx) { return v; }
                if (sfx === "auto" || !v) { return 0; }
                var horiz = _horizExp.test(p),
                    node = t,
                    style = _tempDiv.style,
                    neg = (v < 0),
                    pix;
                if (neg) {
                    v = -v;
                }
                if (sfx === "%" && p.indexOf("border") !== -1) {
                    pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
                } else {
                    style.cssText = "border-style:solid;border-width:0;position:absolute;line-height:0;";
                    if (sfx === "%" || !node.appendChild) {
                        node = t.parentNode || _doc.body;
                        style[(horiz ? "width" : "height")] = v + sfx;
                    } else {
                        style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
                    }
                    node.appendChild(_tempDiv);
                    pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
                    node.removeChild(_tempDiv);
                    if (pix === 0 && !recurse) {
                        pix = _convertToPixels(t, p, v, sfx, true);
                    }
                }
                return neg ? -pix : pix;
            },
            _calculateOffset = function(t, p, cs) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
                if (_getStyle(t, "position", cs) !== "absolute") { return 0; }
                var dim = ((p === "left") ? "Left" : "Top"),
                    v = _getStyle(t, "margin" + dim, cs);
                return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
            },

        //@private returns at object containing ALL of the style properties in camelCase and their associated values.
            _getAllStyles = function(t, cs) {
                var s = {},
                    i, tr;
                if ((cs = cs || _getComputedStyle(t, null))) {
                    if ((i = cs.length)) {
                        while (--i > -1) {
                            s[cs[i].replace(_camelExp, _camelFunc)] = cs.getPropertyValue(cs[i]);
                        }
                    } else { //Opera behaves differently - cs.length is always 0, so we must do a for...in loop.
                        for (i in cs) {
                            s[i] = cs[i];
                        }
                    }
                } else if ((cs = t.currentStyle || t.style)) {
                    for (i in cs) {
                        s[i.replace(_camelExp, _camelFunc)] = cs[i];
                    }
                }
                if (!_supportsOpacity) {
                    s.opacity = _getIEOpacity(t);
                }
                tr = _getTransform(t, cs, false);
                s.rotation = tr.rotation * _RAD2DEG;
                s.skewX = tr.skewX * _RAD2DEG;
                s.scaleX = tr.scaleX;
                s.scaleY = tr.scaleY;
                s.x = tr.x;
                s.y = tr.y;
                if (_supports3D) {
                    s.z = tr.z;
                    s.rotationX = tr.rotationX * _RAD2DEG;
                    s.rotationY = tr.rotationY * _RAD2DEG;
                    s.scaleZ = tr.scaleZ;
                }
                if (s.filters) {
                    delete s.filters;
                }
                return s;
            },

        //@private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
            _cssDif = function(t, s1, s2, vars, forceLookup) {
                var difs = {},
                    style = t.style,
                    val, p, mpt;
                for (p in s2) {
                    if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p])) if (p.indexOf("Origin") === -1) if (typeof(val) === "number" || typeof(val) === "string") {
                        difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.
                        if (style[p] !== undefined) { //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
                            mpt = new MiniPropTween(style, p, style[p], mpt);
                        }
                    }
                }
                if (vars) {
                    for (p in vars) { //copy properties (except className)
                        if (p !== "className") {
                            difs[p] = vars[p];
                        }
                    }
                }
                return {difs:difs, firstMPT:mpt};
            },
            _dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
            _margins = ["marginLeft","marginRight","marginTop","marginBottom"],

            /**
             * @private Gets the width or height of an element
             * @param {!Object} t Target element
             * @param {!string} p Property name ("width" or "height")
             * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
             * @return {number} Dimension (in pixels)
             */
                _getDimension = function(t, p, cs) {
                var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
                    a = _dimensions[p],
                    i = a.length;
                cs = cs || _getComputedStyle(t, null);
                while (--i > -1) {
                    v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
                    v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
                }
                return v;
            },

        //@private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
            _parsePosition = function(v, recObj) {
                if (v == null || v === "" || v === "auto" || v === "auto auto") { //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
                    v = "0 0";
                }
                var a = v.split(" "),
                    x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
                    y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1];
                if (y == null) {
                    y = "0";
                } else if (y === "center") {
                    y = "50%";
                }
                if (x === "center" || (isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1)) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
                    x = "50%";
                }
                if (recObj) {
                    recObj.oxp = (x.indexOf("%") !== -1);
                    recObj.oyp = (y.indexOf("%") !== -1);
                    recObj.oxr = (x.charAt(1) === "=");
                    recObj.oyr = (y.charAt(1) === "=");
                    recObj.ox = parseFloat(x.replace(_NaNExp, ""));
                    recObj.oy = parseFloat(y.replace(_NaNExp, ""));
                }
                return x + " " + y + ((a.length > 2) ? " " + a[2] : "");
            },

            /**
             * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
             * @param {(number|string)} e End value which is typically a string, but could be a number
             * @param {(number|string)} b Beginning value which is typically a string but could be a number
             * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
             */
                _parseChange = function(e, b) {
                return (typeof(e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(b);
            },

            /**
             * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
             * @param {Object} v Value to be parsed
             * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
             * @return {number} Parsed value
             */
                _parseVal = function(v, d) {
                return (v == null) ? d : (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) + d : parseFloat(v);
            },

            /**
             * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
             * @param {Object} v Value to be parsed
             * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
             * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
             * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
             * @return {number} parsed angle in radians
             */
                _parseAngle = function(v, d, p, directionalEnd) {
                var min = 0.000001,
                    cap, split, dif, result;
                if (v == null) {
                    result = d;
                } else if (typeof(v) === "number") {
                    result = v * _DEG2RAD;
                } else {
                    cap = Math.PI * 2;
                    split = v.split("_");
                    dif = Number(split[0].replace(_NaNExp, "")) * ((v.indexOf("rad") === -1) ? _DEG2RAD : 1) - ((v.charAt(1) === "=") ? 0 : d);
                    if (split.length) {
                        if (directionalEnd) {
                            directionalEnd[p] = d + dif;
                        }
                        if (v.indexOf("short") !== -1) {
                            dif = dif % cap;
                            if (dif !== dif % (cap / 2)) {
                                dif = (dif < 0) ? dif + cap : dif - cap;
                            }
                        }
                        if (v.indexOf("_cw") !== -1 && dif < 0) {
                            dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
                        } else if (v.indexOf("ccw") !== -1 && dif > 0) {
                            dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
                        }
                    }
                    result = d + dif;
                }
                if (result < min && result > -min) {
                    result = 0;
                }
                return result;
            },

            _colorLookup = {aqua:[0,255,255],
                lime:[0,255,0],
                silver:[192,192,192],
                black:[0,0,0],
                maroon:[128,0,0],
                teal:[0,128,128],
                blue:[0,0,255],
                navy:[0,0,128],
                white:[255,255,255],
                fuchsia:[255,0,255],
                olive:[128,128,0],
                yellow:[255,255,0],
                orange:[255,165,0],
                gray:[128,128,128],
                purple:[128,0,128],
                green:[0,128,0],
                red:[255,0,0],
                pink:[255,192,203],
                cyan:[0,255,255],
                transparent:[255,255,255,0]},

            _hue = function(h, m1, m2) {
                h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
                return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
            },

            /**
             * @private Parses a color (like #9F0, #FF9900, or rgb(255,51,153)) into an array with 3 elements for red, green, and blue. Also handles rgba() values (splits into array of 4 elements of course)
             * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
             * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order.
             */
                _parseColor = function(v) {
                var c1, c2, c3, h, s, l;
                if (!v || v === "") {
                    return _colorLookup.black;
                }
                if (typeof(v) === "number") {
                    return [v >> 16, (v >> 8) & 255, v & 255];
                }
                if (v.charAt(v.length - 1) === ",") { //sometimes a trailing commma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
                    v = v.substr(0, v.length - 1);
                }
                if (_colorLookup[v]) {
                    return _colorLookup[v];
                }
                if (v.charAt(0) === "#") {
                    if (v.length === 4) { //for shorthand like #9F0
                        c1 = v.charAt(1),
                            c2 = v.charAt(2),
                            c3 = v.charAt(3);
                        v = "#" + c1 + c1 + c2 + c2 + c3 + c3;
                    }
                    v = parseInt(v.substr(1), 16);
                    return [v >> 16, (v >> 8) & 255, v & 255];
                }
                if (v.substr(0, 3) === "hsl") {
                    v = v.match(_numExp);
                    h = (Number(v[0]) % 360) / 360;
                    s = Number(v[1]) / 100;
                    l = Number(v[2]) / 100;
                    c2 = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
                    c1 = l * 2 - c2;
                    if (v.length > 3) {
                        v[3] = Number(v[3]);
                    }
                    v[0] = _hue(h + 1 / 3, c1, c2);
                    v[1] = _hue(h, c1, c2);
                    v[2] = _hue(h - 1 / 3, c1, c2);
                    return v;
                }
                v = v.match(_numExp) || _colorLookup.transparent;
                v[0] = Number(v[0]);
                v[1] = Number(v[1]);
                v[2] = Number(v[2]);
                if (v.length > 3) {
                    v[3] = Number(v[3]);
                }
                return v;
            },
            _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

        for (p in _colorLookup) {
            _colorExp += "|" + p + "\\b";
        }
        _colorExp = new RegExp(_colorExp+")", "gi");

        /**
         * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
         * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
         * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
         * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
         * @return {Function} formatter function
         */
        var _getFormatter = function(dflt, clr, collapsible, multi) {
                if (dflt == null) {
                    return function(v) {return v;};
                }
                var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
                    dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
                    pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
                    sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
                    delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
                    numVals = dVals.length,
                    dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
                    formatter;
                if (!numVals) {
                    return function(v) {return v;};
                }
                if (clr) {
                    formatter = function(v) {
                        var color, vals, i, a;
                        if (typeof(v) === "number") {
                            v += dSfx;
                        } else if (multi && _commasOutsideParenExp.test(v)) {
                            a = v.replace(_commasOutsideParenExp, "|").split("|");
                            for (i = 0; i < a.length; i++) {
                                a[i] = formatter(a[i]);
                            }
                            return a.join(",");
                        }
                        color = (v.match(_colorExp) || [dColor])[0];
                        vals = v.split(color).join("").match(_valuesExp) || [];
                        i = vals.length;
                        if (numVals > i--) {
                            while (++i < numVals) {
                                vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
                            }
                        }
                        return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
                    };
                    return formatter;

                }
                formatter = function(v) {
                    var vals, a, i;
                    if (typeof(v) === "number") {
                        v += dSfx;
                    } else if (multi && _commasOutsideParenExp.test(v)) {
                        a = v.replace(_commasOutsideParenExp, "|").split("|");
                        for (i = 0; i < a.length; i++) {
                            a[i] = formatter(a[i]);
                        }
                        return a.join(",");
                    }
                    vals = v.match(_valuesExp) || [];
                    i = vals.length;
                    if (numVals > i--) {
                        while (++i < numVals) {
                            vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
                        }
                    }
                    return pfx + vals.join(delim) + sfx;
                };
                return formatter;
            },

            /**
             * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
             * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
             * @return {Function} a formatter function
             */
                _getEdgeParser = function(props) {
                props = props.split(",");
                return function(t, e, p, cssp, pt, plugin, vars) {
                    var a = (e + "").split(" "),
                        i;
                    vars = {};
                    for (i = 0; i < 4; i++) {
                        vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)];
                    }
                    return cssp.parse(t, vars, pt, plugin);
                };
            },

        //@private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens  which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
            _setPluginRatio = _internals._setPluginRatio = function(v) {
                this.plugin.setRatio(v);
                var d = this.data,
                    proxy = d.proxy,
                    mpt = d.firstMPT,
                    min = 0.000001,
                    val, pt, i, str;
                while (mpt) {
                    val = proxy[mpt.v];
                    if (mpt.r) {
                        val = (val > 0) ? (val + 0.5) | 0 : (val - 0.5) | 0;
                    } else if (val < min && val > -min) {
                        val = 0;
                    }
                    mpt.t[mpt.p] = val;
                    mpt = mpt._next;
                }
                if (d.autoRotate) {
                    d.autoRotate.rotation = proxy.rotation;
                }
                //at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method.
                if (v === 1) {
                    mpt = d.firstMPT;
                    while (mpt) {
                        pt = mpt.t;
                        if (!pt.type) {
                            pt.e = pt.s + pt.xs0;
                        } else if (pt.type === 1) {
                            str = pt.xs0 + pt.s + pt.xs1;
                            for (i = 1; i < pt.l; i++) {
                                str += pt["xn"+i] + pt["xs"+(i+1)];
                            }
                            pt.e = str;
                        }
                        mpt = mpt._next;
                    }
                }
            },

            /**
             * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
             * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
             * @param {!string} p property name
             * @param {(number|string|object)} v value
             * @param {MiniPropTween=} next next MiniPropTween in the linked list
             * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
             */
                MiniPropTween = function(t, p, v, next, r) {
                this.t = t;
                this.p = p;
                this.v = v;
                this.r = r;
                if (next) {
                    next._prev = this;
                    this._next = next;
                }
            },

            /**
             * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
             * This method returns an object that has the following properties:
             *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
             *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
             *  - firstMPT: the first MiniPropTween in the linked list
             *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
             * @param {!Object} t target object to be tweened
             * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
             * @param {!CSSPlugin} cssp The CSSPlugin instance
             * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
             * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
             * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
             * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
             */
                _parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
                var bpt = pt,
                    start = {},
                    end = {},
                    transform = cssp._transform,
                    oldForce = _forcePT,
                    i, p, xp, mpt, firstPT;
                cssp._transform = null;
                _forcePT = vars;
                pt = firstPT = cssp.parse(t, vars, pt, plugin);
                _forcePT = oldForce;
                //break off from the linked list so the new ones are isolated.
                if (shallow) {
                    cssp._transform = transform;
                    if (bpt) {
                        bpt._prev = null;
                        if (bpt._prev) {
                            bpt._prev._next = null;
                        }
                    }
                }
                while (pt && pt !== bpt) {
                    if (pt.type <= 1) {
                        p = pt.p;
                        end[p] = pt.s + pt.c;
                        start[p] = pt.s;
                        if (!shallow) {
                            mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
                            pt.c = 0;
                        }
                        if (pt.type === 1) {
                            i = pt.l;
                            while (--i > 0) {
                                xp = "xn" + i;
                                p = pt.p + "_" + xp;
                                end[p] = pt.data[xp];
                                start[p] = pt[xp];
                                if (!shallow) {
                                    mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
                                }
                            }
                        }
                    }
                    pt = pt._next;
                }
                return {proxy:start, end:end, firstMPT:mpt, pt:firstPT};
            },



            /**
             * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
             * CSSPropTweens have the following optional properties as well (not defined through the constructor):
             *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
             *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
             *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
             *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
             *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
             * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
             * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
             * @param {number} s Starting numeric value
             * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
             * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
             * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
             * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
             * @param {boolean=} r If true, the value(s) should be rounded
             * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
             * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
             * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
             */
                CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
                this.t = t; //target
                this.p = p; //property
                this.s = s; //starting value
                this.c = c; //change value
                this.n = n || p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)
                if (!(t instanceof CSSPropTween)) {
                    _overwriteProps.push(this.n);
                }
                this.r = r; //round (boolean)
                this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work
                if (pr) {
                    this.pr = pr;
                    _hasPriority = true;
                }
                this.b = (b === undefined) ? s : b;
                this.e = (e === undefined) ? s + c : e;
                if (next) {
                    this._next = next;
                    next._prev = this;
                }
            },

            /**
             * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
             * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
             * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
             * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
             *
             * @param {!Object} t Target whose property will be tweened
             * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
             * @param {string} b Beginning value
             * @param {string} e Ending value
             * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
             * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
             * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
             * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
             * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
             * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
             * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
             */
                _parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
                //DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
                b = b || dflt || "";
                pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, false, pr, b, e);
                e += ""; //ensures it's a string
                var ba = b.split(", ").join(",").split(" "), //beginning array
                    ea = e.split(", ").join(",").split(" "), //ending array
                    l = ba.length,
                    autoRound = (_autoRound !== false),
                    i, xi, ni, bv, ev, bnums, enums, bn, rgba, temp, cv, str;
                if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
                    ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
                    ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
                    l = ba.length;
                }
                if (l !== ea.length) {
                    //DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
                    ba = (dflt || "").split(" ");
                    l = ba.length;
                }
                pt.plugin = plugin;
                pt.setRatio = setRatio;
                for (i = 0; i < l; i++) {
                    bv = ba[i];
                    ev = ea[i];
                    bn = parseFloat(bv);

                    //if the value begins with a number (most common). It's fine if it has a suffix like px
                    if (bn || bn === 0) {
                        pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1), true);

                        //if the value is a color
                    } else if (clrs && (bv.charAt(0) === "#" || _colorLookup[bv] || _rgbhslExp.test(bv))) {
                        str = ev.charAt(ev.length - 1) === "," ? ")," : ")"; //if there's a comma at the end, retain it.
                        bv = _parseColor(bv);
                        ev = _parseColor(ev);
                        rgba = (bv.length + ev.length > 6);
                        if (rgba && !_supportsOpacity && ev[3] === 0) { //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
                            pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
                            pt.e = pt.e.split(ea[i]).join("transparent");
                        } else {
                            if (!_supportsOpacity) { //old versions of IE don't support rgba().
                                rgba = false;
                            }
                            pt.appendXtra((rgba ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", true, true)
                                .appendXtra("", bv[1], ev[1] - bv[1], ",", true)
                                .appendXtra("", bv[2], ev[2] - bv[2], (rgba ? "," : str), true);
                            if (rgba) {
                                bv = (bv.length < 4) ? 1 : bv[3];
                                pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, false);
                            }
                        }

                    } else {
                        bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array

                        //if no number is found, treat it as a non-tweening value and just append the string to the current xs.
                        if (!bnums) {
                            pt["xs" + pt.l] += pt.l ? " " + bv : bv;

                            //loop through all the numbers that are found and construct the extra values on the pt.
                        } else {
                            enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5
                            if (!enums || enums.length !== bnums.length) {
                                //DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
                                return pt;
                            }
                            ni = 0;
                            for (xi = 0; xi < bnums.length; xi++) {
                                cv = bnums[xi];
                                temp = bv.indexOf(cv, ni);
                                pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px"), (xi === 0));
                                ni = temp + cv.length;
                            }
                            pt["xs" + pt.l] += bv.substr(ni);
                        }
                    }
                }
                //if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.
                if (e.indexOf("=") !== -1) if (pt.data) {
                    str = pt.xs0 + pt.data.s;
                    for (i = 1; i < pt.l; i++) {
                        str += pt["xs" + i] + pt.data["xn" + i];
                    }
                    pt.e = str + pt["xs" + i];
                }
                if (!pt.l) {
                    pt.type = -1;
                    pt.xs0 = pt.e;
                }
                return pt.xfirst || pt;
            },
            i = 9;


        p = CSSPropTween.prototype;
        p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.
        while (--i > 0) {
            p["xn" + i] = 0;
            p["xs" + i] = "";
        }
        p.xs0 = "";
        p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;


        /**
         * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
         * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
         * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
         * @param {string=} pfx Prefix (if any)
         * @param {!number} s Starting value
         * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
         * @param {string=} sfx Suffix (if any)
         * @param {boolean=} r Round (if true).
         * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
         * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
         */
        p.appendXtra = function(pfx, s, c, sfx, r, pad) {
            var pt = this,
                l = pt.l;
            pt["xs" + l] += (pad && l) ? " " + pfx : pfx || "";
            if (!c) if (l !== 0 && !pt.plugin) { //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
                pt["xs" + l] += s + (sfx || "");
                return pt;
            }
            pt.l++;
            pt.type = pt.setRatio ? 2 : 1;
            pt["xs" + pt.l] = sfx || "";
            if (l > 0) {
                pt.data["xn" + l] = s + c;
                pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)
                pt["xn" + l] = s;
                if (!pt.plugin) {
                    pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
                    pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
                }
                return pt;
            }
            pt.data = {s:s + c};
            pt.rxp = {};
            pt.s = s;
            pt.c = c;
            pt.r = r;
            return pt;
        };

        /**
         * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
         * @param {!string} p Property name (like "boxShadow" or "throwProps")
         * @param {Object=} options An object containing any of the following configuration options:
         *                      - defaultValue: the default value
         *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
         *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
         *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
         *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
         *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
         *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
         *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
         *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
         */
        var SpecialProp = function(p, options) {
                options = options || {};
                this.p = options.prefix ? _checkPropPrefix(p) || p : p;
                _specialProps[p] = _specialProps[this.p] = this;
                this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
                if (options.parser) {
                    this.parse = options.parser;
                }
                this.clrs = options.color;
                this.multi = options.multi;
                this.keyword = options.keyword;
                this.dflt = options.defaultValue;
                this.pr = options.priority || 0;
            },

        //shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
            _registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
                if (typeof(options) !== "object") {
                    options = {parser:defaults}; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
                }
                var a = p.split(","),
                    d = options.defaultValue,
                    i, temp;
                defaults = defaults || [d];
                for (i = 0; i < a.length; i++) {
                    options.prefix = (i === 0 && options.prefix);
                    options.defaultValue = defaults[i] || d;
                    temp = new SpecialProp(a[i], options);
                }
            },

        //creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
            _registerPluginProp = function(p) {
                if (!_specialProps[p]) {
                    var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
                    _registerComplexSpecialProp(p, {parser:function(t, e, p, cssp, pt, plugin, vars) {
                        var pluginClass = (window.GreenSockGlobals || window).GMCU.com.greensock.plugins[pluginName];
                        if (!pluginClass) {
                            _log("Error: " + pluginName + " js file not loaded.");
                            return pt;
                        }
                        pluginClass._cssRegister();
                        return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
                    }});
                }
            };


        p = SpecialProp.prototype;

        /**
         * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
         * @param {!Object} t target element
         * @param {(string|number|object)} b beginning value
         * @param {(string|number|object)} e ending (destination) value
         * @param {CSSPropTween=} pt next CSSPropTween in the linked list
         * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
         * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
         * @return {CSSPropTween=} First CSSPropTween in the linked list
         */
        p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
            var kwd = this.keyword,
                i, ba, ea, l, bi, ei;
            //if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)
            if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
                ba = b.replace(_commasOutsideParenExp, "|").split("|");
                ea = e.replace(_commasOutsideParenExp, "|").split("|");
            } else if (kwd) {
                ba = [b];
                ea = [e];
            }
            if (ea) {
                l = (ea.length > ba.length) ? ea.length : ba.length;
                for (i = 0; i < l; i++) {
                    b = ba[i] = ba[i] || this.dflt;
                    e = ea[i] = ea[i] || this.dflt;
                    if (kwd) {
                        bi = b.indexOf(kwd);
                        ei = e.indexOf(kwd);
                        if (bi !== ei) {
                            e = (ei === -1) ? ea : ba;
                            e[i] += " " + kwd;
                        }
                    }
                }
                b = ba.join(", ");
                e = ea.join(", ");
            }
            return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
        };

        /**
         * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
         * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
         * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
         * @param {!Object} t Target object whose property is being tweened
         * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
         * @param {!string} p Property name
         * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
         * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
         * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
         * @param {Object=} vars Original vars object that contains the data for parsing.
         * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
         */
        p.parse = function(t, e, p, cssp, pt, plugin, vars) {
            return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
        };

        /**
         * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
         *  1) Target object whose property should be tweened (typically a DOM element)
         *  2) The end/destination value (could be a string, number, object, or whatever you want)
         *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
         *
         * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
         *
         * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
		 *      var start = target.style.width;
		 *      return function(ratio) {
		 *              target.style.width = (start + value * ratio) + "px";
		 *              console.log("set width to " + target.style.width);
		 *          }
		 * }, 0);
         *
         * Then, when I do this tween, it will trigger my special property:
         *
         * TweenLite.to(element, 1, {css:{myCustomProp:100}});
         *
         * In the example, of course, we're just changing the width, but you can do anything you want.
         *
         * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
         * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
         * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
         */
        CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
            _registerComplexSpecialProp(name, {parser:function(t, e, p, cssp, pt, plugin, vars) {
                var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
                rv.plugin = plugin;
                rv.setRatio = onInitTween(t, e, cssp._tween, p);
                return rv;
            }, priority:priority});
        };








        //transform-related methods and properties
        var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective").split(","),
            _transformProp = _checkPropPrefix("transform"), //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
            _transformPropCSS = _prefixCSS + "transform",
            _transformOriginProp = _checkPropPrefix("transformOrigin"),
            _supports3D = (_checkPropPrefix("perspective") !== null),

            /**
             * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
             * @param {!Object} t target element
             * @param {Object=} cs computed style object (optional)
             * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
             * @param {boolean=} parse if true, we'll ignore any _gsTransform values that already exist on the element, and force a reparsing of the css (calculated style)
             * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
             */
                _getTransform = function(t, cs, rec, parse) {
                if (t._gsTransform && rec && !parse) {
                    return t._gsTransform; //if the element already has a _gsTransform, use that. Note: some browsers don't accurately return the calculated style for the transform (particularly for SVG), so it's almost always safest to just use the values we've already applied rather than re-parsing things.
                }
                var tm = rec ? t._gsTransform || {skewY:0} : {skewY:0},
                    invX = (tm.scaleX < 0), //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
                    min = 0.00002,
                    rnd = 100000,
                    minPI = -Math.PI + 0.0001,
                    maxPI = Math.PI - 0.0001,
                    zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin  || 0 : 0,
                    s, m, i, n, dec, scaleX, scaleY, rotation, skewX, difX, difY, difR, difS;
                if (_transformProp) {
                    s = _getStyle(t, _transformPropCSS, cs, true);
                } else if (t.currentStyle) {
                    //for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
                    s = t.currentStyle.filter.match(_ieGetMatrixExp);
                    s = (s && s.length === 4) ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",") : "";
                }
                //split the matrix values out into an array (m for matrix)
                m = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [];
                i = m.length;
                while (--i > -1) {
                    n = Number(m[i]);
                    m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
                }
                if (m.length === 16) {

                    //we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
                    var a13 = m[8], a23 = m[9], a33 = m[10],
                        a14 = m[12], a24 = m[13], a34 = m[14];

                    //we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari
                    if (tm.zOrigin) {
                        a34 = -tm.zOrigin;
                        a14 = a13*a34-m[12];
                        a24 = a23*a34-m[13];
                        a34 = a33*a34+tm.zOrigin-m[14];
                    }

                    //only parse from the matrix if we MUST because not only is it usually unnecessary due to the fact that we store the values in the _gsTransform object, but also because it's impossible to accurately interpret rotationX, rotationY, rotationZ, scaleX, and scaleY if all are applied, so it's much better to rely on what we store. However, we must parse the first time that an object is tweened. We also assume that if the position has changed, the user must have done some styling changes outside of CSSPlugin, thus we force a parse in that scenario.
                    if (!rec || parse || tm.rotationX == null) {
                        var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3],
                            a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7],
                            a43 = m[11],
                            angle = tm.rotationX = Math.atan2(a32, a33),
                            xFlip = (angle < minPI || angle > maxPI),
                            t1, t2, t3, cos, sin, yFlip, zFlip;
                        //rotationX
                        if (angle) {
                            cos = Math.cos(-angle);
                            sin = Math.sin(-angle);
                            t1 = a12*cos+a13*sin;
                            t2 = a22*cos+a23*sin;
                            t3 = a32*cos+a33*sin;
                            a13 = a12*-sin+a13*cos;
                            a23 = a22*-sin+a23*cos;
                            a33 = a32*-sin+a33*cos;
                            a43 = a42*-sin+a43*cos;
                            a12 = t1;
                            a22 = t2;
                            a32 = t3;
                        }
                        //rotationY
                        angle = tm.rotationY = Math.atan2(a13, a11);
                        if (angle) {
                            yFlip = (angle < minPI || angle > maxPI);
                            cos = Math.cos(-angle);
                            sin = Math.sin(-angle);
                            t1 = a11*cos-a13*sin;
                            t2 = a21*cos-a23*sin;
                            t3 = a31*cos-a33*sin;
                            a23 = a21*sin+a23*cos;
                            a33 = a31*sin+a33*cos;
                            a43 = a41*sin+a43*cos;
                            a11 = t1;
                            a21 = t2;
                            a31 = t3;
                        }
                        //rotationZ
                        angle = tm.rotation = Math.atan2(a21, a22);
                        if (angle) {
                            zFlip = (angle < minPI || angle > maxPI);
                            cos = Math.cos(-angle);
                            sin = Math.sin(-angle);
                            a11 = a11*cos+a12*sin;
                            t2 = a21*cos+a22*sin;
                            a22 = a21*-sin+a22*cos;
                            a32 = a31*-sin+a32*cos;
                            a21 = t2;
                        }

                        if (zFlip && xFlip) {
                            tm.rotation = tm.rotationX = 0;
                        } else if (zFlip && yFlip) {
                            tm.rotation = tm.rotationY = 0;
                        } else if (yFlip && xFlip) {
                            tm.rotationY = tm.rotationX = 0;
                        }

                        tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21) * rnd + 0.5) | 0) / rnd;
                        tm.scaleY = ((Math.sqrt(a22 * a22 + a23 * a23) * rnd + 0.5) | 0) / rnd;
                        tm.scaleZ = ((Math.sqrt(a32 * a32 + a33 * a33) * rnd + 0.5) | 0) / rnd;
                        tm.skewX = 0;
                        tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
                        tm.x = a14;
                        tm.y = a24;
                        tm.z = a34;
                    }

                } else if ((!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY)) && !(tm.x !== undefined && _getStyle(t, "display", cs) === "none")) { //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
                    var k = (m.length >= 6),
                        a = k ? m[0] : 1,
                        b = m[1] || 0,
                        c = m[2] || 0,
                        d = k ? m[3] : 1;
                    tm.x = m[4] || 0;
                    tm.y = m[5] || 0;
                    scaleX = Math.sqrt(a * a + b * b);
                    scaleY = Math.sqrt(d * d + c * c);
                    rotation = (a || b) ? Math.atan2(b, a) : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
                    skewX = (c || d) ? Math.atan2(c, d) + rotation : tm.skewX || 0;
                    difX = scaleX - Math.abs(tm.scaleX || 0);
                    difY = scaleY - Math.abs(tm.scaleY || 0);
                    if (Math.abs(skewX) > Math.PI / 2 && Math.abs(skewX) < Math.PI * 1.5) {
                        if (invX) {
                            scaleX *= -1;
                            skewX += (rotation <= 0) ? Math.PI : -Math.PI;
                            rotation += (rotation <= 0) ? Math.PI : -Math.PI;
                        } else {
                            scaleY *= -1;
                            skewX += (skewX <= 0) ? Math.PI : -Math.PI;
                        }
                    }
                    difR = (rotation - tm.rotation) % Math.PI; //note: matching ranges would be very small (+/-0.0001) or very close to Math.PI (+/-3.1415).
                    difS = (skewX - tm.skewX) % Math.PI;
                    //if there's already a recorded _gsTransform in place for the target, we should leave those values in place unless we know things changed for sure (beyond a super small amount). This gets around ambiguous interpretations, like if scaleX and scaleY are both -1, the matrix would be the same as if the rotation was 180 with normal scaleX/scaleY. If the user tweened to particular values, those must be prioritized to ensure animation is consistent.
                    if (tm.skewX === undefined || difX > min || difX < -min || difY > min || difY < -min || (difR > minPI && difR < maxPI && (difR * rnd) | 0 !== 0) || (difS > minPI && difS < maxPI && (difS * rnd) | 0 !== 0)) {
                        tm.scaleX = scaleX;
                        tm.scaleY = scaleY;
                        tm.rotation = rotation;
                        tm.skewX = skewX;
                    }
                    if (_supports3D) {
                        tm.rotationX = tm.rotationY = tm.z = 0;
                        tm.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
                        tm.scaleZ = 1;
                    }
                }
                tm.zOrigin = zOrigin;

                //some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.
                for (i in tm) {
                    if (tm[i] < min) if (tm[i] > -min) {
                        tm[i] = 0;
                    }
                }
                //DEBUG: _log("parsed rotation: "+(tm.rotationX*_RAD2DEG)+", "+(tm.rotationY*_RAD2DEG)+", "+(tm.rotation*_RAD2DEG)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective);
                if (rec) {
                    t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
                }
                return tm;
            },
        //for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
            _setIETransformRatio = function(v) {
                var t = this.data, //refers to the element's _gsTransform object
                    ang = -t.rotation,
                    skew = ang + t.skewX,
                    rnd = 100000,
                    a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
                    b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
                    c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
                    d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
                    style = this.t.style,
                    cs = this.t.currentStyle,
                    filters, val;
                if (!cs) {
                    return;
                }
                val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
                b = -c;
                c = -val;
                filters = cs.filter;
                style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
                var w = this.t.offsetWidth,
                    h = this.t.offsetHeight,
                    clip = (cs.position !== "absolute"),
                    m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
                    ox = t.x,
                    oy = t.y,
                    dx, dy;

                //if transformOrigin is being used, adjust the offset x and y
                if (t.ox != null) {
                    dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
                    dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
                    ox += dx - (dx * a + dy * b);
                    oy += dy - (dx * c + dy * d);
                }

                if (!clip) {
                    m += ", sizingMethod='auto expand')";
                } else {
                    dx = (w / 2);
                    dy = (h / 2);
                    //translate to ensure that transformations occur around the correct origin (default is center).
                    m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
                }
                if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
                    style.filter = filters.replace(_ieSetMatrixExp, m);
                } else {
                    style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
                }

                //at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
                if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(" && filters.indexOf("Alpha")) === -1) {
                    style.removeAttribute("filter");
                }

                //we must set the margins AFTER applying the filter in order to avoid some bugs in IE8 that could (in rare scenarios) cause them to be ignored intermittently (vibration).
                if (!clip) {
                    var mult = (_ieVers < 8) ? 1 : -1, //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
                        marg, prop, dif;
                    dx = t.ieOffsetX || 0;
                    dy = t.ieOffsetY || 0;
                    t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
                    t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
                    for (i = 0; i < 4; i++) {
                        prop = _margins[i];
                        marg = cs[prop];
                        //we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
                        val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
                        if (val !== t[prop]) {
                            dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
                        } else {
                            dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY;
                        }
                        style[prop] = (t[prop] = Math.round( val - dif * ((i === 0 || i === 2) ? 1 : mult) )) + "px";
                    }
                }
            },

            _set3DTransformRatio = function(v) {
                var t = this.data, //refers to the element's _gsTransform object
                    style = this.t.style,
                    angle = t.rotation,
                    sx = t.scaleX,
                    sy = t.scaleY,
                    sz = t.scaleZ,
                    perspective = t.perspective,
                    a11, a12, a13, a14,	a21, a22, a23, a24, a31, a32, a33, a34,	a41, a42, a43,
                    zOrigin, rnd, cos, sin, t1, t2, t3, t4, ffProp, n, sfx;
                if (_isFirefox) { //Firefox has a bug that causes 3D elements to randomly disappear during animation unless a repaint is forced. One way to do this is change "top" or "bottom" by 0.05 which is imperceptible, so we go back and forth. Another way is to change the display to "none", read the clientTop, and then revert the display but that is much slower.
                    ffProp = style.top ? "top" : style.bottom ? "bottom" : parseFloat(_getStyle(this.t, "top", null, false)) ? "bottom" : "top";
                    t1 = _getStyle(this.t, ffProp, null, false);
                    n = parseFloat(t1) || 0;
                    sfx = t1.substr((n + "").length) || "px";
                    t._ffFix = !t._ffFix;
                    style[ffProp] = (t._ffFix ? n + 0.05 : n - 0.05) + sfx;
                }
                if (angle || t.skewX) {
                    cos = Math.cos(angle);
                    sin = Math.sin(angle);
                    a11 = cos;
                    a21 = sin;
                    if (t.skewX) {
                        angle -= t.skewX;
                        cos = Math.cos(angle);
                        sin = Math.sin(angle);
                    }
                    a12 = -sin;
                    a22 = cos;
                } else if (!t.rotationY && !t.rotationX && sz === 1 && !perspective) { //if we're only translating and/or 2D scaling, this is faster...
                    style[_transformProp] = "translate3d(" + t.x + "px," + t.y + "px," + t.z +"px)" + ((sx !== 1 || sy !== 1) ? " scale(" + sx + "," + sy + ")" : "");
                    return;
                } else {
                    a11 = a22 = 1;
                    a12 = a21 = 0;
                }
                a33 = 1;
                a13 = a14 = a23 = a24 = a31 = a32 = a34 = a41 = a42 = 0;
                a43 = (perspective) ? -1 / perspective : 0;
                zOrigin = t.zOrigin;
                rnd = 100000;
                angle = t.rotationY;
                if (angle) {
                    cos = Math.cos(angle);
                    sin = Math.sin(angle);
                    a31 = a33*-sin;
                    a41 = a43*-sin;
                    a13 = a11*sin;
                    a23 = a21*sin;
                    a33 *= cos;
                    a43 *= cos;
                    a11 *= cos;
                    a21 *= cos;
                }
                angle = t.rotationX;
                if (angle) {
                    cos = Math.cos(angle);
                    sin = Math.sin(angle);
                    t1 = a12*cos+a13*sin;
                    t2 = a22*cos+a23*sin;
                    t3 = a32*cos+a33*sin;
                    t4 = a42*cos+a43*sin;
                    a13 = a12*-sin+a13*cos;
                    a23 = a22*-sin+a23*cos;
                    a33 = a32*-sin+a33*cos;
                    a43 = a42*-sin+a43*cos;
                    a12 = t1;
                    a22 = t2;
                    a32 = t3;
                    a42 = t4;
                }
                if (sz !== 1) {
                    a13*=sz;
                    a23*=sz;
                    a33*=sz;
                    a43*=sz;
                }
                if (sy !== 1) {
                    a12*=sy;
                    a22*=sy;
                    a32*=sy;
                    a42*=sy;
                }
                if (sx !== 1) {
                    a11*=sx;
                    a21*=sx;
                    a31*=sx;
                    a41*=sx;
                }
                if (zOrigin) {
                    a34 -= zOrigin;
                    a14 = a13*a34;
                    a24 = a23*a34;
                    a34 = a33*a34+zOrigin;
                }
                //we round the x, y, and z slightly differently to allow even larger values.
                a14 = (t1 = (a14 += t.x) - (a14 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a14 : a14;
                a24 = (t1 = (a24 += t.y) - (a24 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a24 : a24;
                a34 = (t1 = (a34 += t.z) - (a34 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a34 : a34;
                style[_transformProp] = "matrix3d(" + [ (((a11 * rnd) | 0) / rnd), (((a21 * rnd) | 0) / rnd), (((a31 * rnd) | 0) / rnd), (((a41 * rnd) | 0) / rnd), (((a12 * rnd) | 0) / rnd), (((a22 * rnd) | 0) / rnd), (((a32 * rnd) | 0) / rnd), (((a42 * rnd) | 0) / rnd), (((a13 * rnd) | 0) / rnd), (((a23 * rnd) | 0) / rnd), (((a33 * rnd) | 0) / rnd), (((a43 * rnd) | 0) / rnd), a14, a24, a34, (perspective ? (1 + (-a34 / perspective)) : 1) ].join(",") + ")";
            },

            _set2DTransformRatio = function(v) {
                var t = this.data, //refers to the element's _gsTransform object
                    targ = this.t,
                    style = targ.style,
                    ffProp, t1, n, sfx, ang, skew, rnd, sx, sy;
                if (_isFirefox) { //Firefox has a bug that causes elements to randomly disappear during animation unless a repaint is forced. One way to do this is change "top" or "bottom" by 0.05 which is imperceptible, so we go back and forth. Another way is to change the display to "none", read the clientTop, and then revert the display but that is much slower.
                    ffProp = style.top ? "top" : style.bottom ? "bottom" : parseFloat(_getStyle(targ, "top", null, false)) ? "bottom" : "top";
                    t1 = _getStyle(targ, ffProp, null, false);
                    n = parseFloat(t1) || 0;
                    sfx = t1.substr((n + "").length) || "px";
                    t._ffFix = !t._ffFix;
                    style[ffProp] = (t._ffFix ? n + 0.05 : n - 0.05) + sfx;
                }
                if (!t.rotation && !t.skewX) {
                    style[_transformProp] = "matrix(" + t.scaleX + ",0,0," + t.scaleY + "," + t.x + "," + t.y + ")";
                } else {
                    ang = t.rotation;
                    skew = ang - t.skewX;
                    rnd = 100000;
                    sx = t.scaleX * rnd;
                    sy = t.scaleY * rnd;
                    //some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
                    style[_transformProp] = "matrix(" + (((Math.cos(ang) * sx) | 0) / rnd) + "," + (((Math.sin(ang) * sx) | 0) / rnd) + "," + (((Math.sin(skew) * -sy) | 0) / rnd) + "," + (((Math.cos(skew) * sy) | 0) / rnd) + "," + t.x + "," + t.y + ")";
                }
            };

        _registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D", {parser:function(t, e, p, cssp, pt, plugin, vars) {
            if (cssp._transform) { return pt; } //only need to parse the transform once, and only if the browser supports it.
            var m1 = cssp._transform = _getTransform(t, _cs, true, vars.parseTransform),
                style = t.style,
                min = 0.000001,
                i = _transformProps.length,
                v = vars,
                endRotations = {},
                m2, skewY, copy, orig, has3D, hasChange, dr;

            if (typeof(v.transform) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
                copy = style.cssText;
                style[_transformProp] = v.transform;
                style.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.
                m2 = _getTransform(t, null, false);
                style.cssText = copy;
            } else if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
                m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
                    scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
                    scaleZ:_parseVal((v.scaleZ != null) ? v.scaleZ : v.scale, m1.scaleZ),
                    x:_parseVal(v.x, m1.x),
                    y:_parseVal(v.y, m1.y),
                    z:_parseVal(v.z, m1.z),
                    perspective:_parseVal(v.transformPerspective, m1.perspective)};
                dr = v.directionalRotation;
                if (dr != null) {
                    if (typeof(dr) === "object") {
                        for (copy in dr) {
                            v[copy] = dr[copy];
                        }
                    } else {
                        v.rotation = dr;
                    }
                }
                m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : ("rotationZ" in v) ? v.rotationZ : (m1.rotation * _RAD2DEG), m1.rotation, "rotation", endRotations);
                if (_supports3D) {
                    m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : (m1.rotationX * _RAD2DEG) || 0, m1.rotationX, "rotationX", endRotations);
                    m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : (m1.rotationY * _RAD2DEG) || 0, m1.rotationY, "rotationY", endRotations);
                }
                m2.skewX = (v.skewX == null) ? m1.skewX : _parseAngle(v.skewX, m1.skewX);

                //note: for performance reasons, we combine all skewing into the skewX and rotation values, ignoring skewY but we must still record it so that we can discern how much of the overall skew is attributed to skewX vs. skewY. Otherwise, if the skewY would always act relative (tween skewY to 10deg, for example, multiple times and if we always combine things into skewX, we can't remember that skewY was 10 from last time). Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of -10 degrees.
                m2.skewY = (v.skewY == null) ? m1.skewY : _parseAngle(v.skewY, m1.skewY);
                if ((skewY = m2.skewY - m1.skewY)) {
                    m2.skewX += skewY;
                    m2.rotation += skewY;
                }
            }

            if (v.force3D != null) {
                m1.force3D = v.force3D;
                hasChange = true;
            }

            has3D = (m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
            if (!has3D && v.scale != null) {
                m2.scaleZ = 1; //no need to tween scaleZ.
            }

            while (--i > -1) {
                p = _transformProps[i];
                orig = m2[p] - m1[p];
                if (orig > min || orig < -min || _forcePT[p] != null) {
                    hasChange = true;
                    pt = new CSSPropTween(m1, p, m1[p], orig, pt);
                    if (p in endRotations) {
                        pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
                    }
                    pt.xs0 = 0; //ensures the value stays numeric in setRatio()
                    pt.plugin = plugin;
                    cssp._overwriteProps.push(pt.n);
                }
            }

            orig = v.transformOrigin;
            if (orig || (_supports3D && has3D && m1.zOrigin)) { //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
                if (_transformProp) {
                    hasChange = true;
                    p = _transformOriginProp;
                    orig = (orig || _getStyle(t, p, _cs, false, "50% 50%")) + ""; //cast as string to avoid errors
                    pt = new CSSPropTween(style, p, 0, 0, pt, -1, "transformOrigin");
                    pt.b = style[p];
                    pt.plugin = plugin;
                    if (_supports3D) {
                        copy = m1.zOrigin;
                        orig = orig.split(" ");
                        m1.zOrigin = ((orig.length > 2 && !(copy !== 0 && orig[2] === "0px")) ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.
                        pt.xs0 = pt.e = style[p] = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!
                        pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)
                        pt.b = copy;
                        pt.xs0 = pt.e = m1.zOrigin;
                    } else {
                        pt.xs0 = pt.e = style[p] = orig;
                    }

                    //for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).
                } else {
                    _parsePosition(orig + "", m1);
                }
            }

            if (hasChange) {
                cssp._transformType = (has3D || this._transformType === 3) ? 3 : 2; //quicker than calling cssp._enableTransforms();
            }
            return pt;
        }, prefix:true});

        _registerComplexSpecialProp("boxShadow", {defaultValue:"0px 0px 0px 0px #999", prefix:true, color:true, multi:true, keyword:"inset"});

        _registerComplexSpecialProp("borderRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
            e = this.format(e);
            var props = ["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
                style = t.style,
                ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
            w = parseFloat(t.offsetWidth);
            h = parseFloat(t.offsetHeight);
            ea1 = e.split(" ");
            for (i = 0; i < props.length; i++) { //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
                if (this.p.indexOf("border")) { //older browsers used a prefix
                    props[i] = _checkPropPrefix(props[i]);
                }
                bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
                if (bs.indexOf(" ") !== -1) {
                    bs2 = bs.split(" ");
                    bs = bs2[0];
                    bs2 = bs2[1];
                }
                es = es2 = ea1[i];
                bn = parseFloat(bs);
                bsfx = bs.substr((bn + "").length);
                rel = (es.charAt(1) === "=");
                if (rel) {
                    en = parseInt(es.charAt(0)+"1", 10);
                    es = es.substr(2);
                    en *= parseFloat(es);
                    esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
                } else {
                    en = parseFloat(es);
                    esfx = es.substr((en + "").length);
                }
                if (esfx === "") {
                    esfx = _suffixMap[p] || bsfx;
                }
                if (esfx !== bsfx) {
                    hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.
                    vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number
                    if (esfx === "%") {
                        bs = (hn / w * 100) + "%";
                        bs2 = (vn / h * 100) + "%";
                    } else if (esfx === "em") {
                        em = _convertToPixels(t, "borderLeft", 1, "em");
                        bs = (hn / em) + "em";
                        bs2 = (vn / em) + "em";
                    } else {
                        bs = hn + "px";
                        bs2 = vn + "px";
                    }
                    if (rel) {
                        es = (parseFloat(bs) + en) + esfx;
                        es2 = (parseFloat(bs2) + en) + esfx;
                    }
                }
                pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
            }
            return pt;
        }, prefix:true, formatter:_getFormatter("0px 0px 0px 0px", false, true)});
        _registerComplexSpecialProp("backgroundPosition", {defaultValue:"0 0", parser:function(t, e, p, cssp, pt, plugin) {
            var bp = "background-position",
                cs = (_cs || _getComputedStyle(t, null)),
                bs = this.format( ((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
                es = this.format(e),
                ba, ea, i, pct, overlap, src;
            if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1)) {
                src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
                if (src && src !== "none") {
                    ba = bs.split(" ");
                    ea = es.split(" ");
                    _tempImg.setAttribute("src", src); //set the temp <img>'s src to the background-image so that we can measure its width/height
                    i = 2;
                    while (--i > -1) {
                        bs = ba[i];
                        pct = (bs.indexOf("%") !== -1);
                        if (pct !== (ea[i].indexOf("%") !== -1)) {
                            overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
                            ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%";
                        }
                    }
                    bs = ba.join(" ");
                }
            }
            return this.parseComplex(t.style, bs, es, pt, plugin);
        }, formatter:_parsePosition});
        _registerComplexSpecialProp("backgroundSize", {defaultValue:"0 0", formatter:_parsePosition});
        _registerComplexSpecialProp("perspective", {defaultValue:"0px", prefix:true});
        _registerComplexSpecialProp("perspectiveOrigin", {defaultValue:"50% 50%", prefix:true});
        _registerComplexSpecialProp("transformStyle", {prefix:true});
        _registerComplexSpecialProp("backfaceVisibility", {prefix:true});
        _registerComplexSpecialProp("margin", {parser:_getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")});
        _registerComplexSpecialProp("padding", {parser:_getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")});
        _registerComplexSpecialProp("clip", {defaultValue:"rect(0px,0px,0px,0px)", parser:function(t, e, p, cssp, pt, plugin){
            var b, cs, delim;
            if (_ieVers < 9) { //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
                cs = t.currentStyle;
                delim = _ieVers < 8 ? " " : ",";
                b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
                e = this.format(e).split(",").join(delim);
            } else {
                b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
                e = this.format(e);
            }
            return this.parseComplex(t.style, b, e, pt, plugin);
        }});
        _registerComplexSpecialProp("textShadow", {defaultValue:"0px 0px 0px #999", color:true, multi:true});
        _registerComplexSpecialProp("autoRound,strictUnits", {parser:function(t, e, p, cssp, pt) {return pt;}}); //just so that we can ignore these properties (not tween them)
        _registerComplexSpecialProp("border", {defaultValue:"0px solid #000", parser:function(t, e, p, cssp, pt, plugin) {
            return this.parseComplex(t.style, this.format(_getStyle(t, "borderTopWidth", _cs, false, "0px") + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), this.format(e), pt, plugin);
        }, color:true, formatter:function(v) {
            var a = v.split(" ");
            return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
        }});
        _registerComplexSpecialProp("float,cssFloat,styleFloat", {parser:function(t, e, p, cssp, pt, plugin) {
            var s = t.style,
                prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
            return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
        }});

        //opacity-related
        var _setIEOpacityRatio = function(v) {
            var t = this.t, //refers to the element's style property
                filters = t.filter || _getStyle(this.data, "filter"),
                val = (this.s + this.c * v) | 0,
                skip;
            if (val === 100) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
                if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
                    t.removeAttribute("filter");
                    skip = (!_getStyle(this.data, "filter")); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
                } else {
                    t.filter = filters.replace(_alphaFilterExp, "");
                    skip = true;
                }
            }
            if (!skip) {
                if (this.xn1) {
                    t.filter = filters = filters || ("alpha(opacity=" + val + ")"); //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
                }
                if (filters.indexOf("opacity") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8)
                    if (val !== 0 || !this.xn1) { //bugs in IE7/8 won't render the filter properly if opacity is ADDED on the same frame/render as "visibility" changes (this.xn1 is 1 if this tween is an "autoAlpha" tween)
                        t.filter = filters + " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
                    }
                } else {
                    t.filter = filters.replace(_opacityExp, "opacity=" + val);
                }
            }
        };
        _registerComplexSpecialProp("opacity,alpha,autoAlpha", {defaultValue:"1", parser:function(t, e, p, cssp, pt, plugin) {
            var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
                style = t.style,
                isAutoAlpha = (p === "autoAlpha");
            e = parseFloat(e);
            if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) { //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
                b = 0;
            }
            if (_supportsOpacity) {
                pt = new CSSPropTween(style, "opacity", b, e - b, pt);
            } else {
                pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
                pt.xn1 = isAutoAlpha ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
                style.zoom = 1; //helps correct an IE issue.
                pt.type = 2;
                pt.b = "alpha(opacity=" + pt.s + ")";
                pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
                pt.data = t;
                pt.plugin = plugin;
                pt.setRatio = _setIEOpacityRatio;
            }
            if (isAutoAlpha) { //we have to create the "visibility" PropTween after the opacity one in the linked list so that they run in the order that works properly in IE8 and earlier
                pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, ((b !== 0) ? "inherit" : "hidden"), ((e === 0) ? "hidden" : "inherit"));
                pt.xs0 = "inherit";
                cssp._overwriteProps.push(pt.n);
                cssp._overwriteProps.push(p);
            }
            return pt;
        }});


        var _removeProp = function(s, p) {
                if (p) {
                    if (s.removeProperty) {
                        s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
                    } else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
                        s.removeAttribute(p);
                    }
                }
            },
            _setClassNameRatio = function(v) {
                this.t._gsClassPT = this;
                if (v === 1 || v === 0) {
                    this.t.className = (v === 0) ? this.b : this.e;
                    var mpt = this.data, //first MiniPropTween
                        s = this.t.style;
                    while (mpt) {
                        if (!mpt.v) {
                            _removeProp(s, mpt.p);
                        } else {
                            s[mpt.p] = mpt.v;
                        }
                        mpt = mpt._next;
                    }
                    if (v === 1 && this.t._gsClassPT === this) {
                        this.t._gsClassPT = null;
                    }
                } else if (this.t.className !== this.e) {
                    this.t.className = this.e;
                }
            };
        _registerComplexSpecialProp("className", {parser:function(t, e, p, cssp, pt, plugin, vars) {
            var b = t.className,
                cssText = t.style.cssText,
                difData, bs, cnpt, cnptLookup, mpt;
            pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
            pt.setRatio = _setClassNameRatio;
            pt.pr = -11;
            _hasPriority = true;
            pt.b = b;
            bs = _getAllStyles(t, _cs);
            //if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)
            cnpt = t._gsClassPT;
            if (cnpt) {
                cnptLookup = {};
                mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.
                while (mpt) {
                    cnptLookup[mpt.p] = 1;
                    mpt = mpt._next;
                }
                cnpt.setRatio(1);
            }
            t._gsClassPT = pt;
            pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
            if (cssp._tween._duration) { //if it's a zero-duration tween, there's no need to tween anything or parse the data. In fact, if we switch classes temporarily (which we must do for proper parsing) and the class has a transition applied, it could cause a quick flash to the end state and back again initially in some browsers.
                t.className = pt.e;
                difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
                t.className = b;
                pt.data = difData.firstMPT;
                t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
                pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)
            }
            return pt;
        }});


        var _setClearPropsRatio = function(v) {
            if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration) { //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that).
                var s = this.t.style,
                    transformParse = _specialProps.transform.parse,
                    a, p, i, clearTransform;
                if (this.e === "all") {
                    s.cssText = "";
                    clearTransform = true;
                } else {
                    a = this.e.split(",");
                    i = a.length;
                    while (--i > -1) {
                        p = a[i];
                        if (_specialProps[p]) {
                            if (_specialProps[p].parse === transformParse) {
                                clearTransform = true;
                            } else {
                                p = (p === "transformOrigin") ? _transformOriginProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
                            }
                        }
                        _removeProp(s, p);
                    }
                }
                if (clearTransform) {
                    _removeProp(s, _transformProp);
                    if (this.t._gsTransform) {
                        delete this.t._gsTransform;
                    }
                }

            }
        };
        _registerComplexSpecialProp("clearProps", {parser:function(t, e, p, cssp, pt) {
            pt = new CSSPropTween(t, p, 0, 0, pt, 2);
            pt.setRatio = _setClearPropsRatio;
            pt.e = e;
            pt.pr = -10;
            pt.data = cssp._tween;
            _hasPriority = true;
            return pt;
        }});

        p = "bezier,throwProps,physicsProps,physics2D".split(",");
        i = p.length;
        while (i--) {
            _registerPluginProp(p[i]);
        }








        p = CSSPlugin.prototype;
        p._firstPT = null;

        //gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
        p._onInitTween = function(target, vars, tween) {
            if (!target.nodeType) { //css is only for dom elements
                return false;
            }
            this._target = target;
            this._tween = tween;
            this._vars = vars;
            _autoRound = vars.autoRound;
            _hasPriority = false;
            _suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
            _cs = _getComputedStyle(target, "");
            _overwriteProps = this._overwriteProps;
            var style = target.style,
                v, pt, pt2, first, last, next, zIndex, tpt, threeD;
            if (_reqSafariFix) if (style.zIndex === "") {
                v = _getStyle(target, "zIndex", _cs);
                if (v === "auto" || v === "") {
                    //corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
                    style.zIndex = 0;
                }
            }

            if (typeof(vars) === "string") {
                first = style.cssText;
                v = _getAllStyles(target, _cs);
                style.cssText = first + ";" + vars;
                v = _cssDif(target, v, _getAllStyles(target)).difs;
                if (!_supportsOpacity && _opacityValExp.test(vars)) {
                    v.opacity = parseFloat( RegExp.$1 );
                }
                vars = v;
                style.cssText = first;
            }
            this._firstPT = pt = this.parse(target, vars, null);

            if (this._transformType) {
                threeD = (this._transformType === 3);
                if (!_transformProp) {
                    style.zoom = 1; //helps correct an IE issue.
                } else if (_isSafari) {
                    _reqSafariFix = true;
                    //if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).
                    if (style.zIndex === "") {
                        zIndex = _getStyle(target, "zIndex", _cs);
                        if (zIndex === "auto" || zIndex === "") {
                            style.zIndex = 0;
                        }
                    }
                    //Setting WebkitBackfaceVisibility corrects 3 bugs:
                    // 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
                    // 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
                    // 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
                    //Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.
                    if (_isSafariLT6) {
                        style.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden");
                    }
                }
                pt2 = pt;
                while (pt2 && pt2._next) {
                    pt2 = pt2._next;
                }
                tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
                this._linkCSSP(tpt, null, pt2);
                tpt.setRatio = (threeD && _supports3D) ? _set3DTransformRatio : _transformProp ? _set2DTransformRatio : _setIETransformRatio;
                tpt.data = this._transform || _getTransform(target, _cs, true);
                _overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.
            }

            if (_hasPriority) {
                //reorders the linked list in order of pr (priority)
                while (pt) {
                    next = pt._next;
                    pt2 = first;
                    while (pt2 && pt2.pr > pt.pr) {
                        pt2 = pt2._next;
                    }
                    if ((pt._prev = pt2 ? pt2._prev : last)) {
                        pt._prev._next = pt;
                    } else {
                        first = pt;
                    }
                    if ((pt._next = pt2)) {
                        pt2._prev = pt;
                    } else {
                        last = pt;
                    }
                    pt = next;
                }
                this._firstPT = first;
            }
            return true;
        };


        p.parse = function(target, vars, pt, plugin) {
            var style = target.style,
                p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
            for (p in vars) {
                es = vars[p]; //ending value string
                sp = _specialProps[p]; //SpecialProp lookup.
                if (sp) {
                    pt = sp.parse(target, es, p, this, pt, plugin, vars);

                } else {
                    bs = _getStyle(target, p, _cs) + "";
                    isStr = (typeof(es) === "string");
                    if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
                        if (!isStr) {
                            es = _parseColor(es);
                            es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")";
                        }
                        pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);

                    } else if (isStr && (es.indexOf(" ") !== -1 || es.indexOf(",") !== -1)) {
                        pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);

                    } else {
                        bn = parseFloat(bs);
                        bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

                        if (bs === "" || bs === "auto") {
                            if (p === "width" || p === "height") {
                                bn = _getDimension(target, p, _cs);
                                bsfx = "px";
                            } else if (p === "left" || p === "top") {
                                bn = _calculateOffset(target, p, _cs);
                                bsfx = "px";
                            } else {
                                bn = (p !== "opacity") ? 0 : 1;
                                bsfx = "";
                            }
                        }

                        rel = (isStr && es.charAt(1) === "=");
                        if (rel) {
                            en = parseInt(es.charAt(0) + "1", 10);
                            es = es.substr(2);
                            en *= parseFloat(es);
                            esfx = es.replace(_suffixExp, "");
                        } else {
                            en = parseFloat(es);
                            esfx = isStr ? es.substr((en + "").length) || "" : "";
                        }

                        if (esfx === "") {
                            esfx = _suffixMap[p] || bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
                        }

                        es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.

                        //if the beginning/ending suffixes don't match, normalize them...
                        if (bsfx !== esfx) if (esfx !== "") if (en || en === 0) if (bn || bn === 0) {
                            bn = _convertToPixels(target, p, bn, bsfx);
                            if (esfx === "%") {
                                bn /= _convertToPixels(target, p, 100, "%") / 100;
                                if (bn > 100) { //extremely rare
                                    bn = 100;
                                }
                                if (vars.strictUnits !== true) { //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
                                    bs = bn + "%";
                                }

                            } else if (esfx === "em") {
                                bn /= _convertToPixels(target, p, 1, "em");

                                //otherwise convert to pixels.
                            } else {
                                en = _convertToPixels(target, p, en, esfx);
                                esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
                            }
                            if (rel) if (en || en === 0) {
                                es = (en + bn) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
                            }
                        }

                        if (rel) {
                            en += bn;
                        }

                        if ((bn || bn === 0) && (en || en === 0)) { //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
                            pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, (_autoRound !== false && (esfx === "px" || p === "zIndex")), 0, bs, es);
                            pt.xs0 = esfx;
                            //DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
                        } else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
                            _log("invalid " + p + " tween value: " + vars[p]);
                        } else {
                            pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
                            pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
                            //DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
                        }
                    }
                }
                if (plugin) if (pt && !pt.plugin) {
                    pt.plugin = plugin;
                }
            }
            return pt;
        };


        //gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
        p.setRatio = function(v) {
            var pt = this._firstPT,
                min = 0.000001,
                val, str, i;

            //at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).
            if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                while (pt) {
                    if (pt.type !== 2) {
                        pt.t[pt.p] = pt.e;
                    } else {
                        pt.setRatio(v);
                    }
                    pt = pt._next;
                }

            } else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
                while (pt) {
                    val = pt.c * v + pt.s;
                    if (pt.r) {
                        val = (val > 0) ? (val + 0.5) | 0 : (val - 0.5) | 0;
                    } else if (val < min) if (val > -min) {
                        val = 0;
                    }
                    if (!pt.type) {
                        pt.t[pt.p] = val + pt.xs0;
                    } else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
                        i = pt.l;
                        if (i === 2) {
                            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
                        } else if (i === 3) {
                            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
                        } else if (i === 4) {
                            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
                        } else if (i === 5) {
                            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
                        } else {
                            str = pt.xs0 + val + pt.xs1;
                            for (i = 1; i < pt.l; i++) {
                                str += pt["xn"+i] + pt["xs"+(i+1)];
                            }
                            pt.t[pt.p] = str;
                        }

                    } else if (pt.type === -1) { //non-tweening value
                        pt.t[pt.p] = pt.xs0;

                    } else if (pt.setRatio) { //custom setRatio() for things like SpecialProps, external plugins, etc.
                        pt.setRatio(v);
                    }
                    pt = pt._next;
                }

                //if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
            } else {
                while (pt) {
                    if (pt.type !== 2) {
                        pt.t[pt.p] = pt.b;
                    } else {
                        pt.setRatio(v);
                    }
                    pt = pt._next;
                }
            }
        };

        /**
         * @private
         * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
         * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
         * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
         * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
         * doesn't have any transform-related properties of its own. You can call this method as many times as you
         * want and it won't create duplicate CSSPropTweens.
         *
         * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
         */
        p._enableTransforms = function(threeD) {
            this._transformType = (threeD || this._transformType === 3) ? 3 : 2;
            this._transform = this._transform || _getTransform(this._target, _cs, true); //ensures that the element has a _gsTransform property with the appropriate values.
        };

        /** @private **/
        p._linkCSSP = function(pt, next, prev, remove) {
            if (pt) {
                if (next) {
                    next._prev = pt;
                }
                if (pt._next) {
                    pt._next._prev = pt._prev;
                }
                if (pt._prev) {
                    pt._prev._next = pt._next;
                } else if (this._firstPT === pt) {
                    this._firstPT = pt._next;
                    remove = true; //just to prevent resetting this._firstPT 5 lines down in case pt._next is null. (optimized for speed)
                }
                if (prev) {
                    prev._next = pt;
                } else if (!remove && this._firstPT === null) {
                    this._firstPT = pt;
                }
                pt._next = next;
                pt._prev = prev;
            }
            return pt;
        };

        //we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
        p._kill = function(lookup) {
            var copy = lookup,
                pt, p, xfirst;
            if (lookup.autoAlpha || lookup.alpha) {
                copy = {};
                for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
                    copy[p] = lookup[p];
                }
                copy.opacity = 1;
                if (copy.autoAlpha) {
                    copy.visibility = 1;
                }
            }
            if (lookup.className && (pt = this._classNamePT)) { //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
                xfirst = pt.xfirst;
                if (xfirst && xfirst._prev) {
                    this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev
                } else if (xfirst === this._firstPT) {
                    this._firstPT = pt._next;
                }
                if (pt._next) {
                    this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
                }
                this._classNamePT = null;
            }
            return TweenPlugin.prototype._kill.call(this, copy);
        };



        //used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.
        var _getChildStyles = function(e, props, targets) {
            var children, i, child, type;
            if (e.slice) {
                i = e.length;
                while (--i > -1) {
                    _getChildStyles(e[i], props, targets);
                }
                return;
            }
            children = e.childNodes;
            i = children.length;
            while (--i > -1) {
                child = children[i];
                type = child.type;
                if (child.style) {
                    props.push(_getAllStyles(child));
                    if (targets) {
                        targets.push(child);
                    }
                }
                if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
                    _getChildStyles(child, props, targets);
                }
            }
        };

        /**
         * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
         * and then compares the style properties of all the target's child elements at the tween's start and end, and
         * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
         * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
         * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
         * is because it creates entirely new tweens that may have completely different targets than the original tween,
         * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
         * and it would create other problems. For example:
         *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
         *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
         *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
         *
         * @param {Object} target object to be tweened
         * @param {number} Duration in seconds (or frames for frames-based tweens)
         * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
         * @return {Array} An array of TweenLite instances
         */
        CSSPlugin.cascadeTo = function(target, duration, vars) {
            var tween = TweenLite.to(target, duration, vars),
                results = [tween],
                b = [],
                e = [],
                targets = [],
                _reservedProps = TweenLite._internals.reservedProps,
                i, difs, p;
            target = tween._targets || tween.target;
            _getChildStyles(target, b, targets);
            tween.render(duration, true);
            _getChildStyles(target, e);
            tween.render(0, true);
            tween._enabled(true);
            i = targets.length;
            while (--i > -1) {
                difs = _cssDif(targets[i], b[i], e[i]);
                if (difs.firstMPT) {
                    difs = difs.difs;
                    for (p in vars) {
                        if (_reservedProps[p]) {
                            difs[p] = vars[p];
                        }
                    }
                    results.push( TweenLite.to(targets[i], duration, difs) );
                }
            }
            return results;
        };

        TweenPlugin.activate([CSSPlugin]);
        return CSSPlugin;

    }, true);

}); if (window._gsDefine) { window._gsQueue.pop()(); }
GMCU.Config = {

	version : '0.7.27.1',

	prod_load_balancer_location : "http://lb.prod.cun.bzgint.com/",
	dev_load_balancer_location : "http://lb.dev.cun.bzgint.com/",
	base_location: '',
	genesis_server_url: '',
	player_source : '',
	player_swf : '',
	player_file: '',
	ova_source: '',
	ova_swf: '',
	smart_source: '',
	holding_clip: '',
	survey_url: '',

	getVersion: function(){
		return this.version;
	},

	init: function(base_location_URL, mode) {

		this.base_location = base_location_URL;

		switch (mode) {
	        case ("prod"):
	            GMCU.Config.genesis_server_url = this.prod_load_balancer_location + "CUNCollector/rest/collector/";
	            break;
	        case ("qa"):
	            GMCU.Config.genesis_server_url = this.dev_load_balancer_location + "CUNCollectorQA/rest/collector/";
	            break;
	        case ("dev"):
	            GMCU.Config.genesis_server_url = this.dev_load_balancer_location + "CUNCollectorDev/rest/collector/";
	            break;
   		}
		/*** Player Source ***/
		GMCU.Config.player_source = this.base_location + "/cu/assets/cuplayer.js";

		/*** Player SWF ***/
		GMCU.Config.player_swf = this.base_location + "/cu/assets/player.swf";

		/*** Player file ***/
		GMCU.Config.player_file = this.base_location + "/cu/assets/cu.flv";

		/*** OVA Source ***/
		GMCU.Config.ova_source = this.base_location  + "/cu/assets/ova-jw.js";

		/*** OVA SWF ***/
		GMCU.Config.ova_swf = this.base_location  + "/cu/assets/ova_jwplayer.swf";

		/*** Smart Source ***/
		GMCU.Config.smart_source = this.base_location + "/cu/assets/rules.js";
		GMCU.Config.smart_source = this.base_location  + "/cu/assets/rules.js";

		/*** Holding Clip ***/
		GMCU.Config.holding_clip = this.base_location + "/cu/assets/blank.mp4";

		/*** Survey Url ***/
		GMCU.Config.survey_url = this.base_location + "/cu/assets/survey/survey.html";
	},

	getServerUrl: function(){
		return GMCU.Config.genesis_server_url;
	},

	getPlayerSource: function(){
		return GMCU.Config.player_source;
	},

	getPlayerSwf: function(){
		return GMCU.Config.player_swf;
	},

	getPlayerFile: function(){
		return GMCU.Config.player_file;
	},

	getOvaSource: function(){
		return GMCU.Config.ova_source;
	},

	getOvaSwf: function(){
		return GMCU.Config.ova_swf;
	},

	getSmartSource: function(){
		return GMCU.Config.smart_source;
	},

	getHoldingClip: function() {
		return GMCU.Config.holding_clip;
	},

	getSurveyUrl: function(){
		return GMCU.Config.survey_url;
	}
};

GMCU.Event = {
	UNIQUE_VIEW 			: "uniqueView",
	SCRIPT_INITIATED 		: "scriptInitiated",
	GEO_EXCLUDED	 		: "geoExcluded",
	FREE_VIEW_ALLOWED 		: "freeViewAllowed",
	TEMPLATE_CONFIG_ERROR 	: "templateConfigError",
	TEMPLATE_CONFIG_WARNING : "templateConfigWarning",
	EXECUTION_SUSPENDED 	: "executionSuspendedNoMatch",
	GLOBAL_EXCEPTION 		: "globalException",
	MOBILE_DEVICE 			: "mobileBrowser",
	EXCLUDED_BROWSER 		: "excludedBrowser",
	MAX_BLOCKS_REACHED 		: "maximumBlocksReached",
	PAGE_WILL_LOCK 			: "pageWillLock",
	PAGE_DID_LOCK 			: "pageDidLock",
	PAGE_WILL_UNLOCK 		: "pageWillUnlock",
	PAGE_DID_UNLOCK 		: "pageDidUnlock",		
	LEAVE_BEHIND_BANNER		: "leaveBehindBanner",
	ADS_LOADED 				: "adsLoaded",
	ADS_LOAD_FAILURE 		: "adsLoadFailure",
	AD_PLAYBACK_STARTED 	: "adPlaybackStarted",
	AD_PLAYBACK_ENDED 		: "adPlaybackEnded",
	AD_PLAYBACK_ERROR 		: "adPlaybackError",
	AD_COMPLETED 			: "adCompleted",
	AD_SKIPPED 				: "adSkipped",
	ALT_ACTION_USED 		: "altActionUsed",
	FREE_VIEWS_GAINED 		: "freeViewsGained",
	DEBUG_MODE_ENABLED 		: "debugModeEnabled",
	URL_EXCLUDED 			: "urlExcluded",
	AUDIENCE_MATCH 			: "audienceMatchFound",
	AUDIENCE_NOT_FOUND 		: "audienceMatchNotFound",
	AUDIENCE_LOADED 		: "audienceDataLoaded",
	AUDIENCE_LOAD_FAILURE 	: "audienceDataLoadFailed"		
};

GMCU.EventHandler = {
			
	events_collection : [
						 {event: GMCU.Event.ADS_LOADED, callbacks: []},
						 {event: GMCU.Event.PAGE_WILL_LOCK, callbacks : []},
						 {event: GMCU.Event.FREE_VIEW_ALLOWED, callbacks: []},
						 {event: GMCU.Event.PAGE_DID_LOCK, callbacks: []},
						 {event: GMCU.Event.PAGE_DID_UNLOCK, callbacks: []},
						 {event: GMCU.Event.AD_PLAYBACK_STARTED, callbacks: []},
						 {event: GMCU.Event.AD_PLAYBACK_ENDED, callbacks: []},
						 {event: GMCU.Event.PAGE_WILL_UNLOCK, callbacks: []},
						 {event: GMCU.Event.GEO_EXCLUDED, callbacks:[]},
						 {event: GMCU.Event.ALT_ACTION_USED, callbacks:[]}
						 ],

	/**
	 * Ads a callback function to an event
 	 * @param String event 
 	 * @param {Object} callback
 	 * @param {Object} callback_params
	 */
	
	attachEvent: function(event,callback,callback_params){
		GMCU.Logger.log("Attaching callback to " + event);
		for( var i = 0; i < GMCU.EventHandler.events_collection.length; i++ ){
			if ( event == GMCU.EventHandler.events_collection[i].event ){
				var new_callback = new Object();
				new_callback.callback = callback;
				new_callback.parameters = callback_params;
				GMCU.EventHandler.events_collection[i].callbacks.push(new_callback);
				return;
			}
		}
	},
	/**
	 * Executes all the callbacks of a given event 
 	 * @param String event
	 */
	dispatchEvent: function(event){
		for( var i = 0; i < GMCU.EventHandler.events_collection.length; i++ ){
			if ( event == GMCU.EventHandler.events_collection[i].event ){
				if( GMCU.EventHandler.events_collection[i].callbacks && GMCU.EventHandler.events_collection[i].callbacks.length > 0){
					var functions_calls = GMCU.EventHandler.events_collection[i].callbacks;
					for( var j = 0; j < functions_calls.length; j++ ){
						    if (typeof functions_calls[j].callback == 'function'){
								functions_calls[j].callback(functions_calls[j].parameters);
								GMCU.Logger.log("Dispatching " + event);
							}
					}
					return;	
				}
			}
		}
	}
};

GMCU.Cunlock = {

	genesis_server_url : '',
	css : '',
	player_state : 0,
	unit_hover_done : 0,
	unit_click_done : 0,
	input_flag : 'cunlock_input_flag',
	clear_id : "CU_clear_div",
	replaced_content : '',
	first_paragraph_temp : '',
	original_text : '',
	hide_also_replacements : undefined,
	content_selector_replacements : undefined,
	mark_class : "cunlock_mark",
	exclusions_class : "cunlock_no_replace",
	truncated_text : undefined,
	markup_main_content : "cunlock_main_content",
	markup_first_paragraph : "cunlock_first_paragraph",
	markup_exclusions : "cunlock_exclude",
	markup_hide_also : "cunlock_hide_also",
	adload_error : 0,
	playback_error : 0,
	load_unit_execute: false,
	player_height : '300px',
	player_width : '600px',
	lotame_pixel_url : "http://bcp.crwdcntrl.net/5/c=1890/b=10686104",
	brandbox_font_size: '14px',
	unit_reference : undefined,
	unit_text_reference : undefined,
	could_load_player: 1,
	style_properties : {
		overflow : ''
	},
	session_expiry_in_minutes : 30,
	percentage_text_to_show : 70,
	adStarted : false,
	adCompleted : false,
	companion_banner: {
		id: "cu-companion-banner",
		width: "300",
		height: "250"
	},

	/**
	 * Initializes publisher parameters engaging CUN unit accordingly
	 */
	init : function(params) {
		GMCU.SettingsHandler.init(params);
		this.params = GMCU.SettingsHandler.processParams();
		this.trackInitialInfo();

		GMCU.Rules.init(this.params.referral_exceptions, this.params.content_exceptions, this.params.pre_lock_free_views, this.params.post_unlock_free_views,this.params.lock_default_content,this.params.lock_default_referral);

		GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.SCRIPT_INITIATED});

		if (this.params.lotame_enabled)
			GMCU.Utils.shootPixel(this.lotame_pixel_url);
		GMCU.DeviceManager.getPlayer().setAmountAds(GMCU.Cunlock.params.num_ads);
		GMCU.DebugMode.init(this.params.debug_mode);
		GMCU.RefreshThreshold.init(GMCU.Cunlock.params.refresh_threshold, GMCU.Cunlock.params.asynchronous_mode);
		if( !GMCU.UserAgentManager.isMobileDevice() )
			GMCU.EffectClass.setEnabled(true);
		GMCU.SkipAd.init(GMCU.Cunlock.params.enable_skip, GMCU.Cunlock.params.skip_time, GMCU.Cunlock.params.panel_skip_ad_text, GMCU.Cunlock.params.skip_bottom_margin, GMCU.Cunlock.params.skip_fadeout_time);
		GMCU.SessionLogic.init(this.params.frequency_cap.hours);
		GMCU.Cunlock.setupGlobalParameters();
		GMCU.LeaveBehindBanner.init(this.params.leave_behind_url, this.params.enable_leave_behind);
		GMCU.Logger.log("Version: " + GMCU.Config.getVersion());


		if (!this.isUnitConfigValid() && !GMCU.isOverlay())
			return;

		if( !GMCU.GeoLocation.isAllowedCountry() )
		{
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.GEO_EXCLUDED});
			GMCU.EventHandler.dispatchEvent(GMCU.Event.GEO_EXCLUDED);

			GMCU.Cunlock.could_load_player = 0;
			GMCU.Logger.log("County:::"+ GMCU.GeoLocation.getCountry()+":::::Player will not load");
			return;
		}
		this.switchToMarkups();
		// evaluate if the CUN unit is engaged
		if (!this.contentShouldBeLocked()) {
			if (GMCU.Rules.getPagePreUnlock() != -1) {
				var free_visits = GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getFreeVisits(), 0);
				GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getFreeVisits(), ++free_visits, '/');
				GMCU.Cunlock.could_load_player = 0;
			}
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.FREE_VIEW_ALLOWED});
			GMCU.EventHandler.dispatchEvent(GMCU.Event.FREE_VIEW_ALLOWED);
			GMCU.SessionLogic.incrementValue(GMCU.SessionLogic.free_views);
			GMCU.SessionLogic.incrementValue(GMCU.SessionLogic.free_views_after_unlocking);
		} else {
			GMCU.Cunlock.hide_also_replacements = [];
			GMCU.Cunlock.content_selector_replacements = [];
			GMCU.Cunlock.onLoad();
		}
	},

	initWithMobile: function(params) {
		GMCU.SettingsHandler.init(params);
		this.params = GMCU.SettingsHandler.processParams();
		this.trackInitialInfo();
		GMCU.Rules.init(this.params.referral_exceptions, this.params.content_exceptions, this.params.pre_lock_free_views, this.params.post_unlock_free_views, this.params.lock_default_content, this.params.lock_default_referral);
		GMCU.EventTrigger.shootEvent({
			'event': 'scriptInitiated'
		});
		if (this.params.lotame_enabled)
			GMCU.Utils.shootPixel(this.lotame_pixel_url);
		GMCU.DebugMode.init(this.params.debug_mode);
		GMCU.SessionLogic.init(this.params.frequency_cap.hours);
		GMCU.Cunlock.setupGlobalParameters();
		GMCU.Logger.log("Version: " + GMCU.Config.getVersion());
		if (!GMCU.GeoLocation.isAllowedCountry()) {
			GMCU.EventTrigger.shootEvent({
				'event': 'geoExcluded'
			});
			GMCU.GMContentUnlockEventHandler.dispatchEvent('geoExcluded');
			GMCU.Cunlock.could_load_player = 0;
			GMCU.Logger.log("County:::" + GMCU.GeoLocation.getCountry() + ":::::Player will not load");
			return;
		}
		this.switchToMarkups();
		// evaluate if the CUN unit is engaged
		if (!this.contentShouldBeLocked()) {
			if (GMCU.Rules.getPagePreUnlock() != -1) {
				var free_visits = GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getFreeVisits(), 0);
				GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getFreeVisits(), ++free_visits, '/');
				GMCU.Cunlock.could_load_player = 0;
			}
			GMCU.EventTrigger.shootEvent({
				'event': 'freeViewAllowed'
			});
			GMCU.EventHandler.dispatchEvent("freeViewAllowed");
			GMCU.SessionLogic.incrementValue(GMCU.SessionLogic.free_views);
			GMCU.SessionLogic.incrementValue(GMCU.SessionLogic.free_views_after_unlocking);
		} else {
			GMCU.Cunlock.onLoad();
		}
	},

	setupGlobalParameters : function() {
		GMCU.Cunlock.genesis_server_url = GMCU.Config.getServerUrl();
		GMCU.UserAgentManager.setExcludeBrowsers(GMCU.Cunlock.params.exclude_browsers);
	},

	/**
	 * Tracks initial relevant information like SessionID, SessionDepth and ReferralSource
	 */
	trackInitialInfo : function() {
		// generate   ID
		var sid = GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getSid(), 0);
		if (sid == 0) {
			sid = GMCU.Utils.generateSessionID();
			GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getSid(), sid, '/');
		}
		// update session depth
		//GMCU.CookieHandler.init(GMCU.Cunlock.params.session_expiry_in_minutes);
		GMCU.CookieHandler.init(GMCU.Cunlock.params.frequency_cap.hours * 60);
		var session_depth = GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getSessionDepth(), 0);
		session_depth = Number(session_depth) + 1;
		GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getSessionDepth(), session_depth, '/');
		GMCU.SessionLogic.incrementValue(GMCU.SessionLogic.session_depth);
		// track referral source
		var previous_referral = GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getReferralSource(), undefined);
		if (previous_referral == undefined) {
			if (document.referrer != "")
				previous_referral = GMCU.Utils.extractUrl(document.referrer);
			else
				previous_referral = "direct";

			GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getReferralSource(), previous_referral, '/');

		} else {
			// evaluate potential new referral and update cookie values
			var internal_url = GMCU.Utils.extractUrl(location.href).toLowerCase();
			var new_referral = GMCU.Utils.extractUrl(document.referrer).toLowerCase();

			if (new_referral != "") {
				if (new_referral != internal_url && new_referral != previous_referral) {
					GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getReferralSource(), new_referral, '/');
					GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getSid(), GMCU.Utils.generateSessionID(), '/');
					GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getSessionDepth(), 1, '/');
					GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getFreeVisits(), 0, '/');
					GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getUserBlocked(), 0, '/');
					GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getUserBlocks(), 0, '/');
					GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getFreeViewsGained(), 0, '/');
				}
			}
		}
	},

	/**
	 * Check if the Publisher configuration is valid looking at different parameters
	 */
	isUnitConfigValid : function() {
		if ( GMCU.Rules.getPagePreUnlock() != -2) {
			if (this.hasMainContentSelector()) {
				if (this.validateFirstParagraph()) {
					return true;
				}
			} else {
				if (GMCU.Cunlock.params.markup_active == 1)
					GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.TEMPLATE_CONFIG_ERROR, 'message' : 'Markup Main Content selector missing','url' : encodeURIComponent(location.href)});
				else
					GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.TEMPLATE_CONFIG_ERROR, 'message' : 'Main Content was specified but not found on the page','url' : encodeURIComponent(location.href)});
			}
		} else
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.TEMPLATE_CONFIG_ERROR, 'message' : 'No rule has matched on the page. Default matching value not present','url' : encodeURIComponent(location.href)});
		return false;
	},

	/**
	 * Performs the Markup setup if Publisher works with them
	 */
	switchToMarkups : function() {
		if (GMCU.Cunlock.params.markup_active == 1) {
			// update main_content
			GMCU.Cunlock.params.main_content.selector = "." + GMCU.Cunlock.markup_main_content;
			GMCU.Cunlock.params.main_content.index = 0;
			// update first_paragraph
			if ( GMCU.Cunlock.params.first_paragraph.selector == undefined) {
				GMCU.Cunlock.params.first_paragraph.selector = "." + GMCU.Cunlock.markup_first_paragraph;
				GMCU.Cunlock.params.first_paragraph.index = 0;
			}
			if (this.getMainTruncatedText() == undefined) {
				GMCU.Cunlock.params.first_paragraph.selector = undefined;
				GMCU.Cunlock.params.first_paragraph.index = undefined;
			}
			// update exclusions
			var list = GMCU.Cunlock.getContentSelector().childNodes;
			list = GMCU.DomHandler.cleanArray(list);
			var class_index = 0;
			for (var i = 0; i < list.length; i++) {
				if ( GMCU.DomHandler.hasClass(list[i], GMCU.Cunlock.markup_exclusions)) {
					GMCU.Cunlock.params.exclusions.push({
						selector : '.' + GMCU.Cunlock.markup_exclusions,
						index : class_index
					});
					class_index++;
				}
			}
			// update hide_also
			GMCU.Cunlock.params.hide_also.push("." + GMCU.Cunlock.markup_hide_also);
		}
	},
	/**
	 * Return the name of the class of the cunlock panel
	 */
	getContentPanel : function() {
		if (GMCU.isOverlay())
			return GMCU.DeviceManager.getInstance().getLayout().video_wrapper.id;
		return GMCU.Cunlock.params.panel_contentgoeshere_class;
	},
	/**
	 * Calculates if the CUN unit should be embedded or not
	 */
	contentShouldBeLocked : function() {
		var user_blocked = GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getUserBlocked(), 0);
		var free_visits = GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getFreeVisits(), 0);
		var free_views_gained = GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getFreeViewsGained(), 0);
		var page_pre_unlock = GMCU.Rules.getPagePreUnlock();

		if ( GMCU.AudienceListener.isEnabled() && GMCU.AudienceListener.killShouldHappen()) {
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.EXECUTION_SUSPENDED});
			return false;
		}

		if ( !GMCU.Rules.validateCurrentRules() ){
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.GLOBAL_EXCEPTION, 'message' : 'Global exception detected' });
			return false;
		}

		if( GMCU.UserAgentManager.isExcludedBrowser() ){
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.EXCLUDED_BROWSER, 'message' : 'Browser Detected :: '+ GMCU.UserAgentManager.getBrowser()});
			return false;
		}

		if( GMCU.SessionLogic.hasMaxLocksPerUserReached(GMCU.Cunlock.params.frequency_cap.locks)) {
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.MAX_BLOCKS_REACHED });
			return false;
		}
		// check if the page or the user got an unlimited free view value
		if (free_views_gained == -1 || page_pre_unlock == -1)
			return false;

		if (user_blocked == 1 || ( Number(free_visits) >= Number(page_pre_unlock) && Number(free_visits) >= Number(free_views_gained))) {
			if ( !GMCU.RefreshThreshold.isEnabled() )
				this.pageWillLock();
			return true;
		}
		GMCU.SessionLogic.incrementValue(GMCU.SessionLogic.free_views);
		GMCU.SessionLogic.incrementValue(GMCU.SessionLogic.free_views_after_unlocking);
		return false;
	},

	pageWillLock : function(){
		GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.PAGE_WILL_LOCK});
		GMCU.EventHandler.dispatchEvent(GMCU.Event.PAGE_WILL_LOCK);
		GMCU.SessionLogic.incrementValue(GMCU.SessionLogic.page_locks);
	},

	/**
	 * Hide content to the user
	 */
	onLoad: function() {
		GMCU.DeviceManager.getInstance().load();
    },

	/**
	 * Checks if the first_paragraph it's well defined firing and event
	 */
	validateFirstParagraph : function() {

		if (this.params.first_paragraph.selector != undefined) {
			if (this.getMainTruncatedText() == undefined) {
				GMCU.Cunlock.params.first_paragraph.selector = undefined;
				GMCU.Cunlock.params.first_paragraph.index = undefined;
				GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.TEMPLATE_CONFIG_WARNING, 'message' : 'First Paragraph was specified but not found on the page','url' : encodeURIComponent(location.href)});
			}
		}
		return true;
	},

	/**
	 * Returns true if the main content selector exists in the DOM
	 */
	hasMainContentSelector : function() {
		if (GMCU.Cunlock.params.markup_active == 1) {
			GMCU.Cunlock.params.main_content.selector = "." + GMCU.Cunlock.markup_main_content;
			GMCU.Cunlock.params.main_content.index = 0;
		}
		if (GMCU.Cunlock.getContentSelector() != undefined)
			return true;
		else
			return false;
	},

    getContentSelector : function() {
        if ( typeof GMCU.Cunlock.params.main_content.selector != "undefined"  ){
            if (GMCU.DomHandler.getType(GMCU.Cunlock.params.main_content.selector) == "#")
                return GMCU.DomHandler.$(GMCU.Cunlock.params.main_content.selector);
            else {
                var items = GMCU.DomHandler.$(GMCU.Cunlock.params.main_content.selector);
                for (var i = 0; i < items.length; i++) {
                    if (i == this.params.main_content.index)
                        return items[i];
                }
                return undefined;
            }
        }else
            return undefined;
    },

	calculateTrancatedText : function(text) {
		if (text != undefined && text.innerHTML != undefined ) {
			var truncate_length = text.innerHTML.length;
			var total_chars = Math.floor((truncate_length * (GMCU.Cunlock.percentage_text_to_show / 100)));
			var first_paragraph = GMCU.Utils.trim(GMCU.Utils.stripTags(text.innerHTML)).substring(0, total_chars);
			GMCU.Cunlock.original_text = text.innerHTML;
			text.innerHTML = first_paragraph + '...';
        }
	},

	/**
	 * Truncates the main text
	 */
	truncateMainText : function(elem, div) {
		if (GMCU.Cunlock.params.first_paragraph.selector != undefined) {
			var text = GMCU.Cunlock.first_paragraph_temp;
			if (text)
				GMCU.Cunlock.calculateTrancatedText(text);
		}
	},

	/**
	 * Restores the truncated text after the video reproduction
	 */
	restoreMainText : function(elem, parent) {
		if (GMCU.Cunlock.params.first_paragraph.selector != undefined) {
			var text = GMCU.Cunlock.first_paragraph_temp;
			if (text)
				text.innerHTML = GMCU.Cunlock.original_text;
		}

		try {
			elem.innerHTML = '';
		} catch(e) {
			elem.style.display = 'none';
		}
		document.getElementById(this.clear_id).style.clear = '';
	},

	/**
	 * Obtains the element of the DOM for the truncated text
	 */
	getMainTruncatedText : function() {
		var text = undefined;
		var selector = GMCU.Cunlock.getContentSelector();

		if (selector != undefined) {
			var items = selector.childNodes;
			items = GMCU.DomHandler.cleanArray(items);
			var index = 0;
			for (var j = 0; j < items.length; j++) {
				if ( GMCU.DomHandler.getType( GMCU.Cunlock.params.first_paragraph.selector) == "#") {
					var id = items[j].id;
					if (id == GMCU.Cunlock.params.first_paragraph.selector.substring(1)) {
						return items[j];
					}
				} else {
					var temp_selector;
					if ( GMCU.DomHandler.getType(GMCU.Cunlock.params.first_paragraph.selector) == ".") {
						temp_selector = GMCU.Cunlock.params.first_paragraph.selector.substring(1);
						if (!GMCU.DomHandler.hasClass(items[j], temp_selector))
							continue;
					} else {
						temp_selector = GMCU.Cunlock.params.first_paragraph.selector;
						if (items[j].tagName.toLowerCase() != temp_selector.toLowerCase())
							continue;
					}
					if ( GMCU.Cunlock.params.first_paragraph.index == index) {
						if (!GMCU.DomHandler.hasClass(items[j], GMCU.Cunlock.mark_class))
							return items[j];
					} else
						index++;
				}
			}
		}
		return text;
	},

	/**
	 * Get back all the tags inside the main content selector, except the ones
	 * that are on the content_selector_replacements array. This elements were
	 * removed by hideNonExclusions
	 */
	showNonExclusions : function() {
		for (var i = 0; i < GMCU.Cunlock.content_selector_replacements.length; i++) {
			var item = GMCU.Cunlock.content_selector_replacements[i];
			var parent = item.div_reference.parentNode;
			if ( parent ){
				parent.insertBefore(item.elem, item.div_reference);
				if (i == GMCU.Cunlock.content_selector_replacements.length - 1)
					GMCU.EffectClass.switchElementByOpacity(item.div_reference, item.elem, GMCU.fireEvent, [GMCU.Event.PAGE_DID_UNLOCK]);
				else
					GMCU.EffectClass.switchElementByOpacity(item.div_reference, item.elem);
			}
		}
	},

	/**
	 * Check if a particular element is the truncated text
	 */
	isTruncatedText : function(item) {

		if ( GMCU.Cunlock.params.first_paragraph.selector == undefined)
			return false;
		var text = GMCU.Cunlock.getMainTruncatedText();
		if (item === text)
			return true;
		else
			return false;
	},

	/**
	 * Checks if an item could be replaced in the main content selector or not
	 */
	noReplaceable : function(item) {
		if (!GMCU.Cunlock.isTruncatedText(item)) {
			if ( GMCU.DomHandler.hasClass(item, GMCU.Cunlock.exclusions_class))
				return true;
			else
				return false;
		}
		return true;
	},

	/**
	 * Add a class to each element in exclusions
	 */
	markExclusions : function(items) {
		var temp_array = GMCU.Cunlock.params.exclusions;
		for (var i = 0; i < temp_array.length; i++) {
			var index = 0;
			for (var j = 0; j < items.length; j++) {
				if ( GMCU.DomHandler.getType(temp_array[i].selector) == "#") {
					var id = items[j].id;
					if (id == temp_array[i].selector.substring(1)) {
						items[j].className += " " + GMCU.Cunlock.exclusions_class;
						break;
					}
				} else {
					var temp_selector;
					if ( GMCU.DomHandler.getType(temp_array[i].selector) == ".") {
						temp_selector = temp_array[i].selector.substring(1);
						if (!GMCU.DomHandler.hasClass(items[j], temp_selector))
							continue;
					} else {
						temp_selector = temp_array[i].selector;
						if (items[j].tagName.toLowerCase() != temp_selector.toLowerCase())
							continue;
					}
					if (temp_array[i].index == index) {
						items[j].className += " " + GMCU.Cunlock.exclusions_class;
						break;
					} else
						index++;
				}
			}
		}
		return items;
	},

	/**
	 * Extracts all the tags inside the main content selector, except the ones
	 * that are on the content_selector_replacements array.
	 */
	hideNonExclusions : function() {
		var elem = GMCU.Cunlock.getContentSelector();

		var items = elem.childNodes;
		items = GMCU.DomHandler.cleanArray(items);
		items = GMCU.Cunlock.markExclusions(items);
		for (var i = 0; i < items.length; i++) {
			if ( GMCU.Cunlock.noReplaceable(items[i]))
				continue;
			else {
				var new_div = document.createElement("div");
				new_div.className = GMCU.Cunlock.mark_class;
				/** * Save the new div and the els[k] object for later ** */
				var obj = new Object();
				obj.div_reference = new_div;
				obj.elem = items[i];
				GMCU.Cunlock.content_selector_replacements.push(obj);
			}
		}
		for (var j = 0; j < GMCU.Cunlock.content_selector_replacements.length; j++) {
			var item = GMCU.Cunlock.content_selector_replacements[j];
			var parent = item.elem.parentNode;
			parent.insertBefore(item.div_reference, item.elem);
			GMCU.EffectClass.switchElementByOpacity(item.elem, item.div_reference);
		}

	},

	isReady: function(){
		return this.load_unit_execute;
	},

	hideAlso: function(){
		for (var j = 0; j < GMCU.Cunlock.params.hide_also.length; j++) {
			ha_selector = GMCU.Cunlock.params.hide_also[j];
			var ha_els = GMCU.DomHandler.$(ha_selector);
			if (ha_els.length == undefined)
				GMCU.Cunlock.hideAlsoReplacement(ha_els);
			else
				for (var k = 0; k < ha_els.length; k++)
					GMCU.Cunlock.hideAlsoReplacement(ha_els[k]);
		}
	},

	replaceStyleProperties : function () {
		var content_selector = GMCU.Cunlock.getContentSelector();
		GMCU.Cunlock.style_properties.overflow = content_selector.style.overflow;
		content_selector.style.overflow = "visible";
	},

	restoreStyleProperties : function () {
		var content_selector = GMCU.Cunlock.getContentSelector();
		content_selector.style.overflow = GMCU.Cunlock.style_properties.overflow;
	},

	showPlayer: function(){
		GMCU.DeviceManager.getInstance().getLayout().showPlayer();
	},

	setPlayerFlag : function(){
		var input = document.getElementById(GMCU.Cunlock.input_flag);
		input.value = "1";
	},

	hideAlsoReplacement : function(element) {
		var new_div = document.createElement("div");
		var parent = element.parentNode;
		parent.insertBefore(new_div, element);
		/** * Save the new div and the element object for later ** */
		var obj = new Object();
		obj.div_reference = new_div;
		obj.elem = element;
		GMCU.Cunlock.hide_also_replacements.push(obj);
		GMCU.EffectClass.switchElementByOpacity(element, new_div);
	},
	/**
	 * Creates the CUN unit container to be embedded
	 */
	getSkipAdId: function(){
		return GMCU.Cunlock.params.panel_skip_ad_id;
	},

	getSkipAdTimerId: function(){
		return GMCU.Cunlock.params.panel_skip_timer_id;
	},

	getSkipAdLinkId: function(){
		return GMCU.Cunlock.params.panel_skip_link_id;
	},

	/**
	 * Removes CUN unit & unlocks the content to the user
	 */
	showContent : function() {
		GMCU.Cunlock.restoreStyleProperties();
		GMCU.Cunlock.onUnlockAction();

		var els = GMCU.DomHandler.$("#" + GMCU.Cunlock.params.panel_player_id);
		var parent = els.parentNode;
		if(GMCU.Cunlock.adStarted) {
			GMCU.Cunlock.restoreMainText(els, parent);
			GMCU.Cunlock.showNonExclusions();
			for (var i = 0; i < GMCU.Cunlock.hide_also_replacements.length; i++) {
				var item = GMCU.Cunlock.hide_also_replacements[i];
				var parent = item.div_reference.parentNode;
				parent.insertBefore(item.elem, item.div_reference);
				GMCU.EffectClass.switchElementByOpacity(item.div_reference, item.elem);
			}
			var l = GMCU.DomHandler.$("br", GMCU.Cunlock.getContentSelector());

			for (var k = 0; k < l.length; k++) {
				l[k].style.display = "block";
			}
			var ec = GMCU.DomHandler.$("."+ GMCU.Cunlock.exclusions_class,GMCU.Cunlock.getContentSelector());
			for (var k = 0; k < ec.length; k++) {
				ec[k].style.visibility = "visible";
			}

			if (typeof GMCU.Cunlock.content_selector_replacements != 'undefined' && GMCU.Cunlock.content_selector_replacements.length == 0)
				GMCU.EventHandler.dispatchEvent(GMCU.Event.PAGE_DID_UNLOCK);
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.PAGE_DID_UNLOCK});
			GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getUserBlocked(), 0, '/');
		}
		try{
            document.getElementById("cunlock_playerID").style.width = "0px";
        }catch(e){}
		if ( GMCU.LeaveBehindBanner.getStatus() ){
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.LEAVE_BEHIND_BANNER});
			GMCU.LeaveBehindBanner.render();
		}
	},

	showMobileContent : function () {
		GMCU.DeviceManager.getInstance().enableScrolling();
		GMCU.DeviceManager.getInstance().enableZooming();
		document.body.removeChild(GMCU.DomHandler.$('.cu-overlay')[0]);
		document.body.removeChild(GMCU.DomHandler.$('#cunlock_contentgoeshere'));
		document.body.removeChild(GMCU.DomHandler.$('#brandbox'));
	},

	removeModal : function () {
		GMCU.DeviceManager.getInstance().enableScrolling();
		GMCU.DeviceManager.getInstance().enableZooming();
		var layout = GMCU.DeviceManager.getInstance().getLayout();
		var overlay = GMCU.DomHandler.$('.cu-overlay')[0];
		var wrapper = GMCU.DomHandler.$('#cunlock_contentgoeshere');
		var brandbox = GMCU.DomHandler.$('#brandbox');
		GMCU.com.greensock.TweenLite.to([brandbox, overlay, wrapper], 0.5, {
			// left: layout.centerElement.offsetWidth,
			opacity : 0.0,
			onComplete: function() {
				document.body.removeChild(GMCU.DomHandler.$('.cu-overlay')[0]);
				document.body.removeChild(GMCU.DomHandler.$('#cunlock_contentgoeshere'));
				// document.body.removeChild(GMCU.DomHandler.$('#brandbox'));
			}
		}, 1);
    var elementClass = document.documentElement.className;
    var bodyClass = document.body.className;
    document.documentElement.className = elementClass.replace(/cu_locked/g, "");
    bodyClass = bodyClass.replace(/cu_locked/g, "");
    bodyClass = bodyClass.replace(/cu_locked_body/g, "");
    document.body.className = bodyClass;
    if ( GMCU.LeaveBehindBanner.getStatus() ){
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.LEAVE_BEHIND_BANNER});
			GMCU.LeaveBehindBanner.render();
		}
	},

	isCUNPlayerSendingEvent : function() {
		return true;
		//Deprecated functionality
		// var input = document.getElementById(GMCU.Cunlock.input_flag);
		// if (input && GMCU.Cunlock.player_state == 1 && input.value == "1")
		// 	return true;
		// return false;
	},
	/**
	 * Events functions
	 */
	onAdLoaded : function() {
		if ( GMCU.Cunlock.isCUNPlayerSendingEvent()){
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.ADS_LOADED});
			GMCU.Logger.log(GMCU.Event.ADS_LOADED);
		}

		if( !GMCU.RefreshThreshold.isEnabled() )
			GMCU.DeviceManager.getPlayer().togglePlayerWrapper("none");
	},

	onAdLoadFailure : function(error) {
		if (GMCU.Cunlock.isCUNPlayerSendingEvent()) {
			GMCU.Cunlock.adload_error = 1;
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.ADS_LOAD_FAILURE, 'message' : encodeURIComponent(error), 'url' : encodeURIComponent(location.href)});
			GMCU.Logger.log(GMCU.Event.ADS_LOAD_FAILURE);
			GMCU.EventHandler.dispatchEvent(GMCU.Event.FREE_VIEW_ALLOWED);
			GMCU.Cunlock.onUnlockAction();
		}
	},

	onVideoStart : function() {
		if ( GMCU.Cunlock.isCUNPlayerSendingEvent()) {
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.AD_PLAYBACK_STARTED});
			GMCU.Logger.log(GMCU.Event.AD_PLAYBACK_STARTED);
			GMCU.EventHandler.dispatchEvent(GMCU.Event.AD_PLAYBACK_STARTED);
			GMCU.SessionLogic.incrementValue(GMCU.SessionLogic.ad_started);

			if (this.params.comscore_enabled) {
				GMCU.Comscore.executeComscore();
			}
		}
	},

	onAdComplete : function() {
		if (!GMCU.SkipAd.hasSkipOccurred()){
			GMCU.Cunlock.onPlaybackEnded(GMCU.Event.AD_COMPLETED);
		}
	},

	onSkipAd : function() {
		if(!!GMCU.SkipAd.pixel_url)
			GMCU.Utils.shootPixel(GMCU.SkipAd.pixel_url);
		GMCU.SkipAd.skipExecuted();
		GMCU.Cunlock.onPlaybackEnded(GMCU.Event.AD_SKIPPED);
	},

	onPlaybackEnded : function(eventName) {
		if (GMCU.Cunlock.adCompleted) return;
		GMCU.Cunlock.adCompleted = true;
		if ( GMCU.Cunlock.isCUNPlayerSendingEvent()) {
			if ( GMCU.Cunlock.adload_error == 0 && GMCU.Cunlock.playback_error == 0) {
				GMCU.SkipAd.removeSkip();
				GMCU.EventTrigger.shootEvent({'event' : eventName});
				GMCU.EventHandler.dispatchEvent(GMCU.Event.AD_PLAYBACK_ENDED);
				GMCU.Logger.log(eventName);
				GMCU.SessionLogic.incrementValue(GMCU.SessionLogic.ad_completed);
			}
		}
	},

	onAlternativeAction : function() {
		if ( GMCU.Cunlock.isCUNPlayerSendingEvent()) {
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.ALT_ACTION_USED, 'message' : GMCU.AltAction.getType()});
		}
	},

	onPlaybackError : function(error) {
		if ( GMCU.Cunlock.isCUNPlayerSendingEvent()) {
			GMCU.Cunlock.playback_error = 1;
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.AD_PLAYBACK_ERROR,'message' : encodeURIComponent(error),'url' : encodeURIComponent(location.href)});
		}
	},

	onUnlockAction : function () {
		GMCU.Timer.clearInterval();
		GMCU.SessionLogic.incrementValue(GMCU.SessionLogic.total_unlocks);
		GMCU.SessionLogic.updateValue(GMCU.SessionLogic.free_views_after_unlocking, 0);

		if ( GMCU.Rules.getPagePostUnlock() != 0) {
			GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getFreeVisits(), 0, '/');
			GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getFreeViewsGained(), GMCU.Rules.getPagePostUnlock(), '/');
			GMCU.Logger.log("Free views gained :::: " + GMCU.Rules.getPagePostUnlock() );
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.FREE_VIEWS_GAINED});
		}
		else
			GMCU.CookieHandler.setCookie(GMCU.CookieHandler.getFreeViewsGained(), 0, '/');
	},

	hasAdLoadFailureOccurred : function () {
		return GMCU.Cunlock.adload_error == 1;
	},

	getUnitWidth : function() {
		return GMCU.Utils.getNumber(GMCU.Cunlock.params.unit_width);
	},

	getPlayerHeight: function(){
		return GMCU.Cunlock.player_height;
	}
};

GMCU.EffectClass = {

	effect_enabled : false,
	
	setEnabled: function(enabled){
		this.effect_enabled = enabled;
	},

	switchElementByOpacity : function(elem1, elem2,callback,callback_parameters) {
		if( this.effect_enabled )
			GMCU.switchElemsByOpacity(elem1, elem2, undefined, 1,callback,callback_parameters);
		else
			this.switchElements(elem1, elem2,callback,callback_parameters);	
	},

	showElement : function(elem, callback, callback_parameters, callback_end, callback_parameters_end) {
		if(callback != undefined)
			callback(callback_parameters);
		if( this.effect_enabled )
			GMCU.appearElemByOpacity(elem, 0.3, undefined, callback_end, callback_parameters_end );
		else{
			elem.style.visibility = "visible";
			elem.style.height = "";
			elem.style.overflow = "";
			var ieFactor = 1 * 100;
			elem.style.opacity = 1;
			elem.style.filter = "alpha(opacity = " + ieFactor + ")";
		}
	},
	
	switchElements: function(elem1,elem2,callback,callback_parameters){
		var parent = elem1.parentNode;
		parent.removeChild(elem1);
		elem2.style.height = "";
		elem2.style.overflow = "";
		var ieFactor = 100;
		elem2.style.opacity = 1;
		elem2.style.filter = "alpha(opacity = " + ieFactor + ")";
		if( callback )
			callback(callback_parameters);
	}
};

GMCU.switchElemsByOpacity = function(elem1, elem2, time, factor,callback,callback_parameters) {
	
	if (factor <= 0) {
		clearTimeout(time);
		var parent = elem1.parentNode;
		parent.removeChild(elem1);
		GMCU.appearElemByOpacity(elem2, 0, undefined,callback,callback_parameters);
		factor = 1;
		return;
	}

	factor -= 0.2;
	var ieFactor = factor * 100;

	elem1.style.opacity = factor;
	elem1.style.filter = "alpha(opacity = " + ieFactor + ")";
	time = setTimeout(function() {
		GMCU.switchElemsByOpacity(elem1, elem2, time, factor,callback,callback_parameters)
	}, 1);
}

/**
 * 
 * @param elem:
 *            the element who appears
 * @param factor:
 *            the value of the opacity property
 * @param time:
 *            the process id of the javascript function setTimeOut
 * @param callback:
 *            the function we want to execute once this function finish
 * @param callback_parameters:
 *            the parameters of the callback function
 */
GMCU.appearElemByOpacity = function(elem, factor, time, callback, callback_parameters) {
	
	if (factor >= 1) {
		clearTimeout(time);
		factor = 0;
		if (callback != undefined)
			callback(callback_parameters);
		return;
	}
	elem.style.visibility = "visible";
	elem.style.height = "";
	elem.style.overflow = "";
	factor += 0.03;
	var ieFactor = factor * 100;
	elem.style.opacity = factor;
	elem.style.filter = "alpha(opacity = " + ieFactor + ")";
	time = setTimeout(function() {
		GMCU.appearElemByOpacity(elem, factor, time, callback, callback_parameters)
	}, 20);
}

/**
 * Anonim function who excutes the truncate text.
 */
GMCU.truncateMainText = function(params) {
	GMCU.Cunlock.truncateMainText(params[0], params[1]);
}

GMCU.fireEvent = function(params){
	GMCU.EventHandler.dispatchEvent(params[0]);
}

GMCU.EventTrigger = {

	getUrlParameters: function(){
		var t_p = {
			'document_location' : GMCU.Utils.extractUrl(document.location.pathname),
			'session_ID' : GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getSid(), 0),
			'referral_source' : GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getReferralSource(), "direct"),
			'session_depth' : GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getSessionDepth(), 0),
			'free_visits_done' : GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getFreeVisits(), 0),
			'post_unlock_gained' : GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getFreeViewsGained(), 0),
			'page_pre_unlock' : GMCU.Rules.getPagePreUnlock(),
			'page_post_unlock' : GMCU.Rules.getPagePostUnlock(),
			'content_key_words' : GMCU.Rules.getMatchedContentType(),
			'browser' : GMCU.UserAgentManager.getBrowser(),
			'OS' : GMCU.UserAgentManager.getOS(),
			'Country' : GMCU.GeoLocation.getCountry()
		};
		return t_p;
	},

	/**
	 * Sends the actual event to the server collecting all parameters first
	 */
	shootEvent : function(params) {
		var req_img = new Image();
		var logRequired = {
			'freeViewAllowed': true,
			'pageDidLock': true,
			'templateConfigWarning': true,
			'adsLoadFailure': true
		};
		if(!!logRequired[params.event]) {
			GMCU.Logger.setValueAndLog(params.event, Date.now());
		}
		GMCU.Logger.log(GMCU.Config.getServerUrl() + cunlock_config.publisher_ID + '/' + cunlock_config.site_ID + GMCU.Utils.getParamString(this.getUrlParameters(), params));
		req_img.src = GMCU.Config.getServerUrl() + cunlock_config.publisher_ID + '/' + cunlock_config.site_ID + GMCU.Utils.getParamString(this.getUrlParameters(), params);
	},

	/**
	 * Returns the shootevent url
	 */
	getEventUrl : function(event) {

		var params = {'event' : event };
		var url = GMCU.Config.getServerUrl() + GMCU.Cunlock.params.publisher_ID + '/' + GMCU.Cunlock.params.site_ID + GMCU.Utils.getParamString(this.getUrlParameters(), params);
		return url;
	}
};

GMCU.GMSmartSource = {
	
	init: function(){
		GMCU.DomHandler.addJS(GMCU.Config.getSmartSource());
	},
	
	loadRules: function(){
		if( typeof cunlock_referral_exceptions != 'undefined' ){
			for( var i = 0; i < cunlock_referral_exceptions.length; i++ ){
				if( cunlock_referral_exceptions[i].group ){
					if( cunlock_referral_exceptions[i].items ){
						if (cunlock_referral_exceptions[i].items.length > 0)  
							GMCU.GMSmartSource[cunlock_referral_exceptions[i].group] = cunlock_referral_exceptions[i].items;
					}else{
						var tmp_obj = new Object();
						for( var j = 0; j < cunlock_referral_exceptions[i].subgroups.length; j++ ){
							 	if ( cunlock_referral_exceptions[i].subgroups[j].items.length > 0 )
							 		tmp_obj[cunlock_referral_exceptions[i].subgroups[j].group] =  cunlock_referral_exceptions[i].subgroups[j].items;
						}
						GMCU.GMSmartSource[cunlock_referral_exceptions[i].group] = tmp_obj;
					}	
				}
			}
		} 
	},
	
	loadGroups: function(rules){
		this.loadRules();
		for( var i = 0; i < rules.length ; i++ ){
			var regex = new RegExp(/GMSmartSource/);
			if ( regex.test(rules[i]) ){
				var code = " if( typeof "+ rules[i] +" != 'undefined' )  rules[i] = " + rules[i] + ";";
				eval(code);
			}
				
		}
		return rules;
	}
};

GMCU.RefreshThreshold = {
	
	current_count: 0,
	limit: 1,
	stopped: false,
	enabled : false,
	
	init : function(limit, enabled) {
		if (enabled)
			this.limit = limit;
		else
			this.limit = 0;
		this.enabled = enabled;
	},
	
	isEnabled : function () {
		return this.enabled;
	},
	
	hasReachedLimit: function(){
		if( this.current_count == this.limit )
			return true;
		else
			return false;	
	},
	
	count: function(){
		if( !this.hasReachedLimit() )
			this.current_count++;
	},
	
	isStopped: function(){
		return this.stopped;
	},
	
	stopThreshold: function(){
		this.stopped = true;
	}
};

GMCU.DebugMode = {
	lock_default_referral: 0,
	lock_default_content: 1,       
	referral_exceptions: ['qa.contentunlock.s3.amazonaws.com'],
	skip_time : 5,
	enable_skip: true,
	lotame_enabled : false,
	allowed_countries: ['AR','US'],
	frequency_cap: {locks: 1000 , hours: 1},
	leave_behind_url: "http://adserver.adtechus.com/adiframe/3.0/5372.1/2717112/0/154/ADTECH;target=_blank",
	enable_leave_behind: true,
	publisher_ID : 'test',
	site_ID : 'TEST',
	
	init: function(enabled) {
		if (enabled) {
			this.setDebugValues();
			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.DEBUG_MODE_ENABLED});
		}
	},
	
	setDebugValues: function(){
		GMCU.Cunlock.params.lock_default_referral = this.lock_default_referral;
		GMCU.Cunlock.params.lock_default_content = this.lock_default_content;
		GMCU.Cunlock.params.skip_time = this.skip_time;
		GMCU.Cunlock.params.referral_exceptions = this.referral_exceptions;
		GMCU.Cunlock.params.enable_skip = this.enable_skip;
		GMCU.Cunlock.params.lotame_enabled = this.lotame_enabled;
		GMCU.Cunlock.params.frequency_cap = this.frequency_cap;
		GMCU.Cunlock.params.leave_behind_url = this.leave_behind_url;
		GMCU.Cunlock.params.enable_leave_behind = this.enable_leave_behind;
		GMCU.Cunlock.params.publisher_ID = this.publisher_ID;
		GMCU.Cunlock.params.site_ID = this.site_ID;
		for( var i = 0, j = this.allowed_countries.length; i < j ; i++  )
			GMCU.GeoLocation.addCountry(this.allowed_countries[i]);
	}
};

GMCU.onCompleteJSONP = function (data) {
	var output = '';
  	for (property in data) {
  		output += property + ': ' + data[property]+'; ';
	}
	GMCU.Logger.log(output);
	if (data.status == 1) {
		GMCU.Timer.clearInterval();
		GMCU.cunlockVideoComplete();
		GMCU.cunlockHideUnit();
	}
};

GMCU.onStartJSONP = function(data){
	var output = '';
  	for (property in data) {
  		output += property + ': ' + data[property]+'; ';
	}
	GMCU.Logger.log(output);
	if (data.status == 1) {
		GMCU.Timer.clearInterval();
		GMCU.cunlockVideoStart();
		GMCU.Timer.enableCompleteCallback();
	}
};

GMCU.startPlayerCallback = function(url){
	GMCU.JSONP.get(url,{},GMCU.onStartJSONP);
};

GMCU.externalPlayerOnStartCallback = function(url){
	var interval = setInterval(function(){ GMCU.startPlayerCallback(url);},2000);
	GMCU.Timer.setIntervalID(interval);
};

GMCU.completePlayerCallback = function(ping_url){
	GMCU.JSONP.get( ping_url,{}, GMCU.onCompleteJSONP);
};

GMCU.externalPlayerOnCompleteCallback = function(ping_url) {
	var interval = setInterval(function() { GMCU.completePlayerCallback(ping_url); } ,2000);
	GMCU.Timer.setIntervalID(interval);
};


/**
 * Timer for check the template load
 */
GMCU.GMTimer = function (retry){
	if( GMCU.Timer.getTemplateLoad()){
		GMCU.Logger.log("Script loaded success");
	}
	else {
		if (retry < 10 ) {
			setTimeout("GMCU.GMTimer(" + ++retry + ")", 1000);
		}
		else {
			GMCU.Logger.log("Removing script tag");
			var head = document.getElementsByTagName('head')[0];
			head.removeChild(GMCU.cunlockGetPlayerScript());
			GMCU.cunlockAdLoadFailure("Impossible to parse the Ad URL given (invalid value)");
		}
	}
};


GMCU.Timer = {
	template_load_success : false,
	jsonp_callbacks : '',
	interval : undefined,
	init: function(){
		setTimeout("GMCU.GMTimer(0)", 1000);
	},

	clearInterval: function() {
		if (typeof( GMCU.Timer.interval ) != 'undefined')
			clearInterval( GMCU.Timer.interval );
	},

	getIntervalID: function(){
		return this.interval;
	},

	setIntervalID : function(interval){
		this.interval = interval;
	},

	setTemplateLoadSuccess: function(){
		this.template_load_success = true;
	},

	getTemplateLoad : function(){
		return this.template_load_success;
	},

	setJSONPCallbacks: function(jsonp_callbacks){
		this.jsonp_callbacks = jsonp_callbacks;
	},

	enableStartCallback: function(){
		if( this.jsonp_callbacks.onPlaybackStartedURL != undefined &&  this.jsonp_callbacks.onPlaybackStartedURL != '' )
			GMCU.externalPlayerOnStartCallback(this.jsonp_callbacks.onPlaybackStartedURL);
		else
			GMCU.Logger.log("Couldn't start the jsonp callback");
	},

	enableCompleteCallback: function(){
		if( this.jsonp_callbacks.onPlaybackEndedURL != undefined &&  this.jsonp_callbacks.onPlaybackEndedURL != '' )
			GMCU.externalPlayerOnCompleteCallback(this.jsonp_callbacks.onPlaybackEndedURL);
		else
			GMCU.Logger.log("Couldn't start the jsonp callback");
	}
};

GMCU.Bootstrap = {

	killswitch: false,

	init: function(killswitch){
		this.killswitch = killswitch;
	},

	load: function(){
		if( !this.killswitch ){
			GMCU.Config.init(cunlock_config.pub_site, cunlock_config.env);
			GMCU.UrlFilter.init(cunlock_config.exclude_urls);
			if( GMCU.UrlFilter.isExcluded() ){
				GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.URL_EXCLUDED});
				return;
			}
			GMCU.LotamePeer39.init(cunlock_config.peer39_enabled, cunlock_config.cu_lite);
			if( typeof GMContentUnlockEventHandlerOnReady == 'function')
				GMContentUnlockEventHandlerOnReady();
			GMCU.Logger.setValueAndLog("cuBeforeInit", Date.now());
			GMCU.UserAgentManager.init();

			GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.UNIQUE_VIEW});
			document.createElement("cunlocktag");
			//Browser Manager
			GMCU.BrowserManager.init();
			GMCU.BrowserManager.getInstance().init();
			//Device Manager
			GMCU.DeviceManager.init();
			GMCU.DeviceManager.getInstance().init();
			GMCU.DeviceManager.getInstance().attachLoadEvents();

			GMCU.AudienceListener.init(cunlock_config.audience_params);
			GMCU.Lotame.init(cunlock_config.lotame_pub_switch,cunlock_config.lotame_pub_id, cunlock_config.cu_lite);
			GMCU.Lotame.fire();
			GMCU.Comscore.executeMediaMetrix(cunlock_config.media_metrix_enabled);
			GMCU.GMSmartSource.init();
			GMCU.GeoLocation.init(cunlock_config.geo_countries);
			GMCU.DeviceManager.getPlayer().setAdUrl(cunlock_config.ad_url);
			// GMCU.backupLoader();
			GMCU.DeviceManager.getInstance().backupLoader();
			GMCU.Logger.setValueAndLog('cuScriptLoadedAt', Date.now());
		} else {
			GMCU.Logger.log("Killswitch enabled... Shutting down content unlock");
		}
	},

	attachLoadFunctions: function(){
		GMCU.beginCunlockUnit = function(){
			if (!GMCU.initUnitExecuted) {
				if ( typeof geoip_country_code == 'function' ){
					GMCU.initUnitExecuted = true;
					GMCU.Cunlock.init(cunlock_config);
				}
				else{
					setTimeout("GMCU.beginCunlockUnit()",100);
				}
			}
		};
		GMCU.cunlockLoader = function(){
			if ( document.readyState === "complete" ){
				GMCU.logPageLoad();
				GMCU.DomHandler.removeEvent("readystatechange",document,GMCU.cunlockLoader);
				GMCU.beginCunlockUnit();
			}
		};
		GMCU.backupLoader = function(){
			if ( document.readyState === "complete" && !GMCU.initUnitExecuted){
				GMCU.Logger.log("Backup used");
				GMCU.beginCunlockUnit();
			}
		};
		GMCU.logPageLoad = function() {
			GMCU.Logger.setValueAndLog('cuPageLoadedAt', Date.now());
		};
	}
};

GMCU.Rules = {
	referral_exceptions: [],
	content_exceptions: [],
	meta_name_matched : undefined,
	meta_content_matched : undefined,
	referrer_matched: undefined,
	page_pre_unlock : 0,
	page_post_unlock : 2,
	lock_default_content: 1,
	lock_default_referral: 1,

	init: function(referral_exceptions, content_exceptions, page_pre_unlock, page_post_unlock,lock_default_content,lock_default_referral){
		this.page_pre_unlock = page_pre_unlock;
		this.page_post_unlock = page_post_unlock;
		referral_exceptions = GMCU.GMSmartSource.loadGroups(referral_exceptions);
		this.referral_exceptions = this.formatRules(referral_exceptions);
		this.content_exceptions = content_exceptions;
		this.lock_default_content = lock_default_content;
		this.lock_default_referral = lock_default_referral;

		GMCU.Rules.processRules();
	},
	/**
	 * Format the rules that comes from the cuconfig
	 * This support is added in order to work with rules groups
	 */

	formatRules: function(rules){
		var rules_array = new Array();
		for( var i = 0; i < rules.length; i++ ){
			if ( rules[i] ){
				if( typeof rules[i] === 'string' )
					rules_array.push(rules[i]);
				else{
					for( var j = 0; j < rules[i].length; j ++ )
						rules_array.push(rules[i][j])
				}
			}
		}
		return rules_array;
	},

	/**
	 * Validates current rules with the data processed in
	 * processRules method.
	 */
	validateCurrentRules: function(){
		var should_lock_content = false;
		var should_lock_referral = false;
		if ( this.lock_default_content == 1 && this.lock_default_referral == 1 ){
			if ( this.referrer_matched != undefined || this.meta_name_matched != undefined )
				return false;
			else
				return true;
		}else if( this.lock_default_content == 1 && this.lock_default_referral == 0 ){
			if( this.referrer_matched != undefined && this.meta_name_matched == undefined )
				return true;
			else
				return false;
		}else if ( this.lock_default_content == 0 && this.lock_default_referral == 1 ){
			if ( this.referrer_matched == undefined && this.meta_name_matched != undefined )
				return true;
			else
				return false;
		}else{
			if ( this.referrer_matched != undefined && this.meta_name_matched != undefined )
				return true;
			else
				return false;
		}
	},


	/**
	 * Processes publisher page rules looking for meta content and referral
	 */
	processRules : function() {

		var page_meta_tags = document.getElementsByTagName('meta');
		var content_exceptions_found = Array();

		for (var i = 0; i < this.content_exceptions.length; i++){
			if( this.metaMatcher(this.content_exceptions[i], page_meta_tags) ){
				content_exceptions_found.push(this.content_exceptions[i].name);
				this.meta_name_matched = this.content_exceptions[i].name;
				this.meta_content_matched = this.content_exceptions[i].content;
				break;
			}
		}

		for (var j = 0; j < this.referral_exceptions.length; j++){
			if( this.referrerMatcher( this.referral_exceptions[j] ) ){
				this.referrer_matched = this.referral_exceptions[j];
			}
		}
	},

	/**
	 * Checks if a specific referrer matches
	 */
	referrerMatcher : function(referrer_to_match) {
		var referrer = GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getReferralSource(), "");
		var regexp = new RegExp(this.makeReferrerRegex(referrer_to_match), 'g');
		return regexp.test(referrer);
	},

	/*
	 * Replace the * in the referrer for the
	 * equivalent in regexp
	 */

	makeReferrerRegex: function(regex){
		var first_char = regex.charAt(0);
		var last_char = regex.charAt(regex.length-1);
		var new_regex = regex;
		if( last_char == "*" )
			new_regex = regex.replace(/\*$/g,".*");
		if( first_char == "*" ){
			var temp_str = new_regex.substr(1,new_regex.length);
			new_regex = ".*?" + temp_str;
		}
		GMCU.Logger.log("Regex -> " + new_regex);
		return new_regex;
	},


	/**
	 * Checks if a specific meta content matches
	 */
	metaMatcher : function(meta_to_match, page_meta_tags) {

		if ( typeof (meta_to_match.name) == undefined)
			return false;

		var matched;
		var contentArray;

		for (var i = 0; i < page_meta_tags.length; i++) {
			if (page_meta_tags[i]['name'] == undefined)
				continue;
			else {
				if (meta_to_match.name.toLowerCase() == page_meta_tags[i]['name'].toLowerCase()) {
					contentArray = meta_to_match.content;
					for (var j = 0; j < contentArray.length; j++) {
						matched = false;
						if (page_meta_tags[i].content.toLowerCase().search(contentArray[j].toLowerCase()) != -1) {
							matched = true;
							break;
						}
					}
					if (matched)
						return true;
				}
			}
		}
		return false;
	},

	/**
	 * Generates the content type matching string
	 */
	getMatchedContentType : function() {

		if (GMCU.Rules.meta_name_matched === undefined)
			return 'default';

		var str = this.meta_name_matched + ':';
		for (var i = 0; i < GMCU.Rules.meta_content_matched.length; i++) {
			if (i != 0)
				str += ',' + GMCU.Rules.meta_content_matched[i];
			else
				str += GMCU.Rules.meta_content_matched[i];
		}

		if (str === "")
			return 'default';
		return str;
	},

	/**
	 * Returns the value of page_post_unlock
	 */
	getPagePostUnlock: function(){
		return GMCU.Rules.page_post_unlock;
	},

	/**
	 * Return the value of page_pre_unlock
	 */
	getPagePreUnlock: function(){
		return GMCU.Rules.page_pre_unlock;
	}
};

GMCU.SettingsHandler = {

	section_prefix: '.cunlock_section_',
	position: 10000,
	params: {
		debug_mode: false,
		lotame_enabled : false,
		ticker_box_enabled: false,
		player_width: '',
		unit_width : '',
		/*** Cun-352 new params ***/
		pre_lock_free_views: 0,
		post_unlock_free_views: 2,
		lock_default_referral: 1,
		lock_default_content: 1,
        // Global exceptions
		referral_exceptions: [],
		content_exceptions: [],
		frequency_cap: { locks: 8 , hours:72},

		main_content : {selector : undefined, index : undefined	},

		first_paragraph : { selector : undefined, index : undefined	},
		exclude_browsers: [],
		exclusions : [],
		hide_also : [],
		publisher_ID : 'unknown',

		//Refresh Threshold
		refresh_threshold: 0,
		asynchronous_mode: false,
		//brand-box + alt-action
		brandbox_logo_URL : '',
		brandbox_enabled: 0,
		brandbox_message: 'This is A sponsored article',
		brandbox_font_color: 'black',
		brandbox_bg_color: undefined,
		// alt-action
		allow_alternative_action : false,
		alt_action_type : '',
		alt_action_param : undefined,

		markup_active : 0,
		panel_collapsed_class : 'cunlock_panelcollapsed',
		panel_content_class : 'cunlock_panelcontent',
		panel_wrapper_class : 'cunlock_wrapper',
		panel_branding_class : 'cunlock_branding',
		panel_privacy_class : 'cunlock_privacy',
		panel_poweredbyimg_class : 'cunlock_poweredbyimg',
		panel_contentgoeshere_class : 'cunlock_contentgoeshere',
		panel_player_id : 'cunlock_playerID',
		panel_skip_ad_id : 'cunlock_skip_ad_container',
		panel_skip_ad_text : 'You can skip this ad in ##',
		panel_skip_ad_text_unlock : 'Skip Ad >>',
		panel_skip_timer_id : 'cunlockTimerSpan',
		panel_skip_link_id : 'cunlockTimerLink',
		skip_time : 20,
		enable_skip: false,
		skip_fadeout_time : 5,
		skip_bottom_margin: 30,
		num_ads: 1,
		panel_animation_delay : 20, // ms
		panel_animation_steps : 10, // ms

		panel_link_privacy : 'http://www.genesismedia.com/Genesis-Media-Privacy.html#privacy',
		feedback_link : 'mailto:support@genesismedia.com?subject=##subject##&body=##body##',
		panel_link_privacy_text : 'Privacy Policy',
		feedback_text : 'Send Feedback',

		enable_leave_behind: false,
		leave_behind_container: '',
		leave_behind_url: '',

		enable_auto_scroll: true,
		center_unit: false,
		/*** Mediapass settings ***/
		mediapass_settings:{enabled:false,"id":3386,"asset":3574},
		survey_id: 0,
		sections: [],
		modal_title_label : "advertisement"
	},

	tmp_params: {},

	init: function(params){
		this.tmp_params = params;
	},

	_mergeDefaultParams: function(){
		if ( typeof this.tmp_params == 'object') {
			for (var key in this.tmp_params) {
				this.params[key] = this.tmp_params[key];
			}
		}
	},

	_mergeSectionParams: function(){
		var sections = this.tmp_params["sections"];
		if ( typeof sections != 'undefined' ){
			for ( var i = 0; i < sections.length; i++ ){
				if( GMCU.DomHandler.$( this.section_prefix + sections[i].name ).length > 0 ){
					var tmp_element = GMCU.DomHandler.$( this.section_prefix + sections[i].name )[0];
					if( tmp_element.offsetTop < this.position ){
						this.position = tmp_element.offsetTop;
						var section_properties = sections[i].properties;
						for (var key in section_properties)
							this.params[key] = section_properties[key];
						//Also, the main content selector needs to be updated
						this.params.main_content = {selector : this.section_prefix + sections[i].name , index : 0};
						//And the markups should be disabled
						this.params.markup_active = 0;
					}

				}
			}
		}
	},

	_mergePageLevelParams: function(){
		if ( typeof content_unlock_parameters != "undefined" ){
			for (var key in content_unlock_parameters) {
				this.params[key] = content_unlock_parameters[key];
			}
		}
	},

	_checkCULiteParams : function () {
    if(!cunlock_config.cu_lite) return;
		var keys = ["enable_leave_behind", "enable_auto_scroll", "allow_alternative_action", "peer39_enabled", "lotame_pub_switch"];
		for (var i = keys.length - 1; i >= 0; i--) {
			if (this.params.hasOwnProperty(keys[i]))
				this.params[keys[i]] = false;
		};
	},

	processParams: function(){
		this._mergeDefaultParams();
		this._mergeSectionParams();
		this._mergePageLevelParams();
		this._checkCULiteParams();
		return this.params;
	}

};

GMCU.UrlFilter = {
	
	url: '',
	filters: [],
	excluded: false,
	url_excluded: '',
	init: function(filters){
		!!document.URL.split("?")[0] ? GMCU.UrlFilter.url = document.URL.split("?")[0] : GMCU.UrlFilter.url = '';
		!!filters ? GMCU.UrlFilter.filters = filters : GMCU.UrlFilter.filters;
		GMCU.UrlFilter.evaluate();
	},
	
	isExcluded: function(){
		return GMCU.UrlFilter.excluded;
	},
	
	evaluate: function(){
		for(var i = 0 , j = GMCU.UrlFilter.filters.length; i<j; i++){
		  	if ( GMCU.UrlFilter.filters[i] === GMCU.UrlFilter.url){
		  		GMCU.UrlFilter.url_excluded = GMCU.UrlFilter.filters[i];
		  		GMCU.UrlFilter.excluded = true;
		  		GMCU.Logger.log("Detected url: " + GMCU.UrlFilter.url_excluded);
		  		return;
		  	}
		  		
		}
		GMCU.UrlFilter.excluded = false;
	}
};

/**
 * Begin the player factory class
 */
GMCU.Player = function(adtech_tag){

	this.type_name = undefined;
	this.attempts = 0;
	this.max_attempts = 20;
	this.ads_url = 'http://adserver.adtechus.com/addyn|3.0|5071|2576100|0|16|ADTECH;loc=100;noperf=1;target=_blank;misc=[TIMESTAMP]';
	this.script_container = '';
	this.pixel_url = '';
	this.is_built_in = false;
	this.width = '';
	this.height = '';
	this.autoplay = true;
	this.video_played = false;
	this.amount_ads_shown = 1;
	this.ad_counter = 0;
	this.cuplayer_instance = undefined;
	//Init
	this.adtech_tag = adtech_tag;

	this.setVideoPlayed = function(value) {
		this.video_played = value;
	};

	this.getVideoPlayed = function() {
		return this.video_played;
	};

	this.setPlayerDimensions = function(width, height) {};

	this.initBuiltInPlayer = function(){};

	this.setAutoPlay = function(autoplay) {
		if (autoplay != undefined)
			this.autoplay = autoplay;
	};

	this.shootPixelUrl = function() {
		var pixel = new Image();
		pixel.src = this.pixel_url;
	};

	this.getAdsUrl = function() {
		return this.ads_url;
	};

	this.getAutoPlay = function() {
		return this.autoplay;
	};

	this.getContainerScript = function() {
		return this.script_container;
	};

	this.getAmountAds = function() {
		return this.amount_ads_shown;
	};

	this.isBuiltInPlayer = function() {
		return this.is_built_in;
	};

	this.loadBuiltInPlayer = function() {
		setTimeout("GMCU.loadCUPlayerTimer()", 100);
		GMCU.Logger.log("Builtin player loaded");
	};

	this.setAdUrl = function(ads_url) {
		if (ads_url != undefined && ads_url != "")
			this.ads_url = ads_url;
	},

	this.setPixelUrl = function(pixel_url) {
		this.pixel_url = pixel_url;
	};

	this.setScriptOnloadEvent =  function(adserver_script, functionName){
		GMCU.BrowserManager.getInstance().attachEvent("load", adserver_script, functionName);
	};

	this.loadPlayer = function() {
		if (GMCU.isCULite()) {
			GMCU.initContentUnlockWithDefault();
			GMCU.DeviceManager.getInstance().getLayout().render();
			return;
		} else if (GMCU.isOverlay()) {
			GMCU.DeviceManager.getInstance().getLayout().render();
		}

		if (GMCU.AudienceListener.isEnabled() && !GMCU.AudienceListener.isAudienceFound())
			this.adtech_tag = GMCU.AudienceListener.getAlternativeTag();
		var adserver_script = document.createElement("script");
		var params = {
			no_of_slates: cunlock_config.no_of_slates,
			current_ad: ++this.current_ad_call
		};
		adserver_script.onload = this.loadPlayerScriptCallback;
		adserver_script.onreadystatechange = function () {
			if(this.readyState === "complete" || this.readyState === "loaded") {
				GMCU.DeviceManager.getPlayer().loadPlayerScriptCallback();
			}
		};

		adserver_script.src = GMCU.Utils.addAdtechParams(this.adtech_tag, params);
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(adserver_script);
		this.script_container = adserver_script;
		GMCU.Timer.init();
	};

	/**
	 * Builds the Ads schedule string to setup OVA
	 */
	this.getAdsList = function() {
		var result_array = Array();
		for (var i = 0; i < this.getAmountAds(); i++)
			result_array.push(this.getAdsUrl());
		return result_array;
	};

	this.onAdStart = function() {
		this.shootPixelUrl();
		this.ad_counter++;
	};

	this.isLastAd = function() {
		if (this.is_built_in) {
			if (this.ad_counter < this.amount_ads_shown)
				return false;
		}
		return true;
	};

	this.hasAnotherAd = function() {
		if (this.is_built_in) {
			if ( this.ad_counter < this.amount_ads_shown)
				return true;
		}
		return false;
	};

	this.addPixelEvents = function () {
		return;
	};
};

GMCU.MobilePlayer = function(adtech_tag){

	GMCU.Player.apply(this, arguments);
	this.parent = new GMCU.Player();

	this.mediaImage = '';
	this.mediaVideo = '';
	this.ads_url = '';
	this.setPlayerMediaFile = function(mediaImage, mediaVideo) {
		var device, videoUrl, params;
		if (mediaImage === "") {
			mediaImage = GMCU.Config.base_location + '/cu/assets/images/video-background.png';
		}

		this.mediaImage = mediaImage;
		device = GMCU.DeviceManager.getDevice();
		params = {"UMADPARAMKVdev" : device};
		videoUrl = GMCU.Utils.addUnicornParams(mediaVideo, params);
		this.mediaVideo = videoUrl;
		this.ads_url = videoUrl;
	};

	this.getPlayerMediaFile = function(){

		var videoEmbed = document.createElement('video');
		videoEmbed.setAttribute("controls", true);
		videoEmbed.setAttribute("autoplay", true);
		videoEmbed.setAttribute("width", '100%');
		videoEmbed.setAttribute("height", '100%');
		videoEmbed.setAttribute("poster", this.mediaImage);
		videoEmbed.src = this.mediaVideo;
		videoEmbed.id = "mediaVideo";

		return videoEmbed;
	};

	this.setScriptOnloadEvent =  function(adserver_script){
	};

	this.addPixelEvents = function (videoEmbed) {
		videoEmbed.addEventListener("play", function (e) {
			GMCU.DeviceManager.getInstance().getLayout().text.style.display = "none";
			GMCU.EventTrigger.shootEvent({"event" : "AdStarted"});
		});

		//add video complete event listener
		videoEmbed.addEventListener("ended", function(e) {
			GMCU.EventTrigger.shootEvent({"event": "AdCompleted"});
			GMCU.CunlockVideoTagHideUnit();
		});

		videoEmbed.addEventListener("error", function (e) {
			e.stopPropagation();
			GMCU.EventTrigger.shootEvent({"event": "AdLoadFailure"});
			GMCU.CunlockVideoTagHideUnit();
			return false;
		});
	};

	this.loadPlayer = function () {
		GMCU.Timer.init();
		GMCU.initContentUnlockWithMobilePlayer(cunlock_config.mobile_once_thumbnail, cunlock_config.mobile_once_url);
		GMCU.DeviceManager.getInstance().getLayout().render();
	};
};
GMCU.DesktopPlayer = function(adtech_tag){

	GMCU.Player.apply(this, arguments);
	this.parent = new GMCU.Player();
	GMCU.DomHandler.addJS(GMCU.Config.getPlayerSource());

	this.vasts = [];
	this.messages = [];
	this.current_ad_call = 0;
	this.initCalled = "";

	this.setPlayerDimensions = function(width, height) {
		var unit_width = GMCU.Cunlock.getUnitWidth();
		if (unit_width !== '') {
			var player_width = GMCU.Utils.getNumber(width);
			if (Number(unit_width) < Number(player_width))
				this.width = unit_width + "px";
			else
				this.width = player_width + "px";
		} else
			this.width = width;
		this.height = height;
	};

	this.setAmountAds = function(val) {
		this.amount_ads_shown = val;
	};

	this.initBuiltInPlayer = function(){
		this.is_built_in = true;
		this.loadBuiltInPlayer();
	};

	this.resizeObjects = function(){
		if ( this.is_built_in)
			GMCU.resizePlayerObjectElements();
	};

	this.initExternalPlayer = function(pixel_url) {
		this.pixel_url = pixel_url;
		GMCU.cunlockAdLoaded();
	};

	this.togglePlayerWrapper = function(value) {
		GMCU.BrowserManager.getInstance().togglePlayerWrapper(value);
	};

	this.hideFlashPlayer = function(){
		var element = GMCU.DomHandler.$("#" + GMCU.Cunlock.getContentPanel());
		if( typeof element != 'undefined' ){
			if (element){
				if ( this.isBuiltInPlayer() ){
					var objects = GMCU.DomHandler.$("object", element);
					for (var i = 0, j = objects.length; i < j; i++){
						objects[i].style.width = "0px";
						objects[i].style.height = "0px";
					}
				}else{
					element.innerHTML = "";
				}
			}
		}
	};

	this.destroyVideo = function(){
		var elem = GMCU.DomHandler.$("#" + GMCU.Cunlock.getContentPanel());
		try{
			elem.innerHTML = '';
		}catch(e){
			elem.style.display = 'none';
		}
	};

	this.getPlayerMediaFile = function () {
		return;
	};

	this.loadPlayerScriptCallback = function () {
		var player = GMCU.DeviceManager.getPlayer();
		if(player.initCalled === "legacy")
			return;
		var vastsLength = player.vasts.length;
		if(typeof vast_1 === "undefined"){
			GMCU.EventTrigger.shootEvent({'event' : 'adsLoadFailure', 'message' : encodeURIComponent("ad load failure"), 'url' : encodeURIComponent(location.href)});
			initContentUnlockWithDefault();
			return;
		} else {
			player.vasts[vastsLength] = vast_1.replace(/__SLATEPARAMS__/g, "^NoOfSlates=" + cunlock_config.no_of_slates + "^CurrentSlate=" + player.current_ad_call);
			player.messages[1] = (typeof message === "undefined") ? "" : message;
			vastsLength++;
		}

		exclusive = (typeof exclusive === "undefined") ? false : exclusive;
		if(cunlock_config.no_of_slates === 1 || exclusive) {
			player.initCalled = player.initCalled === "wrapper" ? "wrapper" : "api";
			player.callInitFunction();
		} else if (cunlock_config.no_of_slates === 2 && !exclusive) {
			var adserver_script = document.createElement("script");
			var params = {
				no_of_slates: cunlock_config.no_of_slates,
				current_ad: ++player.current_ad_call
			};
			adserver_script.onload = this.loadSlateCallback;
			adserver_script.onreadystatechange = function () {
				if(this.readyState === "complete" || this.readyState === "loaded") {
					GMCU.DeviceManager.getPlayer().loadSlateCallback();
				}
			};
			adserver_script.src = GMCU.Utils.addAdtechParams(player.adtech_tag, params);
			player.setScriptOnloadEvent(adserver_script, player.loadSlateCallback);
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(adserver_script);
		}
	};

	this.loadSlateCallback = function () {
		var player = GMCU.DeviceManager.getPlayer();
		if(player.vasts[0] === vast_1) {
			GMCU.EventTrigger.shootEvent({'event' : 'adsLoadFailure', 'message' : encodeURIComponent("ad load failure"), 'url' : encodeURIComponent(location.href)});
		} else {
			player.vasts[1] = vast_1.replace(/__SLATEPARAMS__/g, "^NoOfSlates=" + cunlock_config.no_of_slates + "^CurrentSlate=" + player.current_ad_call);
			player.messages[1] = (typeof message === "undefined") ? "" : message;
		}
		player.initCalled = "api";
		player.callInitFunction();
	};

	this.callInitFunction = function () {
		if(!initFunctionName || !initParams)
			return;

    //Old IE workaround
		var condition = Object.prototype.hasOwnProperty.call(window, initFunctionName);
		if(condition) {
			var initFunction = window[initFunctionName];
			initFunction.apply(null, initParams);
		}
	};

	this.initPlayerWithAds = function (p, backfill_tag) {
		var player = GMCU.DeviceManager.getPlayer();
		var adTimeout = cunlock_config.ad_timeout;

		if(!adTimeout || (typeof adTimeout !== "number")) {
			Logger.log("invalid timeout");
			adTimeout = 5;
		}
		exclusive = (typeof exclusive === "undefined") ? false : exclusive;
		// GMCU.Cunlock.showPlayer();
		if (player.vasts.length === 0) {
			if (backfill_tag === "" || backfill_tag === " " || !backfill_tag) return;
			p.initWithDefault(cunlock_config.bs_swf_location, backfill_tag);
			return;
		} else if (player.initCalled === "wrapper") {

			p.initWithVast(player.vasts[0]);
		} else if (cunlock_config.no_of_slates === 1 || exclusive || player.vasts.length === 1) {
				p.initWithSingleSlate(cunlock_config.bs_swf_location, player.vasts[0], autoplay, backfill_tag, adTimeout, null);
		} else if (cunlock_config.no_of_slates === 2 && player.vasts.length === 2) {
			p.initWithDoubleSlate(cunlock_config.bs_swf_location, player.vasts[0], player.vasts[1], backfill_tag, adTimeout, cunlock_config.banner_message, player.messages[0], player.messages[1], null);
		}
		GMCU.cunlockAdLoaded();
	};
};

GMCU.resizePlayerObjectElements = function() {
	var element = GMCU.DomHandler.$("#" + GMCU.Cunlock.getContentPanel());
	if ( typeof element != 'undefined') {
		if (element) {
			element.style.display = "block";
			var objects = GMCU.DomHandler.$("object", element);
			for (var i = 0, j = objects.length; i < j; i++)
				objects[i].style.width = "100%";
		}
	} else {
		setTimeout("GMCU.resizePlayerObjectElements()", 100);
	}
};

GMCU.loadCUPlayerTimer = function() {
	var player = GMCU.DeviceManager.getPlayer();
	if ( typeof cuplayer === "undefined") {

		GMCU.Logger.log("Waiting for cuplayer load");
		setTimeout("GMCU.loadCUPlayerTimer()", 100);
	} else {

		if (GMCU.Cunlock.load_unit_execute && document.getElementById(GMCU.Cunlock.getContentPanel())) {

			var cuplayerParams = {
				div: GMCU.Cunlock.getContentPanel(),
				swf: GMCU.Config.getPlayerSwf(),
				width: '100%',
				height: GMCU.DeviceManager.getInstance().getLayout().getCUPlayerHeight(),
				muteButtonOn: (cunlock_config.mute_button || false).toString(),
				muteButtonPosition: cunlock_config.mute_button_position
			};

			if (GMCU.isCULite()) {
				var default_tag = cunlock_config.backfill_tag;
				if (!default_tag || default_tag === " " ) {
					GMCU.Cunlock.removeModal();
					return;
				}
				cuplayerParams.adXmlUrl = [default_tag];
			} else {
				if (player.initCalled === "legacy" && typeof initFunctionName === "undefined") {
					cuplayerParams.adXmlUrl = player.getAdsList();
				} else {
					cuplayerParams.apiMode = "true";
				}
			}
			player.cuplayer_instance = cuplayer.setup(cuplayerParams);
		} else {
			player.attempts = player.attempts + 1;
			if ( player.attempts < player.max_attempts)
				setTimeout("GMCU.loadCUPlayerTimer()", 100);
			else
				GMCU.Logger.log("couldn't load the cuplayer");
		}
	}
};

GMCU.cu_onAPIReady = function () {
	var p = cuplayer.getPlayer();
	GMCU.DeviceManager.getPlayer().initPlayerWithAds(p, cunlock_config.backfill_tag);
};

GMCU.AudienceListener = {

	url: 'http://ad.crwdcntrl.net/5/c=1890/pe=y/var=GMAudienceSegmentation',
	enabled: false,
	audiences: [],
	allowed_audiences : [],
	kill: false,
	alt_tag : '',
	processed : false,

	init: function(audience_params) {
		if (GMCU.isCULite()) return;
		if (typeof audience_params != 'undefined') {
			GMCU.AudienceListener.enabled = audience_params.enabled;
			GMCU.AudienceListener.allowed_audiences = audience_params.audience_ids;
			GMCU.AudienceListener.kill = audience_params.kill;
			GMCU.AudienceListener.alt_tag = audience_params.alternative_tag;

			if (GMCU.AudienceListener.enabled)
				GMCU.AudienceListener.loadLotameScript();
		}
	},

	isEnabled: function(){
		return GMCU.AudienceListener.enabled;
	},

	killShouldHappen : function () {
		if (GMCU.AudienceListener.kill && !GMCU.AudienceListener.isAudienceFound())
			return true;
		return false;
	},

	getAlternativeTag : function () {
		return GMCU.AudienceListener.alt_tag;
	},

	isAudienceFound : function(){
		GMCU.AudienceListener.processAudiences();
		for( var i = 0; i < GMCU.AudienceListener.allowed_audiences.length; i++ ){
			for( var j= 0; j < GMCU.AudienceListener.audiences.length; j++ ){
				if( GMCU.AudienceListener.audiences[j] == GMCU.AudienceListener.allowed_audiences[i] ) {
					GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.AUDIENCE_MATCH});
					return true;
				}
			}
		}
		GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.AUDIENCE_NOT_FOUND});
		return false;
	},

	loadLotameScript : function () {
		GMCU.DomHandler.addJS(GMCU.AudienceListener.url);
		GMCU.AudienceListener.processAudiences();
	},

	processAudiences: function() {
		if (!GMCU.AudienceListener.processed) {
			if (typeof GMAudienceSegmentation != 'undefined') {
				try {
					var audiences = GMAudienceSegmentation.Profile.Audiences.Audience;
					if (typeof audiences != 'undefined' && audiences.length > 0) {
						for( var i = 0; i < audiences.length; i++ )
							GMCU.AudienceListener.audiences.push(audiences[i].id);
						GMCU.AudienceListener.printAudiences();
						GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.AUDIENCE_LOADED});
					}
					else {
						GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.AUDIENCE_LOAD_FAILURE});
						GMCU.Logger.log("No audiences were present at the Lotame object");
					}
					GMCU.AudienceListener.processed = true;
				}
				catch(err) {
					GMCU.EventTrigger.shootEvent({'event' : GMCU.Event.AUDIENCE_LOAD_FAILURE});
					GMCU.Logger.log("Lotame object not loaded properly on the page");
					//GMCU.AudienceListener.processed = true;
				}
			} else
				setTimeout("GMCU.AudienceListenerTimer()",50);
		}
	},

	printAudiences: function(){
		GMCU.Logger.log(GMCU.AudienceListener.audiences.toString());
	}
};

GMCU.AudienceListenerTimer = function(){
	GMCU.AudienceListener.processAudiences();
};

GMCU.GeoLocation = {

	script_url : "http://j.maxmind.com/app/country.js",
	script_charset : "ISO-8859-1",
	target_countries : [],

	init: function(target_countries){
		var script = document.createElement("script");
		script.onload = GMCU.DeviceManager.getInstance().loadAsync;
		script.src = this.script_url;
		script.charset = this.script_charset;
		this.target_countries = target_countries;
		document.getElementsByTagName('head')[0].appendChild(script);
	},

	getCountry: function(){
		if ( typeof geoip_country_code == 'function' )
			return geoip_country_code();
		else{
			return 'undefined';
		}

	},

	addCountry: function(new_country){
		var country_found = false;
		for( var i = 0, j = this.target_countries.length; i < j; i++ ){
			if ( new_country === this.target_countries[i] )
				return;
		}
		this.target_countries.push(new_country);
	},

	isAllowedCountry: function(){
		var current_country = this.getCountry();
		if( this.target_countries.length == 0){ //Disable GeoLocation if there isn't countries
			GMCU.Logger.log("Disabling geo target, no countries were defined");
			return true;
		}
		for( var i = 0; i < this.target_countries.length; i++ ){
			if( current_country == this.target_countries[i] )
				return true;
		}
		return false;
	}

};

GMCU.Comscore = {
	
	comscore_url : 'http://b.scorecardresearch.com/p?c1=1&c2=##id##&c3=##c3##&c5=01&cv=2.0&cj=1',
	media_metrix_url : 'http://b.scorecardresearch.com/p?c1=7&c2=##id##&c3=##c3##&cv=2.0&cj=1',
	
	gm_id : '16170130',
	gm_name : 'cu',
	media_metrix_id: '7109298320131093',

	executeComscore: function() {
		this.comscore_url = this.comscore_url.replace("##id##", this.gm_id);
		this.comscore_url = this.comscore_url.replace("##c3##", this.gm_name);		
		GMCU.Utils.shootPixel(this.comscore_url);
	},
	
	executeMediaMetrix : function (media_metrix_enabled) {
		if (media_metrix_enabled != 'undefined' && media_metrix_enabled == true) {
			this.media_metrix_url = this.media_metrix_url.replace("##id##", this.gm_id);
			this.media_metrix_url = this.media_metrix_url.replace("##c3##", this.media_metrix_id);
			GMCU.Utils.shootPixel(this.media_metrix_url);
		}
	}
};


GMCU.LotamePeer39 = {

	enabled : false,

	init: function(enabled, cuLite){
		this.enabled = enabled && !cuLite;
		if( this.enabled ){
			var ad_crwd_script = document.createElement("script");
			ad_crwd_script.type = "text/javascript";
			ad_crwd_script.id = "peer39ScriptAdd";
			ad_crwd_script.src = "http://ad.crwdcntrl.net/5/c=1890/pe=y/var=ccauds";
			document.getElementsByTagName("head")[0].appendChild(ad_crwd_script);

			var crwd_script = document.createElement("script");
	        crwd_script.src = "http://tags.crwdcntrl.net/c/1890/cc.js?ns=_cc1890";
	        //crwd_script.src = "http://vh1.localhost.com/cc.js?ns=_cc1890";
	        crwd_script.id = "LOTCC_1890";
	        crwd_script.type = "text/javascript";
	        document.getElementsByTagName("head")[0].appendChild(crwd_script);
			GMCU.Peer39Integration();
		}else{
			GMCU.Logger.log("PEER39 disabled");
		}
	},

	isEnabled: function(){
		return this.enabled;
	},

	includeScripts: function(){
		var peer_script = document.createElement("script");
		peer_script.id = "peer39ScriptLoader";
		peer_script.type = "text/javascript";
		peer_script.src = "http://stags.peer39.net/1397/trg_1397.js";
		document.getElementsByTagName("head")[0].appendChild(peer_script);
	}
};

GMCU.Peer39Integration = function(){
	GMCU.LotamePeer39.includeScripts();
}

var targets = [];
// Process extraction API call
GMCU.ccaudsloaded = function () {
	//alert(targets+"."+audienceId);
	_cc1890.bcpd();
	GMCU.Logger.log("Peer39+Lotame ready");
}

var p39_ids = '';

function afterFinished_1397(){
	GMCU.afterFinished_1397();
}

GMCU.afterFinished_1397 = function()
{
	if( GMCU.LotamePeer39.isEnabled() ){
		if( typeof _cc1890 != 'undefined' && typeof ccauds != 'undefined' ){
			for(i in ccauds.Profile.Audiences.Audience) {
				var audienceId = ccauds.Profile.Audiences.Audience[i].id;
				var audienceAbbreviation = ccauds.Profile.Audiences.Audience[i].abbr;
				targets[targets.length] = audienceAbbreviation;
			}
			var tagValues  = p39_KVP_Short('p',';').split(";");
			for(i in tagValues){
			  	targets[targets.length]= tagValues[i]; // add to the targets
			    _cc1890.add('p39', tagValues[i]); // add to Lotame BCP
			}
			//p39_ids = p39_KVP_Short('p', '&');
			GMCU.ccaudsloaded();
			// The first argument represents the prefix, and the second argument is the delimiter.
		}else{
			setTimeout("GMCU.afterFinished_1397()",100);
		}
	}
}


GMCU.Lotame = {

	pub_id: 0,
	enabled: false,
	script_url: "http://tags.crwdcntrl.net/c/3434/cc.js?ns=_cc##pub_id##",

	init: function(enabled,pub_id, cuLite){
		this.enabled = enabled && !cuLite;
		this.pub_id = pub_id;
	},

	fire: function(){
		if( this.enabled ){
			var script = document.createElement("script");
			script.id = "LOTCC_" + this.pub_id;
			script.type = "text/javascript";
			script.language = "javascript";
			script.src = this.script_url.replace("##pub_id##", this.pub_id);
			GMCU.BrowserManager.getInstance().attachLoadEvent(script,function(){
				var obj_name = '_cc' + GMCU.Lotame.pub_id;
				if ( typeof window[obj_name] != 'undefined'){
					var obj = window[obj_name];
  					obj.bcp();
  					GMCU.Logger.log("Lotame ::: fired");
				}else{
					GMCU.Logger.log("Lotame ::: " + obj_name + " is undefined");
				}

			});
			document.getElementsByTagName("head")[0].appendChild(script);
		}else{
			GMCU.Logger.log("Pub pixel is disabled");
		}

	}
};

function initContentUnlockWithVideoTagPlayer(unit_width, unit_height, pixel_url, mediaImage, mediaVideo){
	GMCU.initContentUnlockWithVideoTagPlayer(unit_width, unit_height, pixel_url, mediaImage, mediaVideo);
}

function cunlockVideoTagHideUnit(){
	GMCU.cunlockVideoTagHideUnit();
}

function cu_onTemplateLoadSuccess(template) {
	GMCU.onTemplateLoadSuccess(template);
}

function cu_onTemplateLoadFailure(error) {
	GMCU.onTemplateLoadFailure(error);
}

function cu_onVPAIDAdVideoStart(ad, state) {
	GMCU.onVPAIDAdVideoStart(ad,state);
}

function cu_onVPAIDAdStarted(data) {
	GMCU.onVPAIDAdStarted(data);
}

function cu_onLinearAdStart(ad) {
	GMCU.onLinearAdStart(ad);
}

function cu_onAllAdsCompleted(ad, state) {
	GMCU.onAllAdsCompleted(ad, state);
}

function cu_onLinearAdFinish(ad) {
	GMCU.onLinearAdFinish(ad);
}

function cu_onVPAIDAdError(ad, state) {
	GMCU.onVPAIDAdError(ad,state);
}

function cu_onVPAIDAdVideoComplete(ad, state) {
	GMCU.onAllAdsCompleted(ad, state);
}

function cu_displayBanners (banners) {
	GMCU.displayCompanionBanner(banners);
}

function setCunlockSkipButton(enabled,secs,bottom_margin,skip_override, fadeout_time, pixel_url){
	GMCU.setCunlockSkipButton(enabled,secs,bottom_margin,skip_override, fadeout_time, pixel_url);
}

function initContentUnlockWithVideoTagPlayer(unit_width, unit_height, pixel_url, mediaImage, mediaVideo){
	GMCU.initContentUnlockWithVideoTagPlayer(unit_width, unit_height, pixel_url, mediaImage, mediaVideo);
}

function initContentUnlockWithStandaloneSurvey(survey_id, campaign_id){
	GMCU.initContentUnlockWithStandaloneSurvey(survey_id, campaign_id);
}

function initContentUnlockWithInternalPlayer(ad_url, unit_width, unit_height, autoplay, pixel_url, enable_survey, survey_id, campaign_id){
	GMCU.initContentUnlockWithInternalPlayer(ad_url, unit_width, unit_height, autoplay, pixel_url, enable_survey, survey_id, campaign_id);
}

function initContentUnlockWithDefault() {
	GMCU.initContentUnlockWithDefault();
}

function initInternalPlayerWithWrapper (unit_width, unit_height, autoplay, pixel_url, enable_survey, survey_id, campaign_id) {
	GMCU.initInternalPlayerWithWrapper(unit_width, unit_height, autoplay, pixel_url, enable_survey, survey_id, campaign_id);
}

function initContentUnlockWithMobilePlayer(ad_url, unit_width, unit_height, autoplay, pixel_url,enable_survey,survey_id,campaign_id){
	GMCU.initContentUnlockWithMobilePlayer(ad_url, unit_width, unit_height, autoplay, pixel_url,enable_survey,survey_id,campaign_id);
}

function initContentUnlockWithExternalPlayer(player_type, unit_width, unit_height,pixel_url,enable_survey,survey_id,campaign_id){
	GMCU.initContentUnlockWithExternalPlayer(player_type, unit_width, unit_height,pixel_url,enable_survey,survey_id,campaign_id);
}

function contentUnlockSetupJSONPListener(JSONP_config){
	GMCU.contentUnlockSetupJSONPListener(JSONP_config);
}

function initiateLeaveBehind(enabled,mode,url){
	GMCU.initiateLeaveBehind(enabled,mode,url);
}

function GMContentUnlockAsyncEventTriggered(){
	GMCU.GMContentUnlockAsyncEventTriggered();
}

function GMContentUnlockDidReachThreshold(){
	GMCU.GMContentUnlockDidReachThreshold();
}

function getContentUnlockPlayerSelector(){
	return GMCU.getContentUnlockPlayerSelector();
}

function cu_onAPIReady() {
	GMCU.cu_onAPIReady();
}

var GMContentUnlockEventHandler = {
	attachEvent: function(event,callback,callback_params){
		GMCU.EventHandler.attachEvent(event,callback,callback_params);
	},

	dispatchEvent: function(event){
		GMCU.EventHandler.dispatchEvent(event);
	}
};
GMCU.CunlockVideoTagHideUnit = function(){
	GMCU.EventHandler.dispatchEvent("pageWillUnlock");
	GMCU.Cunlock.showMobileContent();
};

GMCU.removeModal = function () {
	GMCU.EventHandler.dispatchEvent("pageWillUnlock");

	GMCU.Cunlock.removeModal();
};

/*** Cunlock Ad Loaded ***/
GMCU.cunlockAdLoaded = function () {
	if (GMCU.Cunlock.adStarted) return;
	GMCU.Cunlock.adStarted = true;
	GMCU.Cunlock.onAdLoaded();
	GMCU.EventHandler.dispatchEvent(GMCU.Event.ADS_LOADED);

	if( GMCU.DeviceManager.getPlayer().autoplay ){
		GMCU.Cunlock.showPlayer();
		return;
	}
};

GMCU.afterVideoAction = function(){
	if( GMCU.Survey.isEnabled() ){
		GMCU.DeviceManager.getPlayer().hideFlashPlayer();
		GMCU.DeviceManager.getPlayer().destroyVideo();
		GMCU.Survey.createSurvey();
		GMCU.Survey.showSurvey();
	}else{
		GMCU.cunlockHideUnit();
	}
};

/*** Cunlock Ad Load Failure ***/
GMCU.cunlockAdLoadFailure = function(error_msg) {
	GMCU.Cunlock.onAdLoadFailure(error_msg);
};

/*** Cunlock Video Start ***/
GMCU.cunlockVideoStart = function () {
	if( !GMCU.DeviceManager.getPlayer().getVideoPlayed() ){
		GMCU.Cunlock.onVideoStart();
		GMCU.DeviceManager.getPlayer().setVideoPlayed(true);
	}
	GMCU.DeviceManager.getPlayer().onAdStart();
	GMCU.SkipAd.activateSkip();
};

GMCU.setCunlockSkipButton = function(enabled,secs,bottom_margin,skip_override, fadeout_time, url){
  GMCU.SkipAd.setPixelUrl(url);
	if (skip_override){
		GMCU.SkipAd.setSkipAd(enabled);
		GMCU.SkipAd.setSkipTime(secs);
		if (bottom_margin)
			GMCU.SkipAd.setSkipAdBottomMargin(bottom_margin);
		if(!!fadeout_time)
			GMCU.SkipAd.setSkipFadeOut(fadeout_time);
	}
};

/*** Cunlock Video Complete occurs ****/
GMCU.cunlockVideoComplete = function () {
	GMCU.Cunlock.onAdComplete();
};

/*** Cunlock skip ad occurs ***/
GMCU.cunlockSkipAd = function() {
	GMCU.Cunlock.onSkipAd();
	GMCU.cunlockHideUnit();
};

/*** Cunlock alternative action occurs ***/
GMCU.cunlockAltActionUnlock = function() {
	GMCU.Cunlock.onAlternativeAction();
	GMCU.EventHandler.dispatchEvent(GMCU.Event.ALT_ACTION_USED);
	GMCU.cunlockHideUnit();
};

/*** Cunlock Playback Error ***/
GMCU.cunlockPlaybackError = function(error_msg) {
	GMCU.Cunlock.onPlaybackError(error_msg);
};

GMCU.cunlockGetAdStartedEventURL = function() {
	return GMCU.Cunlock.getEventUrl(GMCU.Event.AD_PLAYBACK_STARTED);
};

GMCU.cunlockHasAdLoadFailureOccurred = function() {
	return GMCU.Cunlock.hasAdLoadFailureOccurred();
};

GMCU.getContentUnlockPlayerSelector = function(){
	return GMCU.Cunlock.getContentPanel();
};

GMCU.cunlockGetPlayerScript = function(){
	return GMCU.DeviceManager.getPlayer().getContainerScript();
};

GMCU.cunlockHideUnit = function() {
	GMCU.EventHandler.dispatchEvent(GMCU.Event.PAGE_WILL_UNLOCK);

	if (GMCU.isOverlay()) {
		GMCU.DeviceManager.getInstance().getLayout().activateContinue();
	} else {
		GMCU.Cunlock.showContent();

	}
};

GMCU.initContentUnlockWithMobilePlayer = function(mediaImage, mediaVideo) {
    GMCU.Timer.setTemplateLoadSuccess();
    GMCU.DeviceManager.getPlayer().setPlayerMediaFile(mediaImage, mediaVideo);
};

GMCU.initContentUnlockWithStandaloneSurvey = function(survey_id, campaign_id){
	var player = GMCU.DeviceManager.getPlayer();
	player.initCalled = player.initCalled === "api" ? player.initCalled : "legacy";
	GMCU.Timer.setTemplateLoadSuccess();
	GMCU.Survey.init(survey_id,campaign_id ,GMCU.Cunlock.getUnitWidth());
	GMCU.Survey.createSurvey();
	GMCU.Survey.showSurvey();
	GMCU.Cunlock.showPlayer();
};

GMCU.initContentUnlockWithInternalPlayer = function(ad_url, unit_width, unit_height, autoplay, pixel_url,enable_survey,survey_id,campaign_id) {
	var player = GMCU.DeviceManager.getPlayer();
	player.initCalled = player.initCalled === "api" ? player.initCalled : "legacy";

	if (player.initCalled === "legacy" && (typeof initFunctionName === "undefined")) {
		player.setAdUrl(ad_url);
	}
	GMCU.Timer.setTemplateLoadSuccess();
	player.setAutoPlay(autoplay);
	player.setPixelUrl(pixel_url);
	var proportional_height = GMCU.DeviceManager.getInstance().getLayout().getProportionalHeight(unit_width,unit_height);
	GMCU.DeviceManager.getInstance().getLayout().setPlayerHeight(proportional_height+"px");
	player.setPlayerDimensions(GMCU.Utils.getNumber(GMCU.Cunlock.params.unit_width),unit_height);
	player.initBuiltInPlayer();
	GMCU.Survey.init(survey_id, campaign_id ,GMCU.Cunlock.getUnitWidth());
	GMCU.Survey.toggleEnabled(enable_survey);
	if( !player.getAutoPlay() )
		GMCU.Cunlock.showPlayer();
};

GMCU.initInternalPlayerWithWrapper = function (unit_width, unit_height, autoplay, pixel_url, enable_survey, survey_id, campaign_id) {
	var player = GMCU.DeviceManager.getPlayer();
	player.initCalled = "wrapper";
	window.exclusive = true;
	GMCU.Timer.setTemplateLoadSuccess();
	player.setAutoPlay(autoplay);
	player.setPixelUrl(pixel_url);
	var proportional_height = GMCU.DeviceManager.getInstance().getLayout().getProportionalHeight(unit_width,unit_height);
	GMCU.DeviceManager.getInstance().getLayout().setPlayerHeight(proportional_height+"px");
	player.setPlayerDimensions(GMCU.Utils.getNumber(GMCU.Cunlock.params.unit_width),unit_height);
	player.initBuiltInPlayer();
	GMCU.Survey.init(survey_id, campaign_id ,GMCU.Cunlock.getUnitWidth());
	GMCU.Survey.toggleEnabled(enable_survey);
	if( !player.getAutoPlay() )
		GMCU.Cunlock.showPlayer();
};

GMCU.initContentUnlockWithDefault = function () {
	var player = GMCU.DeviceManager.getPlayer();
	player.initCalled = "api";
	GMCU.Timer.setTemplateLoadSuccess();
	player.setAutoPlay(true);
	var unit_width = cunlock_config.unit_width;
	if (typeof unit_width !== "number" && typeof unit_width === "string") {
		unit_width = parseInt(unit_width.match(/[0-9]*/)[0], 10);
	}
	var unit_height = unit_width * 3/4;
	GMCU.DeviceManager.getInstance().getLayout().setPlayerHeight(unit_height + "px");
	player.setPlayerDimensions(GMCU.Utils.getNumber(GMCU.Cunlock.params.unit_width),unit_height);
	player.initBuiltInPlayer();
	if( !player.getAutoPlay() )
		GMCU.Cunlock.showPlayer();
};

GMCU.initContentUnlockWithExternalPlayer = function(player_type, unit_width, unit_height,pixel_url,enable_survey,survey_id,campaign_id) {
	var player = GMCU.DeviceManager.getPlayer();
	player.initCalled = player.initCalled === "api" ? player.initCalled : "legacy";
	player.setAutoPlay(true);
	GMCU.Timer.setTemplateLoadSuccess();
	GMCU.DeviceManager.getInstance().getLayout().setPlayerHeight(unit_height);
	GMCU.DeviceManager.getInstance().getLayout().setPlayerWidth(unit_width);
	GMCU.DeviceManager.getPlayer().initExternalPlayer(pixel_url);
	GMCU.DeviceManager.getPlayer().setPlayerDimensions(unit_width,unit_height);
	GMCU.Survey.init(survey_id, campaign_id ,GMCU.Cunlock.getUnitWidth());
	GMCU.Survey.toggleEnabled(enable_survey);
};

GMCU.contentUnlockSetupJSONPListener = function(JSONP_config){
	GMCU.Timer.setJSONPCallbacks(JSONP_config);
	GMCU.Timer.enableStartCallback();
};

GMCU.initiateLeaveBehind = function(enabled,mode,content){
	GMCU.LeaveBehindBanner.setContent(content);
	GMCU.LeaveBehindBanner.setMode(mode);
	if( !enabled )
		GMCU.LeaveBehindBanner.toggle(false);
};

/*** Alternative Action ***/
GMCU.cunlockSetAltActionHTML = function(html_snippet, html_callback){
	GMCU.AltAction.setAltActionHTML(html_snippet, html_callback);
};

/*** Refresh Threshold ***/
GMCU.GMContentUnlockAsyncEventTriggered = function(){
	if( GMCU.Cunlock.isReady() ){
		GMCU.RefreshThreshold.count();
		GMCU.Logger.log("Threshold ::: " + GMCU.RefreshThreshold.current_count);
		GMCU.GMContentUnlockDidReachThreshold();
	}
};

GMCU.GMContentUnlockDidReachThreshold = function(){
	if( GMCU.RefreshThreshold.hasReachedLimit() && !GMCU.RefreshThreshold.isStopped() ){
		GMCU.Cunlock.pageWillLock();
		GMCU.DeviceManager.getPlayer().loadPlayer();
		GMCU.RefreshThreshold.stopThreshold();
		//GMCU.PlayerFactory.initBuiltInPlayer();
		GMCU.DeviceManager.getPlayer().initBuiltInPlayer();
	}
};

GMCU.cunlockHasReachLimit = function(){
	return GMCU.RefreshThreshold.hasReachedLimit();
};

/**
 * Callback from cuplayer when succeed loading Ads
 */

GMCU.onTemplateLoadSuccess = function(template){
	GMCU.Logger.log("GMCU.onTemplateLoadSuccess(template)");
	// GMCU.cunlockAdLoaded();
};

/**
 * Callback from cuplayer when failed loading Ads
 */

GMCU.onTemplateLoadFailure = function(error){
	GMCU.Logger.log("GMCU.onTemplateLoadFailure(error)");
	GMCU.cunlockAdLoadFailure("Impossible to parse the Ad URL given (invalid value)");
};
/**
 * Callbacks from cuplayer when video Ad starts
 */
GMCU.onVPAIDAdVideoStart = function(ad,state){
	GMCU.Logger.log("in vpaid ad start")

	GMCU.Logger.log("GMCU.onVPAIDAdVideoStart(ad, state)");
	if (ad == undefined)
		GMCU.cunlockPlaybackError("An error has occurred trying to start the Ad");
	else
	{
		GMCU.cunlockAdLoaded();
		GMCU.cunlockVideoStart();
	}
}

GMCU.onVPAIDAdStarted = function(data){
	GMCU.Logger.log("in vpaid ad started")
	GMCU.Logger.log("GMCU.onVPAIDAdStarted(ad, state)");
	if (data == undefined)
		GMCU.cunlockPlaybackError("An error has occurred trying to start the Ad");
	else{
		if( data.adSystem != "BrandSelect" )
			GMCU.cunlockVideoStart();
	}
};

GMCU.onLinearAdStart = function(ad){
	GMCU.Logger.log("in linear ad started");
	GMCU.Logger.log("GMCU.cu_onLinearAdStart(ad)");
	if (ad == undefined)
		GMCU.cunlockPlaybackError("An error has occurred trying to start the Ad");
	else {
		GMCU.cunlockAdLoaded();
		GMCU.cunlockVideoStart();
	}
};

/**
 * Callback from cuplayer when video Ad ends
 */

GMCU.onAllAdsCompleted =  function(ad, state){
	GMCU.Logger.log("GMCU.onAllAdsCompleted(ad, state)");
	if (!GMCU.cunlockHasAdLoadFailureOccurred()) {
		GMCU.Logger.log("Unlocking content");
		GMCU.cunlockVideoComplete();
		GMCU.afterVideoAction();
	}
};

GMCU.onLinearAdFinish = function(ad){
	GMCU.Logger.log("GMCU.onLinearAdFinish(ad)");
	if (GMCU.cunlockHasAdLoadFailureOccurred() )
		GMCU.cunlockPlaybackError("No Ad was selected but the player ended the execution unexpectedly");
	else{
		GMCU.cunlockVideoComplete();
		GMCU.cunlockHideUnit();
	}
};

/**
 * Callback from cuplayer when there's an error on playback
 */
GMCU.onVPAIDAdError =  function(ad, state){
	GMCU.Logger.log("GMCU.cu_onVPAIDAdError(ad, state)");
	GMCU.cunlockPlaybackError("An error has occurred during the playback");
};

// Callback to display companion banners from cuplayer

GMCU.displayCompanionBanner = function (banners) {
	if (!cunlock_config.companion_banner) return;
	var banner = GMCU.Cunlock["companion_banner"];
	cuplayer.displayBanners(banners, banner.id, banner.width, banner.height);
	if (banners.length > 0)
		GMCU.DeviceManager.getInstance().getLayout().animateCompanionCard();
};
GMCU.SessionLogic = {

	expiry_time : 8, //Time in hours
	main_cookie_name : 'cun.user_cookie',
	session_depth : 'session_depth',
	free_views : 'free_views',
	page_locks : 'page_locks',
	unit_expansions : 'unit_expansions',
	ad_started : 'adStarted',
	ad_completed : 'adCompleted',
	total_unlocks : 'total_unlocks',
	free_views_after_unlocking : 'free_views_after_unlocking',
	begin_date : 'begin_date',

	init : function(expiry_time) {
		GMCU.SessionLogic.setExpiryTime(expiry_time);
		var current_cookie = GMCU.CookieHandler.getCookie(GMCU.SessionLogic.main_cookie_name, undefined);
		if (!current_cookie || GMCU.SessionLogic.hasExpired(current_cookie)) {//if not defined, then the cookie must be created
			GMCU.SessionLogic.initCookie();
		}
	},

	initCookie : function() {
		var current_date = new Date();
		var str_cookie = this.session_depth + "=0|" + this.free_views + "=0|" + this.page_locks + "=0|" + this.unit_expansions + "=0|" + this.ad_started + "=0|" + this.ad_completed + "=0|" + this.total_unlocks + "=0|" + this.free_views_after_unlocking + "=0|" + this.begin_date + "=" + current_date.valueOf();
		GMCU.CookieHandler.setCookieWithExpiration(GMCU.SessionLogic.main_cookie_name, str_cookie, "/", GMCU.SessionLogic.expiry_time);
	},

	hasExpired : function(current_cookie) {

		var expiry_date = GMCU.SessionLogic.getValueFromString(this.begin_date, current_cookie);
		if (expiry_date) {
			var old_date = new Date();
			old_date.setTime(expiry_date);
			var new_date = new Date();
			var hours = Math.floor((new_date - old_date) / 3600000);

			GMCU.Logger.log("Old date::::" + old_date.toGMTString());
			GMCU.Logger.log("New date::::" + new_date.toGMTString());
			GMCU.Logger.log("Hours difference::::" + hours);

			if (hours >= GMCU.SessionLogic.expiry_time && !GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getSid(), false)) {
				GMCU.Logger.log("Cookie Expired!");
				return true;
			} else {
				return false;
			}

		} else {
			GMCU.Logger.log("Cookie Expired!");
			return true;
		}
	},

	incrementValue : function(key) {
		var new_value = GMCU.SessionLogic.getValue(key);
		new_value++;
		GMCU.SessionLogic.updateValue(key, new_value);
	},

	updateValue : function(key, value) {
		var current_cookie = GMCU.CookieHandler.getCookie(GMCU.SessionLogic.main_cookie_name, undefined);
		if (current_cookie && !GMCU.SessionLogic.hasExpired(current_cookie)) {
			var temp_str = current_cookie.split(encodeURIComponent("|"));
			for (var i = 0; i < temp_str.length; i++) {
				var tmp = temp_str[i].split(encodeURIComponent("="));
				if (tmp[0] == key) {
					temp_str[i] = key + "=" + value;
					var new_value = "";
					for (var j = 0; j < temp_str.length; j++) {
						new_value += temp_str[j];
						if (j != temp_str.length - 1)
							new_value += "|";
					}
					GMCU.CookieHandler.setCookieWithExpiration(GMCU.SessionLogic.main_cookie_name, decodeURIComponent(new_value), "/", GMCU.SessionLogic.expiry_time);
					GMCU.Logger.log(key + " -> " + decodeURIComponent(new_value));
					return;
				}
			}
		} else {
			GMCU.SessionLogic.initCookie();
			GMCU.SessionLogic.updateValue(key, value);
		}
	},

	getValue : function(key) {
		var current_cookie = GMCU.CookieHandler.getCookie(GMCU.SessionLogic.main_cookie_name, undefined);
		if (current_cookie && !GMCU.SessionLogic.hasExpired(current_cookie)) {
			var temp_str = current_cookie.split(encodeURIComponent("|"));
			for (var i = 0; i < temp_str.length; i++) {
				var tmp = temp_str[i].split(encodeURIComponent("="));
				if (tmp[0] == key) {
					GMCU.Logger.log(key + " = " + tmp[1]);
					return Number(tmp[1]);
				}
			}
		} else {
			GMCU.SessionLogic.initCookie();
			return 0;
		}
	},

	getValueFromString : function(key, str) {
		if (str) {
			var temp_str = str.split(encodeURIComponent("|"));
			for (var i = 0; i < temp_str.length; i++) {
				var tmp = temp_str[i].split(encodeURIComponent("="));
				if (tmp[0] == key) {
					return Number(tmp[1]);
				}
			}
		} else
			return undefined;
	},

	hasMaxLocksPerUserReached : function(max_locks_per_user) {

		if (max_locks_per_user != undefined && max_locks_per_user <= GMCU.SessionLogic.getValue(this.total_unlocks))
			return true;
		return false;
	},

	setExpiryTime : function(time) {
		if (time != undefined)
			GMCU.SessionLogic.expiry_time = time;
	}
};

GMCU.CookieHandler = {

	expiry_in_minutes : 30,
	sid : 'cun.sid',
	free_views_gained : 'cun.free_views_gained',
	free_visits : 'cun.free_visits',
	referral_source : 'cun.referral_source',
	session_depth : 'cun.session_depth',
	user_blocked : 'cun.user_blocked',
	user_blocks: 'cun.user_blocks',

	init: function(expiration){
		GMCU.CookieHandler.expiry_in_minutes = expiration;
	},


	setCookieWithExpiration: function( name, value, path, hours){
		var exdate = new Date();
		exdate.setMinutes ( exdate.getMinutes() + 60 * hours );
		document.cookie = name + '=' + escape(value) + '; expires=' + exdate.toUTCString() + '; path=' + path;
	},

	/**
	 * Sets the value of a cookie. It's created if doesn't exists
	 */
	setCookie : function(name, value, path) {
		var exdate = new Date();
		exdate.setMinutes ( exdate.getMinutes() + GMCU.CookieHandler.expiry_in_minutes );
		document.cookie = name + '=' + escape(value) + '; expires=' + exdate.toUTCString() + '; path=' + path;
	},

	/**
	 * Gets the value of a cookie. Returns a default value if doesn't exists
	 */
	getCookie : function(name, default_value) {

		var result = document.cookie.match(new RegExp(name + '=([^;]*)', 'i'));
		return result === null ? default_value : result[1];
	},

	/**
	 * Returns the free_views_gained value
	 */
	getFreeViewsGained: function(){
		return GMCU.CookieHandler.free_views_gained;
	},

	/**
	 * Returns the free_visits value
	 */
	getFreeVisits: function(){
		return GMCU.CookieHandler.free_visits;
	},

	/**
	 * Returns the referral_source value
	 */
	getReferralSource: function(){
		return GMCU.CookieHandler.referral_source;
	},

	/**
	 * Returns the session id value
	 */
	getSid: function(){
		return GMCU.CookieHandler.sid;
	},

	/**
	 * Returns the session_depth value
	 */
	getSessionDepth: function(){
		return GMCU.CookieHandler.session_depth;
	},

	/**
	 * Returns the user_blocked value
	 */
	getUserBlocked: function(){
		return GMCU.CookieHandler.user_blocked;
	},

	/**
	 * Returns the user_blocks value
	 */
	getUserBlocks: function(){
		return GMCU.CookieHandler.user_blocks;
	},
	/**
	 *	Debug function.
	 * Prints all the cookies
	 */
	printCookiesStatus : function(){
		GMCU.Logger.log("Cookie referral source ::: " + GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getReferralSource(),'/'));
		GMCU.Logger.log("Cookie SID :::" + GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getSid(),'/'));
		GMCU.Logger.log("Cookie post unlock :::" + GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getPostUnlock(),'/'));
		GMCU.Logger.log("Cookie Session Depth ::: " + GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getSessionDepth(), '/'));
		GMCU.Logger.log("Cookie free visits ::: " + GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getFreeVisits(), '/'));
		GMCU.Logger.log("Cookie user blocked ::: " + GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getUserBlocked(), '/'));
		GMCU.Logger.log("Cookie blocks ::: " + GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getUserBlocks(),'/'));
	}

};
//http://gmtools.s3.amazonaws.com/banners/chevy-160.html
GMCU.LeaveBehindBanner = {

	link_ref: '',
    lb_id : 'leaveBehindBanner',
    sponsor_message_id: "sponsored_by",
    close_button_id : 'closebutton',
    whats_is_this_id: 'what_is_this',
    toggle_button_id : 'lb_toggle_button',
    toggle_button_container_id : 'lb_toggle_button_wrapper',
    mode: 0, //0 means script, 1 means iframe
    banner_wrapper: undefined,
    content: '',
    active: false,
    executed_write: false,
    style_ref : '',
    hide_lb_style: '',
    text_ref : undefined,
    banner_ref: undefined,
    visible : 1,
    lb_script_content: "",

    init: function(content,active){
        this.content = content;
        this.active = active;
    },

	setMode: function(mode){
		this.mode = mode;
	},

	getMode: function(){
		return this.mode;
	},

    toggle: function(value){
        this.active = value;
    },

    getStatus: function(){
        return this.active;
    },

    setContent: function(content){
        this.content = content;
    },

    /**
     * Returns a DOM element with the iframe that contains
     * the leave behind banner
     */
    makeBannerLink: function(href,image){
        var link = document.createElement("a");
        link.id = this.iframe_wrapper;
        link.style.width = '185px';
        link.style.height = '660px';
        link.style.scrolling = "no";
        link.style.overflow = "hidden";
        link.style.border = "none";
        link.frameBorder = "0";
        link.style.marginWidth = "0";
        link.style.marginHeight = "0";
        link.style.noResize = "0";
        link.style.allowTransparency = "allowTransparency";
        link.style.frameBorder = "0";
        link.style.zIndex = "1000";
        link.style.position = "fixed";
        link.style.top = (this.getPercentDistance(this.getTopDistance() +25 )) + "%";
        link.style.left = "16px";
        link.href = href;
        link.target = "_blank";
        var img = document.createElement("img");
        img.src = image;
        link.appendChild(img);
		this.banner_ref = link;
        return link;
    },

    /*
     * Returns a DOM element with the leave behind styles
     */
    makeLeaveBehindContainer: function(){
        var leaveBehindBanner = document.createElement("div");
        leaveBehindBanner.id = this.lb_id;
        leaveBehindBanner.style.width = "200px";
        leaveBehindBanner.style.position = "fixed";
        leaveBehindBanner.style.height = "100%";
        leaveBehindBanner.style.top = '0';
        leaveBehindBanner.style.width = "210px";
        leaveBehindBanner.style.right = "auto";
        leaveBehindBanner.style.left = "0px";
        leaveBehindBanner.style.zIndex = "100000000";
        return leaveBehindBanner;
    },

    makeStyleSheet: function(css_code){
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        var text = css_code;
        if (style.styleSheet) {   // for IE
            style.styleSheet.cssText = text;
        } else {                // others
            var textnode = document.createTextNode(text);
            style.appendChild(textnode);
        }
        return style;
    },

    /*
     * Makes the code for the toggle button
     */

    toggleButton: function(){
        var toggle_button = document.createElement("div");
        toggle_button.id = this.toggle_button_container_id;
        toggle_button.style.height = "100%";
        toggle_button.style.width = "35px";
        toggle_button.style.position = "fixed";
        toggle_button.style.top = "0px";
        toggle_button.style.left = "180px";
        toggle_button.style.zIndex = "1000";
        toggle_button.style.background = "url("+ GMCU.Config.base_location  +"/cu/images/dropShadown.gif) ";
        toggle_button.style.backgroundRepeat = "repeat-y";
        toggle_button.style.bgColor = "#fff";
        var button = document.createElement("div");
        button.id = this.toggle_button_id;
        button.style.position = "relative";
        button.style.top = "50%";
        button.style.cursor = "pointer";
        button.style.background = "url("+ GMCU.Config.base_location  +"/cu/images/expArrow.gif) ";
        button.style.width = "18px";
        button.style.height = "34px";

        GMCU.BrowserManager.getInstance().applyLeaveBehindButtonStyle(button);

        toggle_button.appendChild(button);
        GMCU.DomHandler.attachEvent("click",button,GMCU.cunlockToggleCallback);
        return toggle_button;
    },

	getTopDistance: function(){
		var total_height = GMCU.LeaveBehindBanner.getWindowHeight();
		var distance = (total_height - 700) / 2;
		if (distance < 0)
			distance = 0;
		return distance;
	},

	getWindowHeight: function(){
		if ( window.innerHeight )
			return window.innerHeight;
		else
			return document.documentElement.clientHeight;
	},

	getPercentDistance: function(distance){
		var total = GMCU.LeaveBehindBanner.getWindowHeight();
		var percent = (distance*100)/total;
		return percent;
	},

	processMode: function(leaveBehindBanner){
		switch(this.getMode()){
			case 1:
  				leaveBehindBanner.innerHTML += this.content;
				this.banner_wrapper = GMCU.DomHandler.$("iframe",leaveBehindBanner)[0];
  			break;
			case 2:
				var content = this.content.split("$$$");
			 	var link = this.makeBannerLink(content[1],content[0]);
  				leaveBehindBanner.appendChild(link);
  				this.banner_wrapper = link;
  			break;
			default:
			  	var div = document.createElement("div");
        		div.id = "cunlock_lb_div";
        		var script_tag = document.createElement("script");
				script_tag.language ="javascript1.1";
				script_tag.src = GMCU.LeaveBehindBanner.content.split("$$$")[0];
        		document.write = function(content){
        			GMCU.LeaveBehindBanner.lb_script_content += content;
        		};
        		GMCU.BrowserManager.getInstance().attachLoadEvent(script_tag,function(){
					var noscript = GMCU.LeaveBehindBanner.content.split("$$$")[1];
					GMCU.LeaveBehindBanner.banner_wrapper.innerHTML = GMCU.LeaveBehindBanner.lb_script_content + noscript;
				});
				GMCU.LeaveBehindBanner.banner_wrapper = div;
				leaveBehindBanner.appendChild(div);
				leaveBehindBanner.appendChild(script_tag);
		}
	},

    /*
     * Inserts the leave behind banner into the site
     */
    render: function(){
        try{
            document.getElementById("cunlock_playerID").style.width = "0px";
        }catch(e){}
        var leaveBehindBanner = this.makeLeaveBehindContainer();
        var body = GMCU.DomHandler.$("body")[0];
        body.insertBefore(leaveBehindBanner,body.firstChild);
        this.banner_ref = leaveBehindBanner;
        var leaveBehindSponsor = document.createElement("div");
        leaveBehindSponsor.id = this.sponsor_message_id;
        leaveBehindSponsor.innerHTML = "Sponsored by";
        leaveBehindBanner.appendChild(leaveBehindSponsor);
        leaveBehindSponsor.style.fontSize = "14px";
        leaveBehindSponsor.style.fontFamily = "Candara, Arial, Georgia";
        leaveBehindSponsor.style.marginLeft = "16px";
        leaveBehindSponsor.style.textAlign = "center";
        var top_distance = this.getPercentDistance( this.getTopDistance() ) + "%";
        leaveBehindSponsor.style.top = top_distance;
        leaveBehindSponsor.style.paddingTop = "2px";
		leaveBehindSponsor.style.position = "fixed";
        leaveBehindSponsor.style.width = "160px";
        leaveBehindSponsor.style.height = "25px";
        GMCU.BrowserManager.getInstance().applyLeaveBehindSponsorStyle(leaveBehindSponsor);

        this.processMode(leaveBehindBanner);

        leaveBehindBanner.appendChild(this.toggleButton());
        leaveBehindBanner.style.backgroundColor = "#fbfbfb";
        var css = "#" +  this.lb_id + " iframe { left: 16px; overflow: hidden; allow-transparency: allowTransparency; z-index: 1000; position: fixed; top: " + (this.getPercentDistance(this.getTopDistance() +25 )) + "%; } ";
        css += "#" +  this.lb_id + " #cunlock_lb_div { left: 16px; overflow: hidden; allow-transparency: allowTransparency; z-index: 1000; position: fixed; top: " + (this.getPercentDistance(this.getTopDistance() +25 )) + "%; } ";
        var style = this.makeStyleSheet(css + " body { margin: 0 0 0 220px !important; }");
        this.style_ref = style;
        this.hide_lb_style = this.makeStyleSheet(css +  " body { margin: 0 0 0 40px !important; }");
        body.appendChild(style);
        this.text_ref = leaveBehindSponsor;
        GMCU.DomHandler.attachEvent("resize",window,GMCU.cunlockResizeCallback);
    }
};

GMCU.cunlockResizeCallback = function(){
	if( GMCU.LeaveBehindBanner.text_ref){
		GMCU.LeaveBehindBanner.text_ref.style.top = (GMCU.LeaveBehindBanner.getPercentDistance(GMCU.LeaveBehindBanner.getTopDistance() )) + "%";
	}
};

GMCU.cunlockToggleCallback = function(){
    var button_container = document.getElementById(GMCU.LeaveBehindBanner.toggle_button_container_id);
    var banner = GMCU.LeaveBehindBanner.banner_wrapper;
    var button = document.getElementById(GMCU.LeaveBehindBanner.toggle_button_id);
    var sponsor = document.getElementById(GMCU.LeaveBehindBanner.sponsor_message_id);
    var body = GMCU.DomHandler.$("body")[0];
    if ( GMCU.LeaveBehindBanner.visible == 1 ){
        button_container.style.left = "0px";
        banner.style.display = "none";
        body.removeChild(GMCU.LeaveBehindBanner.style_ref);
        body.appendChild(GMCU.LeaveBehindBanner.hide_lb_style);
        button.style.background = "url("+ GMCU.Config.base_location  +"/cu/images/colArrow.gif) ";
        sponsor.style.display = "none";
        GMCU.LeaveBehindBanner.visible = 0;
        banner.style.backgroundColor = "";

    }else{
        button_container.style.left = "180px";
        banner.style.display = "block";
        body.appendChild(GMCU.LeaveBehindBanner.style_ref);
        body.removeChild(GMCU.LeaveBehindBanner.hide_lb_style);
        button.style.background = "url("+ GMCU.Config.base_location  +"/cu/images/expArrow.gif) ";
        GMCU.LeaveBehindBanner.visible = 1;
        banner.style.backgroundColor = "#fbfbfb";
		sponsor.style.display = "block";
    }
};

GMCU.BrandBox = function(){
	
	this.enabled = false;
	this.middle_img_width = 24;
	this.main_div_id = 'content_unlock_brandbox_added_text'; 
	this.text = 'Watch the sponsored video below to access this article';
	this.text_id = 'cunlock_brandbox_text_content';
	this.css = '';
	this.pub_logo_id = 'cunlock_brandbox_pub_logo';
    this.pub_logo_src = '';
    this.max_chars_limit = 140;
    this.font_color = '';
    this.font_size = '';
    this.brandbox_reference = undefined;
    this.bg_color = undefined;
    this.text_box =  undefined;
    this.logo_wrapper = undefined;
    
	this.init = function(enabled, title,img,font_size,font_color,bg_color){
		this.enabled = enabled;
		this.text = title;
		this.pub_logo_src = img;
		this.font_color = font_color;
		this.font_size = font_size;
		this.bg_color = bg_color;
	};
	
	this.getLogoInstance = function(){
		return this.logo_wrapper;
	};
	
	this.getDOMInstance = function(){
		return this.brandbox_reference;
	};
	
	this.setText = function(text){
		this.text = text;
	};
	
	this.setImg = function(img){
		this.pub_logo_src = img;
	};
	
	this.getMainDiv = function(){
		return this.main_div_id;
	};
	
	this.show = function () {
		this.brandbox_reference.style.display = "block";
	};
	
	this.isEnabled = function () {
		return this.enabled;
	};
	
	this.createMainDiv = function(){
		var main_div = document.createElement("div");
		main_div.id = this.main_div_id;
		if ( typeof this.bg_color != 'undefined' )
			main_div.style.background = this.bg_color;
		return main_div;
	};
	
	this.createTextBox = function(){
		var text_box = document.createElement("div");
		text_box.id = this.text_id;
		var text_box_container = document.createElement("div");
		text_box_container.style.color = this.font_color;
		text_box_container.innerHTML = this.text.substring(0,this.max_chars_limit);
		text_box.appendChild(text_box_container);
		
		GMCU.BrowserManager.getInstance().applyBrandBoxTextStyle(text_box, text_box_container);
		
		text_box.style.fontSize = this.font_size;
		text_box.style.color = this.font_color;
		this.text_box = text_box;
		return text_box;
	};
	
	this.createLogoContainer = function(){
		var pub_logo_container = document.createElement("div");
        pub_logo_container.id = this.pub_logo_id;

		var img_container = document.createElement("center");
        var img = document.createElement("img");
        img.src = this.pub_logo_src;	
        img.style.width = "85%";
		img.style.border = "none";
		
		GMCU.BrowserManager.getInstance().applyBrandBoxLogoStyle(pub_logo_container, img_container, img);
        
        img_container.appendChild(img);
        pub_logo_container.appendChild(img_container);
        this.logo_wrapper = pub_logo_container;
        return pub_logo_container;
	};
	
	this.render = function(){
		var main_div = this.createMainDiv();
		var text_box = this.createTextBox();
		var pub_logo_container = this.createLogoContainer();
		if ( this.pub_logo_src != '')
        	main_div.appendChild(pub_logo_container);
		main_div.appendChild(text_box);
		if ( GMCU.AltAction.isAllowed() )
			main_div.appendChild( GMCU.AltAction.render() );
		this.brandbox_reference = main_div;
		this.brandbox_reference.style.display = "none";
		return main_div;
	};
	
	this.onlyTextProperties = function(){
		if ( (this.pub_logo_src == '' || typeof this.pub_logo_src == 'undefined' ) && !GMCU.AltAction.isAllowed() ) {
			var text_element = document.getElementById( this.text_id );
		//	text_element.style.height = "35px";
			GMCU.BrowserManager.getInstance().applyBrandBoxTextSpecialStyle(text_element);
		}
	};
	
	this.setWidth = function(){
		var content_width = GMCU.Cunlock.getUnitWidth() - 2;
		this.brandbox_reference.style.width = content_width + "px";	
		var final_width = 99;
		if ( this.pub_logo_src != '' ) {
			final_width = final_width - 27;
		}
		if( GMCU.AltAction.isAllowed() ){
			final_width = final_width - 18;
		}
		this.text_box.style.width = final_width+"%";
		this.onlyTextProperties();
	};
};
GMCU.AltAction = {

	alt_action_id : 'cunlock_alt_action',
	enabled: false,
	loaded : false,
	type : undefined,
	type_param : undefined,
	container : undefined,
	width: 16,
	html_snippet : '',
	html_callback : undefined,
	cun_identifier : '#GMcunlock',

	init : function (enabled, type, type_param) {
		this.enabled = enabled;
		this.type = type;
		this.type_param = type_param;
	},
	
	isAllowed : function () {
		return this.enabled;
	},

	setHTML: function(html_snippet, html_callback) {
		this.html_snippet = html_snippet;
		this.html_callback = html_callback;
	},

	getHTML: function() {
		return GMCU.AltAction.html_snippet;
	},
	
	getType : function () {
		return this.type;
	},
	
	setWidth: function(width){
		this.width = width;
	},
	
	getWidth: function(){
		return this.width;
	},
	
	render: function(){
		var main_div = document.createElement("div");
		main_div.id = this.alt_action_id;
		main_div.style.width = this.width + "%";
		main_div.style.borderLeft = "1px solid #CCC";
		main_div.style.textAlign = "center";
		GMCU.BrowserManager.getInstance().applyAltActionStyle(main_div);
		
		if( !this.isAllowed() )
			main_div.style.visibility = "hidden";
		this.container = main_div;
		return main_div;
	},
	
	setAltActionHTML : function (html_snippet, callback) {
		if (!GMCU.AltAction.loaded) {
			if (html_snippet != undefined)
				GMCU.AltAction.setHTML(html_snippet, callback);
				
			if (document.getElementById(AltAction.alt_action_id) == null)
				setTimeout("GMCU.setAltActionHTML()",100);
			else
				GMCU.AltAction.loadHTML();			
		}		
	},
		
	loadHTML: function() {
		this.container.innerHTML = this.html_snippet;
		GMCU.AltAction.executeHTMLCode();
		GMCU.AltAction.loaded = true;
	},
		
	loadPredefinedAltAction : function () {
		if (this.type != undefined) {
			switch(this.type) {
				case ("facebook_like_button"):
					GMCU.AltAction.loadFacebookLikeButton();
					//AltAction.container.style.visibility = "visible";
					GMCU.AltAction.loaded = true;
					break;
				default: break;
			}
		}	
	},
	
	loadFacebookLikeButton : function () {
		
		//insert text before the like button
		var paragraph = document.createElement("p");
		paragraph.style.color = "black";
		paragraph.style.margin = "0px";
		paragraph.style.lineHeight = "14px";
		paragraph.style.marginTop = "3px";
		paragraph.style.marginBottom = "5px";
		paragraph.style.fontWeight = "bold";
		paragraph.style.fontSize = "13px";
		paragraph.innerHTML = "Like us to skip this ad";
		this.container.appendChild(paragraph);
		
		// insert like button
		this.container.innerHTML += '<div><fb:like href="' + document.location.href + this.cun_identifier + '" send="false" layout="button_count" width="' + this.width + '" show_faces="false" font="verdana"></fb:like></div>';
		
		// load facebook library
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;				
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));		
		
		setTimeout("GMCU.AltAction.executeFacebookCode()", 1000);	
	},
	
	validateLikeButton : function (url_ref) {
		if (url_ref.indexOf(this.cun_identifier) != -1)
			return true;
		return false;
	},
	
	executeHTMLCode : function () {
		if (GMCU.AltAction.html_callback != undefined) {
			eval(GMCU.AltAction.html_callback);			
		}
	},
	
	executeFacebookCode : function () {
		
		if (document.getElementById('facebook-jssdk')) {
			// multiple facebook like buttons
			if (window.FB) {
				FB.XFBML.parse(this.container);
				GMCU.AltAction.registerFacebookEvents();
			}
			else {
				setTimeout("GMCU.AltAction.executeFacebookCode()",100);
			}
		}
		else {
			// single facebook like button
			window.fbAsyncInit = function() {
				FB.init({
					//appId  : '470772026329179',
					//appId  : '566368126716590',
					status : true,
					cookie : true,
					xfbml  : true
				});
				FB.XFBML.parse(this.container);
				GMCU.AltAction.registerFacebookEvents();
		  	};			
		}
	},
	
	registerFacebookEvents : function () {
		FB.Event.subscribe('edge.create', function(response) {
 			if (GMCU.AltAction.validateLikeButton(response))
 				GMCU.cunlockAltActionUnlock();
		});	
		// FB.Event.subscribe('edge.remove', function(response) {
				// alert('you unliked this');
		// });			
 		// FB.Event.subscribe('auth.login', function(response) {
 				// alert("login event fired");
		// });	
 		// FB.Event.subscribe('auth.logout', function(response) {
 				// alert("logout event fired");
		// });	
 		// FB.Event.subscribe('auth.prompt', function(response) {
 				// alert("prompt event fired");
		// });	
 		// FB.Event.subscribe('xfbml.render', function(response) {
 				// alert("xfbml.render event fired");
		// });
 		// FB.Event.subscribe('auth.authResponseChange', function(response) {
 				// alert("authResponseChange event fired");
 		// });
 		// FB.Event.subscribe('auth.statusChange', function(response) {
 				// alert("statusChange event fired");
 		// });			
	},
	
	repairFacebookStyle : function () {
		var fb_iframe = !!document.getElementById(GMCU.AltAction.alt_action_id) ? document.getElementById(GMCU.AltAction.alt_action_id).getElementsByTagName("iframe")[0] : undefined;
		var fb_span = document.getElementById(GMCU.AltAction.alt_action_id).getElementsByTagName("span")[0];
		if (typeof fb_iframe == 'undefined' || typeof fb_span == 'undefined')
			setTimeout("GMCU.AltAction.repairFacebookStyle()", 100);
		else {
			fb_span.style.height = '20px';
			fb_span.style.width = '71px';
			fb_iframe.style.height = '20px';
			fb_iframe.style.width = '71px';
			fb_iframe.style.position = "relative";	
		}
	}
};
GMCU.Layout = function(params){

	this.instance = undefined;
	this.brandbox = undefined;
	this.unit_main_container = undefined;

	this.params = params;

	this.render = function() {};

	this.getBrandBox = function(){
		return this.brandbox;
	};

	this.createFooter =  function(){};

	this.getProportionalHeight = function(unit_width,unit_height){};

	this.setPlayerHeight =  function(height){};

	this.hideContent = function(){};

	this.createCUContentWrapper = function() {};

	this.createDOMElements = function(){};

	this.createVideoContainer = function() {};

	this.appendDOMElements = function() {};

	this.applyBrandBoxStyles = function(){};

	this.addStyleSheets = function() {};

	this.createBrandBox = function(){
		this.brandbox = new GMCU.BrandBox();
		this.brandbox.init(GMCU.Cunlock.params.brandbox_enabled, GMCU.Cunlock.params.brandbox_message, GMCU.Cunlock.params.brandbox_logo_URL, GMCU.Cunlock.brandbox_font_size, GMCU.Cunlock.params.brandbox_font_color,GMCU.Cunlock.params.brandbox_bg_color);
		this.brandbox.render();
	};

	this.showBrandBox = function(){
		if ( this.brandbox.isEnabled()){
			this.brandbox.setWidth();
			this.applyBrandBoxStyles();
			this.brandbox.show();
			if ( GMCU.AltAction.isAllowed())
				GMCU.AltAction.repairFacebookStyle();
		}
	};

	this.buildUnit = function(params) {
		this.createDOMElements();
		this.appendDOMElements();
		this.addStyleSheets();
		return this.unit_main_container;
	};

	this.setSkipAdPosition = function () {
		var unit_width = GMCU.Cunlock.getUnitWidth();
		var player_width =  GMCU.Utils.getNumber(GMCU.DeviceManager.getPlayer().width);
		var unit_player_distance = (Number(unit_width) - Number(player_width) ) / 2;
		var skip_ad = document.getElementById(GMCU.Cunlock.getSkipAdId());
		if (GMCU.DeviceManager.getPlayer().isBuiltInPlayer())
			var position_left = Number(player_width) - Number(GMCU.Utils.getNumber(skip_ad.style.width)) - 10;
		else
			var position_left = unit_player_distance + Number(player_width) - Number(GMCU.Utils.getNumber(skip_ad.style.width));
		skip_ad.style.left = position_left + "px";
		skip_ad.style.marginTop = "-" + GMCU.SkipAd.bottom_margin + "px";
	};


	this.getSkipText = function (unlock_allowed) {
		if (!unlock_allowed)
			return this.params.panel_skip_ad_text.replace('##','<span style="width: 15px;  display : inline-block" id="' + this.params.panel_skip_timer_id + '">' + this.params.skip_time + '</span>');
		else
			return this.params.panel_skip_ad_text_unlock;
	};
};

GMCU.OverlayLayout = function(params) {

	GMCU.Layout.apply(this, arguments);
	this.parent = new GMCU.Layout();

	this.font_path = "http://fonts.googleapis.com/css?family=Open+Sans";

	this.text = undefined;
	this.overlay_bg = undefined,
	this.containerScaler = undefined;
	this.wrapper = undefined;
	this.gm_logo = undefined;
	this.footer = undefined;
	this.footerRight = undefined;
	this.center_element = undefined;
	this.current_pixel_width = "";
	this.current_pixel_height = "";
	this.footerLeft = undefined;
    this.logo= undefined;
    this.infoButton = "",
    this.brandLogo = "",
    this.brandBox = "",
	this.addStyleSheets = function() {

        var link = document.createElement("link");
        link.href = this.font_path;
        link.type = "text/css";
        link.rel = "stylesheet";
        GMCU.DomHandler.$('head')[0].appendChild(link);
        var css_code = "." + this.params.panel_collapsed_class + " a:hover{text-decoration: none;}\n";
        css_code += "." + this.wrapper.className + "{position: fixed; -webkit-box; -webkit-box-align: center; -webkit-align-items: center; align-items: center; -webkit-box-pack: center; -moz-box-pack: center; height: 100%; width: 100%; top: 0; z-index: 999;}\n";
        css_code += "#" + this.containerScaler.id + "{min-height: 10px; min-width: 10px; margin: auto !important; position: relative; width:100%;}\n";
        css_code += "." + "landscape-" + this.wrapper.className + "{position: fixed; display: -webkit-box; -webkit-box-align: center; -webkit-align-items: center; align-items: center; -webkit-box-pack: center; -moz-box-pack: center; height: 100%; margin-left: 3%;  top: 0; z-index: 999;}\n";
        css_code += "#" + this.wrapper.className + "{position: fixed; display: -webkit-box; -webkit-box-align: center; -webkit-align-items: center; align-items: center; -webkit-box-pack: center; -moz-box-pack: center; height: 100%; width: 100%; top: 0; z-index: 999;}\n";
        css_code += "body { height: 100%; overflow: hidden; }";
        css_code += "#" + this.center_element.id + "{min-height: 10px; min-width: 10px; margin: 0 auto !important; position: relative; width:100%; display: block; }"
        css_code += "#" + this.brandbox.getDOMInstance().id + "{ left: 0px; z-index: 999; }"
        css_code += "#" + this.brandbox.logo_wrapper.id + "{ text-align:center; margin: 0 auto; }"
        css_code += "#" + this.brandbox.text_id + "{ text-align: center; margin:0 auto;}"
        css_code += "#brandbox{background-color:rgba(0,0,0,0.5);} "
        css_code += "." + this.overlay_bg.className + "{ background-image: -webkit-linear-gradient(top, rgba(0,0,0,1.0) 0%, rgba(0,0,0,.6) 40%,  rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.8) 100%) }";
        css_code += "#landscape-containerScaler {min-height: 10px; min-width: 10px; margin: auto !important; position: relative; width: 100%;}"
        css_code += "#cu_footer{ background-color:rgba(0,0,0,0.4);}"
        css_code += "#centerElementBezel{background-color:rgba(0,0,0,0.4);}"


		GMCU.DomHandler.makeStyleSheet(css_code);
	};

	this.createDOMElements = function() {
		console.log("CreateDOMElements");
		//create fixed background overlay
		this.containerScaler = document.createElement('div');
		this.containerScaler.id = "videotagscaler";
        this.video_tag_embed = document.createElement("video");
        this.video_tag_embed.src = this.mediaVideo;
        this.video_tag_embed.id = "mediaVideo";
        this.video_tag_embed.setAttribute("controls", true);
        this.video_tag_embed.setAttribute("autoplay", true);
        this.video_tag_embed.setAttribute("width", '100%');
        this.video_tag_embed.setAttribute("height", '100%');
        this.createBrandBox();
		this.showBrandBox();
        this.center_element = document.createElement("center");
        this.center_element.id = "centerElement";
		this.createVideoContainer();
		this.video_tag_embed.setAttribute("poster", GMCU.DeviceManager.getPlayer().mediaImage);
		this.video_tag_embed.src = GMCU.DeviceManager.getPlayer().getAdsUrl();
        this.createFooter();
        this.createText();
	};

	this.createFooter =  function(){
		var footer = document.createElement("div");
        footer.id = "cuFooter";
        footer.style.width = "100%";
        footer.style.height = "60px";
        this.footerLeft = document.createElement("div");
        this.footerLeft.id = "footerLeft";
        this.footerLeft.style.paddingTop = "9px";
        this.footerLeft.style.paddingLeft = "2%";
        this.footerLeft.style.textAlign = "left";
        this.footerLeft.style.width = "50%";
        this.footerLeft.style.styleFloat = "left";
        this.footerLeft.style.cssFloat = "left";
        this.footerLeft.style.fontFamily = "Arial";
        this.footerLeft.style.color = "#FFF";
        this.footerLeft.innerHTML = "Private Policy | Send Feedback";
        var footerRight = document.createElement("div");
        footerRight.style.width = "40%";
        footerRight.style.paddingRight = "2%";
        footerRight.style.styleFloat = "right";
        footerRight.style.cssFloat = "right";
        footerRight.style.paddingTop = 0;
        this.gm_logo = document.createElement("img");
        this.gm_logo.style.styleFloat = "right";
        this.gm_logo.style.cssFloat = "right";
        this.gm_logo.style.marginTop = "3px";
        this.gm_logo.src =  "/cu/images/genesis_logo.png";
        footerRight.appendChild(this.gm_logo);
        footer.appendChild(this.footerLeft);
        footer.appendChild(footerRight);
        this.footerRight = footerRight;
        this.footer = footer;
	};

	this.createVideoContainer = function() {
		this.wrapper = document.createElement('div');
        this.wrapper.className = "cunlock_contentgoeshere";
        this.wrapper.id = "cunlock_contentgoeshere";
        this.wrapper.style.zIndex = "999";
        this.wrapper.style.margin = "0 auto";
        this.wrapper.style.position = "fixed";
        this.wrapper.style.height = "100%";
        this.wrapper.style.width = "100%";
        this.wrapper.style.top = "0";
	};

	this.createText = function () {
        var text = document.createElement("div");
        text.id = "cunlock-overlay-text";
        text.style.width = "100%";
        text.style.color = "#FFF";
        text.style.paddingTop = "2%";
        text.style.paddingBottom = "2%";
        text.style.fontFamily = "'Open Sans'";
        text.style.position = "relative";
        text.style.fontSize = "2em";
        text.style.lineHeight = "100%";
        text.innerHTML = cunlock_config.brandbox_message;
        this.text = text;
    };

	this.appendDOMElements = function() {

		this.center_element.appendChild(this.brandbox.getDOMInstance());
        this.center_element.appendChild(this.containerScaler);
        this.center_element.appendChild(this.footer);
        this.center_element.appendChild(this.text);
        this.wrapper.appendChild(this.center_element);
        this.containerScaler.appendChild(this.video_tag_embed);
        GMCU.DeviceManager.getPlayer().addPixelEvents(this.video_tag_embed);
	};

	this.render = function() {
		this.overlay_bg = document.createElement('div');
        this.overlay_bg.className = "cu-overlay";
        this.overlay_bg.style.position = "fixed";
        this.overlay_bg.style.width = "100%";
        this.overlay_bg.style.height = "100%";
        this.overlay_bg.style.opacity = "0.9";
        this.overlay_bg.style.zIndex = "1";
        this.createDOMElements();
		this.appendDOMElements();
		document.body.insertBefore(this.overlay_bg, document.body.firstChild);
		document.body.insertBefore(this.wrapper);
		this.addStyleSheets();
		GMCU.DeviceManager.getInstance().orientationChange();
		return this.overlay_bg;
	};



	this.applyBrandBoxStyles = function(){
		var brandbox_main_wrapper = this.brandbox.getDOMInstance();
		if( brandbox_main_wrapper && typeof brandbox_main_wrapper != 'undefined' ){
			brandbox_main_wrapper.style.backgroundColor = "rgba(0,0,0,0.6)";
			brandbox_main_wrapper.style.width = "100%";
			var brandbox_text = this.brandbox.text_box;
			brandbox_text.style.display = "none";
			var brandbox_logo = this.brandbox.logo_wrapper;
			brandbox_logo.id = "brandbox-logo";
        	brandbox_logo.style.display = "";
        	brandbox_logo.style.width = "100%";
        	brandbox_logo.style.paddingTop = "3%";
        	brandbox_logo.style.paddingBottom = "3%";
			var brandbox_img = GMCU.DomHandler.$("img", brandbox_logo)[0];
			brandbox_img.style.width = "30%";
		}
	};

	this.hideContent = function(){};
};GMCU.DesktopOverlayLayout = function (params) {

    GMCU.Layout.apply(this, arguments);
    this.parent = new GMCU.Layout();

    this.font_path = "http://fonts.googleapis.com/css?family=Open+Sans";

    this.text = undefined;
    this.overlay_bg = undefined;
    this.containerScaler = undefined;
    this.wrapper = undefined;
    this.gm_logo = undefined;
    this.footer = undefined;
    this.footerRight = undefined;
    this.center_element = undefined;
    this.current_pixel_width = "";
    this.current_pixel_height = "";
    this.footerLeft = undefined;
    this.logo = undefined;
    this.brandLogo = "";
    this.brandBox = "";
    this.cuPlayerHeight = "100%";
    this.advertisementBox = "";

    this.addStyleSheets = function () {
        var link = document.createElement("link");
        link.href = this.font_path;
        link.type = "text/css";
        link.rel = "stylesheet";
        GMCU.DomHandler.$('head')[0].appendChild(link);
        var css_code = ".cunlock_contentgoeshere a:hover{text-decoration: none;}\n";
        css_code += "#cunlock_contentgoeshere {width: 60%;height: 600px;overflow: hidden;margin: auto;position: absolute;top: 0;left: 0;bottom: 0;right: 0;z-index: 9999;}\n";
        css_code += "#" + this.containerScaler.id + "{background-image: #181818; background-color: #F2F1F1; max-height: 800px;}\n";
        css_code += "#brandbox { background-color: rgba(0, 0, 0, 1);background-image: #3c3d3f;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#282929\", endColorstr=\"#000000\", GradientType=0);z-index: 999; position: absolute }\n";
        css_code += "." + this.overlay_bg.className + "{ background-color: black; opacity: .8;  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=75); filter: alpha(opacity=75); }\n";

        css_code += ".cardWrapper { overflow: visible; width: 0px; margin: auto;top: 0; left: 0; bottom: 0; right: 0; cursor: pointer;  -webkit-font-smoothing: antialiased; }\n";
        css_code += ".cardFace { position: absolute; width: 300px; height: 250px; overflow: hidden; }\n";
        css_code += ".front { background-color: #333; }\n";
        css_code += ".cardFace h1 { margin: 0px; font-size: 30px; padding: 10px 0px 10px 10px; border-bottom: solid 6px #aaa; border-top: solid 6px #aaa; background-color: black; color: white; }\n";
        css_code += ".cardFace.back h1 { border-color: #91e600; }\n";
        css_code += "moreInfo { padding: 10px; color: white; line-height: 24px; }\n";
        css_code += ".cuSlate { }\n";
        css_code += ".cardResponsiveContainer { width: 300px; height: 250px; display: inline-block; background-color: black; }\n";
        css_code += "#footerLeft a { color:black !important; }\n";
        css_code += ".cu_locked { overflow: hidden; height: 100% }\n";
        css_code += ".cu_locked_body { margin: 0; padding: 0; min-height: 700px; }";
        GMCU.DomHandler.makeStyleSheet(css_code);
    };

    this.createDOMElements = function () {
        this.defaultFrameSize = 70;
        this.defaultVideoSize = 80;


        this.overlay_bg = document.createElement('div');
        this.overlay_bg.className = "cu-overlay";
        this.overlay_bg.style.width = "100%";
        this.overlay_bg.style.height = "100%";
        this.overlay_bg.style.zIndex = "1";
        this.overlay_bg.style.display = "block";
        this.contentgoeshere_class = document.createElement('div');
        this.contentgoeshere_class.className = "cunlock_contentgoeshere";
        this.contentgoeshere_class.id = "cunlock_contentgoeshere";
        this.contentgoeshere_class.style.width = "100%";

        this.cuSlate = document.createElement('div');
        this.cuSlate.className = "cuSlate";

        this.containerScaler = document.createElement('div');
        this.containerScaler.id = "containerScaler";
        this.containerScaler.maxWidth = "800px";

        this.video_wrapper = document.createElement('div');
        this.video_wrapper.className = "video_wrapper";
        this.video_wrapper.id = "video_wrapper";

        this.buildBrandBox();
        this.buildFooter();
        this.buildText();

        this.cardResponsiveContainer = document.createElement('div');
        this.cardResponsiveContainer.className = "cardResponsiveContainer";

        this.card_wrapper = document.createElement('div');
        this.card_wrapper.className = "cardWrapper";

        this.card = document.createElement('div');
        this.card.className = "card";

        this.companion = document.createElement('div');
        this.companion.id = GMCU.Cunlock.companion_banner.id;
        this.companion.className = "cardFace front";

        this.advertisementBox = document.createElement('div');
        this.advertisementBox.className = "advertisementBox";
        this.input = document.createElement("input");
        this.input.type = "hidden";
        this.input.id = GMCU.Cunlock.input_flag;
        this.input.value = "0";

        this.appendDOMElements();
    };

    this.appendDOMElements = function () {
        document.body.insertBefore(this.overlay_bg, document.body.firstChild);
        document.body.insertBefore(this.contentgoeshere_class, document.body.firstChild);

        this.centerElement = document.createElement("div");
        this.centerElement.id = "centerElement";
        this.centerElement.appendChild(this.brandBox);
        this.centerElement.appendChild(this.cuSlate);
        this.cuSlate.appendChild(this.containerScaler);
        this.centerElement.appendChild(this.footer);
        this.centerElement.appendChild(this.text);
        this.contentgoeshere_class.appendChild(this.centerElement);
        this.contentgoeshere_class.appendChild(this.input);

        this.containerScaler.appendChild(this.video_wrapper);
        this.containerScaler.appendChild(this.cardResponsiveContainer);
        this.cardResponsiveContainer.appendChild(this.card_wrapper);
        this.card_wrapper.appendChild(this.card);
        this.card.appendChild(this.companion);
        this.setSize();
    };

    this.buildFooter = function () {
        this.footer = document.createElement("div");
        this.footer.id = "cuFooter";
        this.footer.style.position = "relative";
        this.footerLeft = document.createElement("div");
        this.footerLeft.id = "footerLeft";
        this.footerLeft.style.paddingTop = "5px";
        this.footerLeft.style.paddingLeft = "0";
        this.footerLeft.style.left = "0px";
        this.footerLeft.style.top = "0px";

        this.footerLeft.style.textAlign = "left";
        this.footerLeft.style.width = "200px";
        this.footerLeft.style.position = "absolute";
        this.footerLeft.style.fontFamily = "Arial";
        this.footerLeft.style.fontSize = "12px";

        this.footerLeft.style.fontFamily = "arial";
        this.footerLeft.style.fontSize = "12px";
        this.footerLeft.style.textDecoration = "none";
        this.footerLeft.style.fontStyle = 'normal';
        this.footerLeft.style.fontWeight = 'normal';

        this.footerRight = document.createElement("div");
        this.footerRight.style.width = "200px";
        this.footerRight.style.paddingRight = "0";
        this.footerRight.style.paddingTop = "2%";
        this.footerRight.style.styleFloat = "right";
        this.footerRight.style.cssFloat = "right";
        this.footerRight.style.paddingTop = "4px";
        this.footerRight.style.paddingBottom = "0";
        this.gmLogo = document.createElement("img");
        this.gmLogo.style.right = "0";
        this.footerRight.appendChild(this.gmLogo);
        this.footer.appendChild(this.footerLeft);
        this.footer.appendChild(this.footerRight);
    };

    this.buildBrandBox = function () {
        this.brandBox = document.createElement("div");
        this.brandBox.id = "brandbox";
    };

    this.buildBrandLogo = function () {
        /****** Brandbox logo *****/
        this.brandLogo = document.createElement("div");
        this.brandLogo.id = "brandbox-logo";
        this.brandLogo.style.width = "100%";
        this.brandLogo.style.paddingTop = "1%";
        this.brandLogo.style.paddingBottom = "1%";
        this.brandLogoImg = document.createElement('img');
        this.brandLogoImg.style.width = "100%";
        this.brandLogoImg.style.height = "auto";
        this.brandLogoImg.src = cunlock_config.brandbox_logo_URL;
        this.brandLogo.appendChild(this.brandLogoImg);
        /****** Brandbox text *****/
        this.brandBox.appendChild(this.brandLogo);
        this.brandLogo.style.maxWidth = "200px";
        this.brandLogo.style.marginLeft = "auto";
        this.brandLogo.style.marginRight = "auto";
        GMCU.com.greensock.TweenLite.to(layout.brandLogoImg, {
            width: this.defaultVideoSize + "%"
        }, 0.1);

    },

        this.buildText = function () {
            this.brandbox_text = document.createElement("div");
            this.brandbox_text.id = "brandbox-text";
            this.brandbox_text.style.width = "100%";
            this.brandbox_text.style.color = "#000";
            this.brandbox_text.style.paddingTop = "20px";
            this.brandbox_text.style.paddingBottom = "35px";
            this.brandbox_text.style.fontFamily = "'Open Sans'";
            this.brandbox_text.style.position = "relative";
            this.brandbox_text.style.fontSize = "2em";
            this.brandbox_text.style.lineHeight = "100%";
            this.brandbox_text.style.textAlign = "center";
            this.brandbox_text.style.borderTop = "1px solid #D7D7D7";
            this.brandbox_text.style.width = this.defaultVideoSize + "%";
            this.brandbox_text.style.height = "15px";
            this.brandbox_text.innerHTML = cunlock_config.brandbox_message;
            this.text = this.brandbox_text;
        };


    this.setSize = function () {
        var layout = GMCU.DeviceManager.getInstance().getLayout();
        var browser = GMCU.UserAgentManager.getBrowser();
        this.setImages();

        this.topElement = document.createElement('div');
        this.topElement.id = "topElement";

        this.extendLayout();

        this.footer.style.height = "100px";
        this.containerScaler.id = "containerScaler";
        this.contentgoeshere_class.className = "contentgoeshere_class";
        this.contentgoeshere_class.style.zIndex = 999;
        this.containerScaler.style.width = this.defaultFrameSize + "%";
        this.brandBox.style.width = "100" + "%";
        this.footer.style.width = (this.defaultVideoSize) + "%";
        this.footer.style.margin = "auto";
        this.text.style.margin = "auto";
        this.containerScaler.style.margin = "auto";
        this.containerScaler.style.textAlign = "center";

        this.centerElement.style.minWidth = "930px";


        this.footer.height = this.footer.offsetHeight;
        this.text.style.fontSize = "2em";
        GMCU.TextResizer.fitText(this.text, 4.1);
        GMCU.TextResizer.fitText(this.footerRight, 1.6);
        this.overlay_bg.style.position = "absolute";
        this.overlay_bg.style.top = "0";
        this.overlay_bg.style.left = "0";
        //set top margin for ie 7 because it can't vertical align
        if (browser === "MSIE 7") {
            this.contentgoeshere_class.style.marginTop = "50px"
        }
        //set companion
        this.card_wrapper.style.width = "300px";
        this.card_wrapper.style.height = "250px";
        this.card_wrapper.style.cursor = "pointer";
        this.card_wrapper.style.position = "absolute";
        this.card_wrapper.style.styleFloat = "right";
        this.card_wrapper.style.cssFloat = "right";
        this.companion.style.position = "absolute";
        this.companion.style.width = "300px";
        this.companion.style.height = "250px";
        this.companion.style.backgroundColor = "#333";
        this.video_wrapper.style.height = "300px";
        this.video_wrapper.style.width = this.defaultVideoSize + "%";
        this.cuSlate.style.width = "100%";
        this.card.style.height = "250px";
        this.card.style.width = "300px";
        this.cardResponsiveContainer.style.width = "35%";
        this.cardResponsiveContainer.style.minWidth = "300px";
        this.cardResponsiveContainer.style.height = "300px";
        this.cardResponsiveContainer.style.position = "absolute";
        this.cardResponsiveContainer.style.display = "inline-block";
        this.cardResponsiveContainer.style.overflow = "hidden";
        this.video_wrapper.style.display = "block";
    };

    this.extendLayout = function () {

        this.contentgoeshere_class.parentNode.insertBefore(this.brandBox, this.contentgoeshere_class);
        // if ie7 this.contentgoeshere_class.top = "50px";
        this.video_wrapper.parentNode.insertBefore(this.advertisementBox, this.video_wrapper);
        this.video_wrapper.parentNode.insertBefore(this.brandbox_text, this.video_wrapper);
        this.advertisementBox.style.background = "#f2f2f2";
        this.advertisementBox.text = document.createElement('div');
        this.advertisementBox.text.id = "text";
        this.advertisementBox.text.innerHTML = GMCU.Utils.trimString(this.params.modal_title_label, 20);
        this.advertisementBox.text.style.textTransform = "uppercase";
        this.advertisementBox.text.style.color = "black";
        this.advertisementBox.text.style.fontFamily = "arial";
        this.advertisementBox.text.style.fontSize = "12px";
        this.advertisementBox.text.style.position = "relative";
        this.advertisementBox.text.style.top = "0px";
        this.advertisementBox.text.style.left = "0px";
        this.advertisementBox.text.style.textAlign = "left";
        this.advertisementBox.text.style.cssFloat = "left";
        this.advertisementBox.text.style.styleFloat = "left";
        this.advertisementBox.top = "0";
        this.advertisementBox.left = "0";
        this.advertisementBox.style.width = this.defaultVideoSize + "%";
        this.advertisementBox.style.height = "80px";
        this.advertisementBox.style.display = "inline-block";
        this.containerScaler.appendChild(this.footer);

        var skipAd = document.createElement('div');
        skipAd.style.position = "relative";
        skipAd.style.styleFloat = "right";
        skipAd.style.cssFloat = "right";
        skipAd.style.paddingTop = "30px";
        skipAd.id = this.params.panel_skip_ad_id;
        skipAd.style.visibility = "hidden";
        skipAd.style.width = "300px";
        skipAd.style.height = "40px";
        var skipLink = document.createElement('a');
        skipLink.id = this.params.panel_skip_link_id;
        skipLink.style.cursor = "default";
        skipLink.style.fontFamily = "arial";
        skipLink.style.fontSize = "12px";
        skipLink.style.textDecoration = "none";
        skipLink.style.fontStyle = 'normal';
        skipLink.style.fontWeight = 'normal';
        skipLink.style.styleFloat = 'left';
        skipLink.style.cssFloat = 'left';
        skipLink.style.textAlign = 'left';
        skipLink.style.marginTop = '13px';
        skipAd.appendChild(skipLink);
        var skipImgWrapper = document.createElement('div');
        skipImgWrapper.style.display = "inline-block";
        skipImgWrapper.style.width = "38px";
        skipImgWrapper.style.height = "38px";
        var skipImg = document.createElement('img');
        skipImg.src =  this.skipImage();
        skipImg.style.marginTop = "0";
        skipImg.style.marginLeft = "0";
        skipImg.style.height = "38px";
        skipImg.style.width = "38px";
        skipImg.style.cursor = "default";
        skipImg.id = "cu-skip-image";
        skipImg.style.cssFloat = "right";
        skipImg.style.styleFloat = "right";
        this.advertisementBox.skipAd = skipAd;
        this.advertisementBox.skipLink = skipLink;
        this.advertisementBox.text.style.width = "150px";
        this.advertisementBox.text.style.display = "block";
        this.advertisementBox.text.style.marginTop = "42px";
        this.advertisementBox.appendChild(this.advertisementBox.text);
        this.advertisementBox.appendChild(this.advertisementBox.skipAd);
        skipAd.appendChild(skipImgWrapper);
        skipImgWrapper.appendChild(skipImg);
        skipLink.style.color = this.skipColor();
        skipLink.style.paddingLeft = "10px";
        skipLink.style.styleFloat = "left";
        skipLink.style.cssFloat = "left";
        skipLink.style.width = "auto";

        document.body.removeChild(this.brandBox);
    },

    this.skipColor = function () {
        return GMCU.SkipAd.enable_skip ? "#1085FE" : "#606060";
    };

    this.skipImage = function () {
        return (cunlock_config.pub_site + (GMCU.SkipAd.enable_skip ?  "/cu/assets/images/arrow_blue.png" : "/cu/assets/images/arrow_gray.png"));
    };

    this.setImages = function () {
        this.gmLogo.src = cunlock_config.pub_site + "/cu/assets/images/genesis_logo_light_desktop.png";
        this.gmLogo.style.width = "200px";
        this.gmLogo.style.height = "18px";
        this.footerLeft.innerHTML = "<a style = \"font-size: 10px; text-decoration : none; font-style : normal; font-weight : normal;\"href=\"http://www.genesismedia.com\">Privacy Policy | </a> <a style = \"font-size: 10px; text-decoration : none; font-style : normal; font-weight : normal;\" href=\"mailto:support#genesismedia.com\"> Send Feedback</a>";
        this.footer.style.backgroundColor = "#F2F1F1";

    };

    this.setTweenLiteStyles = function () {
        GMCU.com.greensock.TweenLite.set(".cardWrapper", {
            perspective: 800
        });
        GMCU.com.greensock.TweenLite.set(".card", {
            transformStyle: "preserve-3d"
        });
        GMCU.com.greensock.TweenLite.set(".card", {
            rotationY: 90
        });
        GMCU.com.greensock.TweenLite.set([".front"], {
            backfaceVisibility: "hidden"
        });
        this.cardResponsiveContainer.style.minWidth = "0";
        this.cardResponsiveContainer.style.width = "0";
    };

    this.render = function () {
        this.createDOMElements();
        this.addStyleSheets();
        this.setTweenLiteStyles();
        this.hideOverlay();
    };

    this.hideOverlay = function () {
        this.overlay_bg.style.width = "0%";
        this.contentgoeshere_class.style.width = "0%";
    };

    this.hideContent = function () {
        var elementClass = document.documentElement.className;
        var bodyClass = document.body.className;
        document.documentElement.className = elementClass + " cu_locked";
        document.body.className = bodyClass + " cu_locked cu_locked_body";
        //document.body.classList.add("cu_locked"); IE Doe not allow this!
        GMCU.Cunlock.player_state = 1;

        GMCU.Cunlock.load_unit_execute = true;
    };

    this.showPlayer = function () {
        // GMCU.DeviceManager.getInstance().getLayout().showBrandBox();
        GMCU.DeviceManager.getInstance().getLayout().showOverlay();
    };

    this.showOverlay = function () {
        var layout = GMCU.DeviceManager.getInstance().getLayout();
        layout.overlay_bg.style.width = "100%";
        layout.contentgoeshere_class.style.width = "100%";
        layout.contentgoeshere_class.style.zoom = "100%";
        layout.video_wrapper.style.display = "inline-block";
        return;
    };

    this.activateContinue = function () {
        var link_element = document.getElementById(GMCU.Cunlock.getSkipAdLinkId());
        var link_image = document.getElementById('cu-skip-image');
        link_element.style.color = "#1085FE";
        link_element.style.cursor = "pointer";
        link_image.src = cunlock_config.pub_site + "/cu/assets/images/arrow_blue.png";
        link_image.style.cursor = "pointer";
        GMCU.DomHandler.attachEvent('click', link_element, GMCU.removeModal);
        GMCU.DomHandler.attachEvent('click', link_image, GMCU.removeModal);
        GMCU.Cunlock.onUnlockAction();
    };

    this.animateCompanionCard = function () {
        var layout = GMCU.DeviceManager.getInstance().getLayout();
        GMCU.com.greensock.TweenLite.to(layout.cardResponsiveContainer, 1, {
            width: "35%"
        }, 0.5);
        GMCU.com.greensock.TweenLite.to(layout.card, 1, {
            rotationY: 0
        }, 1);
        GMCU.com.greensock.TweenLite.to(layout.containerScaler, {
            width: "-90%"
        }, 0.1);
        GMCU.com.greensock.TweenLite.to(layout.footer, 1.5, {
            width: layout.defaultFrameSize + '%'
        });
    };

    this.getCUPlayerHeight = function () {
        return this.cuPlayerHeight;
    };

    this.setSkipAdPosition = function () {
        return;
    };
};
GMCU.DesktopLayout = function(params){

	this.unit_main_container = undefined;
	this.content_class = undefined;
	this.contentgoeshere_class = undefined;
	this.branding_class = undefined;
	this.privacy_class = undefined;
	this.privacy_a = undefined;
	this.what_a = undefined;
	this.powered_by = undefined;
	this.input = undefined;
	this.skip_ad = undefined;
	this.skip_link = undefined;
	this.wrapper_reference = undefined;


	GMCU.Layout.apply(this, arguments);
	this.parent = new GMCU.Layout();

	this.createDOMElements = function () {
		this.unit_main_container = document.createElement("div");
		this.unit_main_container.className = this.params.panel_collapsed_class;
		this.unit_main_container.style.width = this.params.player_width;
		this.unit_main_container.style.fontSize = "12px";
		this.unit_main_container.style.fontFamily = "Candara, Geneva, sans-serif";
		this.unit_main_container.style.margin = "5px";
		this.createVideoContainer();
		this.createFooter();
		this.input = document.createElement("input");
		this.input.type = "hidden";
		this.input.id = GMCU.Cunlock.input_flag;
		this.input.value = "0";
	};

	this.createVideoContainer = function () {
		this.content_class = document.createElement("div");
		this.content_class.className = this.params.panel_content_class;

		this.content_class.style.margin = "0 auto";
		this.content_class.style.background = "#f6f6f6";
		this.content_class.style.overflow = "hidden";
		this.content_class.style.border = "solid 1px #CCC";
		this.content_class.style.styleFloat = "left";
		this.content_class.style.cssFloat = "left";

		this.contentgoeshere_class = document.createElement("div");
		this.contentgoeshere_class.style.width = this.params.player_width;
		this.contentgoeshere_class.className = this.params.panel_contentgoeshere_class;
		this.contentgoeshere_class.id = this.params.panel_contentgoeshere_class;
		this.contentgoeshere_class.style.margin = "0 auto";
		this.contentgoeshere_class.style.display = "block";
		this.contentgoeshere_class.style.height = "98%";
		this.contentgoeshere_class.style.textAlign = "center";

		this.createSkipAd();
	};

	this.createSkipAd = function() {
		this.skip_ad = document.createElement('div');
		this.skip_ad.style.width = "185px";
		this.skip_ad.style.visibility = "hidden";
		this.skip_ad.style.position = "absolute";
		this.skip_ad.style.textAlign = "center";
		this.skip_ad.style.background = "black";
		this.skip_ad.style.color = "white";
		this.skip_ad.style.border = "2px #CCC solid";
		this.skip_ad.style.opacity = "0.9";
		this.skip_ad.style.filter = "alpha(opacity = 90)";
		this.skip_ad.style.width = "200px";
		this.skip_ad.style.height = "60px";
		this.skip_ad.id = this.params.panel_skip_ad_id;
		this.skip_link = document.createElement('a');
		this.skip_link.id = this.params.panel_skip_link_id;
		this.skip_link.style.fontSize = "14px";
		this.skip_link.style.color = "white";
		this.skip_link.style.textDecoration = "none";
		this.skip_link.style.fontFamily = "Arial";
		this.skip_link.style.marginTop = "10px";
		this.skip_link.style.fontWeight = "bold";
		this.skip_link.style.position = "relative";
		this.skip_link.style.top = "20px";
	};

	this.createFooter = function () {
		this.branding_class = document.createElement("div");
		this.branding_class.className = this.params.panel_branding_class;
		this.branding_class.style.backgroundImage = "url("+ GMCU.Config.base_location + "/cu/images/footer-bg.png)";
		this.branding_class.style.height = "34px";
		this.branding_class.style.left = "6px";
		this.branding_class.style.backgroundRepeat = "repeat-x";
		this.branding_class.style.borderLeft = "1px solid #ccc";
		this.branding_class.style.borderRight = "1px solid #ccc";
		this.branding_class.style.position = "static";
		this.branding_class.style.borderBottom = "1px solid #ccc";
		this.branding_class.style.display = "block";
		this.branding_class.style.styleFloat = "left";
		this.branding_class.style.cssFloat = "left";

		this.privacy_class = document.createElement("div");
		this.privacy_class.className = this.params.panel_privacy_class;
		this.privacy_class.style.color = "#ccc";
		this.privacy_class.style.styleFloat = "left";
		this.privacy_class.style.cssFloat = "left";
		this.privacy_class.style.paddingTop = "10px";

		this.privacy_a = document.createElement("a");
		this.privacy_a.href = this.params.panel_link_privacy;
		this.privacy_a.target = "_blank";
		this.privacy_a.innerHTML = this.params.panel_link_privacy_text;
		this.privacy_a.style.fontFamily = "Arial";
		this.privacy_a.style.color = "#474747";
		this.privacy_a.style.fontSize = "10px";
		this.privacy_a.style.marginLeft = "5px";

		this.what_a = document.createElement("a");
		this.what_a.href = this.formatMailToLink(this.params.feedback_link);
		this.what_a.target = "_blank";
		this.what_a.innerHTML = this.params.feedback_text;
		this.what_a.style.fontFamily = "Arial";
		this.what_a.style.color = "#474747";
		this.what_a.style.fontSize = "10px";
		this.what_a.style.marginLeft = "5px";

		this.powered_by = document.createElement("a");
		this.powered_by.href = "http://www.genesismedia.com";
		this.powered_by.className = this.params.panel_poweredbyimg_class;
		this.powered_by.style.marginRight = "5px";
		this.powered_by.style.display = "block";
		this.powered_by.style.styleFloat = "right";
		this.powered_by.style.cssFloat = "right";
		this.powered_by.style.backgroundImage = "url(" + GMCU.Config.base_location + "/cu/images/powered-by.png)";
		this.powered_by.style.width = "170px";
		this.powered_by.style.height = "30px";
		this.powered_by.style.backgroundRepeat = "no-repeat";
		this.powered_by.style.backgroundPosition = "right";
		this.powered_by.style.marginTop = "4px";
	};

	this.appendDOMElements = function() {
		// build-up Video Container
		this.content_class.appendChild(this.contentgoeshere_class);
		this.skip_ad.appendChild(this.skip_link);
		this.content_class.appendChild(this.skip_ad);

		// build-up the Footer
		this.privacy_class.appendChild(this.privacy_a);
		this.privacy_class.innerHTML = this.privacy_class.innerHTML + " | ";
		this.privacy_class.appendChild(this.what_a);
		this.branding_class.appendChild(this.privacy_class);
		this.branding_class.appendChild(this.powered_by);

		// build-up the Main Container
		this.unit_main_container.appendChild(this.content_class);
		this.unit_main_container.appendChild(this.branding_class);
		this.unit_main_container.appendChild(this.input);
	};

	this.setPlayerHeight = function(new_height){
		var temp_height = GMCU.Utils.getNumber(new_height);
		GMCU.Cunlock.player_height = new_height;
		var height_elements = GMCU.DomHandler.$("." + this.params.panel_contentgoeshere_class);
			for (var i = 0; i < height_elements.length; i++)
				height_elements[i].style.height = temp_height + "px";
	};

	this.setUnitWidth = function(new_width){
		this.player_panel = document.getElementById(this.params.panel_player_id);
		if( this.player_panel )
			this.player_panel.style.width = new_width  + "px";
		this.contentgoeshere_class.style.width = (new_width - 2 ) + "px";
		this.branding_class.style.width = (new_width - 2) + "px";
		this.content_class.style.width = (new_width - 2) + "px";
		this.unit_main_container.style.width = new_width + "px";
	};

	this.setPlayerWidth = function(new_width){
		new_width = GMCU.Utils.getNumber(new_width);
		new_width = GMCU.Utils.getNumber(new_width);
		this.contentgoeshere_class.style.width = new_width;
	};

	this.formatMailToLink = function(link){
		var message = "Country: " + GMCU.GeoLocation.getCountry() + "\nReferral source: " + GMCU.CookieHandler.getCookie(GMCU.CookieHandler.getReferralSource(), "") + "\nDocument location: " + GMCU.Utils.extractUrl(document.location.pathname)+ "\n "  + "Browser: "+ GMCU.UserAgentManager.getBrowser()+ "\nOperating System: "+ GMCU.UserAgentManager.getOS();
		link = link.replace("##body##",encodeURIComponent(message));
		link = link.replace("##subject##","Feedback on " + document.location.hostname);
		return link;
	};

	getSkipText = function (unlock_allowed) {
		if (!unlock_allowed)
			return this.params.panel_skip_ad_text.replace('##','<span style="width: 20px;  display : inline-block" id="' + this.params.panel_skip_timer_id + '">' + this.params.skip_time + '</span>');
		else
			return this.params.panel_skip_ad_text_unlock;
	};

	this.getProportionalHeight = function(width, height){
		var divisor = GMCU.Utils.aspectRatioDivisor(Number(width),Number(height));
		var unit_width = GMCU.Utils.getNumber(this.params.unit_width) - 2 ;
		return GMCU.Utils.getAspectRatioHeigth(unit_width, width/divisor, height/divisor);
	};

	this.render = function(center_unit){
		var div = document.createElement("div");
		div.className = GMCU.Cunlock.params.panel_wrapper_class + " " + GMCU.Cunlock.exclusions_class;
		div.id = GMCU.Cunlock.params.panel_player_id;
		div.style.position = "relative";
		if( center_unit ){
			div.style.margin = "0 auto";
		}
		else{
			div.style.styleFloat = "left";
			div.style.cssFloat = "left";
		}
		div.style.zIndex = "0";
		div.style.overflow = "visible";
		this.wrapper_reference = this.createCUContentWrapper();
		div.appendChild(this.wrapper_reference);
		this.createBrandBox();
		if ( this.brandbox.isEnabled()) {
			GMCU.AltAction.init(GMCU.Cunlock.params.allow_alternative_action, GMCU.Cunlock.params.alt_action_type, GMCU.Cunlock.params.alt_action_param);
			var brandbox_dom_element = this.brandbox.render();
			div.insertBefore(brandbox_dom_element,this.wrapper_reference);
			if (GMCU.AltAction.isAllowed())
				GMCU.AltAction.loadPredefinedAltAction();
		}
		return div;
	};

	this.getWrapperReference = function(){
		return this.wrapper_reference;
	};

	this.createCUContentWrapper = function(){
		var new_div = this.buildUnit();
		new_div.style.opacity = "0";
		new_div.style.height = "-0px";
		new_div.style.margin = "0 0 -2px 0";
		new_div.style.overflow = "hidden";
		new_div.style.styleFloat = "left";
		new_div.style.cssFloat = "left";
		return new_div;
	};

	this.applyBrandBoxStyles = function() {
		var brandbox_main_wrapper = GMCU.DomHandler.$("#" + this.brandbox.main_div_id);
		if (typeof brandbox_main_wrapper != 'undefined') {
			brandbox_main_wrapper.style.styleFloat = "left";
			brandbox_main_wrapper.style.cssFloat = "left";
			brandbox_main_wrapper.style.marginBottom = "5px";
			brandbox_main_wrapper.style.marginTop = "20px";
			brandbox_main_wrapper.style.border = "1px solid #CCC";
			brandbox_main_wrapper.style.borderTop = "1px solid #b6b9c3";
			brandbox_main_wrapper.style.paddingTop = "3px";
			brandbox_main_wrapper.style.paddingBottom = "3px";

			var brandbox_text = GMCU.DomHandler.$("#" + this.brandbox.text_id);
			brandbox_text.style.overflow = "hidden";
			brandbox_text.style.height = "50px";
			brandbox_text.style.padding = '2px';
			brandbox_text.style.paddingLeft = '2px';
			brandbox_text.style.fontWeight = "bold";
			brandbox_text.style.fontFamily = "'Georgia'";

			var brandbox_logo = GMCU.DomHandler.$("#" + this.brandbox.pub_logo_id);
			brandbox_logo.style.height = "50px";
			brandbox_logo.style.width = "20%";
			var brandbox_img = GMCU.DomHandler.$("img", brandbox_logo)[0];
			brandbox_img.style.width = "100px";
			brandbox_img.style.border = "none";
		}
	};

	this.addStyleSheets = function(){
		var css_code = "." + this.params.panel_collapsed_class + " a:hover{text-decoration: none;}\n";
		css_code += "." + this.params.panel_collapsed_class + " a {text-decoration: none;}\n";
		GMCU.DomHandler.makeStyleSheet(css_code);
	};

	this.hideContent = function(){
		if (GMCU.Cunlock.getContentSelector()){
			var div = this.render();
			var text = undefined;
			/** ** Removes the original content and loads the player ** */
			if ( GMCU.Cunlock.params.first_paragraph.selector != undefined && GMCU.Cunlock.getMainTruncatedText() != undefined) {
				text = GMCU.Cunlock.getMainTruncatedText();
				GMCU.DomHandler.insertAfter(div, text);
				GMCU.Cunlock.first_paragraph_temp = text;
			}
			if (text == undefined){
				var main_content_selector = GMCU.Cunlock.getContentSelector();
				text = main_content_selector.firstChild;
				if( !text ){
					var tmp_div = document.createElement("div");
					tmp_div.className = GMCU.Cunlock.exclusions_class;
					main_content_selector.appendChild(tmp_div);
					text = tmp_div;
				}
			}
			GMCU.Cunlock.unit_text_reference = text;
			GMCU.Cunlock.unit_reference = this.getWrapperReference();
			GMCU.Cunlock.player_state = 1;
			GMCU.DomHandler.insertAfter(div, GMCU.Cunlock.unit_text_reference);
			var clear_div = document.createElement("div");
			clear_div.style.clear = "both";
			clear_div.style.display = "none";
			clear_div.id = GMCU.Cunlock.clear_id;
			clear_div.className = GMCU.Cunlock.exclusions_class;
			GMCU.DomHandler.insertAfter(clear_div,div);
			this.setUnitWidth(GMCU.Utils.getNumber(GMCU.Cunlock.params.unit_width));
			GMCU.Cunlock.load_unit_execute = true;
			GMCU.Cunlock.setPlayerFlag();
		}
	};

	this.showPlayer = function () {
		GMCU.Cunlock.replaceStyleProperties();
		GMCU.DeviceManager.getPlayer().togglePlayerWrapper("block");
		GMCU.EventTrigger.shootEvent({'event' : 'contentLocked'});
		GMCU.Cunlock.hideAlso();
		GMCU.Cunlock.hideNonExclusions();
		var parameters = [];
		parameters[0] = GMCU.Cunlock.getContentSelector();
		parameters[1] = GMCU.Cunlock.unit_reference.parentNode;
		GMCU.DomHandler.$("#" + GMCU.Cunlock.clear_id) ? GMCU.DomHandler.$("#" + GMCU.Cunlock.clear_id).style.display = "block" : null;
		GMCU.DeviceManager.getInstance().getLayout().showBrandBox();
		GMCU.EffectClass.showElement( GMCU.Cunlock.unit_reference, GMCU.truncateMainText, parameters, GMCU.fireEvent, ["pageDidLock"]);
		GMCU.DeviceManager.getPlayer().resizeObjects();
		var content_selector = GMCU.Cunlock.getContentSelector();
		if ( GMCU.Cunlock.params.enable_auto_scroll )
			GMCU.DomHandler.scrollElement(content_selector);
	};

	this.getCUPlayerHeight = function () {
		return GMCU.Cunlock.getPlayerHeight();
	};

	this.updateSkipAdTimer = function () {

	};
};

GMCU.urlHadChanged = function(){
	var url = location.href;
	if ( url.match(/surveyFinished_1/i) ){
		GMCU.cunlockHideUnit();
		window.location = url.split("#")[0] + "#surveyFinished_0";		
	}else{
		setTimeout("GMCU.urlHadChanged()",200);
	}
}

GMCU.Survey = {
	
	id: 0,
	
	guid: 0,
	
	width: 600,
	
	survey_id : 'cunlockSurveyIframe',
	
	iframe_reference: undefined,
	
	enabled: false,
	
	campaign_id: 0,
	
	init: function(id,campaign_id,width){
		this.id = id;
		this.width = width;
		this.campaign_id = campaign_id;
		this.guid = this.generateGUID();
	},
	
	isEnabled: function(){
		return this.enabled;
	},
	
	toggleEnabled: function(val){
		this.enabled = val;
	},
	
	generateGUID: function(){
		var _0x18a1x29 = function (){
		return Math["\x66\x6C\x6F\x6F\x72"](Math["\x72\x61\x6E\x64\x6F\x6D"]()*0x10000).toString(16);} ;
		return (_0x18a1x29()+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+_0x18a1x29()+_0x18a1x29());
			
	},
	
	showSurvey: function(){
		this.iframe_reference.style.display = "block";
	},
	
	createSurvey: function(){
		var iframe = this.createSurveyIframe();
		var survey_wrapper = document.getElementById(GMCU.Cunlock.getContentPanel());
		survey_wrapper.appendChild(iframe);
		GMCU.urlHadChanged();
	},
	
	createSurveyIframe: function(){
		var iframe = document.createElement("iframe");
		iframe.id = this.survey_id;
		iframe.border = "0";
		iframe.margin = "0";	
		iframe.padding = "0";
		var tmp_url = this.callback_location + "video_did_complete?guid=";
		iframe.src = GMCU.Config.getSurveyUrl() + "?survey=" + this.id + "&width=" + this.width + "&guid=" + this.guid + "&callbackUrl=" + GMCU.Utils.encode64(tmp_url) ;
		iframe.src += "&campaign_id=" + this.campaign_id + "&publisher_id=" + GMCU.Cunlock.params.publisher_ID;
		iframe.src += "&site_id=" + GMCU.Cunlock.params.site_ID;
		iframe.src += "&parent_url=" + GMCU.Utils.encode64(location.href);
		iframe.style.border = "none";
		GMCU.BrowserManager.getInstance().setSurveyDimensions(iframe,this.width);
		iframe.style.overflow = "hidden";
		iframe.style.display = "none";
		this.iframe_reference = iframe;
		return iframe;	
	}
};

/**
 * Begin the Skip Ad class
 */
GMCU.SkipAd = {

	skip_interval : 0,
	enable_skip : false,
	bottom_margin : 10,
	start_date : '',
	skip_time : 20,
	skip_text : 'You can skip this ad in ##',
	fade_out_time : 5,
	is_active : false,
	skip_executed : false,
	pixel_url : null,

	init : function(enable, time, text, bottom_margin, fadeout) {
		GMCU.SkipAd.enable_skip = enable;
		GMCU.SkipAd.skip_time = time;
		GMCU.SkipAd.skip_text = text;
		GMCU.SkipAd.bottom_margin = bottom_margin;
		GMCU.SkipAd.fade_out_time = fadeout;
	},

	setSkipAd : function(val) {
		GMCU.SkipAd.enable_skip = val;
	},

	setSkipTime: function(secs) {
		GMCU.SkipAd.skip_time = secs;
	},

	setSkipText: function (text) {
		GMCU.SkipAd.skip_text = text;
	},

	setSkipAdBottomMargin : function(value) {
		if (value != undefined)
			GMCU.SkipAd.bottom_margin = value;
	},

	skipExecuted : function() {
		GMCU.SkipAd.skip_executed = true;
	},

	setSkipFadeOut: function (fade_out_time) {
		this.fade_out_time = fade_out_time;
	},

	hasSkipOccurred : function() {
		return GMCU.SkipAd.skip_executed;
	},

	setSkipAdPosition : function() {
		GMCU.DeviceManager.getInstance().getLayout().setSkipAdPosition();
	},

	activateSkip : function() {
		if (GMCU.SkipAd.enable_skip && GMCU.DeviceManager.getPlayer().isLastAd()) {
			GMCU.SkipAd.skip_executed = false;
			GMCU.SkipAd.setSkipAdPosition();
			document.getElementById(GMCU.Cunlock.getSkipAdLinkId()).innerHTML = GMCU.DeviceManager.getInstance().getLayout().getSkipText(false);
			document.getElementById(GMCU.Cunlock.getSkipAdId()).style.visibility = 'visible';
			GMCU.SkipAd.start_date = new Date().getTime();
			GMCU.SkipAd.skip_interval = setInterval(GMCU.updateSkipAdTimer, 100);

			GMCU.SkipAd.is_active = true;
		} else if (!GMCU.SkipAd.enable_skip && GMCU.isOverlay()) {
			GMCU.SkipAd.skip_executed = false;
			GMCU.SkipAd.setSkipAdPosition();
			document.getElementById(GMCU.Cunlock.getSkipAdLinkId()).innerHTML = GMCU.DeviceManager.getInstance().getLayout().getSkipText(true);
			document.getElementById(GMCU.Cunlock.getSkipAdId()).style.visibility = 'visible';
		}
	},

	removeSkip : function() {
		if (GMCU.SkipAd.enable_skip && GMCU.SkipAd.is_active) {
			clearInterval(GMCU.SkipAd.skip_interval);
			document.getElementById(GMCU.Cunlock.getSkipAdId()).style.visibility = 'hidden';
			var link_element = document.getElementById(GMCU.Cunlock.getSkipAdLinkId());
            var link_image = document.getElementById('cu-skip-image');
            GMCU.DomHandler.removeEvent('click', link_element, GMCU.cunlockSkipAd);
            GMCU.DomHandler.removeEvent('click', link_image, GMCU.cunlockSkipAd);
			GMCU.SkipAd.is_active = false;
		}
	},

	initFadeOut : function() {
  		setTimeout("GMCU.skipFadeOut()", GMCU.SkipAd.fade_out_time * 1000);
	},

	setPixelUrl: function (url) {
		this.pixel_url = url;
	}

};


GMCU.skipFadeOut = function() {
	if (GMCU.isOverlay()) return;
	GMCU.SkipAd.removeSkip();
};

GMCU.updateSkipAdTimer = function() {
	if( document.getElementById(GMCU.Cunlock.getSkipAdTimerId()) ) {
		var element = document.getElementById(GMCU.Cunlock.getSkipAdTimerId());
		var now = GMCU.SkipAd.skip_time * 1000 - (new Date().getTime() - GMCU.SkipAd.start_date);
		if (now <= 0) {
			clearInterval(GMCU.SkipAd.skip_interval);
			var link_element = document.getElementById(GMCU.Cunlock.getSkipAdLinkId());
			link_element.innerHTML = GMCU.DeviceManager.getInstance().getLayout().getSkipText(true);

			GMCU.DomHandler.attachEvent('click', link_element, GMCU.cunlockSkipAd);
			link_element.style.cursor = "pointer";
      var link_image = document.getElementById('cu-skip-image');
      link_image.style.cursor = "pointer";
      GMCU.DomHandler.attachEvent('click', link_image, GMCU.cunlockSkipAd);
			GMCU.SkipAd.initFadeOut();
		} else
			element.innerHTML = Math.floor(now / 1000);
	}
};

GMCU.iPadStyles = {

    setPortrait: function () {
        var layout = GMCU.DeviceManager.getInstance().getLayout();
        this.setImages(layout);
        layout.current_pixel_width = document.body.offsetWidth;
        layout.containerScaler.id = "containerScaler";
        layout.wrapper.className = "cunlock_contentgoeshere";
        layout.containerScaler.style.width = layout.current_pixel_width + "px";
        layout.containerScaler.height = layout.current_pixel_width * (9 / 16);
        layout.containerScaler.style.height = layout.containerScaler.height + "px";
        layout.footer.style.width = layout.current_pixel_width + "px";
        layout.footer.style.height = "35px";
        layout.footer.style.backgroundColor = "rgba(0,0,0,0.6)";
        layout.footer.height = layout.footer.offsetHeight;
        layout.footer.style.height = layout.footer.height;
        layout.text.style.width = layout.current_pixel_width + "px";
        layout.text.style.marginTop = "-" + (layout.containerScaler.height -50) + "px";
        GMCU.TextResizer.fitText(layout.text, 2.6);
        GMCU.TextResizer.fitText(layout.footerRight, 1.6);
        var bbox = layout.brandbox.getDOMInstance();
        bbox.style.width = layout.current_pixel_width + "px";
        var bblogo = layout.brandbox.getLogoInstance();
        bbox.height = bblogo.offsetHeight;
        bbox.style.height = bbox.height + "px";
        layout.center_element.style.height = (layout.containerScaler.height + bbox.height + layout.footer.height) + "px";
        layout.center_element.style.backgroundColor = "rgba(0,0,0,0)";
        bbox.style.backgroundColor = "rgba(0,0,0,0.9)";


    },

    setLandscape: function () {
        var layout = GMCU.DeviceManager.getInstance().getLayout();
        this.setImages(layout);
        var frameSize = .85;
        var textPadding = .9;
        layout.footer.style.height = "20px";
        layout.current_pixel_width = document.body.offsetWidth;
        layout.containerScaler.id = "landscape-containerScaler";
        layout.wrapper.className = "landscape-contentgoeshere_class";
        layout.containerScaler.height = layout.current_pixel_width * (9 / 16);
        layout.containerScaler.style.width = (layout.current_pixel_width * frameSize) + "px";
        layout.current_pixel_height = (layout.containerScaler.offsetWidth * (9 / 16));
        layout.containerScaler.style.height = (layout.current_pixel_height) + "px";

        var bbox = layout.brandbox.getDOMInstance();
        bbox.style.width = layout.current_pixel_width + "px";
        bbox.height = bbox.offsetHeight;
        bbox.style.height = bbox.height + "px";
        layout.footer.style.width = (layout.current_pixel_width * frameSize) + "px";
        layout.footer.style.margin = "auto";
        layout.footer.height = layout.footer.offsetHeight;

        layout.center_element.style.height = (layout.containerScaler.height + bbox.height + layout.footer.height) + "px";

        layout.text.style.width = ((layout.current_pixel_width * frameSize) * textPadding) + "px";
        layout.text.style.margin = "auto";
        layout.text.style.marginTop = "-" + (layout.current_pixel_height * (frameSize)) + "px";
        layout.containerScaler.style.margin = "auto";
        layout.center_element.style.backgroundColor = "rgba(0,0,0,0.9)";
        layout.footer.style.backgroundColor = "rgba(0,0,0,0)";
        layout.brandbox.getDOMInstance().style.backgroundColor = "rgba(0,0,0,0)";
        layout.text.style.fontSize = "2em";
        var bblogo = layout.brandbox.getLogoInstance();
        layout.brandbox.getDOMInstance().style.height = bblogo.offsetHeight + "px";

        GMCU.TextResizer.fitText(layout.text, 3.1);
        GMCU.TextResizer.fitText(layout.footerRight, 1.6);

    },


    setImages: function (layout) {
        layout.gm_logo.src = cunlock_config.pub_site + "/cu/assets/images/genesis_logo.png";
        layout.gm_logo.style.width = "220px";
        layout.footerLeft.innerHTML = "<a style=\'color:white;\' href=\"http://www.genesismedia.com\">Privacy Policy </a>|<a style=\'color:white;\' href=\"mailto: support@genesismedia.com\"> Send Feedback</a>";

    }

};

GMCU.iPhone5Styles = {

    setPortrait: function() {
        var layout = GMCU.DeviceManager.getInstance().getLayout();
        this.setImages(layout);
        layout.overlay_bg.style.width = "100%";
        layout.overlay_bg.style.height = "100%";
        layout.footer.style.height = "20px";
        layout.footerLeft.style.width = "17px";
        layout.current_pixel_width = document.body.offsetWidth;
        layout.containerScaler.id = "containerScaler";
        layout.wrapper.className = "cunlock_contentgoeshere";
        layout.containerScaler.style.width = layout.current_pixel_width + "px";
        layout.containerScaler.height = layout.current_pixel_width * (9 / 16);
        layout.containerScaler.style.height = layout.containerScaler.height + "px";
        layout.footer.style.width = layout.current_pixel_width + "px";
        layout.footer.height = layout.footer.offsetHeight;
        layout.footer.style.height = layout.footer.height + "px";
        layout.text.style.width = layout.current_pixel_width + "px";
        layout.text.style.marginTop = "-" + (layout.containerScaler.height - 0) + "px";
        GMCU.TextResizer.fitText(layout.text, 2.6);
        GMCU.TextResizer.fitText(layout.footerRight, 1.6);
        var bbox =  layout.brandbox.getDOMInstance();
        var bblogo = layout.brandbox.getLogoInstance();
        bbox.style.width = layout.current_pixel_width + "px";
        bbox.height = bblogo.offsetHeight;
        bbox.style.height = bbox.height + "px";
        layout.center_element.style.height = (layout.containerScaler.height + bbox.height + layout.footer.height) + "px";

        //resets

        layout.center_element.style.position = "relative";
        layout.footer.style.position = "relative";
        bbox.style.position = "relative";
        bbox.style.position = "relative";
        layout.footer.style.backgroundColor = "rgba(0,0,0,.8)";
        layout.footerRight.style.paddingTop = "0";
    },

    setLandscape: function() {
        var layout = GMCU.DeviceManager.getInstance().getLayout();

        this.setImages(layout);
        layout.footerLeft.style.width = "25px";
        layout.current_pixel_width = document.body.offsetWidth;
        layout.containerScaler.style.width = (layout.current_pixel_width) + "px";
        layout.brandbox.getDOMInstance().style.position = "fixed";
        layout.brandbox.getDOMInstance().style.width = layout.current_pixel_width + "px";
        layout.footer.style.width = (layout.current_pixel_width) + "px";
        layout.footer.style.height = "25px";
        layout.footer.style.position = "fixed";
        layout.footer.style.top = "0px";
        layout.footer.style.backgroundColor = "rgba(0,0,0,0)";
        layout.current_pixel_height = (layout.containerScaler.offsetWidth * (9 / 16));
        layout.containerScaler.style.height = layout.current_pixel_height + "px";
        layout.text.style.width = (layout.current_pixel_width * 3 / 4) + "px";
        layout.text.style.margin = "0 auto";
        layout.text.style.marginTop = "-" + (layout.current_pixel_height - 75) + "px";
        layout.wrapper.className = "landscape-contentgoeshere_class";
        layout.containerScaler.id = "landscape-containerScaler";
        layout.center_element.style.backgroundColor = "rgba(0,0,0,0.4)";
        layout.footer.style.backgroundColor = "rgba(0,0,0,0)";
        layout.brandbox.getDOMInstance().style.backgroundColor = "rgba(0,0,0,.5)";
        layout.text.style.fontSize = "2em";
        layout.brandbox.getDOMInstance().style.zIndex = "998";
        layout.footer.style.zIndex = "999";
        layout.center_element.style.position = "absolute";
        var bblogo = layout.brandbox.getLogoInstance();
        layout.brandbox.getDOMInstance().style.height = bblogo.offsetHeight + "px";

        GMCU.TextResizer.fitText(layout.text, 2.3);
        GMCU.TextResizer.fitText(layout.footerRight, 1.6);
    },

    setImages: function(layout) {
        layout.gm_logo.src = cunlock_config.pub_site + "/cu/assets/images/genesis_logo_iphone.png";
        layout.gm_logo.style.width = "110px";
        var infoImage = cunlock_config.pub_site + "/cu/assets/images/info.png";
        layout.footerLeft.innerHTML = "<a href=\"http://www.genesismedia.com\"><img src=\"" + infoImage + "\" /></a>";

        layout.footerLeft.style.marginLeft = "2%";
        layout.footerLeft.style.paddingTop = "0";
        layout.footer.style.height = "30px";
    }
};
GMCU.iPhone3InchStyles = {

    setPortrait: function() {
        var layout = GMCU.DeviceManager.getInstance().getLayout();

        this.setImages(layout);
        layout.overlay_bg.style.width = "100%";
        layout.overlay_bg.style.height = "100%";
        layout.footer.style.height = "20px";
        layout.footerLeft.style.width = "17px";
        layout.current_pixel_width = document.body.offsetWidth;
        layout.containerScaler.id = "containerScaler";
        layout.wrapper.className = "cunlock_contentgoeshere";
        layout.containerScaler.style.width = layout.current_pixel_width + "px";
        layout.containerScaler.height = layout.current_pixel_width * (9 / 16);
        layout.containerScaler.style.height = layout.containerScaler.height + "px";
        layout.footer.style.width = layout.current_pixel_width + "px";
        layout.footer.height = layout.footer.offsetHeight;
        layout.footer.style.height = layout.footer.height + "px";
        layout.text.style.width = layout.current_pixel_width + "px";
        layout.text.style.marginTop = "-" + (layout.containerScaler.height - 0) + "px";
        GMCU.TextResizer.fitText(layout.text, 2.6);
        GMCU.TextResizer.fitText(layout.footerRight, 1.6);
        var bbox =  layout.brandbox.getDOMInstance();
        var bblogo = layout.brandbox.getLogoInstance();
        bbox.style.width = layout.current_pixel_width + "px";
        bbox.height = bblogo.offsetHeight;
        bbox.style.height = bbox.height + "px";
        layout.center_element.style.height = (layout.containerScaler.height + bbox.height + layout.footer.height) + "px";

        //resets

        layout.center_element.style.position = "relative";
        layout.footer.style.position = "relative";
        bbox.style.position = "relative";
        bbox.style.position = "relative";
        layout.footer.style.backgroundColor = "rgba(0,0,0,.8)";
        layout.footerRight.style.paddingTop = "0";
    },

    setLandscape: function() {
        var layout = GMCU.DeviceManager.getInstance().getLayout();

        this.setImages(layout);
        layout.footerLeft.style.width = "25px";
        layout.current_pixel_width = document.body.offsetWidth;
        layout.containerScaler.style.width = (layout.current_pixel_width) + "px";
        layout.brandbox.getDOMInstance().style.position = "fixed";
        layout.brandbox.getDOMInstance().style.width = layout.current_pixel_width + "px";
        layout.footer.style.width = (layout.current_pixel_width) + "px";
        layout.footer.style.height = "25px";
        layout.footer.style.position = "fixed";
        layout.footer.style.top = "0px";
        layout.footer.style.backgroundColor = "rgba(0,0,0,0)";
        layout.current_pixel_height = (layout.containerScaler.offsetWidth * (9 / 16));
        layout.containerScaler.style.height = layout.current_pixel_height + "px";
        layout.text.style.width = (layout.current_pixel_width * 3 / 4) + "px";
        layout.text.style.margin = "0 auto";
        layout.text.style.marginTop = "-" + (layout.current_pixel_height - 60) + "px";
        layout.wrapper.className = "landscape-contentgoeshere_class";
        layout.containerScaler.id = "landscape-containerScaler";
        layout.center_element.style.backgroundColor = "rgba(0,0,0,0.4)";
        layout.footer.style.backgroundColor = "rgba(0,0,0,0)";
        layout.brandbox.getDOMInstance().style.backgroundColor = "rgba(0,0,0,.5)";
        layout.text.style.fontSize = "2em";
        layout.brandbox.getDOMInstance().style.zIndex = "998";
        layout.footer.style.zIndex = "999";
        layout.center_element.style.position = "absolute";
        var bblogo = layout.brandbox.getLogoInstance();
        layout.brandbox.getDOMInstance().style.height = bblogo.offsetHeight + "px";

        GMCU.TextResizer.fitText(layout.text, 2.3);
        GMCU.TextResizer.fitText(layout.footerRight, 1.6);
    },

    setImages: function(layout) {
        layout.gm_logo.src = cunlock_config.pub_site + "/cu/assets/images/genesis_logo_iphone.png";
        layout.gm_logo.style.width = "110px";
        var infoImage = cunlock_config.pub_site + "/cu/assets/images/info.png";
        layout.footerLeft.innerHTML = "<a href=\"http://www.genesismedia.com\"><img src=\"" + infoImage + "\" /></a>";

        layout.footerLeft.style.marginLeft = "2%";
        layout.footerLeft.style.paddingTop = "0";
        layout.footer.style.height = "30px";
    }
};
GMCU.initUnitExecuted = false;
var widthHash = {};

function responsiveResize() {
	var selector = cunlock_config.main_content.selector;
	var mainDiv = GMCU.DomHandler.$(selector);
	if(!mainDiv) {
		return;
	}
	mainDiv = !!mainDiv[0] ? mainDiv[0] : mainDiv;
	var width = mainDiv.offsetWidth;
	if( width > 400 && !!widthHash[selector] && width !== widthHash[selector].currentWidth ) {
		var wrapperDiv = GMCU.DomHandler.$(".cunlock_wrapper")[0];
		wrapperDiv.style.width = width + "px";
		try {
			var brandBoxDiv = GMCU.DomHandler.$('#content_unlock_added_text');
			brandBoxDiv.style.width = width + "px";
			var videoDiv = GMCU.DomHandler.$('.cunlock_panelcontent')[0];
			videoDiv.style.width = width + "px";
			videoDiv.style.height = (videoDiv.offsetWidth * (9/16)) + "px";
			var videoDiv = GMCU.DomHandler.$('.cunlock_contentgoeshere')[0];
			videoDiv.style.width = width + "px";
			videoDiv.style.height = (videoDiv.offsetWidth * (9/16)) + "px";
			var altDiv = GMCU.DomHandler.$("#cuplayer_alt") || GMCU.DomHandler.$("#cuplayer");
			altDiv.style.height = (altDiv.offsetWidth * 9/16) + "px";

			var changeRatio = (width / widthHash[selector].initialWidth);
			var brandDiv = GMCU.DomHandler.$(".cunlock_branding")[0];
			brandDiv.style.width = width + "px";
			var skipDiv = GMCU.DomHandler.$("#cunlock_skip_ad_container");
			skipDiv.style.left = "";
			skipDiv.style.right = 0;
			skipDiv.style.width = (200 * changeRatio) + "px";
			// skipDiv.style.height = (skipDiv.offsetHeight * changeRatio) + "px";
			widthHash[selector].currentWidth = width;
		} catch(e) {
			GMCU.Logger.log("Content unlock is not present on the page at the moment of resizing");
		}
	}
	return;
}

function responsiveOverlayResize () {
	var video_wrapper = GMCU.DomHandler.$("#video_wrapper");
	if (!!video_wrapper) {
		var height = (video_wrapper.offsetWidth * (9/16));
		if (height < 500)
			video_wrapper.style.height = height + "px";
		console.log(video_wrapper.style.height);
	}
}

function findWidth() {
	var selector = cunlock_config.main_content.selector;
	var mainDiv = GMCU.DomHandler.$(selector);
	if(!mainDiv)
		return;
	var cuDiv = !!mainDiv[0] ? mainDiv[0] : mainDiv;
	if (!!cuDiv){
		widthHash[selector] = {};
		widthHash[selector].initialWidth = cuDiv.offsetWidth;
		widthHash[selector].currentWidth = cuDiv.offsetWidth;
	}
	return;
}

window.onresize = function() {
	responsiveResize();
	responsiveOverlayResize();
}

GMCU.Bootstrap.init(cunlock_config.killswitch);
GMCU.Bootstrap.load();
