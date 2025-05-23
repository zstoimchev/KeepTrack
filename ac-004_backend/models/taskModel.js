import { db } from '../firebase.js';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';

const taskModel = {
    // Add a new task
    addTask: async (task) => {
        try {
            const docRef = await addDoc(collection(db, 'tasks'), {
                title: task.title,
                user_id: task.user_id,
                date: task.date,
                priority: task.priority,
                duration: task.duration,
                is_finished: task.is_finished || false
            });
            return { id: docRef.id };
        } catch (err) {
            throw new Error('Error adding task: ' + err.message);
        }
    },

    // Get tasks by user ID
    getTasksByUserID: async (user_id) => {
        try {
            const q = query(collection(db, 'tasks'), where('user_id', '==', user_id));
            const querySnapshot = await getDocs(q);

            const tasks = [];
            querySnapshot.forEach((doc) => {
                tasks.push({ id: doc.id, ...doc.data() });
            });
            return tasks;
        } catch (err) {
            throw new Error('Error fetching tasks: ' + err.message);
        }
    },

    // Get tasks by a specific day
    getTasksByDay: async (user_id, date) => {
        try {
            const q = query(collection(db, 'tasks'), where('user_id', '==', user_id), where('date', '==', date));
            const querySnapshot = await getDocs(q);

            const tasks = [];
            querySnapshot.forEach((doc) => {
                tasks.push({ id: doc.id, ...doc.data() });
            });
            return tasks;
        } catch (err) {
            throw new Error('Error fetching tasks by date: ' + err.message);
        }
    },

    // Get tasks by month
    getTasksByMonth: async (user_id, month) => {
        try {
            const q = query(collection(db, 'tasks'), where('user_id', '==', user_id), where('date', '>=', `${month}-01`), where('date', '<=', `${month}-31`));
            const querySnapshot = await getDocs(q);

            const tasks = [];
            querySnapshot.forEach((doc) => {
                tasks.push({ id: doc.id, ...doc.data() });
            });
            return tasks;
        } catch (err) {
            throw new Error('Error fetching tasks by month: ' + err.message);
        }
    },

    // Get long-term tasks by user ID
    getLongTermTasksByUserId: async (user_id) => {
        try {
            const q = query(collection(db, 'tasks'), where('user_id', '==', user_id), where('date', '==', "long-term"));
            const querySnapshot = await getDocs(q);

            const tasks = [];
            querySnapshot.forEach((doc) => {
                tasks.push({ id: doc.id, ...doc.data() });
            });
            return tasks;
        } catch (err) {
            throw new Error('Error fetching long-term tasks: ' + err.message);
        }
    },

    
    // fetch by short term
    getShortTermTaskByUserID: async(user_id) => {
        try {
            const q = query(collection(db, 'tasks'), where('user_id', '==', user_id), where('date', '!=', "long-term"));
            const querySnapshot = await getDocs(q);
        const tasks = [];
            querySnapshot.forEach((doc) => {
                tasks.push({ id: doc.id, ...doc.data() });
            });
            return tasks;
        } catch (err) {
            throw new Error('Error fetching short-term tasks: ' + err.message);
        }
    },

    // Update a long-term task
    updateLongTermTask: async (id, title, duration) => {
        try {
            const taskDoc = doc(db, 'tasks', id);
            await updateDoc(taskDoc, { title, duration });
            return { success: true };
        } catch (err) {
            throw new Error('Error updating long-term task: ' + err.message);
        }
    },

    // Update a task
    updateTask: async (id, updates) => {
        try {
            const taskDoc = doc(db, 'tasks', id);
            await updateDoc(taskDoc, updates);
            return { success: true };
        } catch (err) {
            throw new Error('Error updating task: ' + err.message);
        }
    },

    // Delete a task
    deleteTask: async (id) => {
        try {
            const taskDoc = doc(db, 'tasks', id);
            await deleteDoc(taskDoc);
            return { success: true };
        } catch (err) {
            throw new Error('Error deleting task: ' + err.message);
        }
    }

};

export default taskModel;
