import User from "../Modal/auth.js";
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);

export const authRegister = async(req, res) => {
    const { email, password, name } = req.body;
    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword, name });

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error in authRegister:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const authLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email, userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token, name: user.name, email: user.email });
    } catch (error) {
        console.error("Error in authLogin:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createPayment = async(req, res) => {
    const { amount, paymentMethodId, return_url } = req.body;


    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            return_url: return_url,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'always'
            }
        });

        if (paymentIntent.status === 'requires_action') {
            // 3D Secure is required
            res.json({
                success: true,
                requiresAction: true,
                clientSecret: paymentIntent.client_secret
            });
        } else if (paymentIntent.status === 'succeeded') {
            // Payment succeeded
            res.json({ success: true });
        } else {
            // Other status, consider it as failure
            res.status(400).json({ success: false, error: 'Payment failed' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const sendMail = async(req, res) => {
    try {
        await sendEmail(req.body);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
}