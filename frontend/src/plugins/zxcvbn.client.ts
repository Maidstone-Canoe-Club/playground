import { zxcvbnOptions } from "@zxcvbn-ts/core";
import zxcvbnCommonPackage from "@zxcvbn-ts/language-common";

export default defineNuxtPlugin(() => {
  const options = {
    dictionary: {
      ...zxcvbnCommonPackage.dictionary
    },
    graphs: zxcvbnCommonPackage.adjacencyGraphs
  };
  zxcvbnOptions.setOptions(options);
});
