/* eslint-disable prefer-promise-reject-errors */
import everyP from "./index.ts";

test(() => {
  return everyP([
    Promise.reject("a"),
    Promise.resolve("b"),
    Promise.reject("c"),
    Promise.resolve("d"),
  ])
    .then((resolution) => expect(resolution).toEqual([
    [
      "b",
      "d",
    ],
    [
      "a",
      "c",
    ],
  ]));
});
