import { request } from './index';
import { Restful } from './type';

const baseUrl = '/api/upload';

/**
 * 上传文件
 */
export const upload = async (formData: FormData) => {
  return await request<Restful<string>>({
    method: 'POST',
    url: `${baseUrl}`,
    data: formData,
  });
};
