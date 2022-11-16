import {inject, injectable} from "tsyringe";
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import {fireDB, FireDbPaths} from "../config";
import {LoadingSpinnerModel} from "../ui";

@injectable()
export class HttpService {

    private path: FireDbPaths = 'todo'
    private collection = collection(fireDB, this.path)

    constructor(
        @inject(LoadingSpinnerModel) private readonly loadingSpinnerModel: LoadingSpinnerModel
    ) {
    }

    public setCollectionPath (path: FireDbPaths) {
        this.path = path
        this.collection = collection(fireDB, path)
    }

    public async getAll<T extends {id: string}>(): Promise<T[]> {

        try {

            this.loadingSpinnerModel.setLoading(true)

            const data = await getDocs(this.collection)

            return data.docs.map(doc => ({...doc.data(), id: doc.id})) as T[]

        }catch (e) {

        }finally {
            this.loadingSpinnerModel.setLoading(false)
        }
    }

    public async create<T>(params: T): Promise<void> {

        try {

            this.loadingSpinnerModel.setLoading(true)

            await addDoc(this.collection, params)

        }catch (e) {

        }finally {
            this.loadingSpinnerModel.setLoading(false)
        }
    }

    public async update<T>(id: string, params: Partial<T>): Promise<void> {

        try {

            this.loadingSpinnerModel.setLoading(true)

            const c_doc = doc(fireDB, this.path, id)
            await updateDoc(c_doc, params)

        }catch (e) {

        }finally {
            this.loadingSpinnerModel.setLoading(false)
        }
    }

    public async delete<T>(id: string): Promise<void> {

        try {

            this.loadingSpinnerModel.setLoading(true)

            const c_doc = doc(fireDB, this.path, id)
            await deleteDoc(c_doc)

        }catch (e) {

        }finally {
            this.loadingSpinnerModel.setLoading(false)
        }
    }
}