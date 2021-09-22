(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{591:function(s,t,e){"use strict";e.r(t);var a=e(7),n=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"跨域问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#跨域问题"}},[s._v("#")]),s._v(" 跨域问题")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests",target:"_blank",rel:"noopener noreferrer"}},[s._v("浏览器的同源策略"),e("OutboundLink")],1),s._v(" "),e("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/165945581",target:"_blank",rel:"noopener noreferrer"}},[s._v("参考文章"),e("OutboundLink")],1),s._v(" "),e("a",{attrs:{href:"https://blog.csdn.net/u012501054/article/details/84519574",target:"_blank",rel:"noopener noreferrer"}},[s._v("跨域请求发送流程"),e("OutboundLink")],1)]),s._v(" "),e("p",[s._v('CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。它允许浏览器向跨源服务器，发出'),e("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("XMLHttpRequest"),e("OutboundLink")],1),s._v("请求，从而克服了AJAX只能"),e("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("同源"),e("OutboundLink")],1),s._v("使用的限制。")]),s._v(" "),e("h2",{attrs:{id:"跨域访问的项目常在过滤器或者拦截器中添加如下配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#跨域访问的项目常在过滤器或者拦截器中添加如下配置"}},[s._v("#")]),s._v(" 跨域访问的项目常在过滤器或者拦截器中添加如下配置")]),s._v(" "),e("div",{staticClass:"language-java line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[s._v("response"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Access-Control-Allow-Origin"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nresponse"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Access-Control-Allow-Methods"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"POST,OPTIONS,GET"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nresponse"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Access-Control-Max-Age"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"3600"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nresponse"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Access-Control-Allow-Headers"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"accept,x-requested-with,Content-Type"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nresponse"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Access-Control-Allow-Credentials"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"true"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nresponse"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Access-Control-Allow-Origin"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http://192.168.10.118:8070"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])]),e("h2",{attrs:{id:"简介"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[s._v("#")]),s._v(" 简介")]),s._v(" "),e("p",[s._v("CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。")]),s._v(" "),e("h2",{attrs:{id:"两种请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#两种请求"}},[s._v("#")]),s._v(" 两种请求")]),s._v(" "),e("p",[s._v("浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。只要同时满足以下两大条件，就属于简单请求。")]),s._v(" "),e("ul",[e("li",[s._v("请求方法是以下三种方法之一：\n"),e("ul",[e("li",[s._v("HEAD")]),s._v(" "),e("li",[s._v("GET")]),s._v(" "),e("li",[s._v("POST")])])]),s._v(" "),e("li",[s._v("HTTP的头信息不超出以下几种字段：\n"),e("ul",[e("li",[s._v("Accept")]),s._v(" "),e("li",[s._v("Accept-Language")]),s._v(" "),e("li",[s._v("Content-Language")]),s._v(" "),e("li",[s._v("Last-Event-ID")]),s._v(" "),e("li",[s._v("Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain")])])])]),s._v(" "),e("p",[s._v("凡是不同时满足上面两个条件，就属于非简单请求。浏览器对这两种请求的处理，是不一样的。")]),s._v(" "),e("h3",{attrs:{id:"简单请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#简单请求"}},[s._v("#")]),s._v(" 简单请求")]),s._v(" "),e("h4",{attrs:{id:"基本流程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基本流程"}},[s._v("#")]),s._v(" 基本流程")]),s._v(" "),e("p",[s._v("对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个Origin字段。下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段。")]),s._v(" "),e("div",{staticClass:"language-http line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token request-line"}},[e("span",{pre:!0,attrs:{class:"token method property"}},[s._v("GET")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token request-target url"}},[s._v("/cors")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token http-version property"}},[s._v("HTTP/1.1")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Origin:")]),s._v(" http://api.bob.com\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Host:")]),s._v(" api.alice.com\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Accept-Language:")]),s._v(" en-US\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Connection:")]),s._v(" keep-alive\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("User-Agent:")]),s._v(" Mozilla/5.0...\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])]),e("p",[s._v("上面的头信息中，Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段（详见下文），就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。")]),s._v(" "),e("div",{staticClass:"language-http line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Origin:")]),s._v(" http://api.bob.com\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Credentials:")]),s._v(" true\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Expose-Headers:")]),s._v(" FooBar\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Content-Type:")]),s._v(" text/html; charset=utf-8\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("p",[s._v("上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头。")]),s._v(" "),e("ul",[e("li",[s._v("Access-Control-Allow-Origin\n该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。")]),s._v(" "),e("li",[s._v("Access-Control-Allow-Credentials\n该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。")]),s._v(" "),e("li",[s._v("Access-Control-Expose-Headers\n该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。")])]),s._v(" "),e("h4",{attrs:{id:"withcredentials-属性"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#withcredentials-属性"}},[s._v("#")]),s._v(" withCredentials 属性")]),s._v(" "),e("p",[s._v("上面说到，CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。")]),s._v(" "),e("div",{staticClass:"language-http line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Credentials:")]),s._v(" true\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("另一方面，开发者必须在AJAX请求中打开withCredentials属性。")]),s._v(" "),e("div",{staticClass:"language-javascript line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" xhr "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("XMLHttpRequest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nxhr"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("withCredentials "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。\n但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials。")]),s._v(" "),e("div",{staticClass:"language-javascript line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[s._v("xhr"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("withCredentials "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。")]),s._v(" "),e("h3",{attrs:{id:"非简单请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#非简单请求"}},[s._v("#")]),s._v(" 非简单请求")]),s._v(" "),e("h4",{attrs:{id:"预检请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#预检请求"}},[s._v("#")]),s._v(" 预检请求")]),s._v(" "),e("p",[s._v('非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。\n非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。\n浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。\n下面是一段浏览器的JavaScript脚本。')]),s._v(" "),e("div",{staticClass:"language-javascript line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" url "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http://api.alice.com/cors'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" xhr "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("XMLHttpRequest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nxhr"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("open")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'PUT'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nxhr"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("setRequestHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'X-Custom-Header'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'value'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nxhr"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("send")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("p",[s._v('上面代码中，HTTP请求的方法是PUT，并且发送一个自定义头信息X-Custom-Header。\n浏览器发现，这是一个非简单请求，就自动发出一个"预检"请求，要求服务器确认可以这样请求。下面是这个"预检"请求的HTTP头信息。')]),s._v(" "),e("div",{staticClass:"language-http line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token request-line"}},[e("span",{pre:!0,attrs:{class:"token method property"}},[s._v("OPTIONS")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token request-target url"}},[s._v("/cors")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token http-version property"}},[s._v("HTTP/1.1")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Origin:")]),s._v(" http://api.bob.com\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Request-Method:")]),s._v(" PUT\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Request-Headers:")]),s._v(" X-Custom-Header\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Host:")]),s._v(" api.alice.com\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Accept-Language:")]),s._v(" en-US\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Connection:")]),s._v(" keep-alive\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("User-Agent:")]),s._v(" Mozilla/5.0...\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br")])]),e("p",[s._v('"预检"请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。除了Origin字段，"预检"请求的头信息包括两个特殊字段。')]),s._v(" "),e("ul",[e("li",[s._v("Access-Control-Request-Method\n该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。")]),s._v(" "),e("li",[s._v("Access-Control-Request-Headers\n该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。")])]),s._v(" "),e("h4",{attrs:{id:"预检请求的回应"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#预检请求的回应"}},[s._v("#")]),s._v(" 预检请求的回应")]),s._v(" "),e("p",[s._v('服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。')]),s._v(" "),e("div",{staticClass:"language-http line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token response-status"}},[e("span",{pre:!0,attrs:{class:"token http-version property"}},[s._v("HTTP/1.1")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token status-code number"}},[s._v("200")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token reason-phrase string"}},[s._v("OK")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Date:")]),s._v(" Mon, 01 Dec 2008 01:15:39 GMT\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Server:")]),s._v(" Apache/2.0.61 (Unix)\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Origin:")]),s._v(" http://api.bob.com\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Methods:")]),s._v(" GET, POST, PUT\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Headers:")]),s._v(" X-Custom-Header\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Content-Type:")]),s._v(" text/html; charset=utf-8\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Content-Encoding:")]),s._v(" gzip\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Content-Length:")]),s._v(" 0\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Keep-Alive:")]),s._v(" timeout=2, max=100\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Connection:")]),s._v(" Keep-Alive\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Content-Type:")]),s._v(" text/plain\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br")])]),e("p",[s._v("上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。")]),s._v(" "),e("div",{staticClass:"language-http line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Origin:")]),s._v(" *\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v('如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。')]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("XMLHttpRequest cannot load http://api.alice.com.\nOrigin http://api.bob.com is not allowed by Access-Control-Allow-Origin.\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("服务器回应的其他CORS相关字段如下。")]),s._v(" "),e("div",{staticClass:"language-http line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Methods:")]),s._v(" GET, POST, PUT\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Headers:")]),s._v(" X-Custom-Header\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Credentials:")]),s._v(" true\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Max-Age:")]),s._v(" 1728000\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("ul",[e("li",[s._v('Access-Control-Allow-Methods\n该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。')]),s._v(" "),e("li",[s._v('Access-Control-Allow-Headers\n如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。')]),s._v(" "),e("li",[s._v("Access-Control-Allow-Credentials\n该字段与简单请求时的含义相同。")]),s._v(" "),e("li",[s._v("Access-Control-Max-Age\n该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。")])]),s._v(" "),e("h4",{attrs:{id:"浏览器的正常请求和回应"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的正常请求和回应"}},[s._v("#")]),s._v(" 浏览器的正常请求和回应")]),s._v(" "),e("p",[s._v('一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。')]),s._v(" "),e("p",[s._v('下面是"预检"请求之后，浏览器的正常CORS请求。')]),s._v(" "),e("div",{staticClass:"language-http line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token request-line"}},[e("span",{pre:!0,attrs:{class:"token method property"}},[s._v("PUT")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token request-target url"}},[s._v("/cors")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token http-version property"}},[s._v("HTTP/1.1")])]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Origin:")]),s._v(" http://api.bob.com\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Host:")]),s._v(" api.alice.com\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("X-Custom-Header:")]),s._v(" value\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Accept-Language:")]),s._v(" en-US\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Connection:")]),s._v(" keep-alive\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("User-Agent:")]),s._v(" Mozilla/5.0...\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br")])]),e("p",[s._v("上面头信息的Origin字段是浏览器自动添加的。")]),s._v(" "),e("p",[s._v("下面是服务器正常的回应。")]),s._v(" "),e("div",{staticClass:"language-http line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Origin:")]),s._v(" http://api.bob.com\n"),e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Content-Type:")]),s._v(" text/html; charset=utf-8\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("上面头信息中，Access-Control-Allow-Origin字段是每次回应都必定包含的。")]),s._v(" "),e("h2",{attrs:{id:"与jsonp的比较"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#与jsonp的比较"}},[s._v("#")]),s._v(" 与JSONP的比较")]),s._v(" "),e("p",[s._v("CORS与JSONP的使用目的相同，但是比JSONP更强大。\nJSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。")]),s._v(" "),e("p",[s._v("OPTIONS 请求后端时，应在响应头中加入\nAccess-Control-Allow-Origin:http://192.168.1.113\nAccess-Control-Allow-Credentials:true\nAccess-Control-Allow-Headers:content-type\nAccess-Control-Allow-Methods:POST")]),s._v(" "),e("p",[s._v("分别代表")]),s._v(" "),e("ul",[e("li",[s._v("Access-Control-Allow-Origin:\n允许来自http://192.168.1.113的跨域请求")]),s._v(" "),e("li",[s._v("Access-Control-Allow-Credentials:\n允许跨域请求携带cookie")]),s._v(" "),e("li",[s._v('Access-Control-Allow-Headers:\n如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。')]),s._v(" "),e("li",[s._v('Access-Control-Allow-Methods:\n该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。')]),s._v(" "),e("li",[s._v("Access-Control-Max-Age\n该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。")])]),s._v(" "),e("h2",{attrs:{id:"access-control-allow-origin-是否存在漏洞"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#access-control-allow-origin-是否存在漏洞"}},[s._v("#")]),s._v(" Access-Control-Allow-Origin:*是否存在漏洞")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://blog.csdn.net/haoren_xhf/article/details/80050311",target:"_blank",rel:"noopener noreferrer"}},[s._v("Access-control-allow-origin:*并没有实际危害"),e("OutboundLink")],1),s._v("\n简单来说如果是*，则不允许携带cookie")])])}),[],!1,null,null,null);t.default=n.exports}}]);