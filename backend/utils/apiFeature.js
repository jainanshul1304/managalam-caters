
class ApiFeatures {

    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;

    }

    //use for searching product 
    search() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: "i"
            },
        } : {};
        console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }
    // use for Filter the product accorging to category
    filter() {
        const querycopy = { ...this.querystr };
        

        const removeFields = ["keyword" , "page" ,"limit"] ;

        removeFields.forEach(key=> delete querycopy[key] );
        console.log(querycopy);
        //this.query = this.query.find(querycopy);

        //Filter on the base on the Price and Rating

        let querystr = JSON.stringify(querycopy) ; 
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g ,(key)=> `$${key}`);
        this.query = this.query.find(JSON.parse(querystr));

        console.log(querystr);
        

        return this ;

    }

    pagination(resultPerPage) {
        const currentpage = Number(this.querystr.page) || 1;
        const skip = resultPerPage * (currentpage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
};

module.exports = ApiFeatures