import "./SectionSpacer.css";

const VARIANT_CLASS = {
  default: "section-spacer--default",
  tight: "section-spacer--tight",
  reveal: "section-spacer--reveal",
  extended: "section-spacer--extended",
  flush: "section-spacer--flush",
};

export default function SectionSpacer({ variant = "default", as: Component = "div", className = "" }) {
  const variantClass = VARIANT_CLASS[variant] || VARIANT_CLASS.default;
  const classes = ["section-spacer", variantClass, className].filter(Boolean).join(" ");
  return (
    <Component
      aria-hidden="true"
      className={classes}
    />
  );
}
