import classnames from "classnames";
import { h } from "preact";
import { useRef } from "preact/hooks";
import { PUBLIC_PATH } from "./settings";

interface SearchProps {
  updateSearch: (search: string) => void;
  search: string;
}

function preloadImage(src: string): void {
  new Image().src = src;
}

preloadImage("/svg/search.svg");
preloadImage("/svg/clear.svg");

export default function Search({ updateSearch, search }: SearchProps) {
  const ref = useRef<HTMLInputElement>(null);
  const iconSize = 24;
  const inputHeight = 36;
  return (
    <div className="relative mv3">
      <img
        src={`${PUBLIC_PATH}svg/search.svg`}
        width={iconSize}
        height={iconSize}
        role="presentation"
        className="o-50 absolute dark--invert"
        style={{ left: 10, top: 8 }}
      />
      <input
        aria-label="Search"
        type="text"
        autoComplete="off"
        autoCorrect="off"
        inputMode="search"
        autoCapitalize="none"
        className={classnames(
          "f5 w-100 border-box",
          "pv2",
          "SimpleFocus",
          "inset-shadow",
          "br-pill ba",
          "bg1",
          "fg1",
          "border2"
        )}
        style={{ paddingLeft: 40, paddingRight: 40, height: inputHeight }}
        value={search}
        onChange={(event) => {
          if (event.target instanceof HTMLInputElement) {
            updateSearch(event.target.value);
          }
        }}
        ref={ref}
      />
      <img
        src={`${PUBLIC_PATH}svg/clear.svg`}
        width={iconSize}
        height={iconSize}
        role="presentation"
        onClick={() => {
          updateSearch("");
          if (ref.current) {
            ref.current.focus();
          }
        }}
        className={classnames("o-50 absolute dark--invert", {
          dn: search === "",
        })}
        style={{ right: 6, top: 6 }}
      />
    </div>
  );
}

Search.displayName = "Search";
