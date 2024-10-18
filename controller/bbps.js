const models = require("../models");
const BbpsCategory = models.BbpsCategory;
const BbpsDetail = models.BbpsDetail;
const Transaction = models.Transaction;
const User = models.User;
const History = models.History;
var moment = require("moment");
const constants = require(__dirname + '/../config/config.json')['constants'];

const getbbpscategories = async (req, res) => {
    try {
        await BbpsCategory.findAll()
          .then((data) => {
            return res.status(200).json({
                status: 'success',
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

const catBillers = async (req, res) => {
  const axios = require('axios');
  let data = {
    'cat_key' : req.body.cat_id,
  };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: constants.ECUZEN_API_URL+'bbps/v2/cat_billers',
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
     
    }
    
    else{
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

const fetchBill = async (req, res) => {
  const axios = require('axios');
  let data = {
    'biller_id' : req.body.biller_id,
    'param1' :  req.body.param1,
    'txnid' :  req.body.txnid,
    
  };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: constants.ECUZEN_API_URL+'bbps/v2/fetch_bill',
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
        skey: response.data.skey,
 
      });
     
    }
    
    
    else{
      if(response.data.data.status == "Payment received for the billing period no bill due"){
        return res.status(200).json({
          status: 'error',
          message: response.data.data.status,
        });
      }
      else{
        console.log(err , "err123")
        return res.status(200).json({
          status: 'error',
          message: response.data.msg,
        });
      }
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
    await BbpsDetail.create(data)
      .then((data) => {
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

const payBill = async (req, res) => {
  const axios = require('axios');
  const  data  = req.body;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: constants.ECUZEN_API_URL+'bbps/v2/pay_bill',
    headers: { 
      'api-key': constants.ECUZEN_API_KEY
    },
    data : data
  };
  try {
    const txnid = data.txnid;
    const userid = data.userid;
    const amount = data.amount;
    console.log('TXNID',txnid);
    console.log('userid',txnid);
    const response = await axios.request(config);
    const bbps = await BbpsDetail.findOne({ where: { orderid: txnid } });

    if (!bbps) {
      return res.status(200).json({
        message: 'error',
        data: 'Bbps record not found'
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

    bbps.apiresponse = JSON.stringify(response.data) || '';

    if (response.data.status === 'SUCCESS') {
      bbps.status = 'Success';
      transaction.status = 'Success';
      history.status = 'Success';
    } else if (response.data.status === 'FAILED' || response.data.status === 'ERROR') {
      try {
        await refundTransaction(txnid, amount, userid, user, bbps.billercatname || '');
        bbps.status = 'Failed';
        transaction.status = 'Success';
        history.status = 'Success'; 
      } catch (err) {
        return res.status(200).json({
          message: 'error',
          data: err.message,
        });
      }
    }
    await transaction.save();
    await bbps.save();
    await history.save();
    return res.status(200).json({
      message: response.data.status,
      data: response.data.msg
    });

  } catch (error) {
    throw error;
    // return res.status(200).json({
    //   message: 'error',
    //   data: error
    // });
  }
}

const refundTransaction = async (txnid, amount, userid, user, catname) => {
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
      type: "bbps",
      status: "Refund",
      trans_id : newTransaction.id,
      trans_order_id : RefundorderId,
      refundtransorderid : txnid,
      typename : 'BBPS - '+catname
    };
    await History.create(historydata);
    return 'Refunded';
  } catch (err) {
    throw new Error(err.message);
  }
};

const viewAll = async (req, res) => {
  try {
    await BbpsDetail.findAll({
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

module.exports = {
    getbbpscategories,catBillers,fetchBill,payBill,create,viewAll
  };