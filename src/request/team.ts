import { request } from './index';
import { Restful } from './type';
import { User } from './user';

const baseUrl = '/api/team';

export interface Team {
  [key: string]: unknown;
  id: number | null;
  name: string;
  description?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface TeamWithUsers extends Team {
  users: User[];
}

export interface TeamsRetrievedByPage {
  total: number;
  teams: TeamWithUsers[];
}

/**
 * 创建团队
 * @param { Partial<Team> } team - { name, description? }
 * @param { string } name
 * @param { string } description?
 */
export const create = async (team: Partial<Team>) => {
  return await request<Restful<Team>>({
    method: 'POST',
    url: `${baseUrl}/create`,
    data: team,
  });
};

/**
 * 邀请某用户进入某团队
 * @param { number } uid
 * @param { number } tid
 */
export const invite = async (uid: number, tid: number) => {
  return await request<Restful<Team>>({
    method: 'POST',
    url: `${baseUrl}/invite`,
    data: {
      uid,
      tid,
    },
  });
};

/**
 * 遍历某用户已加入的某一页团队（附带User）
 * @param { number } page - 第几页
 * @param { number } capacity - 每页多少行数据
 */
export const retrieveJoined = async (page: number, capacity: number) => {
  return await request<Restful<TeamsRetrievedByPage>>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      page,
      capacity,
    },
  });
};

/**
 * 编辑团队信息
 */
export const edit = async (team: Partial<Team>) => {
  return await request<Restful<Team>>({
    method: 'POST',
    url: `${baseUrl}/edit`,
    data: team,
  });
};
