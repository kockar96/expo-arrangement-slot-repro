// Optional diagnostic control. The default repro uses the unmodified npm package.
import { readFileSync, writeFileSync, renameSync } from "node:fs";
const file = new URL("./node_modules/@expo/ui/ios/ArrangementViewView.swift", import.meta.url);
const plain = "      } secondary: {\n        secondary\n";
const control =
  plain +
  "          .splitArrangementFixedLayoutSize(horizontal: false, vertical: true)\n          .layoutPriority(1)\n";
const revert = process.argv.includes("--revert");
const source = readFileSync(file, "utf8");
const from = revert ? control : plain;
const to = revert ? plain : control;
if (!source.includes(from) || (!revert && source.includes(control))) {
  throw new Error(
    "Unexpected source or control already applied. Reinstall @expo/ui before retrying.",
  );
}
const temporary = new URL(file.href + ".repro-tmp");
writeFileSync(temporary, source.replace(from, to));
renameSync(temporary, file);
console.log(
  revert
    ? "Native control reverted. Rebuild iOS."
    : "Native control applied. Rebuild iOS. The JS toggle no longer controls these native traits.",
);
