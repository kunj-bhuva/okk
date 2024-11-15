const NGO = require("../models/NGO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// Register a new NGO with file upload for updated12A and updated80G
exports.registerNGO = async (req, res) => {
  try {
    const { name, location, causeArea, contactPerson, mobileNumber, email, address, password , vision , mission} = req.body;

    // Ensure both files are uploaded
    // if (!req.files || !req.files.updated12A || !req.files.updated80G) {
    //   return res.status(400).json({ message: "Both updated12A and updated80G files are required" });
    // }

    // Check if NGO already exists
    const existingNGO = await NGO.findOne({ email });
    if (existingNGO) {
      return res.status(400).json({ message: "NGO already registered" });
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new NGO
    const ngo = new NGO({
      name,
      location,
      vision,
      mission,
      causeArea,
      contactPerson,
      mobileNumber,
      email,
      address,
      password,
    });

    await ngo.save();
    res.status(201).json({ message: "NGO registered successfully", ngo });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Authenticate NGO and generate token
exports.loginNGO = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if NGO exists
    const ngo = await NGO.findOne({ email });
    if (!ngo) {
      return res.status(400).json({ message: "Invalid email " });
    }

    // Optional: Check if account is verified
    // if (ngo.verificationStatus !== 'verified') {
    //   return res.status(403).json({ message: "Account is not verified yet" });
    // }

    // Verify password
    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid  password" });
    }

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured in environment variables.");
    }

    const token = jwt.sign(
      { id: ngo._id, role: ngo.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token }); // Send token on successful login
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Update NGO profile
exports.updateNGOProfile = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const updateData = req.body;

    const ngo = await NGO.findByIdAndUpdate(ngoId, updateData, { new: true });

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.status(200).json({ message: "NGO profile updated", ngo });
  } catch (error) {
    res.status(500).json({ message: "Error updating NGO profile", error });
  }
};

exports.viewPendingRequests = async (req, res) => {
  try {
    // Fetch all NGOs where verificationStatus is 'pending'
    const pendingNGOs = await NGO.find({ verificationStatus: 'pending' });
    
    if (pendingNGOs.length === 0) {
      return res.status(404).json({ message: 'No pending verification requests found' });
    }
    
    res.status(200).json({ pendingNGOs });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};