import { DirectusQueryParams } from "nuxt-directus/dist/runtime/types";

export interface DirectusFolderRequest {
  id?: string;
  params?: DirectusQueryParams
}

export const useDirectusFolders = () => {
  const directus = useDirectus();

  const getFolders = async<T>(data: DirectusFolderRequest): Promise<T[]> => {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter);
    }
    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep);
    }

    const folders = await directus<{data: T[]}>("/folders/", {
      method: "GET",
      params: data.params
    });

    return folders.data;
  };

  return {
    getFolders
  };
};
