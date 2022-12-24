const User = require("../models/User");
const matchPassword = require("../models/User")

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(500)
        .json({ success: false, message: "User already exists" });
    }

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: "sample id", url: "sampleurl" },
    });

    const token = await user.generateToken();

    res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        user,
      });

    // res.status(201).json({success:true , user})
  } catch (error) {
    res.json({ error: error.message, success: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password or email",
      });
    }
    const token = await user.generateToken();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        user,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
      success: true,
      message: "Logged Out"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.follow = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    // console.log(req.user._id)

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (loggedInUser.following.includes(req.params.id)) {
      const indexFollowing = loggedInUser.following.indexOf(req.params.id);
      loggedInUser.following.splice(indexFollowing, 1);

      // console.log(indexFollowing)
      const indexFollower = userToFollow.followers.indexOf(req.user._id);
      userToFollow.followers.splice(indexFollower, 1);
      // console.log(indexFollower)

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "unfollowed",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword } = req.body;
    const isMatch = await user.matchPassword(oldPassword)


    if(!oldPassword || !newPassword) {
      return res.status(400).json({
        success:false,
        message:"Please provide old and new password",
      })
    }

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old Password",
      })
    }
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated"
    })



  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}

exports.updateProfile = async (req,res)=>{
  try {
    
    const user = await User.findById(req.user._id);
    const {name ,email} = req.body;

    if(name){
      user.name = name;

    }
    if(email){
      user.email = email;
    }
    await user.save();
    res.status(200).json({
      success:true,
      message:"Profile Updated"
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}
