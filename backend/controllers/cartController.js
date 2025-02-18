import userModel from '../models/userModel.js'
import userRouter from '../routes/userRoutes.js'

//add items to user cart
const addToCart = async (req,res)=>{
try {
    let userData = await userModel.findById({_id:req.body.userId})
    let cartData= await userData.cartData
    if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId]=1
    }
    else{
        cartData[req.body.itemId]+=1
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
     res.json ({success:true , message:"Added to Cart"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
    
}
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
      const { userId, itemId } = req.body;
  
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
  
      const cartData = { ...userData.cartData };
  
      if (cartData[itemId] && cartData[itemId] > 0) {
        cartData[itemId] -= 1;
  
        if (cartData[itemId] === 0) {
          delete cartData[itemId];
        }
  
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
      } else {
        res.json({ success: false, message: "Item not found in cart or quantity is already 0" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error occurred while removing item from cart" });
    }
  };
  
// fetch user cart data

const  getCart= async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

export{addToCart,removeFromCart,getCart}