import Message from "../models/Message.js";
import User from "../models/User.js";
import Cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getAllContacts:", error);
        res.status(500).json({message: "Server error"});
    }
}

export const getMessagesByUserId = async (req, res) => {
      try {
        const myId = req.user._id;
        const {id: userToChatId} = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId},
                { senderId: userToChatId, receiverId: myId},
            ]
        })
        res.status(200).json(messages);
      } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({message: "Internal Server error"});
      }
}

export const sendMessage = async (req, res) => {
     try {
        const {text, image} = req.body;
        const { id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //upload it to the clodinary then store it to database,
            const uploadResponse = await Cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // send message in real time if user is online (socket.io)
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json(newMessage);

     } catch(error) {
        console.log("Error in sendMessages controller:", error.message);
        res.status(500).json({message: "Internal Server error"});
     }

}

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Find the latest message for each chat partner
        const latestMessages = await Message.aggregate([
            {
                $match: {
                    $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }]
                }
            },
            {
                $sort: { createdAt: -1 } // Sort all messages by newest first
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$senderId", loggedInUserId] },
                            then: "$receiverId",
                            else: "$senderId"
                        }
                    },
                    latestMessageAt: { $first: "$createdAt" }
                }
            },
            {
                $sort: { latestMessageAt: -1 } // Sort the grouped partners by the latest message timestamp
            }
        ]);

        const chatPartnerIds = latestMessages.map(msg => msg._id);

        // Fetch user details for the partners
        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

        // Sort the fetched users to match the chronological order of chatPartnerIds
        const sortedChatPartners = chatPartners.sort((a, b) => {
            const indexA = chatPartnerIds.findIndex(id => id.toString() === a._id.toString());
            const indexB = chatPartnerIds.findIndex(id => id.toString() === b._id.toString());
            return indexA - indexB;
        });

        res.status(200).json(sortedChatPartners);
    } catch (error) {
        console.log("Error in getChatPartners controller:", error.message);
        res.status(500).json({ message: "Internal Server error" });
    }
}