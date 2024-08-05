import SparkMD5 from "spark-md5";


/**
 * 获取一个string的md5
 *
 * @param source 字符串的信息
 */
export const stringMD5 = (source: string) => {
    const spark: SparkMD5 = new SparkMD5();
    spark.append(source)
    return spark.end();
}

/**
 * 获取一个string[]的md5
 *
 * @param allMD5 字符串数组的信息
 */
export const stringArrayMD5 = (allMD5: string[]) => {
    const spark: SparkMD5 = new SparkMD5();
    allMD5.forEach(md5 => spark.append(md5)); // 将所有 MD5 值添加到 SparkMD5 实例中
    return spark.end(); // 返回最终的 MD5 值
}

/**
 * Blob 的md5
 * @param blob Blob信息
 */
export const blobMD5 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
        const spark: SparkMD5.ArrayBuffer = new SparkMD5.ArrayBuffer(); // 创建 SparkMD5 实例
        const reader: FileReader = new FileReader(); // 创建 FileReader 实例
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const bytes: any = e.target!.result;
            spark.append(bytes);
            resolve(spark.end())
        };
        reader.readAsArrayBuffer(blob);
    })
}


/**
 * Blob 数组的md5
 * @param blobs Blob数组
 */
export const blobArrayMD5 = (blobs: Blob[]): Promise<string> => {
    const spark: SparkMD5.ArrayBuffer = new SparkMD5.ArrayBuffer(); // 创建 SparkMD5 实例
    return new Promise((resolve) => {
        function readChunk(i: number) {
            if (i >= blobs.length) {
                resolve(spark.end()); // 所有分片读取完毕，返回 MD5 值
                return;
            }
            const blob: Blob = blobs[i];
            const reader: FileReader = new FileReader(); // 创建 FileReader 实例
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const bytes: any = e.target!.result;
                spark.append(bytes); // 将分片内容添加到 SparkMD5 实例中
                readChunk(i + 1); // 读取下一个分片
            };
            reader.readAsArrayBuffer(blob); // 读取分片内容为 ArrayBuffer
        }

        readChunk(0); // 从第一个分片开始读取
    });
}
