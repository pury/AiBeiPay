	var APay = APay || {};
	
	APay.Order = {
		
		xmlHttp: null,
		aibeiPay: null, 
		ip: '',
		port: 0,
		_instance: null,

		instance: function() {
			
			if(!this._instance)
			{
				
			}
			
			return this._instance;
		},
		
		init: function(){
			this.aibeiPay = new AiBeiPay();
		},
		
		data: {
			transId: '',
			sign: '',
			retFunc: null,
			baseZIndex: 88,
			closeTxt: "返回游戏",
			redirecturl: "http://h5.leyan168.com/dezhou/", 
			cpurl: "http://h5.leyan168.com/dezhou/space-test",
			signtype: "RSA"
		},
		
		setDataRedirecturl: function(redirecturl){
			
			this.data.redirecturl = redirecturl;
		},
		
		setDataCpurl: function(cpurl){
			
			this.data.cpurl = cpurl;
		},
		
		setDataRetFunc: function(retFunc){
			
			this.data.retFunc = retFunc;
		},
		
		setIp: function(ip){
			
			this.ip = ip;
		},
		
		setPort: function(port){
			
			this.port = port;
		},
		
		createXMLHttpRequest: function(){
			
			if(window.ActiveXObject)
			{
				this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			else if(window.XMLHttpRequest)
			{
				this.xmlHttp = new XMLHttpRequest();
			}
		},
		
		pay: function(appuserid,price){
			var self = this;
			this.createXMLHttpRequest();
			var url= "http://" + this.ip + ":" + this.port + "/?appuserid=" + appuserid + "&price=" + price + "&redirecturl=" + this.data.redirecturl + "&cpurl=" + this.data.cpurl;
			console.log("pay: " + url);
			this.xmlHttp.open("POST",url,true);
			this.xmlHttp.onreadystatechange = self.ShowResult;
			this.xmlHttp.send(null);
		},
		
		ShowResult: function(){
			
			if(APay.Order.xmlHttp.readyState == 4)
			{
				if(APay.Order.xmlHttp.status == 200)
				{
					var obj = JSON.parse(APay.Order.xmlHttp.responseText);
					
					if(obj)
					{
						APay.Order.data.transId = obj.transid; 
						APay.Order.data.sign = obj.rsastr;
						APay.Order.aibeiPay.clickAibei(APay.Order.data); 
						console.log("[#####]xmlHttp.responseText = " + APay.Order.xmlHttp.responseText);
						console.log("[#####]data.transId = " + APay.Order.data.transId);
						console.log("[#####]data.sign = " + APay.Order.data.sign);
					}
					else
					{
						console.error("JSON.parse error!");
					}
				}
			}
		},
		
		saveUserId: function(appuserid) {
			
			try
			{
				localStorage.appuserid = appuserid;
			} 
			catch (e)
			{
				console.warn('浏览器不支持本地缓存！');
			}
		},
	};