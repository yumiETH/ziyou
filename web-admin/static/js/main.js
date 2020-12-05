;
(function () {

  'use strict';

  let isFirstLogEvent;
  let isOwner;
  let isOwnerIns;

  let web3 = null;
  let senderAddress = null;
  let contractObj = null;
  let contractObjIns = null;

  // userInterface合约地址
  let contractAddress = "0x6b69c861f3ee36c9219e631e33e66ef76f778ada";

  // Insurance合约地址
  let contractAddressIns = "0x68171d0bb388406e1c50fa6bd6b29e427a8ab918";

  window.addEventListener('load', async () => {
    $('.alert-danger').hide();
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false
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
    console.log("web对象：" + web3);
    console.log(web3);

    web3.eth.defaultAccount = web3.eth.accounts[0];
    senderAddress = web3.eth.accounts[0];
    console.log("钱包登录地址：" + senderAddress);

    hideLoading();
    loadContract();
    loadContractIns();
  });

  // 加载合约
  var loadContract = function () {
    hideLoading();
    var ABIString = [
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
		"name": "destroyContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
		"inputs": [],
		"name": "userStaticInterface",
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
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
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
			},
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
	}
];
    var infoContract = web3.eth.contract(ABIString);
    contractObj = infoContract.at(contractAddress);
    console.log("合约对象" + contractObj);
    console.log(contractObj);

    getOwnerInfo();
  }

  // 获取owner信息
  var getOwnerInfo = function () {
    showLoading();
    contractObj.isOwner.call(
      function (error, result) {
        if (!error) {
          console.log(result);
          isOwner = result;
          if (isOwner) {
            $(".isOwner").html("true")
          } else {
            $(".isOwner").html("false")
          }
          getContractBlance();
        }
      }
    );
  }

  // 获取合约余额
  var getContractBlance = function () {
    contractObj.contractBlance.call(
      function (error, result) {
        if (!error) {
          let balance = web3.fromWei(result.toString(), 'ether');
          console.log(balance);
          $(".balance").html(balance)
          hideLoading();
        }
      }
    );
  }

  // 销毁合约
  
  var destroyContract = function () {
    $('.destroyContract').click(function () {
      if (!isOwner) {
        alert("not owner!")
        return;
      }

      showLoading();
      contractObj.destroyContract(
        function (error, result) {
          hideLoading();
          if (!error) {
            console.log(result);
            alert("SUCCESS")
            getOwnerInfo();
            // location.reload()
          } else {
            console.log(error);
            alert(error.message);
          }
        }
      );
    })
  }

  // 关闭合约
  var closeStatus = function () {
    $('.closeStatus').click(function () {
      if (!isOwner) {
        alert("not owner!")
        return;
      }

      showLoading();
      contractObj.closeStatus(
        function (error, result) {
          hideLoading();
          if (!error) {
            console.log(result);
            alert("SUCCESS")
            getOwnerInfo();
            // location.reload()
          } else {
            console.log(error);
            alert(error.message);
          }
        }
      );
    })
  }

  // 打开合约
  var openStatus = function () {
    $('.openStatus').click(function () {
      if (!isOwner) {
        alert("not owner!")
        return;
      }

      showLoading();
      contractObj.openStatus(
        function (error, result) {
          hideLoading();
          if (!error) {
            console.log(result);
            alert("SUCCESS")
            getOwnerInfo();
            // location.reload()
          } else {
            console.log(error);
            alert(error.message);
          }
        }
      );
    })
  }

  // 管理奖分红
  var dividends = function () {
    $('.dividends').click(function () {
      if (!isOwner) {
        alert("not owner!")
        return;
      }

      showLoading();
      contractObj.userTeamGlobalInterface(
        function (error, result) {
          if (!error) {
            console.log(result);
            alert("SUCCESS");
            getContractBlance();
            // isFirstLogEvent = false;
            // watchLogEvent();
          } else {
            hideLoading();
            console.log(error);
            console.log(error.message);
            if (error.message.indexOf("[ethjs-rpc]") != -1) {
              alert("It must be over 24 hours！");
            } else {
              alert(error.message);
            }
          }
        }
      );
    })
  }

  // 监听log事件
  var watchLogEvent = function () {
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
            getContractBlance();
            // location.reload()
          } else {
            hideLoading();
            alert("error:" + msg);
          }
        }
      } else {
        hideLoading();
        console.log(error);
      }
    });
  }


  // =========================================
  // ================= 保险合约 ================
  // =========================================

  // 加载保险合约
  var loadContractIns = function () {
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
		"constant": false,
		"inputs": [],
		"name": "closeStatus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getConBalance",
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
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
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
    contractObjIns = infoContract.at(contractAddressIns);
    console.log("保险合约对象" + contractObjIns);
    console.log(contractObjIns);

    getOwnerInfoIns();
  }

  // 获取owner信息
  var getOwnerInfoIns = function () {
    showLoading();
    contractObjIns.isOwner.call(
      function (error, result) {
        if (!error) {
          console.log(result);
          isOwnerIns = result;
          if (isOwnerIns) {
            $(".isOwnerIns").html("true")
          } else {
            $(".isOwnerIns").html("false")
          }
          getContractBalanceIns();
        }
      }
    );
  }

  // 获取保险合约余额
  var getContractBalanceIns = function () {
    contractObjIns.getConBalance.call(
      function (error, result) {
        if (!error) {
          let balance = web3.fromWei(result.toString(), 'ether');
          console.log(balance);
          $(".balanceIns").html(balance)

          hideLoading();
        }
      }
    );
  }

  // 销毁保险合约
  var destroyContractIns = function () {

    $('.destroyContractIns').click(function () {
      if (!isOwnerIns) {
        alert("not owner!")
        return;
      }
      showLoading();
      contractObjIns.destroyContract(
        function (error, result) {
          hideLoading();
          if (!error) {
            console.log(result);
            alert("SUCCESS")
            getOwnerInfoIns();
            // location.reload()
          } else {
            console.log(error);
            alert(error.message);
          }
        }
      );
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

  $(function () {
    destroyContract();
    dividends();
    destroyContractIns();
    closeStatus();
    openStatus();
  });

}());