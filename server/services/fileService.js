import * as path from "path";
import * as uuid from "uuid";

class FileService {
    async saveFile(file) {
        try {
            const fileName = uuid.v4() + ".jpg";
            const fullFileName = path.resolve("media", fileName);
            await file.mv(fullFileName);
            return fileName;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FileService();
