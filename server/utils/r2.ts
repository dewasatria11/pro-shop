import { S3Client,DeleteObjectCommand,PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { H3Event } from 'h3'
export function r2Client(event:H3Event){const c=useRuntimeConfig(event).r2;if(!c.accountId||!c.accessKeyId||!c.secretAccessKey)throw createError({statusCode:503,statusMessage:'Penyimpanan gambar belum dikonfigurasi.'});return new S3Client({region:'auto',endpoint:`https://${c.accountId}.r2.cloudflarestorage.com`,credentials:{accessKeyId:c.accessKeyId,secretAccessKey:c.secretAccessKey}})}
export async function presignUpload(event:H3Event,key:string,type:string){const c=useRuntimeConfig(event).r2;return getSignedUrl(r2Client(event),new PutObjectCommand({Bucket:c.bucket,Key:key,ContentType:type}),{expiresIn:600})}
export async function deleteObject(event:H3Event,key:string){const c=useRuntimeConfig(event).r2;return r2Client(event).send(new DeleteObjectCommand({Bucket:c.bucket,Key:key}))}
