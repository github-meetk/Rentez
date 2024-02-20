const Property = require("../models/Property");
const User = require("../models/User");

exports.getAdminDetails = async (req, res) => {
    try {
        const users = await User.find({});
        const customers = await User.find({accountType : "Customer"});
        const sellers = await User.find({accountType : "Seller"});
        const properties = await Property.find({});
        const Bunglow = await Property.find({propertyType : "Bunglow"})
        const Flat = await Property.find({propertyType : "Flat"})
        const Villa = await Property.find({propertyType : "Villa"})
        const Farmhouse = await Property.find({propertyType : "Farmhouse"})
        const Land = await Property.find({propertyType : "Land"});

        let totalSubscription = 0;
        let Standard = 0;
        let Premium = 0;
        let Gold = 0;
        let amount = 0;


        for (let i = 0; i<sellers.length; i++){
            if(sellers[i].planType){
                totalSubscription++;
            }
            if(sellers[i].planType === 'Standard'){
                Standard++;
                amount = amount + 499;
            }else if(sellers[i].planType === 'Premium'){
                Premium++;
                amount = amount + 999;
            }else if(sellers[i].planType === 'Gold'){
                Gold++;
                amount = amount + 1499;
            }
        }

        let data = {};
        data.users = users.length;
        data.customers = customers.length;
        data.sellers = sellers.length;
        data.properties = properties.length;
        data.bunglow = Bunglow.length;
        data.flat = Flat.length;
        data.villa = Villa.length;
        data.farmhouse =Farmhouse.length;
        data.land = Land.length;
        data.totalSubscription = totalSubscription;
        data.Standard = Standard;
        data.Premium = Premium;
        data.Gold = Gold;
        data.amount = amount;

        return res.status(200).json({
            success: true,
            data,
            message:"Admin data Fetched!!"
          });
       
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };