import mapValues from "@unction/mapvalues";
import reduceValues from "@unction/reducevalues";
import thenCatchP from "@unction/thencatchp";
import allP from "@unction/allp";
import thenP from "@unction/thenp";
import couple from "@unction/couple";
const initial = [[], []];

export default function everyP (promises) {
  return thenP(reduceValues(([resolved, rejected]) => ([state, value]) => {
    if (state === "resolved") {
      return couple([...resolved, value])(rejected);
    }

    return couple(resolved)([...rejected, value]);
  })(initial))(allP(mapValues(thenCatchP(couple("resolved"))(couple("rejected")))(promises)));
}
