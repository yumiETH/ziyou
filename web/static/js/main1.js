(function () {

	'use strict';
	// web地址
	let serverURL = "http://zy.iwcapp.com/web/";
	let alertMsg;
	let tabText;
	let settlementValue;
	let withDrawValue;
	let isFirstLogEvent;

	let invate_val1;
	let invate_val2;
	let invate_val3;

	let web3 = null;
	let senderAddress = null;
	let contractObj = null;
	

	// 合约地址
	let contractAddress = "0xe754D930C43b859B9eb65A2f8619A0Df7ea0fc1F";
    
    window.addEventListener('load', async () => {
		if (window.ethereum) {
			window.ethereum.autoRefreshOnNetworkChange = false;
			$('.alert-danger').hide();
			web3 = new Web3(ethereum);
			try {
				await ethereum.enable();
			} catch (e) {}

		} else if (window.web3) {
			$('.alert-danger').hide();
			web3 = new Web3(web3.currentProvider);
		} else {
			$('.alert-danger').show();
		}
		console.log("web3对象：" + web3);
		console.log(web3);

		web3.eth.defaultAccount = web3.eth.accounts[0];
		senderAddress = web3.eth.accounts[0];
		console.log("钱包登录地址：" + senderAddress);

		hideLoading();
		loadContract();
	});

	// 加载合约
	var loadContract = function () {
		hideLoading();
		var ABIString = [
	{
		"constant": false,
		"inputs": [],
		"name": "openStatus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destroyContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserInvitation",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "userStaticInterface",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserDataTwo",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "closeStatus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "userTeamGlobalInterface",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "userAddInterface",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "checkTeamAmount",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractBlance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserDataThree",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "userWithdrawal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawal",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserDataOwn",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	}
];
		var infoContract = web3.eth.contract(ABIString);
		contractObj = infoContract.at(contractAddress);
		console.log("合约对象" + contractObj);
		console.log(contractObj);
		getUserDataOwn();
	}

	/*
	获取用户信息
	调用合约角色（ user）
	输入 直接调用用户地址
	
	返回（ 用户等级 0
	用户团队等级（ 管理奖等级） 1
	已结算分红收益 2
	推荐奖励3
	管理奖收益4
	N倍动静出局还差 5(n是通过判断用户的等级来写， 用户1级n = 3， 2 级n = 4， 三级n = 5)
	未结算预计收益 6
	未提笔币数量 7
	*/
    var getUserDataOwn = function () {
        showLoading();
        contractObj.getUserDataOwn.call(
        function (error, result) {
        if (!error) {
            console.log(result.toString());

            let opt_val0 = result[0].toString();
            let opt_val1 = result[1].toString();
            let opt_val2 = web3.fromWei(result[2].toString(), 'ether');
            let opt_val3 = web3.fromWei(result[3].toString(), 'ether');
            let opt_val4 = web3.fromWei(result[4].toString(), 'ether');
            let opt_val5 = web3.fromWei(result[5].toString(), 'ether');
            settlementValue = web3.fromWei(result[6].toString(), 'ether');;
            withDrawValue = web3.fromWei(result[7].toString(), 'ether');
        
            $(".userLevel").html(opt_val0)
            $(".userTeamLevel").html(opt_val1)
            $(".opt_val3").html(opt_val2)
            $(".opt_val4").html(opt_val3)
            $(".opt_val5").html(opt_val4)
            $(".opt_val7").html(opt_val5)
            $(".opt_val8").html(settlementValue)
            $(".opt_val9").html(withDrawValue)

           
               // n是通过判断用户的等级来写， 用户1级n = 3， 2 级n = 4， 三级n = 5
           let titleN = 0;
           if (opt_val0 == 1) {
              titleN = 3;
            } else if (opt_val0 == 2) {
              titleN = 4;
            } else if (opt_val0 == 3) {
              titleN = 5;
            } else {
              titleN = 0;
            }
         var langType = getCookie("language") || "en";
         let jsonPath = "static/locales/" + langType + "/" + "translation.json";
        $.getJSON(jsonPath, function (data) {
            var titleStr = data.option.opt7;
            $(".opt_val7_title").html(titleN + titleStr.substring(1, titleStr.length));
        })
           
           

            getUserInvitation(opt_val0);
        }
        }
        );
    }
    
	/*
	getUserInvitation 获取邀请信息
	调用角色（ user）
	返回（ 我的推荐人地址， 我的直推数量）；
	未加入地址不显示邀请地址， 复制--，使用用户等级判断： getUserDataOwn.result[0]
	*/
	var getUserInvitation = function (userLevel) {

		let isJoin = parseInt(userLevel);
		contractObj.getUserInvitation.call(
			function (error, result) {
				if (!error) {
					console.log("邀请信息");
					console.log(result);

					// 验证地址非空
					invate_val1 = null;
					console.log(result[0].toString());
					if (result[0].toString() != "0x") {
						if (!web3.toBigNumber(result[0].toString()).isZero()) {
							invate_val1 = result[0].toString();
						}
					} else {
						hideLoading();
					}

					invate_val2 = result[1].toString();
					if (isJoin) {
						invate_val3 = serverURL + "?inviteAddress=" + senderAddress;
					} else {
						invate_val3 = "--";
					}
					getLoccalInviteInfo();

					getUserDataTwo();
				}
			}
		);
	}

	// 复制我的链接
	var copyInvateLink = function () {
		$('.copyInvateLink').click(function () {
			var flag = copyText(invate_val3);
			alert(flag ? "success" : "error");
		})
	}

	/*
	获取用户信息2
	调用合约角色（ user）
	输入 直接调用用户地址
	返回（ 用管理奖奖池总量 0
	已投入总资金 1
	一级管理人数 2
	二级管理人数 3
	三级管理人数 4
	四级管理人数 5
	*/
	var getUserDataTwo = function () {
		contractObj.getUserDataTwo.call(
			function (error, result) {
				if (!error) {
					console.log(result);
					//let opt_val10 = web3.fromWei(result[0].toString(), 'ether');
					let opt_val11 = web3.fromWei(result[1].toString(), 'ether');
					let opt_val12 = result[2].toString();
					let opt_val13 = result[3].toString();
					let opt_val14 = result[4].toString();
					let opt_val15 = result[5].toString();

					//$(".opt_val10").html(opt_val10)
					$(".opt_val11").html(opt_val11)
					$(".opt_val12").html(opt_val12)
					$(".opt_val13").html(opt_val13)
					$(".opt_val14").html(opt_val14)
					$(".opt_val15").html(opt_val15)

					getUserDataThree();
				}
			}
		);
	}

	/*
	获取用户信息3
	调用合约角色（ user）
	输入 直接调用用户地址
	*/
	var getUserDataThree = function () {
		hideLoading();
		contractObj.getUserDataThree.call(
			function (error, result) {
				if (!error) {
					console.log(result);
					let opt_val16 = result[0].toString();
					let opt_val17 = result[1].toString();
					let opt_val18 = result[2].toString();
					let opt_val19 = result[3].toString();
					let opt_val20 = result[4].toString();
					let opt_val21 = result[5].toString();
					let opt_val22 = web3.fromWei(result[6].toString(), 'ether');

					$(".opt_val16").html(opt_val16)
					$(".opt_val17").html(opt_val17)
					$(".opt_val18").html(opt_val18)
					$(".opt_val19").html(opt_val19)
					$(".opt_val20").html(opt_val20)
					$(".opt_val21").html(opt_val21)
					$(".opt_val22").html(opt_val22)

					hideLoading();
				}
			}
		);
	}

	// 获取要充值的eth值
	var getEthValue = function () {
		$('.part-btn button').click(function () {
			let text = $(this).text();
			var ethIndex = text.indexOf("ETH");
			$('.form-control').val(text.substr(0, ethIndex));
		})
	}

	// 发送ETH
	var sendEth = function () {
		$('.sendETH').click(function () {

			let inviteAddress = $.Request("inviteAddress");
			if (inviteAddress == null || inviteAddress.length == 0) {
				alert(alertMsg.tip1);
				return;
			}

			if (inviteAddress == senderAddress) {
				alert(alertMsg.tip2);
				return;
			}

			let ethValue = $('.form-control').val();
			if (ethValue == null || ethValue.length == 0) {
				alert(alertMsg.tip3);
				return;
			}

			// 判断数字和浮点型
			var patt1 = /^\d+$/;
			var patt2 = /^\d+\.\d+$/;
			if (!patt1.test(ethValue) && !patt2.test(ethValue)) {
				alert(alertMsg.tip4);
				return;
			}

			if (getFloatStr(ethValue) < 1) {
				alert(alertMsg.tip5);
				return;
			}

			showLoading();
			// ether->wei
			let weiValue = web3.toWei(ethValue, 'ether');
			contractObj.userAddInterface(inviteAddress, {
					value: weiValue
				},
				function (error, result) {
					if (!error) {
						console.log(result);
						alert("SUCCESS");
						getUserDataOwn();
						// isFirstLogEvent = false;
						// watchLogEvent("event_send");
					} else {
						hideLoading();
						console.log(error);
						console.log(error.message);
						if (error.message.indexOf("[ethjs-rpc]") != -1) {
							alert("You've already invested!");
						} else {
							alert(error.message);
						}
					}
				}
			);
		})
	}

	// 结算
	var settlement = function () {
		$('.settlement').click(function () {
			if (settlementValue == null || settlementValue.length == 0) {
				alert(alertMsg.tip6);
				return;
			}
			showLoading();
			contractObj.userStaticInterface(
				function (error, result) {
					if (!error) {
						console.log(result);
						alert("SUCCESS");
						getUserDataOwn();
						// isFirstLogEvent = false;
						// watchLogEvent("event_settlement");
					} else {
						hideLoading();
						console.log(error);
						console.log(error.message);
						if (error.message.indexOf("[ethjs-rpc]") != -1) {
							alert("The extraction interval must be greater than 24 hours!");
						} else {
							alert(error.message);
						}
					}
				}
			);
		})
	}

	// 提现收益
	var withDraw = function () {
		$('.withDraw').click(function () {
			if (parseFloat(withDrawValue) < 0.01) {
				alert(alertMsg.tip7);
				return;
			}
			showLoading();
			contractObj.userWithdrawal(
				function (error, result) {
					if (!error) {
						console.log(result);
						alert("SUCCESS");
						getUserDataOwn();
						// isFirstLogEvent = false;
						// watchLogEvent("event_withdraw");
					} else {
						hideLoading();
						console.log(error);
						console.log(error.message);
						if (error.message.indexOf("[ethjs-rpc]") != -1) {
							alert("The extraction interval must be greater than 24 hours!");
						} else {
							alert(error.message);
						}
					}
				}
			);
		})
	}

	// 监听log事件
	var watchLogEvent = function (eventName) {
		var logEvent = contractObj.logState();
		logEvent.watch(function (error, result) {
			if (!error) {
				logEvent.stopWatching();
				if (!isFirstLogEvent) {
					isFirstLogEvent = true;
					console.log("监听事件");
					console.log(result);
					var state = result.args.state;
					var msg = result.args.msg;
					if (state) {
						alert(msg);
						getUserDataOwn();
						// location.reload()
					} else {
						alert("error:" + msg);
						hideLoading();
					}
				}
			} else {
				hideLoading();
				console.log(error);
			}
		});
	}

	// 获取多语言提示
	var getLocalJson = function () {
		var langType = getCookie("language") || "en";
		let jsonPath = "static/locales/" + langType + "/" + "translation.json";
		$.getJSON(jsonPath, function (data) {
			alertMsg = data.alertMsg;
			tabText = data.tabText;
			getLoccalInviteInfo();
		})
	}

	// 多语言支持邀请信息
	var getLoccalInviteInfo = function () {
		if (tabText) {
			let invateStr = tabText.text31 + invate_val1 + "<br>" + tabText.text32 + invate_val2 + "<br>" + tabText.text33 + invate_val3 + "<br>";
			$(".invateStr").html(invateStr)
		}
	}

	// 复制到剪切板
	var copyText = function (text) {
		var textarea = document.createElement("input");
		var currentFocus = document.activeElement;
		document.body.appendChild(textarea);
		textarea.value = text;
		textarea.focus();
		if (textarea.setSelectionRange)
			textarea.setSelectionRange(0, textarea.value.length);
		else
			textarea.select();
		try {
			var flag = document.execCommand("copy");
		} catch (eo) {
			var flag = false;
		}
		document.body.removeChild(textarea);
		currentFocus.focus();
		return flag;
	}
	$.extend({
		Request: function (m) {
			var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
			return sValue ? sValue[1] : sValue;
		},
		UrlUpdateParams: function (url, name, value) {
			var r = url;
			if (r != null && r != 'undefined' && r != "") {
				value = encodeURIComponent(value);
				var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
				var tmp = name + "=" + value;
				if (url.match(reg) != null) {
					r = url.replace(eval(reg), tmp);
				} else {
					if (url.match("[\?]")) {
						r = url + "&" + tmp;
					} else {
						r = url + "?" + tmp;
					}
				}
			}
			return r;
		}
	});

	// 判断整型或浮点型
	function getFloatStr(num) {
		num += '';
		num = num.replace(/[^0-9|\.]/g, '');

		if (/^0+/)
			num = num.replace(/^0+/, '');
		if (!/\./.test(num))
			num += '.00';
		if (/^\./.test(num))
			num = '0' + num;
		num += '00';
		num = num.match(/\d+\.\d{2}/)[0];
		return num;
	};

	// 点击下箭头
	var downBtn = function () {
		$('.countdown-arrow').click(function () {
			console.log($('#fh5co-core-feature').offset().top)
			$('html, body').animate({
				scrollTop: $('#fh5co-core-feature').offset().top
			}, 500, 'easeInOutExpo');
		})
	}

	// 显示Loading
	var showLoading = function () {
		$('body').LoadingOverlay("show")
	}

	// 隐藏Loaing
	var hideLoading = function () {
		$('body').LoadingOverlay("hide")
	}

	var mobileMenuOutsideClick = function () {
		$(document).click(function (e) {
			var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas')) {

					$('body').removeClass('offcanvas');
					$('.js-fh5co-nav-toggle').removeClass('active');

				}
			}
		});
	};

	var offcanvasMenu = function () {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function () {
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');
		}).mouseleave(function () {

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');
		});


		$(window).resize(function () {

			if ($('body').hasClass('offcanvas')) {

				$('body').removeClass('offcanvas');
				$('.js-fh5co-nav-toggle').removeClass('active');

			}
		});
	};


	var burgerMenu = function () {

		$('body').on('click', '.js-fh5co-nav-toggle', function (event) {
			var $this = $(this);


			if ($('body').hasClass('overflow offcanvas')) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo');
					});

				}, 100);

			}

		}, {
			offset: '85%'
		});
	};

	var dropdown = function () {
		$('.has-dropdown').mouseenter(function () {
			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');
		}).mouseleave(function () {
			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});
	};


	var goToTop = function () {
		$('.js-gotop').on('click', function (event) {
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			return false;
		});

		$(window).scroll(function () {

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}
		});

	};


	// Loading page
	var loaderPage = function () {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function () {
		$('.js-counter').countTo({
			formatter: function (value, options) {
				return value.toFixed(options.decimals);
			},
		});
	};

	var counterWayPoint = function () {
		if ($('#fh5co-counter').length > 0) {
			$('#fh5co-counter').waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(counter, 400);
					$(this.element).addClass('animated');
				}
			}, {
				offset: '90%'
			});
		}
	};
	/*
	 *存cookie(cookieName--字段名   cookieValue--字段值   cookieDates--有效时间)
	 * */
	var saveCookie = function (cookieName, cookieValue, cookieDates) {
		var d = new Date();
		d.setDate(d.getDate() + cookieDates);
		document.cookie = cookieName + "=" + cookieValue + ";expires=" + d.toGMTString();
	}
	//取cookie
	var getCookie = function (cookieName) {
		var cookieStr = unescape(document.cookie);
		var arr = cookieStr.split("; ");
		var cookieValue = "";
		for (var i = 0; i < arr.length; i++) {
			var temp = arr[i].split("=");
			if (temp[0] == cookieName) {
				cookieValue = temp[1];
				break;
			}
		}
		return cookieValue;
	}
	var translateLanguage = function () {

		function lang(language) {
			$.i18n.init({
				lng: language, //指定语言
				resGetPath: './static/locales/' + language + '/translation.json', //语言文件的路径
				ns: {
					namespaces: ['translation', 'message'],
					defaultNs: 'translation' //默认使用的，不指定namespace时
				}
			}, function (err, t) {
				$('[data-i18n]').i18n(); // 通过选择器集体翻译
				$('[data-i18n-html]').each(function () {
					var date_name = $(this).attr("data-i18n-html");
					$(this).html($.t(date_name));
				});
				var month = new Array($.t("month.January"), $.t("month.February"), $.t("month.March"), $.t("month.April"), $.t("month.May"), $.t("month.June"), $.t("month.July"));
			});
		}
		var langType = getCookie("language") || "en";
		lang(langType);
		$(".chinese").click(function () {
			lang("zh");
			saveCookie("language", "zh", 1);
			getLocalJson();
		});
		$(".english").click(function () {
			lang("en");
			saveCookie("language", "en", 1);
			getLocalJson();
			// location.reload()
		});
		$(".japanese").click(function () {
			lang("ja");
			saveCookie("language", "ja", 1);
			getLocalJson();
			// location.reload()
		});
		$(".korean").click(function () {
			lang("ko");
			saveCookie("language", "ko", 1);
			getLocalJson();
			// location.reload()
		});
		$(".russia").click(function () {
			lang("ru");
			saveCookie("language", "ru", 1);
			getLocalJson();
			// location.reload()
		});
	}

	$(function () {
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
		counterWayPoint();
		translateLanguage();
		saveCookie();
		getCookie();
		getLocalJson();
		getLoccalInviteInfo();
		downBtn();
		getEthValue();
		sendEth();
		copyInvateLink();
		settlement();
		withDraw();
	});
}());