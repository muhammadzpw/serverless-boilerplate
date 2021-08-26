import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import {} from 'aws-sdk/clients/s3';

type ID = string | number;
interface WithID {
  id: ID;
}
interface Entity<T> {
  name: string;
  data: Map<ID, T>;
  indices?: Map<string, Map<any, ID>>;
}
class BaseEntity<T> implements Entity<T> {
  name: string;
  data: Map<ID, T>;
  indices?: Map<string, Map<any, ID>>;

  constructor(obj: Record<string, any>) {
    this.name = obj.name;
    this.data = new Map(Object.entries(obj.data));
    this.indices = new Map(Object.entries(obj.indices));
  }
}
interface IS3Repository<T> {
  listAll: () => Promise<T[]>;
  find: (id?: ID) => Promise<T | undefined>;
  save: () => Promise<void>;
  load: () => Promise<void>;
}

export abstract class S3Repository<T extends WithID>
  implements IS3Repository<T> {
  public path: string;
  public bucket: string;
  protected data: Entity<T>;

  constructor(protected s3Client: S3Client) {}

  async load() {
    const getCommand = new GetObjectCommand({
      Key: this.path,
      Bucket: this.bucket,
    });
    const response = await this.s3Client.send(getCommand);
    const body = response.Body;
    if (body instanceof Readable) {
      const jsonStr = await new Promise<string>((res, rej) => {
        body
          .on('data', (chunk) => {
            const bodyStr: string = chunk.toString();
            res(bodyStr);
          })
          .on('error', (err) => rej(err));
      });
      this.data = new BaseEntity<T>(JSON.parse(jsonStr));
    }
  }

  async listAll() {
    const results = [];
    this.data.data.forEach((e) => results.push(e));
    return results;
  }

  async find(id?: ID) {
    return this.data.data.get(id);
  }

  async update(id: ID, data: T) {
    this.data.data.set(id, data);
  }

  async insert(data: T, id?: ID) {
    this.data.data.set(id ? id : data.id, data);
  }

  async delete(id: ID) {
    this.data.data.delete(id);
  }

  async save() {
    // TODO: fix this, the file uploaded is always empty
    const body = JSON.stringify(this.data);
    const putCommand = new PutObjectCommand({
      Bucket: this.bucket,
      Key: this.path,
      ContentType: 'application/json',
      Body: body,
    });
    await this.s3Client.send(putCommand);
  }
}
