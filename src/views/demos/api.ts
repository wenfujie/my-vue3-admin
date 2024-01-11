import type { BaseResponse } from "@/utils/request";
import { request } from "@/utils/request";

/**
 * @description 获取英雄联盟英雄详情
 */
export function getLolHeroInfo(query: { id: number | string }) {
  return request(
    {
      url: "/demos/lol/hero_info",
      method: "get",
      params: query,
    },
    {
      isMock: true,
    }
  );
}

/**
 * @description 获取英雄联盟英雄列表
 */
export function getLolHeroList(query: API.PageParams) {
  return request<API.TableListResult>(
    {
      url: "/demos/lol/hero_list",
      method: "get",
      params: query,
    },
    {
      isMock: true,
    }
  );
}

/**
 * @description 获取王者荣耀英雄列表
 */
export function getWzryHeroList(query: API.PageParams) {
  return request<API.TableListResult>(
    {
      url: "/demos/wzry/hero_list",
      method: "get",
      params: query,
    },
    {
      isMock: true,
    }
  );
}
