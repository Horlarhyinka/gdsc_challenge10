import BookModel from "../models/book.model";
class BookService{
    constructor(
        private bookModel = BookModel,
        private readonly defaultPage = 1,
        private readonly defaultCount = 15,
    ){
        
    }

    async createBook(obj: {title: string, yearOfPublish: number, category: string, available?: boolean, quantityInStock?: number}){
        return this.bookModel.create({...obj})
    }

    async getAll(page: number = this.defaultPage, count: number = this.defaultCount){
        return this.bookModel.find({})
                    .skip((page -1)*count)
                    .limit(count)
    }

    async getById(id: string){
        return this.bookModel.findById(id)

    }

    async findByAuthorName(author: string, page: number = this.defaultPage, count: number = this.defaultCount){
        return this.bookModel.find({ author })
                    .skip((page -1)*count)
                    .limit(count)
    }

    async findByTitle(title: string, page: number = this.defaultPage, count: number = this.defaultCount){
        return this.bookModel.find({ title })
                    .skip((page -1)*count)
                    .limit(count)
    }

    async findByYearOfPublish(yearOfPublish: number, page: number = this.defaultPage, count: number = this.defaultCount){
        return this.bookModel.find({ yearOfPublish })
                    .skip((page -1)*count)
                    .limit(count)
    }

    async query<T extends {title?: string, yearOfPublish?: number, category?: string, available?: boolean, page?: number, count?: number}>(obj: T){
        const page =  obj.page || this.defaultCount
        const count = obj.count || this.defaultCount
        return this.bookModel.find({...obj})
                    .skip((page -1)*count)
                    .limit(count)
    }

    async updateBook(id: string, obj: object){
        return this.bookModel.findByIdAndUpdate(id, {...obj}, {new: true})
    }

    async deleteBook(id: string){
        return this.bookModel.findByIdAndDelete(id)
    }
}

const bookService = new BookService()

export default Object.freeze(bookService)