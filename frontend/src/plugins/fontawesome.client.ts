// eslint-disable-next-line import/named
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faSpinner,
  faCircleExclamation,
  faTrashCan,
  faAngleUp,
  faBars,
  faArrowRightToBracket,
  faXmark,
  faAngleLeft,
  faAngleRight,
  faPlus,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser as farUser
} from "@fortawesome/free-regular-svg-icons";

library.add(faCheck);
library.add(faSpinner);
library.add(faCircleExclamation);
library.add(faTrashCan);
library.add(faAngleUp);
library.add(faBars);
library.add(faArrowRightToBracket);
library.add(faXmark);
library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faPlus);
library.add(faUser);

library.add(farUser);

config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
