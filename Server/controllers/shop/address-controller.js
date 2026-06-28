import Address from "../../model/Address.js";


export const addAddress = async (req, res) => {

    try {

        const { userId, address, city, pinCode, phone, notes } = req.body;

        if (!userId || !address || !city || !pinCode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                messege: "invalid data provided"
            })
        }


        const newlyCreatedAddress = new Address({
            userId, address, city, pinCode, phone, notes
        })

        await newlyCreatedAddress.save();

        res.status(201).json({
            success: true,
            messege: "successfully add address",
            data: newlyCreatedAddress
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            messege: "internal server error"
        })
    }
}

export const fetchAllAddress = async (req, res) => {

    try {

        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                messege: "invalid data provided"
            })

        }

        const adddress = await Address.find({ userId });

        res.status(200).json({
            success: true,
            data: adddress
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            messege: "internal server error"
        })
    }
}

export const updateAddress = async (req, res) => {

    try {
        const { userId, addressId } = req.params;
        const formData = req.body;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                messege: "invalid data provided"
            })
        }

        const address = await Address.findOneAndUpdate({
            _id: addressId, userId,
        }, formData, { new: true });


        if (!address) {
            return res.status(404).json({
                success: false,
                messege: "address not found"
            })
        }

        res.status(200).json({
            success: true,
            data: address
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            messege: "internal server error"
        })
    }
}

export const deleteAddress = async (req, res) => {

    try {
        const { userId, addressId } = req.params;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                messege: "invalid data provided"
            })
        }

        const address = await Address.findOneAndDelete({
            _id: addressId,
            userId
        })

        if (!address) {
            return res.status(404).json({
                success: false,
                messege: "address not found"
            })
        }

        res.status(200).json({
            success: true,
            data: address
        })


    } catch (err) {
        res.status(500).json({
            success: false,
            messege: "internal server error"
        })
    }
}