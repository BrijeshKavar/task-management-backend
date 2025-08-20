import { Client } from 'minio';
import { camelCase } from 'lodash';
import logger from '../logger/common/index';

const getBuckets = () => {
  const bucketBulk = process.env.STORAGE_BUCKETS || '';
  const bucketList = bucketBulk.split(',');
  if (bucketList.length) {
    return bucketList.reduce((prev, curr) => {
      const key = camelCase(curr);
      prev[key] = curr;
      return prev;
    }, {});
  }
  return null;
};

class StorageService {
  region: string;
  storage: Client;
  buckets;
  constructor() {
    this.buckets = getBuckets();
    this.region = process.env.STORAGE_REGION || 'us-east-1';
    this.storage = this.initializeClient();
  }

  /**
   * @author Priya Jadeja
   * Initialize the app to get the minio instance
   * @returns Minio Instance
   */
  initializeClient() {
    return new Client({
      endPoint: process.env.STORAGE_ENDPOINT || '',
      useSSL: !!process.env.STORAGE_SSL,
      port: Number(process.env.STORAGE_PORT) || 9000,
      accessKey: process.env.STORAGE_ACCESS_KEY || '',
      secretKey: process.env.STORAGE_SECRET_KEY || ''
    });
  }

  /**
   * @author Priya Jadeja
   * @description Creating new bucket if it's not available
   */
  async createBuckets() {
    try {
      if (this.buckets) {
        await Promise.all(
          Object.keys(this.buckets).map(async bucket => {
            const avail = await this.storage.bucketExists(this.buckets[bucket]);
            if (!avail) {
              return this.storage.makeBucket(this.buckets[bucket], this.region);
            }
            return true;
          })
        );
      } else {
        logger.info('No buckets to create');
      }
    } catch (error) {
      logger.error('Something went wrong while creating bucket', error);
    }
  }

  /**
   * @author Priya Jadeja
   * @description To upload a single file
   * @param file The file object
   * @param bucket Name of the bucket
   * @returns File details
   */
  async uploadSingle(file, bucket, folderPath = null) {
    try {
      const fileOriginalName = file.originalname;
      const fileName = `${new Date().getTime()}-${file.originalname}`;
      const key = folderPath ? `${folderPath}/${fileName}` : fileName;
      await this.storage.putObject(
        bucket,
        key,
        file.buffer,
        { 'Content-type': `${file.mimetype}` }
        //  'application/octet-stream'
      );
      return {
        fileName,
        fileOriginalName
      };
    } catch (error) {
      logger.error('Something went wrong while uploading image', error);
    }
  }

  /**
   * @author Priya Jadeja
   * @param files Array of file objects
   * @param bucket Name of the bucket
   * @returns Array of File details
   */
  async uploadMultiple(files, bucket) {
    return Promise.all(files.map(file => this.uploadSingle(file, bucket)));
  }

  /**
   * @author Priya Jadeja
   * Returns url of provided file
   * @param fileName Name of the file
   * @param bucket Name of the bucket
   * @returns File url
   */
  async getFileUrl(fileName, bucket) {
    const url = await this.storage.presignedUrl('GET', bucket, fileName);
    return url;
  }

  /**
   * @author Priya Jadeja
   * Returns urls of provided files
   * @param fileName Names of the files
   * @param bucket Name of the bucket
   * @returns File urls
   */
  async getFileUrls(fileNames, bucket) {
    return Promise.all(fileNames.map(fileName => this.getFileUrl(fileName, bucket)));
  }

  /**
   * @author Priya Jadeja
   * To get the readable object of the file
   * @param fileName Name of the file
   * @param bucket Bucket Name
   * @returns Readable stream object of file
   */
  async getSingle(fileName, bucket) {
    return this.storage.getObject(bucket, fileName);
  }

  /**
   * @author Priya Jadeja
   * @description To get readable objects of multiple files
   * @param fileNames Array of file names
   * @param bucket Bucket Name
   * @returns Array of readable stream objects of file
   */
  async getMultiple(fileNames, bucket) {
    return Promise.all(fileNames.map(fileName => this.getSingle(fileName, bucket)));
  }

  /**
   * @author Priya Jadeja
   * @description Call to delete the file from the bucket
   * @param fileName Name of the file
   * @param bucket Name of the bucket
   */
  async deleteFile(fileName, bucket) {
    return await this.storage.removeObject(bucket, fileName);
  }

  /**
   * @author Priya Jadeja
   * @description Call to delete multiple files from the bucket
   * @param fileNames Array of filenames
   * @param bucket Name of the bucket
   */
  async deleteMultipleFiles(fileNames, bucket) {
    return Promise.all(fileNames.map(fileName => this.deleteFile(fileName, bucket)));
  }

  async generatePresignedURL(bucket: string, fileName: string) {
    return this.storage.presignedPutObject(bucket, fileName);
  }

  async getReporDownloadURL(filename: string) {
    return this.storage.presignedGetObject('reports', filename, 30);
  }

  storePdf(buffer: Buffer, fileName: string) {
    return this.storage.putObject('reports', fileName, buffer, buffer.length);
  }
}

export default StorageService;