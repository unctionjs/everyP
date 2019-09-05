import mapValues from "@unction/mapvalues";
import reduceValues from "@unction/reducevalues";
import thenCatchP from "@unction/thencatchp";
import allP from "@unction/allp";
import thenP from "@unction/thenp";
import couple from "@unction/couple";

export default function everyP<A, B> (promises: Array<Promise<A>>): Promise<[Array<A>, Array<B>]> {
  return thenP(
    reduceValues(([resolved, rejected]: [Array<A>, Array<B>]) => ([state, value]: [string, A]) => {
      if (state === "resolved") {
        return couple([...resolved, value])(rejected);
      }

      return couple(
        resolved
      )([...rejected, value]);
    })(
      [[], []]
    )
  )(
    allP(
      mapValues(
        thenCatchP(
          couple("resolved")
        )(
          couple("rejected")
        )
      )(
        promises
      )
    )
  );
}
