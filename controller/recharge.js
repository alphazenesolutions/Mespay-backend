const models = require("../models");
const Recharge = models.Recharge;
const Transaction = models.Transaction;
const User = models.User;
const History = models.History;

var moment = require("moment");
const constants = require(__dirname + '/../config/config.json')['constants'];

const oplist = async (req, res) => {
  const axios = require('axios');
  let data = '';
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: constants.ECUZEN_API_URL+'recharge/oplist',
    headers: { 
      'api-key': constants.ECUZEN_API_KEY
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    if(response.data.status == 'SUCCESS'){
      return res.status(200).json({
        status: 'success',
        data: response.data.info,
      });
    }else{
      return res.status(200).json({
        status: 'error',
        message: response.data.msg,
      });
    }
  })
  .catch((error) => {
    return res.status(200).json({
      status: 'error',
      message: error.message,
    });
  });
  
};

const circlelist = async (req, res) => {
  const axios = require('axios');
  let data = '';
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: constants.ECUZEN_API_URL+'recharge/circles',
    headers: { 
      'api-key': constants.ECUZEN_API_KEY
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    if(response.data.status == 'SUCCESS'){
      return res.status(200).json({
        status: 'success',
        data: response.data.data,
      });
    }else{
      return res.status(200).json({
        status: 'error',
        message: response.data.msg,
      });
    }
  })
  .catch((error) => {
    return res.status(200).json({
      status: 'error',
      message: error.message,
    });
  });
  
};

const fetchop = async (req, res) => {
  const { mobile } = req.body;
  const axios = require('axios');
  let data = { mobile };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: constants.ECUZEN_API_URL+'recharge/fetchop',
    headers: { 
      'api-key': constants.ECUZEN_API_KEY
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    if(response.data.status == 'SUCCESS'){
      return res.status(200).json({
        status: 'success',
        data: response.data,
      });
    }else{
      return res.status(200).json({
        status: 'error',
        message: response.data.msg,
      });
    }
  })
  .catch((error) => {
    return res.status(200).json({
      status: 'error',
      message: error.message,
    });
  });
  
};

const create = async (req, res) => {
  try {
    const data = req.body;
    await Recharge.create(data)
      .then((data) => {
        res.json({
          status: 200,
          message: "SUCCESS",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

const dorecharge = async (req, res) => {
 
  const { mobile, opid, amount, txnid, userid } = req.body;

  const axios = require('axios');
  let data = { mobile, opid, amount, txnid };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: constants.ECUZEN_API_URL + 'recharge/dorecharge',
    headers: {
      'api-key': constants.ECUZEN_API_KEY
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    const recharge = await Recharge.findOne({ where: { orderid: txnid } });

    if (!recharge) {
      return res.status(200).json({
        message: 'error',
        data: 'Recharge record not found'
      });
    }

    const transaction = await Transaction.findOne({ where: { orderid: txnid } });
    const history = await History.findOne({ where: { trans_order_id: txnid } });

    const user = await User.findOne({ where: { id: userid } });
    if (!transaction) {
      return res.status(200).json({
        message: 'error',
        data: 'Transaction record not found'
      });
    }

    if (!user) {
      return res.status(200).json({
        message: 'error',
        data: 'User not found'
      });
    }

    recharge.apiresponse = JSON.stringify(response.data) || '';
console.log(response.data.status , "status")
    if (response.data.status === 'SUCCESS') {
      recharge.status = 'Success';
      transaction.status = 'Success';
      history.status = 'Success';
    } 
    else if (response.data.status === 'FAILED') {
      try {
        await refundTransaction(txnid, amount, userid, user);
        recharge.status = 'Failed';
        transaction.status = 'Success';
        history.status = 'Success';
      } catch (err) {
        console.log(err.message, "ddddddddddddddddddddddddddd")
        return res.status(200).json({
          message: 'error',
          data: err.message,
        });
      }
    }
    await transaction.save();
    await recharge.save();
    await history.save();
    return res.status(200).json({
      message: response.data.status,
      data: response.data.msg
    });
 
  } catch (error) {
    console.log(error,"catch1")
    return res.status(200).json({
      message: 'error',
      data: error
    });
  }
};

const viewAll = async (req, res) => {
  try {
    await Recharge.findAll({
      order: [["createdAt", "DESC"]]
      // include: [models.User],
    })
      .then(async (data) => {
        res.json({
          status: 200,
          message: "SUCCESS",
          data: data,
        });        
      })
      .catch((err) => {
        res.json({
          status: 200,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 200,
      message: error.message,
    });
  }
};

const planslist = async (req, res) => {
  const { opid, circle} = req.body;
  const axios = require('axios');
  let data = { opid, circle };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: constants.ECUZEN_API_URL+'recharge/plans',
    headers: { 
      'api-key': constants.ECUZEN_API_KEY
    },
    data : data
  };
  axios.request(config)
  .then((response) => {
    if(response.data.status == 'SUCCESS'){
      return res.status(200).json({
        status: 'success',
        data: response.data.data,
      });
    }else{
      return res.status(200).json({
        status: 'error',
        message: response.data.msg,
      });
    }
  })
  .catch((error) => {
    return res.status(200).json({
      status: 'error',
      message: error.message,
    });
  });
  
};

const refundTransaction = async (txnid, amount, userid, user) => {
  const RefundorderId = `mespay${Math.random().toString(36).substring(2, 15)}`;
  const refunddata = {
    orderid: RefundorderId,
    refundrefid: txnid,
    date: moment().format("YYYY-MM-DD HH:MM:SS"),
    status: "Refund",
    amount: amount,
    Trans_date: moment().format("YYYY-MM-DD HH:MM:SS"),
    user_id: userid,
    opening_bal: user.balance,
    closing_bal: Number(user.balance) + Number(amount),
  };

  try {
    const newTransaction = await Transaction.create(refunddata);
    user.balance = Number(user.balance) + Number(amount);
    await user.save();
    var historydata = {
      user_id: userid,
      opening_bal: user.balance,
      closing_bal: Number(user.balance) + Number(amount),
      amount: amount,
      type: "recharge",
      typename: "Recharge",
      status: "Refund",
      trans_id : newTransaction.id,
      trans_order_id : RefundorderId,
      refundtransorderid : txnid
    };
    await History.create(historydata);
    return 'Refunded';
  } catch (err) {
    throw new Error(err.message);
  }
};



module.exports = {
  oplist,
  circlelist,
  fetchop,
  create, 
  dorecharge,
  viewAll,
  planslist
  };