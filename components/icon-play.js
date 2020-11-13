import Reacts from "react";

const IconArrow = () => {
  return (
    <svg width="77" height="77" viewBox="0 0 77 77">
      <image
        width="77"
        height="77"
        href="data:img/png;base64,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"
      />
    </svg>
  );
};

export default IconArrow;
