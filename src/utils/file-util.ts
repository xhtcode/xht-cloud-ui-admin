import SparkMD5 from "spark-md5";
import Worker from '@/worker/file-hash?worker'

export const CHUNK_SIZE: number = 5 * 1024 * 1024
const THREAD_COUNT: number = navigator.hardwareConcurrency || 2

/**
 * 转换文件的大小带单位
 * @param size 文件大小
 * @returns string
 */
export function convertFileSizeUnit(size = 0) {
    if (size == 0) return '0 B'
    if (size < 1024) {
        return `${size} B` // 小于1KB
    } else if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(2)} KB` // 小于1MB
    } else if (size < 1024 * 1024 * 1024) {
        return `${(size / (1024 * 1024)).toFixed(2)} MB` // 小于1GB
    } else {
        return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB` // 大于等于1GB
    }
}

/**
 * 根据文件流转成的 blob 下载文件
 * @param blob 文件 blob
 * @param filename 文件名
 */
export function downloadFileByBlob(blob: Blob, filename: string) {
    const href = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = href
    a.download = filename
    a.rel = 'noopener noreferrer'
    document.body.append(a)
    a.click()
    URL.revokeObjectURL(href) //释放URL对象
    a.remove()
}

/**
 * 文件创建分片
 * @param file 文件信息
 * @param chunkSize 分片大小
 */
export const createFileChunks = (file: File, chunkSize: number): Blob[] => {
    const chunks: Blob[] = [];
    let offset: number = 0;
    while (offset < file.size) {
        chunks.push(file.slice(offset, offset + chunkSize))
        offset += chunkSize;
    }
    return chunks;
}

/**
 * 计算file分片
 * @param file
 * @param index
 * @param chunkSize
 */
export const createChunk = (file: File, index: number, chunkSize: number) => {
    return new Promise(resolve => {
        const start = index * chunkSize
        const end = start + chunkSize
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()
        const blob = file.slice(start, end)
        fileReader.onload = (e: any) => {
            spark.append(e.target.result)
            //索引从1开始
            resolve({index: index + 1, start, end, size: blob.size, hash: spark.end(), blob})
        }
        fileReader.readAsArrayBuffer(blob)
    })
}

/**
 * 线程计算文件分块 和分块hash
 * @param file 文件信息
 * @param success
 */
export async function createThreadFileChunks(file: File, success: (schedule: number, size: number) => void): Promise<any> {
    return new Promise(resolve => {
        const chunkCount: number = Math.ceil(file.size / CHUNK_SIZE);
        const threadChunkCount: number = Math.ceil(chunkCount / THREAD_COUNT)
        const result: any = []
        let finishCount: number = 0
        for (let i: number = 0; i < THREAD_COUNT; i++) {
            const work: Worker = new Worker()
            const start: number = i * threadChunkCount
            let end: number = (i + 1) * threadChunkCount
            if (end > chunkCount) {
                end = chunkCount
            }
            work.postMessage({
                file, start, end, CHUNK_SIZE
            })
            work.onmessage = e => {
                result[i] = e.data
                work.terminate()
                finishCount++
                let fileSize = finishCount * CHUNK_SIZE * threadChunkCount
                if (finishCount / THREAD_COUNT === 1) {
                    fileSize = file.size
                }
                success(parseFloat((finishCount / THREAD_COUNT * 100).toFixed(2)), fileSize)
                if (finishCount >= THREAD_COUNT) {
                    resolve(result.flat())
                }
            }
        }
    })

}
