import { Injectable } from "@angular/core";
import { collectionData, docData, Firestore } from "@angular/fire/firestore";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { LoginData } from '../interfaces/login-data.interface';
import { Observable } from "rxjs";

export interface Task {
    id?: string;
    title: string;
    description: string;
    create_date: string;
    update_date: string;
}


@Injectable({
    providedIn: 'root'
})
export class DataService {

    update_date: string

    constructor(private firestore: Firestore, public auth: Auth) {
        const date = new Date();
        this.update_date = date.toLocaleDateString('fr-FR');
     }




    getTasks(): Observable<Task[]> { 
        const taskRef = collection(this.firestore, 'tasks')
        return collectionData(taskRef, { idField: 'id'}) as Observable<Task[]>;
    }

    getTaskById(id): Observable<Task> {
        const taskDocRef = doc(this.firestore, `tasks/${id}`);
        return docData(taskDocRef, { idField: 'id'}) as Observable<Task>
    }

    addTask(task: Task) {
        const tasksRef = collection(this.firestore, 'tasks');
        return addDoc(tasksRef, task)
    }

    deleteTask(task: Task) {
        const taskDocRef = doc(this.firestore, `tasks/${task.id}`);
        return deleteDoc(taskDocRef);
    }

    updateTask(task: Task) {
        const taskDocRef = doc(this.firestore, `tasks/${task.id}`)
        return updateDoc(taskDocRef, { title: task.title, description: task.description, update_date: this.update_date})
    }

    login({ email, password }: LoginData) {
        return signInWithEmailAndPassword(this.auth, email, password);
      }


      logout() {
        return signOut(this.auth);
      }
}