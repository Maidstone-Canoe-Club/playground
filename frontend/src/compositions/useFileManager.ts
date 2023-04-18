import { Ref } from "vue";

export class UploadableFile {
  file: File;
  id: string;
  url: string;
  status: string | null;

  constructor (file: File) {
    this.file = file;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = null;
  }
}

export const useFileManager = (maxFiles?: number) => {
  const files: Ref<UploadableFile[]> = ref([]);

  function addFiles (newFiles: FileList) {
    const newUploadableFiles = [...newFiles]
      .map(file => new UploadableFile(file))
      .filter(file => !fileExists(file.id));

    files.value = files.value.concat(newUploadableFiles);

    if (maxFiles && maxFiles > 0) {
      files.value = files.value.splice(0, maxFiles);
    }
  }

  function fileExists (otherId: string) {
    return files.value.some(({ id }) => id === otherId);
  }

  function removeFile (file: UploadableFile) {
    const index = files.value.indexOf(file);
    if (index > -1) {
      files.value.splice(index, 1);
    }
  }

  return {
    files,
    addFiles,
    removeFile
  };
};
