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
  faUser,
  faCalendarDay,
  faCalendarDays,
  faRepeat,
  faTriangleExclamation,
  faLocationDot,
  faUsers,
  faSterlingSign
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser as farUser,
  faCircleLeft as farCircleLeft,
  faCircleRight as farCircleRight,
  faClock as farClock,
  faCalendar as farCalendar
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
library.add(faCalendarDay);
library.add(faCalendarDays);
library.add(faRepeat);
library.add(faTriangleExclamation);
library.add(faLocationDot);
library.add(faUsers);
library.add(faSterlingSign);

library.add(farUser);
library.add(farCircleLeft);
library.add(farCircleRight);
library.add(farClock);
library.add(farCalendar);

config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
