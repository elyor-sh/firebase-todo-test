import { inject, injectable } from "tsyringe";
import { v4 } from 'uuid'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, DocumentReference, DocumentData } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { fireDB, FireDbPaths, fireStorage } from "../config";
import { LoadingSpinnerModel } from "../ui";

@injectable()
export class HttpService {

    private path: FireDbPaths = 'todo'
    private collection = collection(fireDB, this.path)
    private uploadFilesRef = ref(fireStorage, 'files/')

    constructor(
        @inject(LoadingSpinnerModel) private readonly loadingSpinnerModel: LoadingSpinnerModel
    ) {
    }

    public setCollectionPath(path: FireDbPaths) {
        this.path = path
        this.collection = collection(fireDB, path)
    }

    public async getAll<T extends { id: string }>(): Promise<T[] | undefined> {

        try {

            this.loadingSpinnerModel.setLoading(true)

            const data = await getDocs(this.collection)

            return data.docs.map(doc => ({ ...doc.data(), id: doc.id })) as T[]

        } catch (e) {

        } finally {
            this.loadingSpinnerModel.setLoading(false)
        }
    }

    public async create<T extends { [x: string]: any; }>(params: T): Promise<void> {

        try {

            this.loadingSpinnerModel.setLoading(true)

            await addDoc(this.collection, params)

        } catch (e) {

        } finally {
            this.loadingSpinnerModel.setLoading(false)
        }
    }

    public async update<T>(id: string, params: Partial<T>): Promise<void> {

        try {
            
            this.loadingSpinnerModel.setLoading(true)

            const c_doc = doc(fireDB, this.path, id)
            await updateDoc<DocumentData>(c_doc as DocumentReference<DocumentData>, params)

        } catch (e) {
            console.log(e);
            

        } finally {
            this.loadingSpinnerModel.setLoading(false)
        }
    }

    public async delete<T>(id: string): Promise<void> {

        try {

            this.loadingSpinnerModel.setLoading(true)

            const c_doc = doc(fireDB, this.path, id)
            await deleteDoc(c_doc)

        } catch (e) {

        } finally {
            this.loadingSpinnerModel.setLoading(false)
        }
    }

    public async uploadFile(file: File): Promise<string> {

        const fileName = `/files/${v4() + '&sep1&' + file.name.replace('&sep1&', '')}`

        const uploadRef = ref(fireStorage, fileName)

        await uploadBytes(uploadRef, file)

        return fileName

    }

    public async downloadFile(filePath: string) {

        try {

            const url = await getDownloadURL(ref(fireStorage, filePath))

            const link = document.createElement('a')
            link.href = url
            link.setAttribute('target', '_blank')
            link.setAttribute('download', `${filePath}`)
            document.body.appendChild(link)

            link.click()
            document.body.removeChild(link)

        } catch (error) {

        }


    }
}