import { request } from './index';
import { Restful } from './type';
import { User } from './user';

const baseUrl = '/api/document';

export interface Document {
  id: number | null;
  project_id: number;
  user_id: number;
  title: string;
  content: string;
}

export interface DocumentWithUser extends Document {
  user: User;
}

export interface DocumentWithUserName extends Document {
  user_name: string;
}

export interface DocumentsRetrievedByPage {
  total: number;
  documents: DocumentWithUserName[];
}

/**
 * 创建
 * @param { Partial<Document> } document
 */
export const create = async (document: Partial<Document>) => {
  return await request<Restful<Document>>({
    method: 'POST',
    url: `${baseUrl}/create`,
    data: document,
  });
};

/**
 * 遍历某团队的某一页文档
 * @param { string } tid - 团队id
 * @param { number } page - 第几页
 * @param { number } capacity - 每页多少行数据
 */
export const retrievePage = async (
  tid: string,
  page: number,
  capacity: number,
) => {
  return await request<Restful<DocumentsRetrievedByPage>>({
    method: 'GET',
    url: `${baseUrl}/retrieve-page`,
    params: {
      tid,
      page,
      capacity,
    },
  });
};

/**
 * 查询某个文档
 * @param { string } id - 文档id
 */
export const retrieveById = async (id: string) => {
  return await request<Restful<DocumentWithUser>>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      id,
    },
  });
};
