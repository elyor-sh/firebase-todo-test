import {injectable} from "tsyringe";
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import {fireDB, FireDbPaths} from "../config";

@injectable()
export class HttpService {

    private path: FireDbPaths = 'todo'
    private collection = collection(fireDB, this.path)

    public setCollectionPath (path: FireDbPaths) {
        this.path = path
        this.collection = collection(fireDB, path)
    }

    public async getAll<T extends {id: string}>(): Promise<T[]> {
        const data = await getDocs(this.collection)

        return data.docs.map(doc => ({...doc.data(), id: doc.id})) as T[]
    }

    public async create<T>(params: T): Promise<void> {
        await addDoc(this.collection, params)
    }

    public async update<T>(id: string, params: Partial<T>): Promise<void> {
        const c_doc = doc(fireDB, this.path, id)
        await updateDoc(c_doc, params)
    }

    public async delete<T>(id: string): Promise<void> {
        const c_doc = doc(fireDB, this.path, id)
        await deleteDoc(c_doc)
    }
}