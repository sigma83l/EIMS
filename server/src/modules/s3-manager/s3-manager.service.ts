import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import * as path from 'path';
import { File } from '../../common/interfaces/file.interface';

@Injectable()
export class S3ManagerService {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });

    this.s3 = new AWS.S3();
  }
  async getFile(bucket: string, key: string) {
    return await this.s3.getObject({ Bucket: bucket, Key: key}).promise();
  }

  async listBuckets() {
    const listBuckets = await this.s3.listBuckets().promise();
    return listBuckets.Buckets;
  }

  async listObjects(bucket: string): Promise<any>{
    try {
        const data = await this.s3.listObjects({ Bucket: bucket }).promise();
        return data.Contents.map((c)=> c.Key);
    } catch (error) {
        throw new InternalServerErrorException("Error occurred");
    }
  }

  async uploadFile(bucket: string, file: File): Promise<{ key: string }> {
    try {
        // create unique key
        const fileUniqueName = await this.createUniqueFileKey(file.originalname);
        const key = `files/${fileUniqueName}`;
        await this.s3
          .putObject({
            Bucket: bucket,
            Body: file.buffer,
            ACL: 'public-read',
            Key: key,
          })
          .promise();
  
        return { key };
    } catch (error) {
        throw new InternalServerErrorException(error.message, error);
    }
  }

  async deleteFile(bucket: string, fileName: string) {
    const params = {
        Bucket: bucket,
        Key: fileName,
    };

    try {
        await this.s3.deleteObject(params).promise();
    } catch (error) {
        throw new InternalServerErrorException("Error occurred");
    }
  }

  async createUniqueFileKey(fileOriginalName: string): Promise<string> {
    const unixSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(fileOriginalName);
    return `${path
      .parse(fileOriginalName)
      .name.replace(/\s/g, '')}${unixSuffix}${ext}`;
  }
}
