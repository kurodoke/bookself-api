import storage from "../storage.js";

function getAllBooks(request, h) {

    const { name, reading, finished } = request.query;
    let query = false;

    if(name !== undefined){
        query = true;
    }
    if(reading !== undefined) {
        query = true;
    }
    if(finished !== undefined) {
        query = true;
    }

    return success(h, query, name, reading, finished);
}

function success(h, query, name, reading, finished) {
    const response = h.response({
        status: "success",
        data: {
            books: [...storage]
                .filter(([, data]) => {
                    if (query) {
                        if(name !== undefined && data.name == name){
                            return true;
                        }
                        if(reading !== undefined && data.reading === (reading == 1) ? true : false){
                            return true;
                        }
                        if(finished !== undefined && data.finished === (finished == 1) ? true : false){
                            return true;
                        }
                        return false;
                    } else{
                        return true;
                    }
                })
                .map(([, data]) => {
                    return {
                        id: data.id,
                        name: data.name,
                        publisher: data.publisher,
                    };
                }),
        },
    });
    return response;
}

export default getAllBooks;
