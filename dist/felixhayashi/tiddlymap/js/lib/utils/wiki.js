"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.touch=exports.addTiddler=exports.getTiddlersByPrefix=exports.getTiddlerWithField=exports.getTiddlersWithField=exports.deleteByPrefix=exports.cp=exports.mv=exports.addTWlisteners=exports.getChildWidgetByProperty=exports.getMergedTiddlers=exports.isSystemOrDraft=exports.isDraft=exports.setText=exports.getText=exports.isLeftVersionGreater=exports.getEntry=exports.setEntry=exports.clone=exports.writeFieldData=exports.parseFieldData=exports.isPreviewed=exports.notify=exports.registerTransclude=exports.getElementNode=exports.getTiddlerNode=exports.getTranscludeNode=exports.isMatch=exports.getMatches=exports.getDataUri=exports.moveFieldValues=exports.deleteTiddlers=exports.setField=exports.setSidebarTab=exports.tiddlerExists=exports.getField=exports.getTiddler=exports.getTiddlerRef=undefined;var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var _exception=require("$:/plugins/felixhayashi/tiddlymap/js/exception");var _basic=require("$:/plugins/felixhayashi/tiddlymap/js/lib/utils/basic");var basicUtils=_interopRequireWildcard(_basic);function _interopRequireWildcard(e){if(e&&e.__esModule){return e}else{var t={};if(e!=null){for(var r in e){if(Object.prototype.hasOwnProperty.call(e,r))t[r]=e[r]}}t.default=e;return t}}function _defineProperty(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}// @preserve
/*\

title: $:/plugins/felixhayashi/tiddlymap/js/lib/utils/wiki
type: application/javascript
module-type: library

@preserve

\*/
var getTiddlerRef=exports.getTiddlerRef=function e(t){if(t instanceof $tw.Tiddler){return t.fields.title}else if(typeof t==="string"){return t}else{throw new _exception.InvalidArgumentException(t)}};var getTiddler=exports.getTiddler=function e(t){return $tw.wiki.getTiddler(t instanceof $tw.Tiddler?t.fields.title:t)};var getField=exports.getField=function e(t,r){var i=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"";var d=getTiddler(t);return!d?i:d.fields[r]||i};var tiddlerExists=exports.tiddlerExists=function e(t){if(!t){return false}var r=getTiddlerRef(t);return Boolean(r&&($tw.wiki.tiddlerExists(r)||$tw.wiki.isShadowTiddler(r)))};var setSidebarTab=exports.setSidebarTab=function e(t){setText(getTiddlersByPrefix("$:/state/tab/sidebar-")[0],mainEditor)};var setField=exports.setField=function e(t,r,i){if(!t||!r){return}var d=getTiddlerRef(t);var s=_defineProperty({title:d},r,i);var n=$tw.wiki.getTiddler(d,true);if(r!=="text"&&n&&!n.fields.text){s.text=""}n=new $tw.Tiddler(n,s);$tw.wiki.addTiddler(n);return n};var deleteTiddlers=exports.deleteTiddlers=function e(t){var r=Object.keys(t);var i=$tw.wiki.getTiddlerList("$:/StoryList");for(var d=r.length;d--;){var s=getTiddlerRef(t[r[d]]);if(!$tw.wiki.tiddlerExists(t[r[d]])){continue}var n=i.indexOf(s);if(n!==-1){i.splice(n,1);setField("$:/StoryList","list",i)}$tw.wiki.deleteTiddler(s)}};var moveFieldValues=exports.moveFieldValues=function e(t,r,i,d,s){if(t===r)return;var n=s||$tw.wiki.allTitles();for(var l=n.length;l--;){var a=getTiddler(n[l]);if(a.isDraft()||!a.fields[t]){continue}if(!d&&$tw.wiki.isSystemTiddler(n[l])){continue}var o=_defineProperty({},r,a.fields[t]);if(i){o[t]=undefined}$tw.wiki.addTiddler(new $tw.Tiddler(a,o))}};var getDataUri=exports.getDataUri=function e(t,r,i){r=r||d.fields.type||"image/svg+xml";var d=getTiddler(t);var s=d.fields.text;var n=$tw.config.contentTypeInfo[r].encoding;if(r==="image/svg+xml"){s=s.replace(/\r?\n|\r/g," ");if(!basicUtils.hasSubString("xmlns",s)){s=s.replace(/<svg/,'<svg xmlns="http://www.w3.org/2000/svg"')}}if(i&&n!=="base64"){n="base64";s=window.btoa(s)}return"data:"+r+";"+n+","+s};var getMatches=exports.getMatches=function e(t,r){var i=undefined;var d=$tw.wiki;if(typeof t==="string"){t=d.compileFilter(t)}if(r!=null&&(typeof r==="undefined"?"undefined":_typeof(r))==="object"){if(!Array.isArray(r)){r=Object.keys(r)}i=function e(t){for(var i=r.length;i--;){var s=d.getTiddler(r[i]);t(s,r[i])}}}return t.call(d,i)};var isMatch=exports.isMatch=function e(t,r){return getTiddlerRef(t)===getMatches(r,[getTiddlerRef(t)])[0]};var getTranscludeNode=exports.getTranscludeNode=function e(t,r){return{type:"transclude",attributes:{tiddler:{type:"string",value:getTiddlerRef(t)}},children:[],isBlock:!!r}};var getTiddlerNode=exports.getTiddlerNode=function e(t){return{type:"tiddler",attributes:{tiddler:{type:"string",value:getTiddlerRef(t)}},children:[]}};var getElementNode=exports.getElementNode=function e(t,r,i){return{type:"element",tag:t,attributes:{class:{type:"string",value:r}},children:i?[{type:"text",text:i}]:[]}};var registerTransclude=exports.registerTransclude=function e(t,r,i){basicUtils.removeArrayElement(t.children,t[r]);t[r]=t.makeChildWidget(getTranscludeNode(i,true));t.children.push(t[r]);return t[r]};var notify=exports.notify=function e(t){var r="$:/temp/tiddlymap/notify";$tw.wiki.addTiddler(new $tw.Tiddler({title:r,text:t}));$tw.notifier.display(r)};var isPreviewed=exports.isPreviewed=function e(t){if(!t){return false}if(t.getVariable("tv-tiddler-preview")){return true}else{var r="tc-tiddler-preview-preview";return!!basicUtils.getAncestorWithClass(t.parentDomNode,r)}};var parseFieldData=exports.parseFieldData=function e(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"text";var i=arguments[2];var d=getTiddler(t);if(!d){return i}return basicUtils.parseJSON(d.fields[r],i)};var writeFieldData=exports.writeFieldData=function e(t,r,i,d){if((typeof i==="undefined"?"undefined":_typeof(i))!=="object"){return}d=parseInt(d);d=d>0&&r==="text"?d:0;setField(t,r,JSON.stringify(i,null,d))};var clone=exports.clone=function e(t,r){setField(t,"title",r)};var setEntry=exports.setEntry=function e(t,r,i){$tw.wiki.setText(getTiddlerRef(t),null,r,i)};var getEntry=exports.getEntry=function e(t,r,i){var d=$tw.wiki.getTiddlerData(getTiddlerRef(t),{});return d[r]==null?i:d[r]};var isLeftVersionGreater=exports.isLeftVersionGreater=function e(t,r){return t!==r&&$tw.utils.checkVersions(t,r)};var getText=exports.getText=function e(t,r){return getField(t,"text",r)};var setText=exports.setText=function e(t,r){setField(t,"text",r)};var isDraft=exports.isDraft=function e(t){var r=getTiddler(t);return r&&r.isDraft()};var isSystemOrDraft=exports.isSystemOrDraft=function e(t){return $tw.wiki.isSystemTiddler(getTiddlerRef(t))||isDraft(t)};var getMergedTiddlers=exports.getMergedTiddlers=function e(t,r){if(!Array.isArray(t)){return}for(var i=t.length;i--;){t[i]=getTiddler(t[i])}if(!t.length){return}t.push({title:r||t[0].fields.title},$tw.wiki.getModificationFields(),$tw.wiki.getCreationFields());t.unshift(null);return new(Function.prototype.bind.apply($tw.Tiddler,t))};var getChildWidgetByProperty=exports.getChildWidgetByProperty=function e(t,r,i){var d=t.children;for(var s=d.length;s--;){var n=d[s];if(n[r]===i){return n}else{n=e(n,r,i);if(n){return n}}}};var addTWlisteners=exports.addTWlisteners=function e(t,r,i){for(var d in t){r.addEventListener(d,t[d].bind(i))}};var mv=exports.mv=function e(t,r,i,d){if(t===r||!t||!r){return}i=typeof i==="boolean"?i:false;d=typeof d==="boolean"?d:true;var s=getTiddlersByPrefix(t);var n=basicUtils.makeHashMap();for(var l=s.length;l--;){var a=s[l];var o=a.replace(t,r);if($tw.wiki.tiddlerExists(o)&&!i){return}n[a]=o}for(var f in n){setField(f,"title",n[f]);if(d){$tw.wiki.deleteTiddler(f)}}return n};var cp=exports.cp=function e(t,r,i){return mv(t,r,i,false)};var deleteByPrefix=exports.deleteByPrefix=function e(t,r){if(!t){return}r=r||$tw.wiki.allTitles();var i=[];for(var d=r.length;d--;){if(basicUtils.startsWith(r[d],t)){$tw.wiki.deleteTiddler(r[d]);i.push(i[d])}}return i};var getTiddlersWithField=exports.getTiddlersWithField=function e(t,r){var i=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var d=i.tiddlers||$tw.wiki.allTitles();var s=i.isIncludeDrafts===true;var n=basicUtils.makeHashMap();var l=Object.keys(d);var a=$tw.utils.hop;var o=i.limit||0;for(var f=l.length;f--;){var u=getTiddler(d[l[f]]);var p=u.fields;if(a(p,t)&&(!a(p,"draft.of")||s)){if(!r||p[t]===r){n[p.title]=u;if(--o===0){break}}}}return n};var getTiddlerWithField=exports.getTiddlerWithField=function e(t,r){return Object.keys(getTiddlersWithField(t,r,{limit:1}))[0]};var getTiddlersByPrefix=exports.getTiddlersByPrefix=function e(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var i=r.removePrefix===true;var d=[];var s=$tw.wiki[r.iterator||"each"];s(function(e,r){if(basicUtils.startsWith(r,t)){d.push(i?basicUtils.getWithoutPrefix(r,t):r)}});return d};var addTiddler=exports.addTiddler=function e(t,r){var i=getTiddler(t);if(!r&&i){return i}i=new $tw.Tiddler({title:t,text:""},$tw.wiki.getModificationFields(),$tw.wiki.getCreationFields());$tw.wiki.addTiddler(i);return i};var touch=exports.touch=function e(t){setField(t,"modified",new Date)};
//# sourceMappingURL=./maps/felixhayashi/tiddlymap/js/lib/utils/wiki.js.map
