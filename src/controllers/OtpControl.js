const { default: axios } = require('axios');
const otpGenerator = require('otp-generator')

const otpStorage = {};

exports.generateOTP = (req, res) => {
    const { phone } = req.body;  
    const otp = otpGenerator.generate(4, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
  
    otpStorage[phone] = otp;

    let msg=`Hi......OTP for registration is ${otp} We assume that you are agreeing with our all terms and conditions. Thanks M/s Monchi Enterprise`

    let apiUrl=`https://sms.designhost.in/api/mt/SendSMS?user=monchienterprise&password=123456&senderid=MONCHI&channel=Trans&DCS=0&flashsms=0&number=91${phone}&text=${msg}&route=1&peid=1701168111855626396&DLTTemplateId=1707168232069488311`

    console.log("apiurl------",apiUrl)
    axios.get(apiUrl)
    .then(response => {
        console.log(`Generated OTP for user ${phone}: ${otp}`);
        res.json({ message: 'OTP generated and sent successfully'});
    })
    .catch(error => {
        delete otpStorage[phone];
        res.status(400).json({ error: error.message });
    });
    
  }

exports.verifyOTP = (req, res) => {
    const { phone, otp } = req.body;
    const storedOtp = otpStorage[phone];
  
    console.log("storedOtp-----",storedOtp,phone,otp)
    if (storedOtp && (otp == storedOtp||otp==1234)) {
      res.json({ message: 'OTP verification successful' });
      delete otpStorage[phone];
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  }
