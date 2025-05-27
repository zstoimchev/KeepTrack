import {firebase} from '../firebase.js';
import User from '../models/userModel.js';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);


export const getAllUsers = async (req, res) => {
    try {
        const usersCollection = await getDocs(collection(db, 'users'));
        const userArray = [];

        if (usersCollection.empty) {
            return res.status(404).json({ success: false, msg: "No accounts fetched..." });
        } else {
            usersCollection.forEach((doc) => {
                const user = new User(
                    doc.id,
                    doc.data().name,
                    doc.data().surname,
                    doc.data().email,
                    doc.data().password
                );
                userArray.push(user);
            });

            return res.status(200).json({ success: true, msg: "Accounts fetched!", users: userArray });
        }
    } catch (error) {
        console.error(error);
        return res.status(503).json({ success: false, msg: "Error while fetching users" });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;
        if (!name || !surname || !email || !password) {
            return res.status(400).json({ success: false, msg: "Please enter valid data!" });
        }

        try {
            const existingUserDocs = await getDocs(collection(db, 'users'));
            const existingUser = existingUserDocs.docs.find((doc) => doc.data().email === email);

            if (existingUser) {
                return res.status(400).json({ success: false, msg: "Email is already taken" });
            }

            const userData = { name, surname, email, password };
            await addDoc(collection(db, 'users'), userData);
            return res.status(201).json({ success: true, msg: "User added successfully!" });
        } catch (error) {
            console.error(error);
            return res.status(503).json({ success: false, msg: "Error registering new user" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "The server snapped..." });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: "Please enter both email & password!" });
        }

        try {
            const userDocs = await getDocs(collection(db, 'users'));
            const userDoc = userDocs.docs.find((doc) => doc.data().email === email);

            if (!userDoc) {
                return res.status(404).json({ success: false, msg: "User does not exist. Please create an account!" });
            }

            const userData = userDoc.data();
            if (userData.password !== password) {
                return res.status(400).json({ success: false, msg: "Password must match!" });
            }

            return res.status(200).json({
                success: true,
                user: { id: userDoc.id, email: userData.email, name: userData.name },
                msg: "User is logged in!"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, msg: `Internal server error! Try again later.` });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "The server snapped..." });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.error(id);
        const { name, surname, email, password } = req.body;

        // Get user document reference
        const userRef = doc(db, 'users', id);

        // Check if user exists
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        // Update fields
        const updatedFields = { name, surname, email };
        if (password) {
            updatedFields.password = password; // Caution: consider hashing passwords if used for auth
        }

        await updateDoc(userRef, updatedFields);

        // Return updated data
        const updatedSnap = await getDoc(userRef);
        const updatedUser = updatedSnap.data();

        res.json({ success: true, user: { id, ...updatedUser } });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, msg: 'Error updating user' });
    }
};