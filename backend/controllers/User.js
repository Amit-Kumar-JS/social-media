const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(500)
        .json({ success: false, message: "User already exists" });
    }

    user = await User.create({name , email , password , avatar: { public_id:"sample id", url:"sampleurl"}})

    res.status(201).json({success:true , user})

  } catch (error) {
    res.json({ error: error.message, success: false });
  }
};


exports.login = async (req,res)=>{
    try {
        
        const {email , password} = req.body;

        console.log(email , password);

        const user = await User.findOne({email:email}).select("+password");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User doesn't exist",
            })
        }
        const isMatch =  await user.matchPassword(password);
        if(!isMatch){

            return res.status(400).json({
                success:false,
                message:"Incorrect password or email",
            })
        }
        const token = await user.generateToken();

        res.status(200).cookie("token",token).json({
            success:true,
            user,
        })


    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}