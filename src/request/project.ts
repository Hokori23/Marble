import { request } from './index';
import { Team } from './team';
import { Restful } from './type';

const baseUrl = '/api/project';

export enum ProjectType {
  TEAM = 0,
  USER = 1,
}
export interface Project {
  id: number | null;
  type_id: ProjectType;
  associated_id: number;
  name: string;
  description: string | null;
}

export interface ProjectWithTeam extends Project {
  team: Team;
}
export interface ProjectsRetrieveByPage {
  total: number;
  projects: Project[];
}

/**
 * 创建
 * @param { Partial<Project> } project
 */
export const create = async (project: Partial<Project>) => {
  return await request<Restful<Project>>({
    method: 'POST',
    url: `${baseUrl}/create`,
    data: project,
  });
};

/**
 * 遍历某团队的项目
 * @param { ProjectType } type_id - 项目归属类型
 * @param { number } associated_id - 所属用户/团队ID
 * @param { number } page - 第几页
 * @param { number } capacity - 每页多少行数据
 */
export const retrievePage = async (
  type_id: ProjectType,
  associated_id: number,
  page: number,
  capacity: number,
) => {
  return await request<Restful<ProjectsRetrieveByPage>>({
    method: 'GET',
    url: `${baseUrl}/retrieve-page`,
    params: {
      type_id,
      associated_id,
      page,
      capacity,
    },
  });
};

export const retrieveById = async (id: string) => {
  return await request<Restful<ProjectWithTeam>>({
    method: 'GET',
    url: `${baseUrl}/retrieve`,
    params: {
      id,
    },
  });
};
