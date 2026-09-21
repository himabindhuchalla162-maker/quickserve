const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("=================================");
        console.log("MongoDB Connected Successfully!");
        console.log("QuickServe database ready!");
        console.log("=================================");
    })
    .catch((error) => {
        console.error("MONGODB CONNECTION ERROR:");
        console.error(error.message);
        process.exit(1);
    });

// ===============================
// BOOKING SCHEMA
// ===============================

const bookingSchema = new mongoose.Schema(
    {
        worker: {
            type: String,
            default: ""
        },

        service: {
            type: String,
            default: ""
        },

        name: {
            type: String,
            default: ""
        },

        phone: {
            type: String,
            default: ""
        },

        address: {
            type: String,
            default: ""
        },

        date: {
            type: String,
            default: ""
        },

        time: {
            type: String,
            default: ""
        },

        details: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

// ===============================
// EXPRESS
// ===============================

app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));

// ===============================
// HOME
// ===============================

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

// ===============================
// DATABASE TEST
// ===============================

app.get("/api/test", function (req, res) {

    res.json({
        success: true,
        message: "QuickServe + MongoDB is working!"
    });

});

// ===============================
// CREATE BOOKING
// ===============================

app.post("/api/bookings", async function (req, res) {

    try {

        const booking = new Booking({
            worker: req.body.worker || "",
            service: req.body.service || "",
            name: req.body.name || "",
            phone: req.body.phone || "",
            address: req.body.address || "",
            date: req.body.date || "",
            time: req.body.time || "",
            details: req.body.details || "",
            status: "Pending"
        });

        const savedBooking = await booking.save();

        console.log("");
        console.log("=================================");
        console.log("NEW BOOKING SAVED TO MONGODB");
        console.log("Booking ID:", savedBooking._id);
        console.log("Worker:", savedBooking.worker);
        console.log("Customer:", savedBooking.name);
        console.log("Status:", savedBooking.status);
        console.log("=================================");
        console.log("");

        res.json({
            success: true,
            message: "Booking saved permanently!",
            booking: savedBooking
        });

    } catch (error) {

        console.error("BOOKING ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: "Could not save booking.",
            error: error.message
        });

    }

});

// ===============================
// GET ALL BOOKINGS
// ===============================

app.get("/api/bookings", async function (req, res) {

    try {

        const bookings = await Booking.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            bookings: bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Could not fetch bookings.",
            error: error.message
        });

    }

});

// ===============================
// UPDATE BOOKING STATUS
// ===============================

app.put("/api/bookings/:id", async function (req, res) {

    try {

        const bookingId = req.params.id;
        const newStatus = req.body.status;

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            {
                status: newStatus
            },
            {
                new: true
            }
        );

        if (!updatedBooking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found."
            });

        }

        console.log("");
        console.log("=================================");
        console.log("BOOKING STATUS UPDATED");
        console.log("Booking ID:", bookingId);
        console.log("New Status:", newStatus);
        console.log("=================================");
        console.log("");

        res.json({
            success: true,
            message: "Booking status updated permanently!",
            booking: updatedBooking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Could not update booking.",
            error: error.message
        });

    }

});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, function () {

    console.log("");
    console.log("=================================");
    console.log("QuickServe Backend Started");
    console.log("=================================");
    console.log("Website: http://localhost:" + PORT);
    console.log("Backend Test: http://localhost:" + PORT + "/api/test");
    console.log("Bookings API: http://localhost:" + PORT + "/api/bookings");
    console.log("Database: MongoDB Atlas");
    console.log("=================================");
    console.log("");

});