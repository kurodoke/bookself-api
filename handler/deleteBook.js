import storage from "../storage.js";

function deleteBook(request, h){

    if(!storage.has(request.params.bookId)){
        return fail(h, "Buku gagal dihapus. Id tidak ditemukan");
    }

    storage.delete(request.params.bookId);

    return success(h);
}

function success(h){
    const response = h.response({
        status: "success",
        message: "Buku berhasil dihapus"
    })
    return response;
}

function fail(h, message) {
    const response = h.response({
        status: "fail",
        message: message,
    });
    response.type("application/json");
    response.code(404);

    return response;
}

export default deleteBook;